import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/', (_, res) => {
  res.send({
    data: {
      message: 'Welcome to Chat app API',
    },
  });
});

const userRouter = Router();

userRouter.get('/', (_, res) => {
  res.send({
    data: {
      message: 'Welcome to User API',
    },
  });
});

export { rootRouter, userRouter };
