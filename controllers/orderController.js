import Order from '../models/OrderModel.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

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

    order.status = false;
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

export const historyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: false });

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
    await Order.deleteMany({ status: false });
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
