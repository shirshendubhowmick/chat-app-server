import { Socket } from 'socket.io';
import { AuthPayload } from '~/cache/cache';
import logger from '~/services/logger';
import { getSocketAcknowledgementResponse } from '../utils';
import { AcknowledgementCallback } from './types';

function processMessageEvent(
  authPayload: AuthPayload | undefined,
  socket: Socket,
  messagePayload: any,
  callback: AcknowledgementCallback,
) {
  if (!authPayload) {
    callback(getSocketAcknowledgementResponse(false, 'S001'));
  }
  logger.logInfo('Received message from user', {
    messagePayload,
  });
  socket.broadcast.emit('message', messagePayload);
  callback(getSocketAcknowledgementResponse(true));
}

export default processMessageEvent;
