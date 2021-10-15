import acknowledgementErrorMap from '../constants/acknowledgementErrorMap';

export interface AcknowledgementMessage {
  success: boolean;
  timestamp: Date;
  msgId: number;
  error?: typeof acknowledgementErrorMap[keyof typeof acknowledgementErrorMap];
}

export type AcknowledgementCallback = (arg: AcknowledgementMessage) => void;

export interface ProcessedMessage {
  id?: number;
  name: string;
  userId: string;
  timestamp: Date;
  content: {
    text: string;
  };
}
