const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  shippingInfo: {
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
  },
  paymentInfo: {
    id: {
        type: String
    },
    status: {
        type: String
    }
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  totalPrice: {
      type: Number,
      required: true,
      default: 0.0
  },
  orderStatus: {
      type: String,
      required: true,
      default: 'Processing'
  },
  deliveredAt: {
      type: Date
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)