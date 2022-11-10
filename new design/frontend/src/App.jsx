import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { 
  Canvas,
  useFrame,
  useThree
} from '@react-three/fiber'

import { 
  ScrollControls, 
  Scroll, 
  useScroll,
  Preload,
  Image as R3fImage,
} 
from '@react-three/drei'

function Image(props) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  const [hovered, hover] = useState(false)

  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? -1.5 : 0, 2, delta)
  })

  return (
    <group ref={group}>
      <R3fImage
        ref={ref} {...props}
        onPointerOver={() => hover(true)} 
        onPointerOut={() => hover(false)}
      />
    </group>
  )
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 3 : 0.8 / 3

  return (
    <group {...props}>
      <Image position={[-width * w, 0, -0.5]} scale={[width * w - m * 2, 3, 1]} url={urls[0]} />
      <Image className="select" position={[0, 0, 0]} scale={[width * w - m * 0, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 3, 1]} url={urls[2]} />
    </group>
  )
}

function Pages() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={['/img_ring1.webp', '/img_ring2.webp', '/img_ring3.webp']} />
      <Page position={[width * 0, 0, 0]} urls={['/product/img_jewerly_engagement_1.webp', '/product/img_jewerly_engagement_2.webp', '/product/img_jewerly_engagement_3.webp']} />
      <Page position={[width * 1, 0, 0]} urls={['/product/img_jewerly_eternity_1.webp', '/product/img_jewerly_eternity_2.webp', '/product/img_jewerly_eternity_3.webp']} />
      <Page position={[width * 2, 0, 0]} urls={['/product/img_jewerly_earring_1.webp', '/product/img_jewerly_earring_2.webp', '/product/img_jewerly_earring_3.webp']} />
      <Page position={[width * 3, 0, 0]} urls={['/product/img_jewerly_engagement_1.webp', '/product/img_jewerly_engagement_2.webp', '/product/img_jewerly_engagement_3.webp']} />
      <Page position={[-width * 4, 0, 0]} urls={['/img_ring1.webp', '/img_ring2.webp', '/img_ring3.webp']} />
    </>
  )
}

export default function App() {
  return (
    <>
    <div className="background">
      <div className="background-border-horizontal"></div>
      <div className="background-border-vertical"></div>
    </div>
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1 style={{ position: 'absolute', top: '20vh', left: '-75vw' }}> </h1>
            <h1 className='fx-underline' style={{ position: 'absolute', top: '20vh', left: '25vw' }}>Wedding</h1>
            <h1 className='fx-underline' style={{ position: 'absolute', top: '20vh', left: '125vw' }}>Engagement</h1>
            <h1 className='fx-underline' style={{ position: 'absolute', top: '20vh', left: '225vw' }}>Earring</h1>
            <h1 className='fx-underline' style={{ position: 'absolute', top: '20vh', left: '325vw' }}>Wedding</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '425vw' }}> </h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
    </>
  )
}