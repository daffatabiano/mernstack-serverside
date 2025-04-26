import Order from '../models/OrderModel.js';
import Customer from '../models/customerModel.js';
import midTransClient from 'midtrans-client';
import pusher from '../sockets/pusher.js';
const serverKey =
  process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xrqyBbFmyc1Oco4RkTstzmbj';

let snap = new midTransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
});

export const createOrder = async (req, res) => {
  try {
    // Check if order data is provided
    if (!req.body) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Order data is required',
      });
    }

    // Create a new order from the request body
    const newOrder = await Order.create(req.body);

    // Find and update the customer based on phone or email
    const customer = await Customer.findOneAndUpdate(
      {
        $or: [{ phone: req.body.phone }, { email: req.body.email }],
      },
      { $push: { order: newOrder._id } }, // Add order to the customer's order array
      { new: true }
    );

    // If no customer is found, return an error response
    if (!customer) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
      });
    }

    pusher.trigger('orders', 'newOrder', newOrder);

    // Save the order and customer
    await newOrder.save();
    await customer.save();

    // Respond with the created order
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    // Handle errors properly
    console.error('Error creating order:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'An error occurred while creating the order.',
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'createdAt',
      pending,
      collected,
      cancelled,
    } = req.query;

    let query = {};

    if (pending) query.status = 'pending';
    if (collected) query.status = 'collected';
    if (cancelled) query.status = 'cancelled';

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    let sortOption = {};
    if (sort === 'name_asc') sortOption = { name: 1 };
    if (sort === 'name_desc') sortOption = { name: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'createdAt') sortOption = { createdAt: -1 };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalOrders = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);

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
      pagination: {
        totalOrders: totalOrders,
        currentPage: page,
        totalPage: Math.ceil(totalOrders / limit),
      },
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

export const paymentOrder = async (req, res) => {
  let { id, amount, firstName, lastName, email, phone } = req.body;

  if (!id || !amount) {
    return res
      .status(400)
      .json({ message: 'All required fields must be provided' });
  }

  try {
    const token = await snap.createTransactionToken({
      transaction_details: {
        order_id: id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      },
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Order not found',
      });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order fetched successfully',
      data: order,
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
