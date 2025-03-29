import Order from '../models/OrderModel.js';

const orderSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Order socket connected');

    socket.on('newOrder', (data) => {
      try {
        const newOrder = new Order(data);
        newOrder.save();

        io.emit('newOrder', newOrder);
      } catch (err) {
        console.error('ERROR New Order : ', err);
      }
    });

    socket.on('statusOrder', (orderId, status) => {
      try {
        const order = Order.findById(orderId);
        if (order) {
          order.status = status;
          order.save();

          io.emit('statusOrder', { orderId, status });
        }
      } catch (err) {
        console.error('ERROR Status Order : ', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Order socket disconnected');
    });
  });
};

export default orderSocket;
