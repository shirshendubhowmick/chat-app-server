import errorCodeMap, { ErrorCodes } from '~/constants/errorMap';

function generateSuccessResponse(payload: object) {
  return {
    data: payload,
  };
}

function generateErrorResponse(errorCode: ErrorCodes) {
  return {
    errorData: {
      errors: [
        {
          code: errorCodeMap[errorCode].code,
          title: errorCodeMap[errorCode].title,
          detail: errorCodeMap[errorCode].detail,
        },
      ],
    },
    httpStatusCode: errorCodeMap[errorCode].httpStatusCode,
  };
}

export { generateSuccessResponse, generateErrorResponse };
