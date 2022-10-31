import React, { useEffect, useState, useRef } from 'react'
import { StyledHeader } from './Header1.style.'

const Header1 = () => {
  const navbarRef = useRef()
  let sticky = 0;
  const [headerType, setheaderType] = useState("bottom")
  
  useEffect(() => {
    if (navbarRef && navbarRef.current) {
      sticky = navbarRef.current.offsetTop
      const onScroll = () => {
        if (window.pageYOffset >= sticky) {
          setheaderType("sticky")
        } else {
          setheaderType("bottom")
        }
      }
      const onResize = () => {
        sticky = navbarRef.current.offsetTop
      }
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.addEventListener('resize', onResize, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      }
    }
  }, [navbarRef, sticky])

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
