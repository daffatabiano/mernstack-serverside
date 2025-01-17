import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  const productExist = await Product.findOne({
    name: req.body.name.toLowerCase(),
  });

  if (productExist) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Product already exists',
    });
  }

  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `${newProduct.name} created successfully`,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `${product.name} has been deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};
