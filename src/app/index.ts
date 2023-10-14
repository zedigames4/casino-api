import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import routes from './routes';
import Keys from './keys';
import ioSockets from './sockets';

express.static('public');

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.json());
server.use(cors());
server.use(routes);

const initializeApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(Keys.MONGO_DB_URL);
  } catch (error) {
    console.error(error);
  }
};

const httpServer = http.createServer(server);

export const io = new Server(httpServer, {
  cors: { origin: Keys.FRONT_END_URL },
});

ioSockets(io);

const startApp = () => {
  initializeApp();
  return httpServer;
};

const app = {
  server: startApp(),
  express: server,
};

export default app;
