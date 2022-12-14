import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  productsReducer,
  productDetailsReducer,
  newProductReducer,
  productReducer
} from './redux/product/productReducers'

import {
  authReducer
} from './redux/user/userReducers'

const reducer = combineReducers({
  products: productsReducer,
  productDetals: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,

  auth: authReducer
})

const middlware = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store