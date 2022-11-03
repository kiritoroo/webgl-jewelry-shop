import * as THREE from 'three'
import React, { useRef } from 'react'
import {  useThree, useFrame } from '@react-three/fiber'

const useLerpMouse = () => {
  const mouse = useThree((state) => state.mouse)
  const lerped = useRef(mouse.clone())
  const previous = new THREE.Vector2()
  useFrame((state) => {
    previous.copy(lerped.current)
    lerped.current.lerp(mouse, 0.1)
    if (!previous.equals(lerped.current)) state.performance.regress()
  })
  return lerped
}

export { useLerpMouse }