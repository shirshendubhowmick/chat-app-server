import { Socket } from 'socket.io';
import expressCookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

function socketIoCookieParser(
  socket: Socket,
  next: (err?: Error | undefined) => void,
) {
  const cookieParser = expressCookieParser();

  const request = socket.request as Request;

  cookieParser(request, {} as Response, next as NextFunction);
}

// eslint-disable-next-line import/prefer-default-export
export { socketIoCookieParser };
