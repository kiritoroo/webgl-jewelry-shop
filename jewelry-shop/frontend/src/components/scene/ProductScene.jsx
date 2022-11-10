import React from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, MeshRefractionMaterial } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize, Resizer } from 'postprocessing'
import { useControls } from 'leva'

const Model = ({ uri, map, ...props }) => {
  const { nodes, materials } = useGLTF(uri);
  
  const configDiamond = ({
    bounces: 1,
    aberrationStrength: 0.10,
    ior: 5.0,
    fresnel: 0.5,
    color: 'white',
    fastChroma: false
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.diamonds.geometry}
      >
        {/* <MeshRefractionMaterial envMap={map} {...configDiamond} toneMapped={false}/> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.gold}
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
    <Canvas shadows camera={{ position: [-10, 10, 30], fov: 25 }}>
      <Model 
        uri={product.model_3d.url}
        map={texture}
        onLoad={setTimeout(() => {
          setRender(true)
          setLoading(false)
        }, 5000)}  
      />
      <directionalLight intensity={20} position={[5, 5, -7.5]} bias={0.01} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} autoRotate autoRotateSpeed={-0.25} />
      <Lights />
      <Environment files='/textures/hdr_aerodynamic.hdr' />
      {/* <Effect /> */}
    </Canvas>
  )
}

export default ProductScene
