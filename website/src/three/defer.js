// Chạy cb sau khi trang tải xong và trình duyệt rảnh (không chặn lần hiển thị đầu tiên).
export function afterLoadIdle(cb) {
  let cancelled = false
  let id
  const idle = () => {
    if (cancelled) return
    id = window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 300)
  }
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
  return () => {
    cancelled = true
    window.removeEventListener('load', idle)
    if (id != null) (window.cancelIdleCallback || clearTimeout)(id)
  }
}

// Trình duyệt có GPU tăng tốc phần cứng cho WebGL không (kiểm tra bằng canvas nhỏ, trước khi tải three.js).
// Không có GPU (SwiftShader, llvmpipe…) → nên dùng ảnh tĩnh thay cho cảnh 3D.
let hwCache
export function hasHardwareGL() {
  if (hwCache !== undefined) return hwCache
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return (hwCache = false)
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER))
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    hwCache = !/swiftshader|llvmpipe|software|basic render|softpipe/i.test(name)
  } catch {
    hwCache = false
  }
  return hwCache
}
