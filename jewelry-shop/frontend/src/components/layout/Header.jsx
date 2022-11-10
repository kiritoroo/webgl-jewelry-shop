import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { IconContext } from 'react-icons/lib'

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
      <div className="Header-logo fx-wave">YUIKO JEWERLY & CO.</div>
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
      <NavLink className='Header-link fx-underline' to="/products">Product</NavLink>
      <a className='Header-link fx-underline'  href="#">Contact</a>

      <IconContext.Provider value={{ color: "rgb(59, 59, 59)" }}>
        <div className="Header-icon--wrapper">
          <a className="Header-icon fx-underline" href="#">
            <AiOutlineUser 
              textDecoration={'none'}
              size={'1.5em'}
            />
          </a>
          <a className="Header-icon fx-underline" href="#">
            <AiOutlineShoppingCart 
              textDecoration={'none'}
              size={'1.5em'}
            />
          </a>
        </div>
      </IconContext.Provider>
    </motion.div>
  )
}

export default Header
