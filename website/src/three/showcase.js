import * as THREE from 'three'

// Sân khấu 3D cho dải "Yêu cầu báo giá": mô hình dựng bằng code của 3 sản phẩm Top Win
// (vỉ làm nguội bánh, kệ dao gỗ, búa đập thịt) đặt trên sàn sáng có bóng đổ.

const steel = () => new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 0.9, roughness: 0.28 })

function tube(points, radius, mat, closed = false) {
  const curve = new THREE.CatmullRomCurve3(points, closed, 'catmullrom', 0.02)
  return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, points.length * 12), radius, 8, closed), mat)
}

// Vỉ làm nguội bánh 10×16 inch: khung bo góc, lưới dây đan, 4 chân uốn.
function coolingRack() {
  const g = new THREE.Group()
  const mat = steel()
  const W = 2.6
  const D = 1.65
  const r = 0.12
  const pts = []
  const corners = [
    [W / 2 - r, D / 2 - r, 0],
    [-W / 2 + r, D / 2 - r, Math.PI / 2],
    [-W / 2 + r, -D / 2 + r, Math.PI],
    [W / 2 - r, -D / 2 + r, (3 * Math.PI) / 2],
  ]
  corners.forEach(([cx, cz, a0]) => {
    for (let k = 0; k <= 4; k++) {
      const a = a0 + (k / 4) * (Math.PI / 2)
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, 0, -(cz + Math.sin(a) * r)))
    }
  })
  g.add(tube(pts, 0.022, mat, true))

  const wire = 0.009
  const rod = new THREE.CylinderGeometry(wire, wire, 1, 6)
  const nx = 16
  const nz = 10
  const inst = new THREE.InstancedMesh(rod, mat, nx + nz)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  let i = 0
  for (let k = 1; k < nx + 1; k++) {
    const x = -W / 2 + (k * W) / (nx + 1)
    q.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))
    m.compose(new THREE.Vector3(x, 0.012, 0), q, new THREE.Vector3(1, D - 0.04, 1))
    inst.setMatrixAt(i++, m)
  }
  for (let k = 1; k < nz + 1; k++) {
    const z = -D / 2 + (k * D) / (nz + 1)
    q.setFromEuler(new THREE.Euler(0, 0, Math.PI / 2))
    m.compose(new THREE.Vector3(0, -0.006, z), q, new THREE.Vector3(1, W - 0.04, 1))
    inst.setMatrixAt(i++, m)
  }
  g.add(inst)

  // 4 chân hình chữ U úp
  ;[-1, 1].forEach((sx) =>
    [-1, 1].forEach((sz) => {
      const x = sx * (W / 2 - 0.35)
      const z = sz * (D / 2 - 0.02)
      g.add(
        tube(
          [
            new THREE.Vector3(x - 0.14, 0, z),
            new THREE.Vector3(x - 0.12, -0.22, z),
            new THREE.Vector3(x + 0.12, -0.22, z),
            new THREE.Vector3(x + 0.14, 0, z),
          ],
          0.018,
          mat,
        ),
      )
    }),
  )
  g.traverse((o) => o.isMesh && (o.castShadow = true))
  return g
}

function woodTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 512
  const x = c.getContext('2d')
  x.fillStyle = '#7a4a26'
  x.fillRect(0, 0, 256, 512)
  for (let k = 0; k < 90; k++) {
    x.strokeStyle = `rgba(${40 + Math.random() * 40}, ${20 + Math.random() * 20}, 8, ${0.15 + Math.random() * 0.25})`
    x.lineWidth = 1 + Math.random() * 3
    x.beginPath()
    const y0 = Math.random() * 512
    x.moveTo(0, y0)
    for (let s = 0; s <= 256; s += 16) x.lineTo(s, y0 + Math.sin(s / 30 + k) * 6)
    x.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// Kệ dao gỗ: khối gỗ nghiêng trên đế, mặt trên có khe cắm dao.
function knifeBlock() {
  const g = new THREE.Group()
  const wood = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.55, metalness: 0.05 })
  const body = new THREE.Group()
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.7, 0.75), wood)
  block.castShadow = true
  body.add(block)
  const slot = new THREE.MeshStandardMaterial({ color: 0x1b0d05, roughness: 0.9 })
  for (let k = 0; k < 5; k++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.02, 0.05), slot)
    s.position.set(0, 0.851, -0.25 + k * 0.125)
    body.add(s)
  }
  body.rotation.x = -0.38
  body.position.y = 0.95
  g.add(body)
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.16, 1.15), wood)
  base.position.set(0, 0.08, 0.12)
  base.castShadow = true
  g.add(base)
  return g
}

// Búa đập thịt: cán nhựa đen bọc tay cầm, đầu kim loại có gai hai mặt.
function meatTenderizer() {
  const g = new THREE.Group()
  const black = new THREE.MeshStandardMaterial({ color: 0x15171c, roughness: 0.45, metalness: 0.1 })
  const grip = new THREE.MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.85 })
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 1.9, 24), black)
  handle.position.y = 0.95
  g.add(handle)
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.105, 0.9, 24), grip)
  sleeve.position.y = 0.55
  g.add(sleeve)
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.42), steel())
  head.position.y = 2.0
  g.add(head)
  const spike = new THREE.ConeGeometry(0.045, 0.1, 4)
  const spikes = new THREE.InstancedMesh(spike, steel(), 2 * 7 * 3)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  let i = 0
  ;[-1, 1].forEach((side) => {
    q.setFromEuler(new THREE.Euler(0, 0, side < 0 ? Math.PI / 2 : -Math.PI / 2))
    for (let a = 0; a < 3; a++)
      for (let b = 0; b < 7; b++) {
        m.compose(new THREE.Vector3(side * 0.525, 2.0 - 0.13 + a * 0.13, -0.18 + b * 0.06), q, new THREE.Vector3(1, 1, 1))
        spikes.setMatrixAt(i++, m)
      }
  })
  g.add(spikes)
  g.traverse((o) => o.isMesh && (o.castShadow = true))
  return g
}

export function createShowcase(canvas) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
  camera.position.set(0, 2.9, 6.6)
  camera.lookAt(0, 0.45, 0)

  scene.add(new THREE.HemisphereLight(0xdfe7ff, 0x0a0f22, 1.3))
  const key = new THREE.DirectionalLight(0xffffff, 2.6)
  key.position.set(2, 6, 4)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -5
  key.shadow.camera.right = 5
  key.shadow.camera.top = 5
  key.shadow.camera.bottom = -5
  key.shadow.radius = 6
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xf26b1d, 1.2)
  rim.position.set(-4, 3, -4)
  scene.add(rim)

  // Sàn: chỉ hiện bóng đổ, nền sáng do CSS vẽ.
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.45 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  const rack = coolingRack()
  rack.position.set(0, 0.75, 0.6)
  rack.rotation.set(0.32, 0, 0)
  const rackPivot = new THREE.Group()
  rackPivot.add(rack)
  scene.add(rackPivot)

  const block = knifeBlock()
  block.position.set(-2.75, 0, -0.9)
  block.rotation.y = 0.5
  scene.add(block)

  const hammer = meatTenderizer()
  hammer.position.set(2.75, 0, -0.9)
  hammer.rotation.set(0, -0.6, -0.12)
  scene.add(hammer)

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // màn hẹp: lùi camera để thấy đủ 3 sản phẩm
    camera.position.z = w / h < 1.6 ? 6.6 * (1.6 / (w / h)) ** 0.95 : 6.6
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  const mouse = { x: 0, tx: 0 }
  const onMove = (e) => (mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2)
  window.addEventListener('pointermove', onMove, { passive: true })

  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas)

  const clock = new THREE.Clock()
  let raf
  const frame = () => {
    raf = requestAnimationFrame(frame)
    if (!visible || document.hidden) return
    const t = clock.getElapsedTime()
    if (!reduced) {
      mouse.x += (mouse.tx - mouse.x) * 0.05
      rackPivot.rotation.y = Math.sin(t * 0.35) * 0.28 + mouse.x * 0.2
      block.rotation.y = 0.5 + Math.sin(t * 0.4 + 1) * 0.25
      hammer.rotation.y = -0.6 + t * 0.35
    }
    renderer.render(scene, camera)
  }
  frame()

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    scene.traverse((o) => {
      o.geometry?.dispose()
      const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
      mats.forEach((mt) => {
        mt.map?.dispose()
        mt.dispose()
      })
    })
    renderer.dispose()
  }
}
