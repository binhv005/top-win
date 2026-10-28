import * as THREE from 'three'
import { isSoftwareGL } from './gpu.js'

// Bộ dựng cảnh "không gian pha lê" theo phong cách Noomo Showcase:
// khối pha lê chứa ảnh, mảnh kính trôi, bụi sáng; camera bay theo thanh cuộn.

function rand(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

// Khối đa diện méo ngẫu nhiên, UV chiếu phẳng từ phía trước để ảnh như nằm "bên trong" khối.
function crystalGeometry(radius, seed) {
  const r = rand(seed)
  const geo = new THREE.IcosahedronGeometry(radius, 0)
  const pos = geo.attributes.position
  const offsets = new Map()
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`
    if (!offsets.has(key)) offsets.set(key, 0.78 + r() * 0.42)
    const k = offsets.get(key)
    pos.setXYZ(i, pos.getX(i) * k * 1.12, pos.getY(i) * k, pos.getZ(i) * k * 0.82)
  }
  const uv = new Float32Array(pos.count * 2)
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = pos.getX(i) / (radius * 2.4) + 0.5
    uv[i * 2 + 1] = pos.getY(i) / (radius * 2.2) + 0.5
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  geo.computeVertexNormals()
  return geo
}

// Khối pha lê: ảnh sản phẩm nguyên vẹn (đúng tỉ lệ, đúng màu, luôn quay về phía người xem)
// nằm bên trong một vỏ kính trong suốt có cạnh sáng — vỏ xoay, ảnh đứng yên.
// Không truyền texture → khối pha lê đặc, óng ánh, không có ảnh (dùng cho trang con).
// Không có GPU: dùng vật liệu Lambert (shader nhẹ) thay cho Physical (biên dịch rất chậm trên CPU).
let lightMaterials = false
function physMat(p) {
  if (!lightMaterials) return new THREE.MeshPhysicalMaterial(p)
  const { color, emissive, emissiveIntensity, transparent, opacity, depthWrite, flatShading } = p
  return new THREE.MeshLambertMaterial({ color, emissive, emissiveIntensity, transparent, opacity, depthWrite, flatShading })
}

function makeCrystal(texture, radius, seed) {
  const group = new THREE.Group()
  const solid = !texture

  const photo = new THREE.Group()
  const frame = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: 0xd2e0ff, transparent: true, opacity: 0.9 }),
  )
  const image = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }))
  image.position.z = 0.002
  if (!solid) photo.add(frame, image)
  photo.renderOrder = 1
  group.add(photo)

  const shell = new THREE.Group()
  const geo = crystalGeometry(radius, seed)
  const glass = new THREE.Mesh(
    geo,
    physMat(
      solid
        ? {
            color: 0x6f86ff,
            metalness: 0.55,
            roughness: 0.12,
            clearcoat: 1,
            clearcoatRoughness: 0.04,
            iridescence: 1,
            iridescenceIOR: 1.9,
            iridescenceThicknessRange: [200, 900],
            emissive: 0x0b1fff,
            emissiveIntensity: 0.35,
            flatShading: true,
            transparent: true,
            opacity: 0.82,
          }
        : {
            color: 0x9fb2ff,
            metalness: 0.1,
            roughness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            iridescence: 1,
            iridescenceIOR: 1.8,
            flatShading: true,
            transparent: true,
            opacity: 0.14,
            depthWrite: false,
          },
    ),
  )
  glass.renderOrder = 2
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0xc8d6ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  edges.renderOrder = 3
  // quầng sáng xanh phía sau
  const glow = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: 0x0b1fff, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  glow.scale.setScalar(1.05)
  shell.add(glow, glass, edges)
  group.add(shell)

  // Co giãn ảnh vừa khít trong khối theo tỉ lệ thật của ảnh.
  const fit = (w, h) => {
    const maxW = radius * 1.7
    const maxH = radius * 1.3
    const a = w / h
    const [pw, ph] = a > maxW / maxH ? [maxW, maxW / a] : [maxH * a, maxH]
    image.scale.set(pw, ph, 1)
    frame.scale.set(pw + 0.06, ph + 0.06, 1)
  }
  fit(4, 3)
  group.userData = { shell, photo, fit, radius }
  return group
}

function makeShards(count, depth, seed) {
  const r = rand(seed)
  const geo = new THREE.TetrahedronGeometry(1, 0)
  const mat = physMat({
    color: 0xffffff,
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1,
    iridescence: 1,
    emissive: 0x0b1dff,
    emissiveIntensity: 0.25,
    flatShading: true,
  })
  const mesh = new THREE.InstancedMesh(geo, mat, count)
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      p: new THREE.Vector3((r() - 0.5) * 22, (r() - 0.5) * 14, 6 - r() * depth),
      rot: new THREE.Euler(r() * 6, r() * 6, r() * 6),
      spin: new THREE.Vector3((r() - 0.5) * 0.6, (r() - 0.5) * 0.6, (r() - 0.5) * 0.6),
      s: 0.03 + Math.pow(r(), 3) * 0.28,
    })
    // phần lớn mảnh xanh đậm, điểm xuyết cam và đỏ
    const k = r()
    mesh.setColorAt(i, new THREE.Color(k < 0.12 ? 0xf26b1d : k < 0.2 ? 0xd62828 : 0x0a0f40))
  }
  return { mesh, data }
}

function makeDust(count, depth, seed) {
  const r = rand(seed)
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (r() - 0.5) * 30
    pos[i * 3 + 1] = (r() - 0.5) * 18
    pos[i * 3 + 2] = 8 - r() * depth
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xc9d6ff, size: 0.055, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ images: string[], mode: 'journey' | 'ambient', spacing?: number,
 *           onProgress?: (p: number) => void, onReady?: () => void }} opts
 */
const whenIdle = (cb) => (window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200))

export function createSpace(canvas, opts) {
  const { images, mode, spacing = 11, onProgress, onReady } = opts
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  // máy yếu / màn hẹp: giảm độ phân giải render và số hạt
  const soft = isSoftwareGL(renderer)
  lightMaterials = soft
  const low = soft || window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4
  renderer.setPixelRatio(soft ? 0.5 : Math.min(window.devicePixelRatio, low ? 1 : 1.5))
  const minFrameMs = soft ? 66 : 0 // không GPU: tối đa ~15 khung/giây
  let lastDraw = 0
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x02041c, mode === 'journey' ? 0.055 : 0.07)
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120)
  camera.position.set(0, 0, 8)

  scene.add(new THREE.AmbientLight(0x3344ff, 1.4))
  const key = new THREE.DirectionalLight(0xffffff, 2.6)
  key.position.set(3, 5, 6)
  scene.add(key)
  const rim = new THREE.PointLight(0x2a3bff, 60, 30)
  scene.add(rim)

  const manager = new THREE.LoadingManager()
  manager.onProgress = (_url, loaded, total) => onProgress?.(loaded / total)
  manager.onLoad = () => onReady?.()
  const loader = new THREE.TextureLoader(manager)

  const count = images.length
  const depth = mode === 'journey' ? count * spacing + 20 : 30
  // Dựng cảnh từng phần qua nhiều lần rảnh của trình duyệt (không tạo một tác vụ dài).
  const crystals = []
  const buildCrystal = (src, i) => {
    let c
    // src = null → khối pha lê đặc không ảnh
    const tex = src
      ? loader.load(src, (t) => {
          c.userData.fit(t.image.width, t.image.height)
          // đẩy ảnh lên GPU lần lượt khi trình duyệt rảnh, tránh dồn vào khung hình đầu
          whenIdle(() => running && renderer.initTexture(t))
        })
      : null
    if (tex) {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
    }
    c = makeCrystal(tex, mode === 'journey' ? 2.4 : 2.2, 17 + i * 31)
    if (mode === 'journey') {
      c.position.set(i % 2 ? 2.4 : -2.3, i % 3 === 0 ? -0.35 : -0.75, -i * spacing)
    } else {
      c.position.set(3.3, 0.4, -2.5)
    }
    c.userData.spin = 0.12 + (i % 3) * 0.05
    scene.add(c)
    crystals.push(c)
  }
  if (!images.some(Boolean)) onReady?.()

  let shards = { mesh: null, data: [] }
  let dust = null
  const steps = [
    ...images.map((src, i) => () => buildCrystal(src, i)),
    () => {
      shards = makeShards(Math.round((mode === 'journey' ? 420 : 160) * (low ? 0.45 : 1)), depth, 7)
      scene.add(shards.mesh)
    },
    () => {
      dust = makeDust(Math.round((mode === 'journey' ? 2600 : 1200) * (low ? 0.4 : 1)), depth, 11)
      scene.add(dust)
    },
  ]

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMouse = (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('pointermove', onMouse, { passive: true })

  let progress = 0
  let smooth = 0
  let hideAt = 1.2
  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    // màn dọc (điện thoại): thu nhỏ khối và kéo về gần trục giữa
    const portrait = w / h < 0.8
    hideAt = portrait ? 2.8 : 1.2
    crystals.forEach((c, i) => {
      if (mode !== 'journey') return
      c.scale.setScalar(portrait ? 0.62 : 1)
      c.position.x = (i % 2 ? 1 : -1) * (portrait ? 0.55 : i % 2 ? 2.4 : 2.3)
    })
  }
  resize()
  window.addEventListener('resize', resize)

  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const sv = new THREE.Vector3()
  const clock = new THREE.Clock()
  let raf
  let running = true
  const projected = new THREE.Vector3()
  const edge = new THREE.Vector3()

  const frame = () => {
    if (!running) return
    // tab bị ẩn: không render, chỉ chờ khung hình tiếp theo
    if (document.hidden) {
      raf = requestAnimationFrame(frame)
      return
    }
    const dt = Math.min(clock.getDelta(), 0.05)
    const t = clock.elapsedTime
    smooth += (progress - smooth) * (reduced ? 1 : 0.08)
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05

    const baseZ = mode === 'journey' ? 8 - smooth * count * spacing : 8 - smooth * 6
    camera.position.set(mouse.x * 0.6, -mouse.y * 0.4, baseZ)
    camera.lookAt(mouse.x * 0.2, -mouse.y * 0.1, baseZ - 10)
    rim.position.set(0, 0, baseZ - 2)

    crystals.forEach((c, i) => {
      if (!reduced) {
        c.userData.shell.rotation.y += dt * c.userData.spin
        c.userData.shell.rotation.x = Math.sin(t * 0.3 + i) * 0.25
        c.position.y += Math.sin(t * 0.8 + i * 2) * 0.002
      }
      // ảnh sản phẩm luôn quay thẳng về phía camera
      c.userData.photo.quaternion.copy(camera.quaternion)
      // ẩn khối khi camera sắp bay xuyên qua, tránh ảnh che kín màn hình
      c.visible = camera.position.z - c.position.z > c.userData.radius * c.scale.x * hideAt
    })

    shards.data.forEach((d, i) => {
      if (!reduced) {
        d.rot.x += d.spin.x * dt
        d.rot.y += d.spin.y * dt
      }
      q.setFromEuler(d.rot)
      sv.setScalar(d.s)
      m.compose(d.p, q, sv)
      shards.mesh.setMatrixAt(i, m)
    })
    if (shards.mesh) shards.mesh.instanceMatrix.needsUpdate = true
    if (dust && !reduced) dust.rotation.z = t * 0.01

    const now = performance.now()
    if (now - lastDraw >= minFrameMs) {
      lastDraw = now
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(frame)
  }
  // Biên dịch shader không đồng bộ rồi mới bắt đầu vẽ; canvas hiện dần sau khung hình đầu.
  canvas.style.opacity = '0'
  canvas.style.transition = 'opacity 0.8s ease'
  const begin = () => {
    if (!running) return
    raf = requestAnimationFrame(() => {
      frame()
      canvas.style.opacity = '1'
    })
  }
  const runSteps = () => {
    if (!running) return
    const step = steps.shift()
    if (step) {
      step()
      whenIdle(runSteps)
      return
    }
    resize()
    ;(renderer.compileAsync ? renderer.compileAsync(scene, camera) : Promise.resolve()).catch(() => {}).then(begin)
  }
  whenIdle(runSteps)

  return {
    setProgress(p) {
      progress = Math.max(0, Math.min(1.2, p))
    },
    // Toạ độ màn hình (px) của khối thứ i, dùng để đặt nhãn nổi.
    screenPos(i) {
      const c = crystals[i]
      if (!c) return null
      projected.copy(c.position)
      projected.y += 2
      projected.project(camera)
      if (projected.z > 1) return null
      return {
        x: (projected.x * 0.5 + 0.5) * canvas.clientWidth,
        y: (-projected.y * 0.5 + 0.5) * canvas.clientHeight,
        dist: camera.position.z - c.position.z,
      }
    },
    // Tâm và bán kính (px) của khối thứ i trên màn hình — để đặt bảng thông tin bên cạnh.
    screenInfo(i) {
      const c = crystals[i]
      if (!c) return null
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      projected.copy(c.position).project(camera)
      if (projected.z > 1) return null
      const cx = (projected.x * 0.5 + 0.5) * w
      const cy = (-projected.y * 0.5 + 0.5) * h
      // điểm ở mép khối theo hướng ngang của camera
      edge.setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(c.userData.radius).add(c.position).project(camera)
      return { x: cx, y: cy, r: Math.abs((edge.x * 0.5 + 0.5) * w - cx), dist: camera.position.z - c.position.z }
    },
    dispose() {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMouse)
      scene.traverse((o) => {
        o.geometry?.dispose()
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
        mats.forEach((mt) => {
          mt.map?.dispose()
          mt.dispose()
        })
      })
      renderer.dispose()
    },
  }
}
