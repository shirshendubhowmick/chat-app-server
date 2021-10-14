import { Request, Response } from 'express';
import cache from '~/cache/cache';
import { authCookieName } from '~/constants';
import httpStatusCodes from '~/constants/httpStatusCodes';
import userMap from '~/constants/userMap';
import logger from '~/services/logger';
import { generateErrorResponse, generateSuccessResponse } from '~/utils';
import generateAccessToken from '~/utils/crypto';

async function createUserSession(req: Request, res: Response) {
  const { userId }: { userId: string } = req.body || {};

  logger.logInfo('Create user session request', { userId });

  if (!userId || !userMap[userId]) {
    const { httpStatusCode, errorData } = generateErrorResponse('E003');
    res.status(httpStatusCode).send(errorData);
    logger.logInfo('Create user session request with invalid user Id', {
      userId,
    });
    return;
  }

  res
    .cookie(authCookieName, await generateAccessToken(userMap[userId]), {
      httpOnly: true,
      sameSite: 'lax',
    })
    .status(httpStatusCodes.CREATED)
    .send(
      generateSuccessResponse({
        userId: userMap[userId].userId,
        name: userMap[userId].name,
      }),
    );

  logger.logInfo('Created user session', { userId });
}

function getUserSession(_: Request, res: Response) {
  // const accessToken = req.cookies[authCookieName];

  const isAdminUserPositionAvailable = cache.isAdminUserPositionAvailable();
  res
    .clearCookie(authCookieName, {
      httpOnly: true,
      sameSite: 'lax',
    })
    .status(httpStatusCodes.OK)
    .send(
      generateSuccessResponse({
        isAdminUserPositionAvailable,
      }),
    );
  logger.logInfo(
    'Received session check request with an existing access token',
  );
}

export { createUserSession, getUserSession };
