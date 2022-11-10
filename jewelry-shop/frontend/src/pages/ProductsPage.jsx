import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll,Preload, Image as R3fImage } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import CircleButton from '../components/button/CircleButton'
import Loading from '../components/layout/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/product/productActions'

import './ProductsPage.scss'

const trans = { duration: 1, ease: "easeInOut" };
const variants = {
  hidden: { opacity: 0, x: "100%" },
  enter: { opacity: 1, x: 0, y: 0, transition: trans },
  exit: { opacity: 0, x: "100%", transition: trans }
};

function Image(props) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  const [hovered, hover] = useState(false)

  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z, 
      Math.max(0, data.delta * 50), 
      4, 
      delta
    )
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    )
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? -1.5 : 0,
      2,
      delta
    )
  })

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      <R3fImage
        ref={ref} {...props}
        onPointerOver={() => hover(true)} 
        onPointerOut={() => hover(false)}
      />
    </group>
  )
}

function Product({ m = 0.4, imgs, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 3 : 0.8 / 3

  return (
    <group {...props}>
      <Image 
        position={[-width * w, 0, -0.5]} 
        scale={[width * w - m * 2, 3, 1]} 
        url={imgs[0].url} 
      />
      <Image 
        className="select" 
        position={[0, 0, 0]} 
        scale={[width * w - m * 0, 4, 1]} 
        url={imgs[1].url}
      />
      <Image 
        position={[width * w, 0, -0.2]} 
        scale={[width * w - m * 2, 2]} 
        url={imgs[2].url} 
      />
    </group>
  )
}

function Products({ products }) {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Product position={[-width*1, 0, 0]} imgs={products[0].images}/>
      { products?.map((product, index) => 
        <Product 
          position={[width * index, 0, 0]} 
          imgs={product.images} 
          key={[product._id]}
        />
      )}
      <Product position={[width*products.length, 0, 0]} imgs={products[0]?.images}/>
      <Product position={[width*(products.length+1), 0, 0]} imgs={products[products.length-1]?.images}/>
    </>
  )
}

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state => state.products)

  // const notify_success = () => toast.success('Loading products success !');
  // const notify_error = () => toast.error('Loading products failed !');

  useEffect(() => {

    dispatch(getProducts())

    // if (error) { notify_error() }
    // if (!loading) { notify_success() }

  }, [dispatch])

  const offsetWidth = 100;

  return (
    <React.Fragment>

      <AnimatePresence mode='wait' initial={false}>
        { loading ? <Loading /> : null }
      </AnimatePresence>

      <CircleButton to="/" />
      <motion.div
        className="ProductPage"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        { !loading &&
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ScrollControls 
              infinite 
              horizontal 
              damping={4} 
              pages={products?.length + 1} 
              distance={0.8}
            >
              <Scroll>
                <Products products={ products } />
              </Scroll>
              <Scroll html>
                <h1 style={{ left: '-75vw' }} />
                { products?.map((product, index) => {
                  return (
                    <div key={ product._id }>
                      <h1 className='ProductPage-title fx-underline-big' style={{ left: offsetWidth*index+25+'vw' }}>
                        { product.category }
                      </h1> 
                      <a className="ProductPage-btn ProductPage-btn--effect" href={`/product/${product._id}`} style={{ left: offsetWidth*index+50+'vw' }}>
                        Custom now <span></span>
                      </a>
                    </div>
                  )
                })}
                <>
                  <h1 className='fx-underline-big' style={{ left: offsetWidth*(products.length)+25+'vw' }}>
                    { products[0].category }
                  </h1>
                  <a className="ProductPage-btn" href={`/product/${products[0]._id}`} style={{ left: offsetWidth*products.length+50+'vw' }}>
                    Custom now <span></span>
                  </a>
                </>
                <h1 style={{ left: offsetWidth*(products?.length+1)+25+'vw' }}></h1>
              </Scroll>
            </ScrollControls>
            <Preload />
          </Suspense>
        </Canvas> }
      </motion.div>

      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}

    </React.Fragment>
  )
}

export default ProductsPage
