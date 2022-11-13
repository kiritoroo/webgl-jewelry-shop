import * as THREE from 'three'
import React, { useEffect, useState} from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, MeshRefractionMaterial, Reflector } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize, Resizer } from 'postprocessing'
import { useControls } from 'leva'

import './ProductScene.scss'

const Model = ({ uri, map, ringColor, ...props }) => {
  const { nodes, materials } = useGLTF(uri);
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

  const [ringColor, setRingColor] = useState("#ffaeae")

  // Materials Color
  const changeMaterialColorHandler = (newColor) => {
    document.querySelector('.materials--list li.mat-active')?.classList.remove('mat-active')
    setRingColor(newColor)
  }

  useEffect(() => {
    document.querySelector('.mat-default')?.addEventListener('click', () => {
      changeMaterialColorHandler("#ffaeae")
      document.querySelector('.mat-default')?.classList.add('mat-active')
    })

    document.querySelector('.mat-silver-gold')?.addEventListener('click', () => {
      changeMaterialColorHandler("#fea04d")
      document.querySelector('.mat-silver-gold')?.classList.add('mat-active')
    })

    document.querySelector('.mat-silver-silver')?.addEventListener('click', () => {
      changeMaterialColorHandler("#ffffff")
      document.querySelector('.mat-silver-silver')?.classList.add('mat-active')
    })

    document.querySelector('.mat-gold-gold')?.addEventListener('click', () => {
      changeMaterialColorHandler("#A66C0C")
      document.querySelector('.mat-gold-gold')?.classList.add('mat-active')
    })

    document.querySelector('.mat-rose-silver')?.addEventListener('click', () => {
      changeMaterialColorHandler("#ffe3e3")
      document.querySelector('.mat-rose-silver')?.classList.add('mat-active')
    })

    document.querySelector('.mat-gold-rose')?.addEventListener('click', () => {
      changeMaterialColorHandler("#ff846c")
      document.querySelector('.mat-gold-rose')?.classList.add('mat-active')
    })

    document.querySelector('.mat-rose-rose')?.addEventListener('click', () => {
      changeMaterialColorHandler("#ff7186")
      document.querySelector('.mat-rose-rose')?.classList.add('mat-active')
    })

  }, [])

  return (
    <React.Fragment>
      <Canvas 
        shadows 
        camera={{ position: [-10, 10, 25], near: 0.1, far: 50, fov: 30 }}
        frameloop= { isRender ? "always" : "never" }
        onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={["#FFF", 1, 100]}/>
        <color attach="background" args={['#FFFDFD']}/>
        <ambientLight intensity={0.5}/>
        <group>
          <Model 
            uri={product.model_3d.url}
            map={texture}
            scale={[0.8, 0.8, 0.8]}
            position={[0, -0.5, 0]}
            ringColor={ringColor}
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
        {/* <Effect /> */}
        <OrbitControls 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2.1} 
          autoRotate
          autoRotateSpeed={-3} 
          enablePan={false}
          enableDamping={true}
          enableZoom={false}
          enableRotate={true}
        />
      </Canvas>
      <div className='menu--container'>
        <div className='gem--menu'>
          <ul className='gem--list'>
            <li className='gem-faint gem-active'>
              <img width={32} height={32} src="/images/gem_faint.svg"/>
            </li>
            <li className='gem-ruby'>
              <img width={32} height={32} src="/images/gem_ruby.svg"/>
            </li>
            <li className='gem-fancy'>
              <img width={32} height={32} src="/images/gem_fancy.svg"/>
            </li>
            <li className='gem-aqua'>
              <img width={32} height={32} src="/images/gem_aqua.svg"/>
            </li>
            <li className='gem-swiss'>
              <img width={32} height={32} src="/images/gem_swiss.svg"/>
            </li>
            <li className='gem-yellow'>
              <img width={32} height={32} src="/images/gem_yellow.svg"/>
            </li>
            <li className='gem-orange'>
              <img width={32} height={32} src="/images/gem_orange.svg"/>
            </li>
            <li className='gem-green'>
              <img width={32} height={32} src="/images/gem_green.svg"/>
            </li>
            <li className='gem-emeral'>
              <img width={32} height={32} src="/images/gem_emerald.svg"/>
            </li>
            <li className='gem-violet'>
              <img width={32} height={32} src="/images/gem_violet.svg"/>
            </li>
          </ul>
        </div>
        
        <div className='materials--menu'>
          <ul className='materials--list'>
            <li className='mat-default mat-active'>
              <img width={60} src="/images/mat_default.png"/>
            </li>
            <li className='mat-silver-gold'>
              <img width={60} src="/images/mat_silver_gold.png"/>
            </li>
            <li className='mat-silver-silver'>
              <img width={60} src="/images/mat_silver_silver.png"/>
            </li>
            <li className='mat-gold-gold'>
              <img width={60} src="/images/mat_gold_gold.png"/>
            </li>
            <li className='mat-rose-silver'>
              <img width={60} src="/images/mat_rose_silver.png"/>
            </li>
            <li className='mat-gold-rose'>
              <img width={60} src="/images/mat_gold_rose.png"/>
            </li>
            <li className='mat-rose-rose'>
              <img width={60} src="/images/mat_rose_rose.png"/>
            </li>
          </ul>
        </div>  
      </div>

    </React.Fragment>
  )
}

export default ProductScene
