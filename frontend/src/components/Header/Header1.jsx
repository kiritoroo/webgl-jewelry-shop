import React, { useEffect, useState, useRef } from 'react'
import { StyledHeader } from './Header1.styled'
import ScrollSection from '../Effect/ScrollSection'

const Header1 = ({ setIsRender }) => {
  const navbarRef = useRef()
  let sticky = 0;
  const [headerType, setheaderType] = useState("bottom")
  
  useEffect(() => {
    if (navbarRef && navbarRef.current) {
      sticky = navbarRef.current.offsetTop
      const onScroll = () => {
        if (window.pageYOffset >= sticky) {
          setheaderType("sticky")
          setIsRender(false)
        } else {
          setheaderType("bottom")
          setTimeout(() => {
            setIsRender(true)
          }, 2000)
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
        <a
          href="#about" 
          className='fx-underline'
          onClick={(e) => {
            e.preventDefault()
            window.location.replace('/#about')
          }}
        >
          About
        </a>
        <a href="#" className='fx-underline'>Menu</a>
        <div className="fx-wave">JOHNNY DẢRK & CO.</div>
        <a href="#" className='fx-underline'>Brand</a>
        <a href="#" className='fx-underline'>Contact</a>
      </StyledHeader>
    </>
  )
}

export default Header1
