import { Request, Response } from 'express';

import cache from '~/cache/cache';
import httpStatusCodes from '~/constants/httpStatusCodes';
import logger from '~/services/logger';
import { generateSuccessResponse } from '~/utils';

function getMessages(_: Request, res: Response) {
  res
    .status(httpStatusCodes.OK)
    .send(generateSuccessResponse(cache.getMessageList()));
  logger.logInfo(
    'Received session check request with an existing access token',
  );
}

// eslint-disable-next-line import/prefer-default-export
export { getMessages };
