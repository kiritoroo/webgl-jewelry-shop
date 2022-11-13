const express = require('express')
const router = express.Router()

const {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles  } = require('../middlewares/auth')

router.route('/products').get(
  (req, res, next) => {
    // #swagger.tags = ['Product']
    return getProducts(req, res, next)
  }
)

router.route('/product/:id').get(
  (req, res, next) => {
    // #swagger.tags = ['Product']
    return getProduct(req, res, next)
  }
)

router.route('/admin/product/new').post(
  isAuthenticatedUser,
  authorizeRoles('admin'),
  (req, res, next) => {
    // #swagger.tags = ['Product']
    /* #swagger.parameters['obj'] = {
        in: 'body',
        required: 'true',
        schema: {
          $name: 'Diamond Ring',
          $price: '999.00',
          description: '',
          $category: 'Wedding',
          $images: [
            {$url: '/static/images/prd_default_1.webp'}
          ],
          $model_3d: {$url: '/static/models/prd_default.glb'} 
      }
    } */
    return newProduct(req, res, next)
  }
)

router.route('/admin/product/:id')
  .put(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    (req, res, next) => {
      // #swagger.tags = ['Product']
      /* #swagger.parameters['obj'] = {
          in: 'body',
          required: 'true',
          schema: {
            $name: 'Diamond Ring',
            $price: '999.00',
            description: 'Diamond',
            $category: 'Wedding',
        }
      } */
      return updateProduct(req, res, next)
    }
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    (req, res, next) => {
      // #swagger.tags = ['Product']
      return deleteProduct(req, res, next)
    }
  )

module.exports = router