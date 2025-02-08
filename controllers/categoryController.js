import categoryModel from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryExist = await categoryModel.findOne({
      name: req?.body?.name?.toLowerCase(),
    });

    if (categoryExist) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Category already exists',
      });
    }

    const newCategory = await categoryModel.create(req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `${newCategory.name} created successfully`,
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `${category.name} has been deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: err,
    });
  }
};
