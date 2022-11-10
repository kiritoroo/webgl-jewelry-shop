import React, { useState } from 'react'
import Header from './components/Header/Header1'
import HomeScene from './components/3D/Home/SceneDiamond'
import TextUnderlay from './components/2D/Home/TextUnderlay'
import CursorEffect from './components/Effect/CursorEffect'
import LoadingCube from './components/Loading/LoadingCube'
import ScrollSection from './components/2D/Home/ScrollSection'
import ProductSection from './components/2D/Home/ProductSection'
import TextMarquee from './components/Effect/TextMarquee'
import ImageSlide from './components/Effect/ImageSlide'
import Carousel from './components/2D/Product/Carousel'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRender, setIsRender] = useState(false);

  return (
    <>
      <Header setIsRender={setIsRender} />

      {/* <Carousel /> */}

      <section style={{ height: '100vh', background: '#DEDEDE' }}>
        { isLoading ? <LoadingCube /> : null }
        <TextUnderlay />
        {/* <HomeScene setIsLoading={setIsLoading} isRender={isRender} setIsRender={setIsRender}/> */}
      </section>


      <section id='about' style={{ height: '100vh', background: 'white', zIndex: -3 }}>
        <ProductSection />
        <ScrollSection />
      </section>
      
      <TextMarquee />

      <section id='product' style={{ height: '100vh', background: '#FFFFFF' }}>
        {/* <TextMarquee /> */}
        <ImageSlide />
      </section>
      {/* <CursorEffect /> */}
    </>
  )
}

export default App