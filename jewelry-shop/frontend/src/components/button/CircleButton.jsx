import React from "react";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import './CircleButton.scss'

const trans = { duration: 1, ease: "easeInOut" };
const variants = {
  hidden: { opacity: 0, x: "-50%" },
  enter: { opacity: 1, x: "50%", y: 0, transition: trans },
  exit: { opacity: 0, x: "-50%", transition: trans }
};

const CircleButton = ({ to }) => {
  const navigate = useNavigate()

  return (
      <motion.a 
        className="CircleButton" 
        onClick={() => navigate(to)}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"  
      >
        <div className="CircleButton-outer">
          <div className="CircleButton-icon">
            <div className="CircleButton-bar" />
            <div className="CircleButton-triangle"/>
          </div>
        </div>
      </motion.a>
  );
};

export default CircleButton;
