const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    trim: true,
    maxlength: [5, 'Product price cannot exceed 5 characters'],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Engagement',
        'Wedding',
        'Earring'
      ],
      message: 'Please select correct category for product'
    }
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  model_3d: {
      url: {
        type: String,
        required: true
      }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Product', productSchema)