import * as THREE from 'three'
import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Environment, useGLTF, MeshRefractionMaterial, Reflector } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize, Resizer } from 'postprocessing'
import { RGBELoader } from 'three-stdlib'
import { useLerpMouse } from '../../hooks/useLerpMouse'
import Loading from '../layout/Loading'

const DiamondRing = ({ map, ...props}) => {
  const { nodes, materials } = useGLTF("/models/model_diamond.glb");
  const ref = useRef()
  const { size, viewport } = useThree()
  const [rEuler, rQuaternion] = useMemo(() =>
    [new THREE.Euler(), new THREE.Quaternion()], []
  )

  useFrame(({ mouse }) => {
    rEuler.set((mouse.y * viewport.height) / 80, (mouse.x * viewport.width) / 50, 0)
    ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
  });

  const configDiamond = ({
    bounces: 1,
    aberrationStrength: 0.10,
    ior: 5.0,
    fresnel: 0.5,
    color: 'pink',
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
        {(Material, props) => <Material metalness={0.25} color="#ffffff" roughness={1} {...props} />}
      </Reflector>

      <group rotation={[-1.3, 0, 0]} scale={4}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Diamond_1_0.geometry}
          >
            {/* <MeshRefractionMaterial envMap={map} {...configDiamond} toneMapped={false}/> */}
          </mesh>
        </group>
      </group>
    </group>
  )
}
useGLTF.preload("/models/model_diamond.glb");

const Effect = () => {
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
}

const Lights = () => {
  const lights = useRef()
  const mouse = useLerpMouse()
  useFrame((state) => {
    lights.current.rotation.x = (mouse.current.x * Math.PI) / 2
    lights.current.rotation.y = Math.PI * 0.25 - (mouse.current.y * Math.PI) / 2
  })
  return (
    <>
      <directionalLight 
        intensity={1}
        position={[2, 20, 0]}
        color="pink"
        distance={5}
      />
      <spotLight 
        intensity={2}
        position={[-5, 10, 2]}
        angle={0.2}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <group ref={lights}>
        <rectAreaLight 
          intensity={2}
          position={[4.5, 20, -3]} 
          width={40} 
          height={4} 
          onUpdate={(self) => self.lookAt(0, 0, 0)} 
        />
        <rectAreaLight 
          intensity={2}
          position={[-10, 20, -10]}
          width={40}
          height={4}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </group>
    </>
  )
}

const DiamondScene = ({ setLoading, isRender, setRender }) => {
  const texture = useLoader(RGBELoader, '/textures/hdr_aerodynamic.hdr')

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Canvas
          shadows 
          dpr={[1, 2]}
          camera={{ position: [0, 0, 15], near: 0.1, far: 50, fov: 50 }}
          frameloop= { isRender ? "always" : "never" }
          onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
          gl={{ antialias: true }}
        >
          <fog attach="fog" args={["rgb(255, 225, 227)", 5, 50]}/>
          <color attach="background" args={['#fde2e2']}/>
          <ambientLight intensity={0.5}/>
            <group position={[0, -3, 0]}>
              <DiamondRing 
                map={texture} 
                position={[0, 2.5, 0]}
                onLoad={setTimeout(() => {
                  setRender(true)
                  setLoading(false)
                }, 2000)}
              />
            </group>
            <spotLight position={[-10, 50,- 100]} castShadow />
            <pointLight position={[-10, -10, -10]} color="pink" intensity={0.2} />
            <pointLight position={[0, -5, 5]} intensity={0.5} />
            <directionalLight position={[0, -5, 0]} color="pink" intensity={2} />
            <Lights />
            <Environment files='/textures/hdr_aerodynamic.hdr' />
          {/* <Effect /> */}
        </Canvas> 
      </Suspense>
    </>
  )
}

export default DiamondScene

