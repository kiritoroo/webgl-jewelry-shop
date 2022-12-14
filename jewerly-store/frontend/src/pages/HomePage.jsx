import React, { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

import Header from '../components/layout/Header'
import Loading from '../components/layout/Loading'
import HomeTypo from '../components/text/HomeTypo'
const DiamondScene = lazy(() => import("../components/scene/DiamondScene"))
import './HomePage.scss'

const trans = { duration: 1, ease: "easeInOut" };
const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: trans },
  exit: { opacity: 0, transition: trans }
};

const HomePage = () => {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)
  const [isRender, setRender] = useState(false)

  useEffect(() => {
    navigate()
  }, [])

  return (
    <React.Fragment>
      
      <AnimatePresence mode='wait' initial={false}>
        { isLoading ? <Loading /> : null }
      </AnimatePresence>

      <Header />
      <HomeTypo />
      <motion.div 
        className='Home'
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        <Suspense fallback={<Loading />}>
          <DiamondScene 
            setLoading={setLoading} 
            isRender={isRender} 
            setRender={setRender}
          />
        </Suspense>
      </motion.div>
    </React.Fragment>
  )
}

export default HomePage
