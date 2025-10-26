"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeSceneProps {
  intensity?: number
}

export function ThreeScene({ intensity = 1 }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points[]
    sphere: THREE.Mesh
    crystals: THREE.Group
    energyRings: THREE.Mesh[]
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0f172a, 0.015) // slate-900
    scene.background = new THREE.Color(0x0f172a)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    const particleSystems: THREE.Points[] = []

    const createParticleSystem = (count: number, color: number, size: number, speed: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      const colorObj = new THREE.Color(color)

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100

        colors[i * 3] = colorObj.r
        colors[i * 3 + 1] = colorObj.g
        colors[i * 3 + 2] = colorObj.b
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const particles = new THREE.Points(geometry, material)
      particles.userData.speed = speed
      return particles
    }

    // Colores del proyecto: verde (Hogar), azul (Sociedad), morado (Profesional)
    particleSystems.push(createParticleSystem(2000, 0xa855f7, 0.08, 0.001)) // purple-500
    particleSystems.push(createParticleSystem(1500, 0x3b82f6, 0.06, 0.0015)) // blue-500
    particleSystems.push(createParticleSystem(1000, 0x10b981, 0.1, 0.0008)) // green-500
    particleSystems.push(createParticleSystem(800, 0xfbbf24, 0.05, 0.002)) // amber-400

    particleSystems.forEach((ps) => scene.add(ps))

    // Esfera central con colores del proyecto
    const sphereGeometry = new THREE.IcosahedronGeometry(3, 4)
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x10b981) }, // verde
        color2: { value: new THREE.Color(0x3b82f6) }, // azul
        color3: { value: new THREE.Color(0xa855f7) }, // morado
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          vec3 pos = position;
          float displacement = sin(pos.x * 2.0 + time) * cos(pos.y * 2.0 + time) * 0.2;
          pos += normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          
          vec3 color = mix(color1, color2, sin(time + vPosition.x) * 0.5 + 0.5);
          color = mix(color, color3, cos(time + vPosition.y) * 0.5 + 0.5);
          
          color += fresnel * 0.5;
          
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    // Cristales orbitando
    const crystals = new THREE.Group()
    const crystalGeometry = new THREE.OctahedronGeometry(0.5, 0)

    const categoryColors = [
      { color: 0x10b981, emissive: 0x10b981 }, // Verde - Hogar
      { color: 0x3b82f6, emissive: 0x3b82f6 }, // Azul - Sociedad
      { color: 0xa855f7, emissive: 0xa855f7 }, // Morado - Profesional
    ]

    for (let i = 0; i < 12; i++) {
      const colorData = categoryColors[i % 3]

      const crystalMaterial = new THREE.MeshPhongMaterial({
        color: colorData.color,
        emissive: colorData.emissive,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8,
        shininess: 100,
      })

      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial)
      const angle = (i / 12) * Math.PI * 2
      const radius = 8
      crystal.position.x = Math.cos(angle) * radius
      crystal.position.z = Math.sin(angle) * radius
      crystal.position.y = Math.sin(i * 0.5) * 2
      crystals.add(crystal)
    }
    scene.add(crystals)

    // Anillos de energía
    const energyRings: THREE.Mesh[] = []
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(5 + i * 2, 0.05, 16, 100)
      const ringColor = [0x10b981, 0x3b82f6, 0xa855f7][i]
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: 0.3,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2
      ring.position.y = -3
      energyRings.push(ring)
      scene.add(ring)
    }

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x10b981, 2, 50)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 50)
    pointLight2.position.set(-10, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xa855f7, 2, 50)
    pointLight3.position.set(0, 5, -10)
    scene.add(pointLight3)

    let time = 0

    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      time += 0.01

      // Actualizar shader de la esfera
      if (sphereMaterial.uniforms) {
        sphereMaterial.uniforms.time.value = time
      }

      // Rotar esfera
      sphere.rotation.y += 0.002 * intensity
      sphere.rotation.x += 0.001 * intensity

      // Rotar cristales
      crystals.rotation.y += 0.003 * intensity
      crystals.children.forEach((crystal, i) => {
        crystal.rotation.x += 0.01 * intensity
        crystal.rotation.y += 0.015 * intensity
        crystal.position.y = Math.sin(time + i * 0.5) * 2
      })

      // Animar partículas
      particleSystems.forEach((ps) => {
        ps.rotation.y += ps.userData.speed * intensity
        ps.rotation.x += ps.userData.speed * 0.5 * intensity
      })

      // Animar anillos
      for (let i = 0; i < energyRings.length; i++) {
        const ring = energyRings[i]
        ring.rotation.z += (0.001 + i * 0.0005) * intensity
        const material = ring.material
        if (material instanceof THREE.MeshStandardMaterial) {
          material.opacity = 0.3 + Math.sin(time + i) * 0.1
        }
      }

      renderer.render(scene, camera)

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles: particleSystems,
        sphere,
        crystals,
        energyRings,
        animationId,
      }
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.renderer.dispose()
        if (containerRef.current && sceneRef.current.renderer.domElement) {
          sceneRef.current.renderer.domElement.remove()
        }
      }
    }
  }, [intensity])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
