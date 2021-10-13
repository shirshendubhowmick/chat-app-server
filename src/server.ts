import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';

import messageEventHandler from './socket/messageHandler';
import { validateIncomingEvents } from './socket/middleware/validation';
import * as router from './router/router';
import { fourOFourHandler } from './middlewares/errorHandlers';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// * Middlewares
app.use(morgan('combined'));
app.use(
  express.json({
    limit: '2mb',
  }),
);

// * Routers
app.use('/', router.rootRouter);
app.use('/user', router.userRouter);

app.use(fourOFourHandler);

io.on('connection', (socket) => {
  console.log('Incoming connection');
  socket.use(validateIncomingEvents);
  socket.on('message', messageEventHandler);
});

server.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
