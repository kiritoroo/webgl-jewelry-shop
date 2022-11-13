const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
} = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles  } = require('../middlewares/auth')

router.route('/register').post(
  (req, res, next) => {
    // #swagger.tags = ['User']
    /* #swagger.parameters['obj'] = {
        in: 'body',
        required: 'true',
        schema: {
          $name: 'Totoro',
          $email: 'totoro@zing.vn',
          $password: "123456" 
      }
    } */
    return registerUser(req, res, next)
  }
)

router.route('/login').post(
  (req, res, next) => {
    // #swagger.tags = ['User']
    /* #swagger.parameters['obj'] = {
        in: 'body',
        required: 'true',
        schema: {
          $email: 'totoro@zing.vn',
          $password: "123456" 
      }
    } */
    return loginUser(req, res, next)
  }
)

router.route('/logout').get(
  (req, res, next) => {
    // #swagger.tags = ['User']
    return logout(req, res, next)
  }
)

router.route('/me').get(
  isAuthenticatedUser,
  (req, res, next) => {
    // #swagger.tags = ['User']
    return getUserProfile(req, res, next)
  }
)

router.route('/password/update').put(
  isAuthenticatedUser,
  (req, res, next) => {
    // #swagger.tags = ['User']
    /* #swagger.parameters['obj'] = {
        in: 'body',
        required: 'true',
        schema: {
          $oldPassword: '123456',
          $password: "654321" 
      }
    } */
    return updatePassword(req, res, next)
  }
)

router.route('/me/update').put(
  isAuthenticatedUser,
  (req, res, next) => {
    // #swagger.tags = ['User']
    /* #swagger.parameters['obj'] = {
        in: 'body',
        required: 'true',
        schema: {
          $name: 'Totoro',
          $email: "totoro@zing.vn" 
      }
    } */
    return updateProfile(req, res, next)
  }
)

router.route('/admin/users').get(
  isAuthenticatedUser,
  authorizeRoles('admin'),
  (req, res, next) => {
    // #swagger.tags = ['User']
    return allUsers(req, res, next)
  }
)

router.route('/admin/user/:id')
  .get(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    (req, res, next) => {
      // #swagger.tags = ['User']
      return getUserDetails(req, res, next)
    }
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    (req, res, next) => {
      // #swagger.tags = ['User']
      /* #swagger.parameters['obj'] = {
          in: 'body',
          required: 'true',
          schema: {
            $name: 'Admin',
            $email: "admin@zing.vn",
            $role: "admin"
        }
      } */
      return updateUser(req, res, next)
    }
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    (req, res, next) => {
      // #swagger.tags = ['User']
      return deleteUser(req, res, next)
    }
  )

module.exports = router;