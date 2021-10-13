import httpStatusCodes from './httpStatusCodes';

export type ErrorCodes = 'E001' | 'E002' | 'E003';

export interface ErrorCodeMap {
  code: string;
  title: string;
  detail: string;
  httpStatusCode: number;
}

const errorCodeMap: {
  [key in ErrorCodes]: ErrorCodeMap;
} = {
  E001: {
    code: 'E001',
    title: 'Service unavailable',
    detail: 'Internal error, please contact support',
    httpStatusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
  },
  E002: {
    code: 'E002',
    title: 'Not found',
    detail: "Request resource wasn't found",
    httpStatusCode: httpStatusCodes.NOT_FOUND,
  },
  E003: {
    code: 'E003',
    title: 'Bad request',
    detail: 'Invalid user id',
    httpStatusCode: httpStatusCodes.BAD_REQUEST,
  },
};

export default errorCodeMap;
