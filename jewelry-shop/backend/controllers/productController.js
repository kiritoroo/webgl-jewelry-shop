const mongoose = require('mongoose')
const fs = require('fs')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

const BASE_URI = process.env.BASE_URI

// @desc: Get all products
// @route: GET /api/v1/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()

  res
    .status(200)
    .json({
      success: true,
      products
    });
})

// @desc: Get single product
// @route: GET /api/v1/product/:id
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  res
    .status(200)
    .json({
      sucess: true,
      product
    })
})

module.exports = {
  getProducts,
  getProduct
}