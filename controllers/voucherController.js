import Voucher from '../models/voucherModel.js';

export const createVoucher = async (req, res) => {
  try {
    const newVoucher = await Voucher.create(req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Voucher created successfully',
      data: newVoucher,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({});

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Vouchers Fetched Successfully',
      data: vouchers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Voucher Fetched Successfully',
      data: voucher,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Voucher Updated Successfully',
      data: voucher,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    await Voucher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Voucher Deleted Successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const deleteAllVouchers = async (req, res) => {
  try {
    await Voucher.deleteMany({});

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Vouchers Deleted Successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};
