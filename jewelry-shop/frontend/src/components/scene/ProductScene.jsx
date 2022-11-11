import * as THREE from 'three'
import React, { useState} from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, MeshRefractionMaterial, Reflector } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize, Resizer } from 'postprocessing'
import { useControls } from 'leva'

const Model = ({ uri, map, ...props }) => {
  const { nodes, materials } = useGLTF(uri);
  const [ringColor, setRingColor] = useState("#ffaeae")
  const [diamondColor, setDiamondColor] = useState("#fff")

  const configDiamond = ({
    bounces: 1,
    aberrationStrength: 0.05,
    ior: 1.0,
    fresnel: 0.2,
    color: 'white',
    fastChroma: false
  })

  return (
    <group {...props} dispose={null}>
      <Reflector
        resolution={2048}
        receiveShadow
        mirror={0}
        mixBlur={5}
        mixStrength={0.3}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1}
        position={[1, -8, 8]}
        scale={[2, 2, 1]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        args={[70, 70]}>
        {(Material, props) => <Material metalness={0.25} color="#ff8989" roughness={1} {...props} />}
      </Reflector>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.diamonds.geometry}
        material={materials.diamonds}
        material-color={diamondColor}
      >
        {/* <MeshRefractionMaterial envMap={map} {...configDiamond} toneMapped={false}/> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.gold}
        material-color={ringColor}
        material-envMapIntensity={4}
      />
    </group>
  );
}

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
      <group>
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

const ProductScene = ({ product, setLoading, isRender, setRender }) => {

  useGLTF.preload(product.model_3d.url);
  const texture = useLoader(RGBELoader, '/textures/hdr_aerodynamic.hdr')

  return (
    <Canvas 
      shadows 
      camera={{ position: [-10, 10, 25], near: 0.1, far: 50, fov: 30 }}
      frameloop= { isRender ? "always" : "never" }
      onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
      gl={{ antialias: true }}
    >
      <fog attach="fog" args={["#FFF", 1, 80]}/>
      <color attach="background" args={['#FFFDFD']}/>
      <ambientLight intensity={0.5}/>
      <group>
        <Model 
          uri={product.model_3d.url}
          map={texture}
          scale={[0.8, 0.8, 0.8]}
          position={[0, -0.5, 0]}
          onLoad={setTimeout(() => {
            setRender(true)
            setLoading(false)
          }, 2000)}  
        />   
      </group>
      <spotLight position={[-10, 50,- 100]} castShadow />
      <pointLight position={[-10, -10, -10]} color="pink" intensity={0.2} />
      <pointLight position={[0, -5, 5]} intensity={0.5} />
      <directionalLight intensity={20} position={[5, 5, -7.5]} bias={0.01} />
      <Lights />
      <Environment files='/textures/hdr_aerodynamic.hdr' />
      <Effect />
      <OrbitControls 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.1} 
        autoRotate
        autoRotateSpeed={-2.5} 
        enablePan={false}
        enableDamping={true}
        enableZoom={false}
        enableRotate={true}
      />
    </Canvas>
  )
}

export default ProductScene
