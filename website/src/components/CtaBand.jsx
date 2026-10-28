import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Dải dẫn tới form "Request a Quote" (sản phẩm, số lượng, đính kèm bản vẽ — theo brief).
// Bố cục: tiêu đề giữa, nút viên tròn, 3 sản phẩm 3D (vỉ làm nguội, kệ dao gỗ, búa đập thịt) trên sàn sáng.
// Máy không có WebGL: hiện 3 ảnh sản phẩm thay thế.
const fallback = [
  { image: 'knife-block', pos: 'left' },
  { image: 'cooling-rack', pos: 'center' },
  { image: 'peelers', pos: 'right' },
]

export default function CtaBand() {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // chỉ tải three.js khi khối sắp hiện trên màn hình
    let dispose
    let dead = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        import('../three/showcase.js')
          .then(({ createShowcase }) => {
            if (!dead) dispose = createShowcase(canvasRef.current)
          })
          .catch(() => setFailed(true))
      },
      { rootMargin: '400px' },
    )
    io.observe(canvasRef.current)
    return () => {
      dead = true
      io.disconnect()
      dispose?.()
    }
  }, [])

  return (
    <section className="cta-band">
      <div className="container cta-band__inner" data-reveal>
        <h2 className="cta-band__title">Yêu cầu báo giá</h2>
        <p className="cta-band__text">Sản phẩm, số lượng, đính kèm bản vẽ.</p>
        <Link to="/lien-he#bao-gia" className="cta-band__btn">
          Gửi yêu cầu
        </Link>
      </div>
      <div className="cta-stage" aria-hidden="true">
        {!failed && <canvas ref={canvasRef} className="cta-stage__canvas" />}
        {failed &&
          fallback.map((s) => (
            <figure key={s.image} className={`cta-stage__item cta-stage__item--${s.pos}`}>
              <img src={`/images/${s.image}.webp`} alt="" loading="lazy" />
            </figure>
          ))}
      </div>
    </section>
  )
}
