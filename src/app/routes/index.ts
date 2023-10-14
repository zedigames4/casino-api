import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import gameRouter from './games';
import authRouter from './auth';
import swaggerOptions from '../docs';
import userRouter from './users';
import playRouter from './play';
import walletRouter from './wallet';
import Keys from '../keys';
import subscriberRouter from './subscriber';
import paymentRouter from './pay';
import betRouter from './bets';
import { settingsMiddleware } from '../middlewares/query.middleware';
import uploadsRouter from './uploads';
import profileRouter from './profile';
import playNowRouter from './playNow';
import transactionRouter from './transaction';
import contactRouter from './contacts';
import settingRouter from './settings';
import { playGameMiddleware } from '../middlewares/playGame.middleware';
import statisticsRouter from './statistics';
import transferRouter from './transfer';
import withdrawrequestsRouter from './withdrawrequests';
import winnersRouter from './winners';

const url = `/api/${Keys.API_VERSION}`;

const routes = Router();
routes.use(settingsMiddleware);

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerOptions));

routes.use('/uploads', uploadsRouter);

routes.use('/play/:gameId', playGameMiddleware, playRouter);

routes.use(`${url}/auth`, authRouter);
routes.use(`${url}/users`, userRouter);
routes.use(`${url}/games`, gameRouter);
routes.use(`${url}/wallets`, walletRouter);
routes.use(`${url}/subscribers`, subscriberRouter);
routes.use(`${url}/pay`, paymentRouter);
routes.use(`${url}/bets`, betRouter);
routes.use(`${url}/profile`, profileRouter);
routes.use(`${url}/play-now`, playNowRouter);
routes.use(`${url}/transactions`, transactionRouter);
routes.use(`${url}/contacts`, contactRouter);
routes.use(`${url}/settings`, settingRouter);
routes.use(`${url}/statistics`, statisticsRouter);
routes.use(`${url}/transfers`, transferRouter);
routes.use(`${url}/withdrawrequests`, withdrawrequestsRouter);
routes.use(`${url}/winners`, winnersRouter);

export default routes;
