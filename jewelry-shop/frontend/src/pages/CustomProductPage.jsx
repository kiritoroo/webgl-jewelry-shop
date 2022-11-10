import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'

import CircleButton from '../components/button/CircleButton'
import ProductScene from '../components/scene/ProductScene'
import Loading from '../components/layout/Loading'

import './CustomProductPage.scss'

const getProduct = async ({ queryKey }) => {
  const [_, prodId] = queryKey
  return await axios.get(`/api/product/${prodId}`)
    .then((res) => res.data )
    .catch((err) => { console.log(err) })
}


const CustomProductPage = () => {
  const { prodId } = useParams()
  const [product, setProduct] = useState()
  const [isLoading, setLoading] = useState(true)
  const [isRender, setRender] = useState(false)

  useQuery(['product', prodId], getProduct, {
    onSuccess: (data) => {
      setProduct(data.product)
    }
  })

  return (
    <React.Fragment>

      <AnimatePresence mode='wait' initial={false}>
        { isLoading ? <Loading /> : null }
      </AnimatePresence>
      
      { product ? (
        <div className='CustomePage'>
          <CircleButton to="/products"/>
          <ProductScene 
            product={product}
            setLoading={setLoading}
            isRender={isRender}
            setRender={setRender}
          />
        </div>
      ) : <Loading /> }
    </React.Fragment>
    )
}

export default CustomProductPage
