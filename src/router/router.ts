import { Router } from 'express';
import { getMessages } from '~/controllers/messages';
import {
  createUserSession,
  deleteUserSession,
  getUserSession,
} from '~/controllers/users';
import { authChecker } from '~/middlewares/authChecker';

const rootRouter = Router();
const userRouter = Router();
const statusRouter = Router();
const messageRouter = Router();

rootRouter.get('/', (_, res) => {
  res.send({
    data: {
      message: 'Welcome to Chat app API',
    },
  });
});

userRouter.post('/session', createUserSession);
userRouter.get('/session', authChecker, getUserSession);
userRouter.delete('/session', authChecker, deleteUserSession);

statusRouter.get('/session', getUserSession);

messageRouter.get('/', getMessages);

export { rootRouter, userRouter, statusRouter, messageRouter };
