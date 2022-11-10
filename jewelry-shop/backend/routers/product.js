const express       = require('express')
const router = express.Router()

const {
  getProducts,
  getProduct,
  newProduct
} = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/product/:id').get(getProduct)
router.route('/admin/product/new').post(newProduct)

module.exports = router