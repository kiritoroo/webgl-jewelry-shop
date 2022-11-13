import React, { Suspense, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import CircleButton from '../components/button/CircleButton'
import ProductScene from '../components/scene/ProductScene'
import Loading from '../components/layout/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../redux/product/productActions'

import './CustomProductPage.scss'

const CustomProductPage = () => {
  const { prodId } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [isRender, setRender] = useState(true)

  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(state => state.productDetals)
  
  useEffect(() => {
    dispatch(getProductDetails(prodId))
  }, [dispatch])

  return (
    <React.Fragment>

      <AnimatePresence mode='wait' initial={false}>
        { isLoading ? <Loading /> : null }
      </AnimatePresence>
      
      { !loading && (
        <div className='CustomePage'>
          <CircleButton to="/products"/>
          <Suspense fallback={null}>
            <ProductScene 
              product={product}
              setLoading={setLoading}
              isRender={isRender}
              setRender={setRender}
            />
          </Suspense>
        </div>
      ) }
    </React.Fragment>
    )
}

export default CustomProductPage
