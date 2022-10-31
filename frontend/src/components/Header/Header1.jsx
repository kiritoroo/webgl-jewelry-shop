import React, { useEffect, useState, useRef } from 'react'
import { StyledHeader } from './Header1.style.'

const Header1 = () => {
  const navbarRef = useRef()
  const [headerType, setheaderType] = useState("bottom")
  
  useEffect(() => {
    if (navbarRef && navbarRef.current) {
      const sticky = navbarRef.current.offsetTop
      const onScroll = () => {
        if (window.pageYOffset >= sticky) {
          setheaderType("sticky")
        } else {
          setheaderType("bottom")
        }
      }
      window.removeEventListener('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [navbarRef])

  return (
    <>
      <StyledHeader ref={navbarRef} $type={headerType}>
        <a href="#">About</a>
        <a href="#">Menu</a>
        <a href="#">Locations</a>
        <a href="#">Contact</a>
      </StyledHeader>
    </>
  )
}

export default Header1
