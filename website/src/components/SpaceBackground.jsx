import { useEffect, useRef, useState } from 'react'
import { afterLoadIdle, hasHardwareGL } from '../three/defer.js'

// Nền không gian cố định cho trang con: một khối pha lê đặc (không ảnh) + mảnh kính + bụi sáng.
export default function SpaceBackground() {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let space
    let dead = false
    const onScroll = () => space?.setProgress(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight))
    const cancel = afterLoadIdle(() =>
      !hasHardwareGL()
        ? setFailed(true)
        : import('../three/space.js')
        .then(({ createSpace }) => {
          if (dead) return
          space = createSpace(ref.current, { images: [null], mode: 'ambient' })
          onScroll()
        })
        .catch(() => setFailed(true)),
    )
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      dead = true
      cancel()
      window.removeEventListener('scroll', onScroll)
      space?.dispose()
    }
  }, [])

  return (
    <div className="space-bg" aria-hidden="true">
      {!failed && <canvas ref={ref} className="space-bg__canvas" />}
      <div className="space-bg__grain" />
    </div>
  )
}
