import Header from './components/Header/Header1'
import HomeScene from './components/3D/HomeSceneDiamond'
import TextUnderlay from './components/Effect/TextUnderlay'

function App() {

  return (
    <div>
      <Header />
      <section style={{ height: '100vh', background: '#FFAAB5' }}>
        <TextUnderlay />
        <HomeScene />
      </section>
      <section style={{ height: '100vh', background: '#FFFFFF' }}/>
      <section style={{ height: '100vh', background: 'lightblue' }}/>
      <section style={{ height: '100vh', background: 'lightgreen' }}/>
    </div>
  )
}

export default App
