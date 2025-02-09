import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  const productExist = await Product.findOne({
    name: req?.body?.name?.toLowerCase(),
  });

  if (!req.body) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'No data provided',
    });
  }

  if (req.body.discount > 100) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Discount cannot be more than 100%',
    });
  }

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
    const {
      category,
      page = 1,
      limit = 10,
      search,
      sort = 'createdAt',
    } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    let sortOption = {};
    if (sort === 'name_asc') sortOption = { name: 1 };
    if (sort === 'name_desc') sortOption = { name: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'createdAt') sortOption = { createdAt: -1 };

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
      },
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
