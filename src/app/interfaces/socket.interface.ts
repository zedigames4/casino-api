import { Server, Socket } from 'socket.io';

export interface SocketWithUser extends Socket {
  user: {
    _id: string;
    role: string;
    email: string;
  };
}
