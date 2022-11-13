const mongoose = require('mongoose')
const fs = require('fs')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ObjectId = mongoose.Types.ObjectId

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })

const BASE_URI = process.env.BASE_URI

// @desc: Get all products
// @route: GET /api/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    products
  })

})

// @desc: Get single product
// @route: GET /api/product/:id
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  res.status(200).json({
    sucess: true,
    product
  })

})

// @desc: New product
// @route: POST /admin/product/new
const newProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, price, description, category, images, model_3d } = req.body
  const prodId = ObjectId()

  if (!images || !model_3d) {
    return next(new ErrorHandler('No images & model data', 404));
  }

  // save image
  const images_data = []
  for (let i = 0; i < images.length; i++) {
    const base64Image = images[i].data.split(';base64,').pop()
    const image_link = "/static/images/prd_" + category.substring(0, 2).toLowerCase() + '_' + prodId + '_' + i + '.' + images[i].name.split('.').pop()
    const image_url = "backend" + image_link
    
    images_data.push({ url: image_link })

    console.log(image_url)

    fs.writeFile( image_url, base64Image,
      {encoding: 'base64'},
      (err) => { 
        if (err) {}        
        else {  }
      }
    )
  }

  // save model 3d
  const model_data = { url: undefined }

  const base64Model = model_3d.data.split(';base64,').pop()
  model_data.url = "/static/models/prd_" + category.substring(0, 2).toLowerCase() + '_' + prodId + '.'  + model_3d.name.split('.').pop()
  const model_url = "backend" + model_data.url

  console.log(model_url)

  fs.writeFile( model_url, base64Model,
    {encoding: 'base64'},
    (err) => { 
      if (err) {}        
      else { }
    }
  )

  // save product
  const newProduct = await Product.create({
    _id: prodId,
    name: name,
    price: price,
    description: description,
    category: category,
    images: images_data,
    model_3d: model_data
  })

  res.status(201).json({
    sucess: true,
    product: newProduct
  })

})

// @desc: Update product
// @route: PUT /admin/product/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, price, description, category, images, model_3d } = req.body
  
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const images_data = product.images
  if (images !== undefined) {
    // TODO: Deleting images & save new iamges
  }

  const model_data = product.model_3d
  if (model_3d !== undefined) {
    // TODO: Deleting model & save new model
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      price: price,
      description: description,
      category: category,
      images: images_data,
      model_3d: model_data
    },
    {
      new: true,
      runValidators: true
    }
  )

  res.status(200).json({
    success: true,
    product: updateProduct
  })
  
})

// @desc: Delete product
// @route: DELETE /admin/product/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Delete images
  for (let i = 0; i < product.images.length; i++) {
    const image_link = 'backend' + product.images[i].url
    if (image_link != "backend") {
      fs.unlink(image_link, (err) => {
        if (err) throw err
      })
    }
  }

  // Delete model
  model_link = 'backend' + product.model_3d.url
  if (model_link != "backend") {
    fs.unlink(model_link, (err) => {
      if (err) throw err
    })
  }

  await product.remove();
  
  res.status(200).json({
    success: true,
    message: 'Product is deleted.'
  })

})

module.exports = {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct
}