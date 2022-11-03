import Header from './components/Header/Header1'
import HomeScene from './components/3D/HomeSceneDiamond'
import TextUnderlay from './components/Effect/TextUnderlay'
import CursorEffect from './components/Effect/CursorEffect'

function App() {

  return (
    <>
      <Header />
      <section style={{ height: '100vh', background: '#FFAAB5' }}>
        <TextUnderlay />
        <HomeScene />
      </section>
      <section style={{ height: '100vh', background: '#FFFFFF' }}/>
      <section style={{ height: '100vh', background: 'lightblue' }}/>
      <section style={{ height: '100vh', background: 'lightgreen' }}/>
      <CursorEffect />
    </>
  )
}

export default App
