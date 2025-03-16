import Customer from '../models/customerModel.js';

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customers not found',
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Customers fetched successfully',
      data: customers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $or: [{ phone: req.params.phone }, { email: req.params.email }],
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Customer fetched successfully',
      data: {
        email: customer.email, // Add email here explicitly
        ...customer.toObject(), // Spread the rest of the customer data
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const updateCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate({
      $or: [{ phone: req.params.phone }, { email: req.params.email }],
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Customer updated successfully',
      data: customer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};
