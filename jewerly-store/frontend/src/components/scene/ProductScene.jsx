import * as THREE from 'three'
import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { 
  Environment,
  OrbitControls, 
  useGLTF, 
  MeshRefractionMaterial, 
  Reflector,
  Decal,
  RenderTexture,
  Text,
  PerspectiveCamera
} from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { KernelSize, Resizer } from 'postprocessing'
import { useControls } from 'leva'
import gsap from 'gsap'

import './ProductScene.scss'

const Model = ({ uri, map, ringColor, diamondColor, ...props }) => {
  const { nodes, materials } = useGLTF(uri);

  const { camera } = useThree()

  const ringRef = useRef()

  const default_position = {
    x: 0, y: 0, z: 0
  }

  const default_rotation = {
    x: 0, y: 0, z: 0
  } 

  const default_scale = {
    x: 1, y: 1, z: 1
  }

  // const configDebug = useControls({
  //   bounces: { value: 1, min: 0, max: 8, step: 1 },
  //   aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
  //   ior: { value: 2.4, min: 0, max: 10 },
  //   fresnel: { value: 1, min: 0, max: 1 },
  //   color: 'white',
  //   fastChroma: false
  // })

  useEffect(() => {
    const gemMenu =  document.querySelector('.gem--menu')
    const materialsMenu = document.querySelector('.materials--menu')
    const configGem = document.querySelector('.config--gem')
    const configMaterial = document.querySelector('.config--material')

    configGem.addEventListener('click', () => {
      if (document.querySelector('.footer--menu li.active')){
        document.querySelector('.footer--menu li.active')?.classList.remove('active')
      }

      if (gemMenu.classList.contains('show')) {
        gemMenu.classList.remove('show')

        gsap.timeline()
        .to(ringRef.current.position, { ...default_position, duration: 2 } , 'start')
        .to(ringRef.current.rotation, { ...default_rotation, duration: 2 } , 'start')
        .to(ringRef.current.scale, { ...default_scale, duration: 2 } , 'start')

      } else {

        gsap.timeline()
        .to(ringRef.current.position, {
          x: 1, y: -2, z: -1,
          duration: 2
        }, 'start')
        .to(ringRef.current.rotation, {
          x: Math.PI / 4, y: 0.32, z: -0.02,
          duration: 2
        }, 'start')
        .to(ringRef.current.scale, {
          x: 1.5, y: 1.5, z: 1.5,
          duration: 2
        }, 'start')

        gemMenu.classList.add('show')
        materialsMenu.classList.remove('show')

        configGem.parentElement?.classList.add('active')
      }

      console.log(camera)
    })

    configMaterial.addEventListener('click', () => {
      if (document.querySelector('.footer--menu li.active')){
        document.querySelector('.footer--menu li.active')?.classList.remove('active')
      }

      if (materialsMenu.classList.contains('show')) {
        materialsMenu.classList.remove('show')

        gsap.timeline()
        .to(ringRef.current.position, { ...default_position, duration: 2 } , 'start')
        .to(ringRef.current.rotation, { ...default_rotation, duration: 2 } , 'start')
        .to(ringRef.current.scale, { ...default_scale, duration: 2 } , 'start')

      } else {

        gsap.timeline()
        .to(ringRef.current.position, {
          x: 1, y: 1.2, z: -1,
          duration: 2
        }, 'start')
        .to(ringRef.current.rotation, {
          x: -Math.PI / 8, y: 0.32, z: -0.2,
          duration: 2
        }, 'start')
        .to(ringRef.current.scale, {
          x: 1.2, y: 1.2, z: 1.2,
          duration: 2
        }, 'start')

        materialsMenu.classList.add('show')
        gemMenu.classList.remove('show')

        configMaterial.parentElement?.classList.add('active')
      }

    })
  }, [])

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
        position={[1, -12, 8]}
        scale={[2, 2, 1]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        args={[70, 70]}>
        {(Material, props) => <Material metalness={0.25} color="#ff8989" roughness={1} {...props} />}
      </Reflector>

      <group ref={ringRef} >
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
    </group>
  );
}

const Effect = () => {

  // const depthRef = useRef(undefined)

  // const configBloomDebug = useControls({
  //   intensity: { value: 0.85, min: 0, max: 2, step: 0.1 },
  //   levels: { value: 5, min: -10, max: 10, step: 0.5 },
  //   luminanceThreshold: { value: 1, min: -5, max: 5, step: 0.1 },
  //   luminanceSmoothing: { value: 0.025, min: -1, max: 1, step: 0.01 },
  // })

  return (
    <EffectComposer>
      {/* <Bloom
        kernelSize={KernelSize.LARGE}
        intensity={0.85}
        levels={9}
        mipmapBlur
        width={Resizer.AUTO_SIZE}
        height={Resizer.AUTO_SIZE}
        luminanceThreshold={1}
        luminanceSmoothing={0.025}
      /> */}

      {/* <DepthOfField ref={depthRef} bokehScale={0} focusDistance={0} focalLength={0.02} height={480} /> */}

      {/* <Bloom
        kernelSize={KernelSize.LARGE}
        mipmapBlur
        width={Resizer.AUTO_SIZE}
        height={Resizer.AUTO_SIZE}
        { ...configBloomDebug }
      /> */}
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
  const [diamondColor, setDiamondColor] = useState("#fff")

  // Materials Color
  const changeMaterialColorHandler = (newColor) => {
    document.querySelector('.materials--list li.mat-active')?.classList.remove('mat-active')
    setRingColor(newColor)
  }

  const changeDiamondColorHandler = (newColor) => {
    document.querySelector('.gem--list li.gem-active')?.classList.remove('gem-active')
    setDiamondColor(newColor)
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


    document.querySelector('.gem-ruby')?.addEventListener('click', () => {
      changeDiamondColorHandler('#fd7d7d')
      document.querySelector('.gem-ruby')?.classList.add('gem-active')
    })
    document.querySelector('.gem-faint')?.addEventListener('click', () => {
      changeDiamondColorHandler('#CFECEC')
      document.querySelector('.gem-faint')?.classList.add('gem-active')
    })
    document.querySelector('.gem-fancy')?.addEventListener('click', () => {
      changeDiamondColorHandler('#a9cbe2')
      document.querySelector('.gem-fancy')?.classList.add('gem-active')
    })
    document.querySelector('.gem-aqua')?.addEventListener('click', () => {
      changeDiamondColorHandler('#62cffe')
      document.querySelector('.gem-aqua')?.classList.add('gem-active')
    })
    document.querySelector('.gem-swiss')?.addEventListener('click', () => {
      changeDiamondColorHandler('#76dce4')
      document.querySelector('.gem-swiss')?.classList.add('gem-active')
    })
    document.querySelector('.gem-yellow')?.addEventListener('click', () => {
      changeDiamondColorHandler('#efe75b')
      document.querySelector('.gem-yellow')?.classList.add('gem-active')
    })
    document.querySelector('.gem-orange')?.addEventListener('click', () => {
      changeDiamondColorHandler('#eb8e17')
      document.querySelector('.gem-orange')?.classList.add('gem-active')
    })
    document.querySelector('.gem-green')?.addEventListener('click', () => {
      changeDiamondColorHandler('#17ebb5')
      document.querySelector('.gem-green')?.classList.add('gem-active')
    })
    document.querySelector('.gem-emerald')?.addEventListener('click', () => {
      changeDiamondColorHandler('#5eca00')
      document.querySelector('.gem-emerald')?.classList.add('gem-active')
    })
    document.querySelector('.gem-rose')?.addEventListener('click', () => {
      changeDiamondColorHandler('#f78484')
      document.querySelector('.gem-rose')?.classList.add('gem-active')
    })
    document.querySelector('.gem-violet')?.addEventListener('click', () => {
      changeDiamondColorHandler('#db4cf8')
      document.querySelector('.gem-violet')?.classList.add('gem-active')
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
        <fog attach="fog" args={["#fff6f6", 1, 80]}/>
        <color attach="background" args={['#fdefef']}/>
        <ambientLight intensity={0.5}/>
        <group>
          <Model
            uri={product.model_3d.url}
            map={texture}
            scale={[0.8, 0.8, 0.8]}
            position={[0, -0.5, 0]}
            ringColor={ringColor}
            diamondColor={diamondColor}
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
          autoRotateSpeed={-3} 
          enablePan={false}
          enableDamping={true}
          enableZoom={false}
          enableRotate={true}
        />
      </Canvas>
      <div className='menu--container'>
        <div className="footer--menu">
          <ul>
            <li><img className="config--gem" width="32" height="32" src="/images/gem.svg"/></li>
            <li><img className="config--material" width="32" height="32" src="/images/mat.svg"/></li>
          </ul>
        </div>
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
            <li className='gem-emerald'>
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
