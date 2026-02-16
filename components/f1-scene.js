"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { generateF1Voxels } from "./f1-voxel"
import { DogContainer, DogSpinner } from './voxel-dog-loader'

const VOXEL_SIZE = 0.45

function InstancedVoxels() {
  const voxelData = useMemo(() => generateF1Voxels(), [])

  const colorGroups = useMemo(() => {
    const groups = new Map()
    for (const [x, y, z, color] of voxelData) {
      if (!groups.has(color)) groups.set(color, [])
      groups.get(color).push([
        x * VOXEL_SIZE,
        y * VOXEL_SIZE,
        z * VOXEL_SIZE,
      ])
    }
    return groups
  }, [voxelData])

  return (
    <group position={[0, -1.5, 0]}>
      {Array.from(colorGroups.entries()).map(([color, positions]) => (
        <InstancedColorGroup key={color} color={color} positions={positions} />
      ))}
    </group>
  )
}

function InstancedColorGroup({ color, positions }) {
  const meshRef = useRef()

  useEffect(() => {
    if (!meshRef.current) return
    const matrix = new THREE.Matrix4()
    positions.forEach(([x, y, z], i) => {
      matrix.setPosition(x, y, z)
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length]}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <boxGeometry args={[VOXEL_SIZE * 0.95, VOXEL_SIZE * 0.95, VOXEL_SIZE * 0.95]} />
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.1}
      />
    </instancedMesh>
  )
}

function Particles() {
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#888888"
        size={0.05}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function VoxelGrid() {
  const gridSize = 22
  const lines = useMemo(() => {
    const pts = []
    for (let i = -gridSize; i <= gridSize; i++) {
      pts.push(
        new THREE.Vector3(i * VOXEL_SIZE, 0, -gridSize * VOXEL_SIZE),
        new THREE.Vector3(i * VOXEL_SIZE, 0, gridSize * VOXEL_SIZE)
      )
      pts.push(
        new THREE.Vector3(-gridSize * VOXEL_SIZE, 0, i * VOXEL_SIZE),
        new THREE.Vector3(gridSize * VOXEL_SIZE, 0, i * VOXEL_SIZE)
      )
    }
    return pts
  }, [])

  return (
    <lineSegments position={[0, -1.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(lines.flatMap((v) => [v.x, v.y, v.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#2a2a3a" transparent opacity={0.2} />
    </lineSegments>
  )
}

export default function F1Scene() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading completion after a short delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <DogContainer>
      {loading && <DogSpinner />}
      <div 
        style={{ 
          width: '100%',
          height: '100%',
          background: "linear-gradient(180deg, #0a0a14 0%, #111125 100%)",
          borderRadius: '8px',
          overflow: 'hidden',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
      <Canvas
        shadows
        camera={{ position: [10, 7, 12], fov: 45 }}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={["#0a0a14"]} />
        <fog attach="fog" args={["#0a0a14", 18, 40]} />

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[10, 14, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <pointLight position={[-8, 6, -6]} intensity={0.6} color="#e94560" />
        <pointLight position={[8, 3, -8]} intensity={0.4} color="#4a90d9" />
        <pointLight position={[0, 8, 10]} intensity={0.3} color="#f0c040" />

        <Float
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.3}
          floatingRange={[-0.08, 0.08]}
        >
          <InstancedVoxels />
        </Float>

        <VoxelGrid />
        <Particles />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={24}
          blur={2.5}
          far={12}
          color="#000000"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={8}
          maxDistance={30}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      </div>
    </DogContainer>
  )
}