export type AcknowledgementErrorCode = 'S001';

export interface AcknowledgementErrorCodeMap {
  code: string;
  title: string;
  detail: string;
}

const acknowledgementErrorMap: {
  [key in AcknowledgementErrorCode]: AcknowledgementErrorCodeMap;
} = {
  S001: {
    code: 'S001',
    title: 'Unauthorized',
    detail: 'Missing or invalid access token',
  },
};

export default acknowledgementErrorMap;
