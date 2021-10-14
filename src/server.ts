import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import * as router from './router/router';
import { fourOFourHandler, setCorsHeaders } from './middlewares/utils';
import { socketIoCookieParser } from './socket/middleware/cookieParser';
import registerEventListeners from './socket/eventListeners';
import logger from './services/logger';
import { corsWhilteList } from './constants';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: Object.values(corsWhilteList),
  },
});

// * Middlewares
app.use(morgan('combined'));
app.use(cookieParser());
app.use(
  express.json({
    limit: '2mb',
  }),
);
app.use(setCorsHeaders);

// * Routers
app.use('/', router.rootRouter);
app.use('/user', router.userRouter);

app.use(fourOFourHandler);

io.use(socketIoCookieParser);

io.on('connection', (socket) => {
  logger.logInfo('Incoming connection', { address: socket.handshake.address });
  registerEventListeners(socket);
});

server.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
