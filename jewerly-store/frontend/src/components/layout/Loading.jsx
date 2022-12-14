import React from 'react'
import { motion } from 'framer-motion'

import './Loading.scss'

const trans = { duration: 1, ease: "easeInOut" };
const variants = {
  hidden: { opacity: 0},
  enter: { opacity: 1, transition: trans },
  exit: { opacity: 0, transition: trans }
};

const Loading = () => {
  return (
    <motion.div 
      className='Loading'
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <div className='Loading-cube'>
        <div className='Loading-cube__front'/>
        <div className='Loading-cube__back'/>
        <div className='Loading-cube__right'/>
        <div className='Loading-cube__left'/>
        <div className='Loading-cube__top'/>
        <div className='Loading-cube__bottom'/>
      </div>
      <div className='Loading-title'>
        Yuiko Jewerly & CO.
      </div>
    </motion.div>
  )
}

export default Loading
