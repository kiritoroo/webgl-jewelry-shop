import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL
} from './productConstants'

import axios from 'axios'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ 
      type: ALL_PRODUCTS_REQUEST 
    })

    const { data } = await axios.get(`/api/products`)

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch(error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.messasge
    })
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    })

    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.messasge
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: CLEAR_ERRORS
  })
}

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST
    })

    const { data } = await axios({
      url: '/api/admin/product/new',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        ...productData
      }
    })

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data
    })
  } catch(error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}