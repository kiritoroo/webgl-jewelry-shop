import Header from './components/Header/Header1'
import HomeScene from './components/3D/HomeScene'

function App() {

  return (
    <div>
      <Header />
      <section style={{ height: '100vh', background: 'lightgreen' }}>
        <HomeScene/>
      </section>
      <section style={{ height: '100vh', background: 'lightpink' }}/>
      <section style={{ height: '100vh', background: 'lightblue' }}/>
      <section style={{ height: '100vh', background: 'lightgreen' }}/>
    </div>
  )
}

export default App
