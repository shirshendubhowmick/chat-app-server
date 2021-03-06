import httpStatusCodes from './httpStatusCodes';

export type ErrorCodes = 'E001' | 'E002' | 'E003' | 'E004' | 'E005' | 'E006';

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
  E004: {
    code: 'E004',
    title: 'Unauthorized',
    detail: 'Missing or invalid access token',
    httpStatusCode: httpStatusCodes.UNAUTHORIZED,
  },
  E005: {
    code: 'E005',
    title: 'Forbidden',
    detail: 'Admin position no longer available',
    httpStatusCode: httpStatusCodes.FORBIDDEN,
  },
  E006: {
    code: 'E006',
    title: 'Service unavailable',
    detail: 'Error acquiring lock',
    httpStatusCode: httpStatusCodes.SERVICE_UNAVAILABLE,
  },
};

export default errorCodeMap;
