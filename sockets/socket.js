import { Server } from 'socket.io';

let io;

const initSockets = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 New socket client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('❌ Socket client disconnected:', socket.id);
    });
  });

  return io;
};

export default initSockets;
