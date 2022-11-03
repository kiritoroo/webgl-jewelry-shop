import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'
import { StyledContent } from './ScrollSection.styled'

const Item = ({ url, scale, ...props }) => {
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 4, delta)
  })
  
  return (
    <group {...props}>
      <Image 
        ref={ref}
        onPointerOver={() => hover(true)} 
        onPointerOut={() => hover(false)} 
        scale={scale} 
        url={url}
      />
    </group>
  )
}

const Items = () => {
  const { width: w, height: h } = useThree((state) => state.viewport)
  
  return (
    <Scroll>
      <Item 
        url="/img_ring1.webp"
        scale={[w / 2.5, w / 2.5, 1]}
        position={[-w / 6, 0, 0]} 
      />
      <Item 
        url="/img_ring2.webp"
        scale={[2, w / 3, 1]}
        position={[w / 30, -h, 0]} />
      <Item 
        url="/img_ring3.webp"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]} 
      />
      <Item 
        url="/img_ring4.webp" 
        scale={[w / 5, w / 5, 1]} 
        position={[w / 4, -h * 1.2, 0]} 
      />
      <Item 
        url="/img_ring5.webp" 
        scale={[w / 5, w / 5, 1]} 
        position={[w / 10, -h * 1.75, 0]} 
      />
      <Item 
        url="/img_ring6.webp" 
        scale={[w / 3, w / 3, 1]} 
        position={[-w / 4, -h * 2, 0]} 
      />
    </Scroll>
  )
}

const ScrollSection = () => {
  return (
    <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
      <color attach="background" args={['#f0f0f0']} />
      <ScrollControls damping={6} pages={3}>
        <Items />
        <Scroll html style={{ width: '100%' }}>
          <StyledContent style={{ top: `50vh`, right: '10vw' }}>eternity</StyledContent>
          <StyledContent style={{ top: '180vh', left: '10vw' }}>wedding</StyledContent>
          <StyledContent style={{ top: '260vh', right: '10vw' }}>earring</StyledContent>
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}

export default ScrollSection
