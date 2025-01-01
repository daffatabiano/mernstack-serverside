import Order from '../models/OrderModel.js';
import Customer from '../models/customerModel.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    const customer = await Customer.findOneAndUpdate({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
      });
    }

    customer.order.push(newOrder);
    await customer.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders)
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Orders not found',
      });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

export const collectOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Order not found',
      });
    }

    order.status = 'collected';
    await order.save();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order collected successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

export const cancelledOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Order not found',
      });
    }

    order.status = 'cancelled';
    await order.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order cancelled successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const historyOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders)
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Orders not found',
      });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};

export const clearHistoryOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders cleared successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error,
    });
  }
};
