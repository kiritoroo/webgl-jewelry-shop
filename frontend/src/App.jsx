import React, { useState } from 'react'
import Header from './components/Header/Header1'
import HomeScene from './components/3D/HomeSceneDiamond'
import TextUnderlay from './components/Effect/TextUnderlay'
import CursorEffect from './components/Effect/CursorEffect'
import LoadingCube from './components/Loading/LoadingCube'
import ScrollSection from './components/Effect/ScrollSection'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRender, setIsRender] = useState(false);

  return (
    <>
      <Header setIsRender={setIsRender} />

      <section style={{ height: '100vh', background: '#DEDEDE' }}>
        { isLoading ? <LoadingCube /> : null }
        
        <TextUnderlay />
        <HomeScene setIsLoading={setIsLoading} isRender={isRender} setIsRender={setIsRender}/>
      </section>
      
      <section id='about' style={{ height: '100vh', background: '#FFFFFF' }}>
        <ScrollSection />
      </section>
      <CursorEffect />
    </>
  )
}

export default App