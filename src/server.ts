import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import * as router from './router/router';
import { fourOFourHandler } from './middlewares/errorHandlers';
import { socketIoCookieParser } from './socket/middleware/cookieParser';
import registerEventListener from './socket/eventListeners';
import logger from './services/logger';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// * Middlewares
app.use(morgan('combined'));
app.use(cookieParser());
app.use(
  express.json({
    limit: '2mb',
  }),
);

// * Routers
app.use('/', router.rootRouter);
app.use('/user', router.userRouter);

app.use(fourOFourHandler);

io.use(socketIoCookieParser);

io.on('connection', (socket) => {
  logger.logInfo('Incoming connection', { address: socket.handshake.address });
  registerEventListener(socket);
});

server.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
