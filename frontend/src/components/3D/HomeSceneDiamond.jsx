import * as THREE from 'three'
import React, { Suspense, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import { 
  Canvas,
  useThree,
  useFrame, 
  useLoader,
  extend
} from '@react-three/fiber'

import { 
  Environment,
  useGLTF,
  MeshRefractionMaterial,
  Reflector,
  OrbitControls
} from '@react-three/drei'
import { EffectComposer,  SSAO, Bloom } from '@react-three/postprocessing'
import { Resizer, KernelSize } from 'postprocessing'
import { RGBELoader } from 'three-stdlib'

const DiamondRing = ({ map, ...props}) => {
  const { nodes, materials } = useGLTF("/model_diamond.glb");
  const ref = useRef()
  const { size, viewport } = useThree()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

  useFrame(({ mouse }) => {
    rEuler.set((mouse.y * viewport.height) / 80, (mouse.x * viewport.width) / 50, 0)
    ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
  });

  const configDiamond = ({
    bounces: 1,
    aberrationStrength: 0.10,
    ior: 5.0,
    fresnel: 0.5,
    color: 'white',
    fastChroma: false
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <Reflector
        resolution={2048}
        receiveShadow
        mirror={0}
        mixBlur={5}
        mixStrength={0.3}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1}
        position={[1, -4.5, 8]}
        scale={[2, 2, 1]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        args={[70, 70]}>
        {(Material, props) => <Material metalness={0.25} color="#eea6b1" roughness={1} {...props} />}
      </Reflector>

      {/* Diamond */}
      <group rotation={[-1.25, 0, 0]} scale={4}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Diamond_1_0.geometry}
          >
            <MeshRefractionMaterial envMap={map} {...configDiamond} toneMapped={false}/>
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/model_diamond.glb");

const Effect = () => {

  return (
    <EffectComposer>
      <Bloom
        kernelSize={KernelSize.LARGE}
        intensity={0.85}
        levels={9}
        mipmapBlur //gpu bug
        width={Resizer.AUTO_SIZE}
        height={Resizer.AUTO_SIZE}
        luminanceThreshold={1}
        luminanceSmoothing={0.025}
      />
    </EffectComposer>
  )
}

function Light() {
  const ref = useRef()
  useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime))
  return (
    <group ref={ref}>
      <rectAreaLight width={15} height={100} position={[30, 30, -10]} intensity={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </group>
  )
}

const HomeScene = () => {
  const texture = useLoader(RGBELoader, '/hdr_aerodynamic.hdr')

  return (
    <>
      <Canvas
        shadows 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], near: 0.1, far: 50, fov: 50 }}
        onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
      >
        <fog attach="fog" args={["#ffb3be", 5, 50]}/>
        <color attach="background" args={['#FFB4BF']}/>
        <ambientLight intensity={0.5}/>
          <group position={[0, -3, 0]}>
              <DiamondRing map={texture} position={[0, 4, 0]}/>
          </group>
          <spotLight position={[-10, 50,- 100]} castShadow />
          <pointLight position={[-10, -10, -10]} color="pink" intensity={0.2} />
          <pointLight position={[0, -5, 5]} intensity={0.5} />
          <directionalLight position={[0, -5, 0]} color="pink" intensity={2} />
          <Suspense fallback={null}>
          <Light />
          <Environment files='hdr_aerodynamic.hdr' />
        </Suspense>
        <Effect />
        {/* <OrbitControls makeDefault /> */}
      </Canvas> 
    </>
  )
}

export default HomeScene

