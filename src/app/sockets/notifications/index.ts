import { Server } from 'socket.io';
import { SocketWithUser } from '../../interfaces/socket.interface';

interface Message {
  sender: string;
  content: string;
}

const ioNotifications = (io: Server, socket: SocketWithUser) => {
  socket.on('notifications:login', (message: Message) => {
    io.emit('notifications:newMessage', message);
  });
};

export default ioNotifications;
