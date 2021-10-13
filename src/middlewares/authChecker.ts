import { NextFunction, Request, Response } from 'express';

import cache from '~/cache/cache';
import { authCookieName } from '~/constants';
import logger from '~/services/logger';
import { generateErrorResponse } from '~/utils';

// eslint-disable-next-line import/prefer-default-export
export const authChecker = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies[authCookieName];

  if (!accessToken) {
    const { httpStatusCode, errorData } = generateErrorResponse('E004');
    res.status(httpStatusCode).send(errorData);
    logger.logInfo('Unauthorized request, access token not available', {});
    return;
  }

  const authPayload = cache.verifyAccessToken(accessToken);

  if (!authPayload) {
    const { httpStatusCode, errorData } = generateErrorResponse('E004');
    res.status(httpStatusCode).send(errorData);
    logger.logInfo('Unauthorized request, invalid access token', {});
    return;
  }
  res.locals.authPayload = authPayload;
  next();
};