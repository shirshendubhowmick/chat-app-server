import acknowledgementErrorMap, {
  AcknowledgementErrorCode,
} from '../constants/acknowledgementErrorMap';
import { AcknowledgementMessage } from '../eventListeners/types';

function getSocketAcknowledgementResponse(
  success: boolean,
  msgId: number = -1,
  errorCode?: AcknowledgementErrorCode,
): AcknowledgementMessage {
  const ack: AcknowledgementMessage = {
    success,
    timestamp: new Date(),
    msgId,
  };
  if (success) {
    return ack;
  }

  if (!errorCode) {
    throw new Error("Error code can't be undefined for success false case");
  }
  ack.error = acknowledgementErrorMap[errorCode];

  return ack;
}

// eslint-disable-next-line import/prefer-default-export
export { getSocketAcknowledgementResponse };
