import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import cache, { AuthPayload } from '~/cache/cache';
import { authCookieName } from '~/constants';
import { validateIncomingEvents } from '../middleware/validation';
import { processDisconnectEvent } from './disconnectEvents';
import processMessageEvent from './messageEvents';
import { AcknowledgementCallback, ProcessedMessage } from './types';

async function registerEventListeners(socket: Socket) {
  const { cookies } = socket.request as IncomingMessage & {
    cookies?: { [key: string]: string } | undefined;
  } & { [key: string]: any };

  const accessToken = cookies?.[authCookieName] ?? null;
  let authPayload: AuthPayload | undefined;
  if (accessToken) {
    const release = await cache.accuireAccessTokenLock();
    authPayload = cache.verifyAccessToken(accessToken);
    release();
  }

  if (authPayload) {
    const systemMessage: ProcessedMessage = {
      content: { text: `${authPayload.name} has joined the chat` },
      name: 'System',
      userId: '_system',
      timestamp: new Date(),
      type: 'system',
    };

    const msgId = cache.addMessageToList(systemMessage);
    systemMessage.id = msgId;
    socket.broadcast.emit('systemMessage', systemMessage);
  }

  socket.use(validateIncomingEvents);

  socket.on('message', (payload: any, callback: AcknowledgementCallback) => {
    processMessageEvent(authPayload, socket, payload, callback);
  });

  socket.on('disconnect', (reason) => {
    processDisconnectEvent(authPayload, socket, reason);
  });
}

export default registerEventListeners;
