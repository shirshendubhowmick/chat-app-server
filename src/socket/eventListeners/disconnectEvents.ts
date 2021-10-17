import { Socket } from 'socket.io';
import cache, { AuthPayload } from '~/cache/cache';
import logger from '~/services/logger';
import { ProcessedMessage } from './types';

async function processDisconnectEvent(
  authPayload: AuthPayload | undefined,
  socket: Socket,
  reason: string,
) {
  logger.logInfo('User disconnected', {
    ...authPayload,
    reason,
  });

  if (authPayload) {
    let release;
    try {
      release = await cache.accuireAccessTokenLock();
    } catch (err) {
      // const { httpStatusCode, errorData } = generateErrorResponse('E006');
      // res.status(httpStatusCode).send(errorData);
      logger.logError('Error acquiring access token lock', err as object);
      return;
    }

    cache.deleteAccessToken(authPayload?.userId as string);
    release();

    const systemMessage: ProcessedMessage = {
      content: { data: `${authPayload.name} has left the chat`, type: 'text' },
      name: 'System',
      userId: '_system',
      timestamp: new Date(),
      type: 'system',
    };

    const msgId = cache.addMessageToList(systemMessage);

    systemMessage.id = msgId;
    socket.broadcast.emit('systemMessage', systemMessage);

    socket.broadcast.emit('adminPositionAvailable');

    logger.logInfo('Broadcasted admin position available message to everyone');
  }
}

// eslint-disable-next-line import/prefer-default-export
export { processDisconnectEvent };
