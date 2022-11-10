import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Header.scss'

const trans = { duration: 1, ease: "easeInOut" };
const variants = {
  hidden: { opacity: 0, y: "-50%" },
  enter: { opacity: 1, x: 0, y: 0, transition: trans },
  exit: { opacity: 0, y: "-50%", transition: trans }
};

const Header = () => {
  return (
    <motion.div 
      className='Header'
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <a className='Header-link fx-underline' href="#about" 
        onClick={(e) => {
          e.preventDefault()
          window.location.replace('/#about')
        }}
      > About
      </a>
      <a className='Header-link fx-underline' href="#brand" 
        onClick={(e) => {
          e.preventDefault()
          window.location.replace('/#brand')
        }}
      >
        Brand
      </a>
      <div className="Header-logo fx-wave">YUIKO JEWERLY & CO.</div>
      <NavLink className='Header-link fx-underline' to="/products">Product</NavLink>
      <a className='Header-link fx-underline'  href="#">Contact</a>
    </motion.div>
  )
}

export default Header
