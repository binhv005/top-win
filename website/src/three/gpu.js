// Nhận diện WebGL đang vẽ bằng phần mềm (không có GPU: SwiftShader, llvmpipe, Microsoft Basic Render…).
// Khi đó giảm độ phân giải + giới hạn tốc độ vẽ để không khóa luồng chính.
export function isSoftwareGL(renderer) {
  try {
    const gl = renderer.getContext()
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER))
    return /swiftshader|llvmpipe|software|basic render|softpipe/i.test(name)
  } catch {
    return false
  }
}
