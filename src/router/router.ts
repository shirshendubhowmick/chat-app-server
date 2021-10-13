import { Router } from 'express';
import { createUserSession } from '~/controllers/users';

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

export { rootRouter, userRouter };
