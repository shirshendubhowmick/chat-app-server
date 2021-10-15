import { Socket } from 'socket.io';
import cache, { AuthPayload } from '~/cache/cache';
import logger from '~/services/logger';
import { getSocketAcknowledgementResponse } from '../utils';
import { AcknowledgementCallback, ProcessedMessage } from './types';

function processMessageEvent(
  authPayload: AuthPayload | undefined,
  socket: Socket,
  messagePayload: any,
  callback: AcknowledgementCallback,
) {
  if (!authPayload) {
    if (typeof callback === 'function') {
      callback(getSocketAcknowledgementResponse(false, undefined, 'S001'));
    }
    return;
  }

  logger.logInfo('Received message from admin user', {
    messagePayload,
  });

  const processedMessage: ProcessedMessage = {
    userId: authPayload.userId,
    name: authPayload.name,
    type: 'user',
    timestamp: new Date(),
    content: messagePayload,
  };

  const msgId = cache.addMessageToList(processedMessage);

  processedMessage.id = msgId;

  socket.broadcast.emit('message', processedMessage);

  if (typeof callback === 'function') {
    callback(getSocketAcknowledgementResponse(true, msgId));
  }

  logger.logInfo('Broadcasted message to everyone', {
    broadcastMessage: processedMessage,
  });
}

export default processMessageEvent;
