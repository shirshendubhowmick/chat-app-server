import { Request, Response } from 'express';
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
    .cookie(authCookieName, await generateAccessToken(), {
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

function getUserSession() {}

export { createUserSession, getUserSession };
