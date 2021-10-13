import { Request, Response } from 'express';
import httpStatusCodes from '~/constants/httpStatusCodes';

// eslint-disable-next-line import/prefer-default-export
export const fourOFourHandler = (_: Request, res: Response) => {
  res.status(httpStatusCodes.NOT_FOUND).send({
    errors: [
      {
        title: 'Resource not found',
      },
    ],
  });
};
