import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import cache, { AuthPayload } from '~/cache/cache';
import { authCookieName } from '~/constants';
import { validateIncomingEvents } from '../middleware/validation';
import processMessageEvent from './messageEvents';
import { AcknowledgementCallback } from './types';

function registerEventListener(socket: Socket) {
  const { cookies } = socket.request as IncomingMessage & {
    cookies?: { [key: string]: string } | undefined;
  } & { [key: string]: any };

  const accessToken = cookies?.[authCookieName] ?? null;
  let authPayload: AuthPayload | undefined;
  if (accessToken) {
    authPayload = cache.verifyAccessToken(accessToken);
  }

  socket.use(validateIncomingEvents);

  socket.on('message', (payload: any, callback: AcknowledgementCallback) => {
    processMessageEvent(authPayload, socket, payload, callback);
  });
}

export default registerEventListener;
