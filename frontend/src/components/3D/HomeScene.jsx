import * as THREE from 'three'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
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
  Shadow,
  MeshRefractionMaterial,
  AccumulativeShadows,
  softShadows,
  RandomizedLight,
  Center,
  Effects,
  ContactShadows,
  Loader
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Resizer, KernelSize } from 'postprocessing'
import { RGBELoader } from 'three-stdlib'
import { useControls } from 'leva'

// extend({ EffectComposer, RenderPass, UnrealBloomPass })

const DiamondRing = ({ map, ...props}) => {
  const { nodes, materials } = useGLTF("/model_diamond-ring1.glb");
  const ref = useRef()
  const { size, viewport } = useThree()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

  useFrame(({ mouse }) => {
    rEuler.set((mouse.y * viewport.height) / 80, (mouse.x * viewport.width) / 50, 0)
    ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
  });

  // const configDebug = useControls({
  //   bounces: { value: 4, min: 0, max: 8, step: 1 },
  //   aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
  //   ior: { value: 2.4, min: 0, max: 10 },
  //   fresnel: { value: 1, min: 0, max: 1 },
  //   color: 'white',
  //   fastChroma: false
  // })

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
      <group position={[0.5, -0.04, -0.09]}>
        <group rotation={[-0.15, 0.3, 1.0]} scale={3}>
          <mesh geometry={nodes.diamonds.geometry}>
            <MeshRefractionMaterial envMap={map} {...configDiamond} toneMapped={false}/>
          </mesh>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.gold.geometry}
            material={materials.gold}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.silver.geometry}
            material={materials.silver}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/model_diamond-ring1.glb");

// softShadows()

const Effect = () => {
  // const { size } = useThree();

  return (
    <EffectComposer>
      <Bloom
        kernelSize={KernelSize.LARGE}
        intensity={0.85}
        levels={9}
        mipmapBlur
        width={Resizer.AUTO_SIZE}
        height={Resizer.AUTO_SIZE}
        luminanceThreshold={1}
        luminanceSmoothing={0.025}
      />
    </EffectComposer>
  )

  // const configDebug = useControls({
  //   threshold: { value: 1, min: 0, max: 5, step: 0.1 },
  //   strength: { value: 1, min: 0, max: 5, step: 0.1 },
  //   radius: { value: 0.5, min: 0, max: 5, step: 0.1 }
  // })

  const configBloom = useControls({
    threshold: 1,
    strength: 1,
    radius: 0.5
  })

  // return (
  //   <Effects>
  //     <unrealBloomPass {...configBloom} />
  //   </Effects>
  // )
}

const HomeScene = () => {
  const texture = useLoader(RGBELoader, '/hdr_aerodynamic.hdr')

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], near: 0.1, far: 50, fov: 50 }}
        onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
      >
        <fog attach="fog" args={["white", 0, 50]}/>
        {/* <color attach="background" args={['#F7F7F7']}/> */}
        <ambientLight intensity={0.5}/>
        {/* <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          shadowCameraFar={50}
          shadowCameraLeft={-10}
          shadowCameraRight={-10}
          shadowCameraTop={10}
          shadowCameraBottom={-10}
        /> */}
        <pointLight position={[-10, 0, -20]} color="red" intensity={2.5}/>
        <pointLight position={[0, -10, 0]} intensity={1.5}/>
        <Suspense fallback={null}>
          <group position={[0, -3, 0]}>
            {/* <Center top> */}
              <DiamondRing map={texture} position={[0, 4, 0]}/>
            {/* </Center> */}
            {/* <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={20}>
              <RandomizedLight amount={8} radius={10} ambient={0.5} position={[0, 10, -2.5]} bias={0.001} size={3} />
            </AccumulativeShadows> */}
          </group>
          <Environment files='hdr_aerodynamic.hdr' />
          {/* <Shadow opacity={0.2} scale={[9, 1.5, 1]} position={[0, -8, 0]}/> */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -4.5, 0]}
            opacity={1}
            width={20}
            height={20}
            blur={2}
            far={4.5}
          />
        </Suspense>
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" transparent opacity={0.4} />
        </mesh> */}
        {/* <Effect /> */}
      </Canvas> 
      {/* <Loader /> */}
    </>
  )
}

export default HomeScene

