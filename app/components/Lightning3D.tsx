'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function LightningBolt() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [position, setPosition] = useState({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 5,
  })
  const [visible, setVisible] = useState(false)
  const [rotation, setRotation] = useState({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
  })

  useEffect(() => {
    // Randomly show/hide lightning
    const interval = setInterval(() => {
      setVisible(true)
      setTimeout(() => setVisible(false), 200 + Math.random() * 300)
      
      // Move to new random position
      setPosition({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5,
      })
      
      setRotation({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      })
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [])

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.x += 0.05
      meshRef.current.rotation.y += 0.03
      meshRef.current.rotation.z += 0.02
    }
  })

  if (!visible) return null

  // Create lightning bolt shape using multiple cylinders
  return (
    <group position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Main lightning bolt */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.05, 0.1, 2, 8]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Branch 1 */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.06, 1, 6]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Branch 2 */}
      <mesh position={[-0.3, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.06, 1, 6]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

function ElectricParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 100

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 10
    
    const color = Math.random() > 0.5 ? 0.4 : 0.6
    colors[i] = color
    colors[i + 1] = color + 0.2
    colors[i + 2] = 1
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.001
      particlesRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function ElectricField() {
  const fieldRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.x += 0.002
      fieldRef.current.rotation.y += 0.003
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      fieldRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={fieldRef}>
      <octahedronGeometry args={[3, 0]} />
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.1}
        emissive="#60a5fa"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default function Lightning3D() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ position: 'fixed' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        
        {/* Multiple lightning bolts appearing randomly */}
        <LightningBolt />
        <LightningBolt />
        <LightningBolt />
        
        <ElectricParticles />
        <ElectricField />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}

