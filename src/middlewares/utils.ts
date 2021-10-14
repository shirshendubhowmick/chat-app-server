import { NextFunction, Request, Response } from 'express';
import { corsWhilteList } from '~/constants';
import httpStatusCodes from '~/constants/httpStatusCodes';

export const fourOFourHandler = (_: Request, res: Response) => {
  res.status(httpStatusCodes.NOT_FOUND).send({
    errors: [
      {
        title: 'Resource not found',
      },
    ],
  });
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
