import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {
  productsReducer,
  productDetailsReducer,
  newProductReducer
} from './redux/product/productReducers'

const reducer = combineReducers({
  products: productsReducer,
  productDetals: productDetailsReducer,
  newProduct: newProductReducer
})

const middlware = [thunk]
const store = createStore(reducer, applyMiddleware(...middlware))

export default store