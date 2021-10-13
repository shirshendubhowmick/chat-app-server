import acknowledgementErrorMap from '../constants/acknowledgementErrorMap';

export interface AcknowledgementMessage {
  success: boolean;
  timestamp: Date;
  error?: typeof acknowledgementErrorMap[keyof typeof acknowledgementErrorMap];
}

export type AcknowledgementCallback = (arg: AcknowledgementMessage) => void;
