/* eslint-disable no-param-reassign */
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { SocketWithUser } from '../../interfaces/socket.interface';
import Keys from '../../keys';

const authSocketMiddleware = (io: Server) => {
  io.use((socket: SocketWithUser, next) => {
    const { token } = socket.handshake.query;
    if (!token) {
      return next(new Error('Unauthorized'));
    }
    return jwt.verify(
      token as string,
      Keys.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return next(new Error('Unauthorized'));
        }
        socket.user = decoded as any;
        return next();
      },
    );
  });
};

export default authSocketMiddleware;
