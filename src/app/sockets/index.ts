import { Server } from 'socket.io';
import { SocketWithUser } from '../interfaces/socket.interface';
import authSocketMiddleware from './authSocketMiddleware';
import ioNotifications from './notifications';

const ioSockets = (io: Server) => {
  authSocketMiddleware(io);
  io.on('connection', (socket: SocketWithUser) => {
    ioNotifications(io, socket);
  });
};

export default ioSockets;
