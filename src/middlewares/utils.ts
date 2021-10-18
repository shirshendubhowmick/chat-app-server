import { NextFunction, Request, Response } from 'express';
import { corsWhilteList } from '~/constants';
import { generateErrorResponse } from '~/utils';

export const fourOFourHandler = (_: Request, res: Response) => {
  const { httpStatusCode, errorData } = generateErrorResponse('E002');
  res.status(httpStatusCode).send(errorData);
};

export const setCorsHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { origin } = req.headers;
  if (origin && corsWhilteList[origin]) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Max-Age', '600');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
