import { Router } from 'express';
import { createUserSession, getUserSession } from '~/controllers/users';
import { authChecker } from '~/middlewares/authChecker';

const rootRouter = Router();

rootRouter.get('/', (_, res) => {
  res.send({
    data: {
      message: 'Welcome to Chat app API',
    },
  });
});

const userRouter = Router();

userRouter.post('/session', createUserSession);
userRouter.get('/session', authChecker, getUserSession);

export { rootRouter, userRouter };
