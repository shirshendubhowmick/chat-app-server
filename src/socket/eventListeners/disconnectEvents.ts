import { Socket } from 'socket.io';
import { AuthPayload } from '~/cache/cache';
import logger from '~/services/logger';

function processDisconnectEvent(
  authPayload: AuthPayload | undefined,
  socket: Socket,
  reason: string,
) {
  logger.logInfo('User disconnected', {
    ...authPayload,
    reason,
  });

  socket.broadcast.emit('adminPositionAvailable');

  logger.logInfo('Broadcasted admin position available message to everyone');
}

// eslint-disable-next-line import/prefer-default-export
export { processDisconnectEvent };
