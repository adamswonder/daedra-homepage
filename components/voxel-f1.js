import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateF1Voxels } from './f1-voxel'
import { DogSpinner, DogContainer } from './voxel-dog-loader'

const VOXEL_SIZE = 0.30

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

function createF1VoxelMesh(scene) {
  const voxelData = generateF1Voxels()
  
  // Group voxels by color for instanced rendering
  const colorGroups = new Map()
  for (const [x, y, z, color] of voxelData) {
    if (!colorGroups.has(color)) colorGroups.set(color, [])
    colorGroups.get(color).push([
      x * VOXEL_SIZE,
      y * VOXEL_SIZE,
      z * VOXEL_SIZE,
    ])
  }

  const group = new THREE.Group()
  group.position.set(0, 0, 0)

  // Create instanced meshes for each color
  colorGroups.forEach((positions, color) => {
    const geometry = new THREE.BoxGeometry(
      VOXEL_SIZE * 0.95, 
      VOXEL_SIZE * 0.95, 
      VOXEL_SIZE * 0.95
    )
    const material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 30,
      specular: 0x444444
    })

    const instancedMesh = new THREE.InstancedMesh(geometry, material, positions.length)
    instancedMesh.castShadow = true
    instancedMesh.receiveShadow = true

    // Set positions for each instance
    const matrix = new THREE.Matrix4()
    positions.forEach(([x, y, z], i) => {
      matrix.setPosition(x, y, z)
      instancedMesh.setMatrixAt(i, matrix)
    })
    instancedMesh.instanceMatrix.needsUpdate = true

    group.add(instancedMesh)
  })

  scene.add(group)
  return group
}

const VoxelF1 = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      
      const scene = new THREE.Scene()

      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      // Use orthographic camera like the original dog
      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      // Lighting setup with shadows
      const ambientLight = new THREE.AmbientLight(0x808080, 0.7)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(10, 10, 10)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.width = 2048
      directionalLight.shadow.mapSize.height = 2048
      directionalLight.shadow.camera.near = 0.1
      directionalLight.shadow.camera.far = 50
      directionalLight.shadow.camera.left = -15
      directionalLight.shadow.camera.right = 15
      directionalLight.shadow.camera.top = 15
      directionalLight.shadow.camera.bottom = -15
      scene.add(directionalLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target

      // Add ground plane for shadows
      const groundGeometry = new THREE.PlaneGeometry(20, 20)
      const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 })
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
      groundMesh.rotation.x = -Math.PI / 2
      groundMesh.position.y = -2
      groundMesh.receiveShadow = true
      scene.add(groundMesh)

      // Create F1 voxel mesh
      createF1VoxelMesh(scene)

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)
        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
          camera.position.y = 7
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      // Start animation and remove loading
      animate()
      setTimeout(() => setLoading(false), 1000)

      return () => {
        if (req) cancelAnimationFrame(req)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <DogContainer ref={refContainer}>{loading && <DogSpinner />}</DogContainer>
  )
}

export default VoxelF1