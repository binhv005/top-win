import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/useReveal.js'
import { afterLoadIdle, hasHardwareGL } from '../three/defer.js'
import { company, journey, keyStats } from '../content.js'

const N = journey.length
// Trang chủ: hành trình 3D qua các khối pha lê (theo phong cách Noomo Showcase).
export default function Home() {
  usePageTitle('')
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const chipRef = useRef(null)
  const panelRef = useRef(null)
  const panelSize = useRef({ w: 0, h: 0 })
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !('ResizeObserver' in window)) return
    const ro = new ResizeObserver(([e]) => {
      panelSize.current = { w: e.target.offsetWidth, h: e.target.offsetHeight }
    })
    ro.observe(panel)
    return () => ro.disconnect()
  })
  const engineRef = useRef(null)
  const activeRef = useRef(0)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState('journey') // journey | end | after

  // Đặt bảng thông tin ngay cạnh khối pha lê đang xem (phía còn trống của màn hình),
  // kèm đường nối từ mép khối sang bảng; bảng mờ dần khi khối ở xa hoặc đã bay qua.
  const placePanel = (info, narrow) => {
    const panel = panelRef.current
    if (!panel) return
    const ok = info && [info.x, info.y, info.r, info.dist].every(Number.isFinite)
    if (narrow || !ok) {
      panel.style.transform = ''
      panel.style.opacity = narrow ? '1' : '0'
      return
    }
    const W = window.innerWidth
    const H = window.innerHeight
    // kích thước bảng được cache (ResizeObserver) — tránh đo lại bố cục mỗi khung hình
    const pw = panelSize.current.w || panel.offsetWidth
    const ph = panelSize.current.h || panel.offsetHeight
    const gap = 56
    const onLeft = info.x < W / 2
    let x = onLeft ? info.x + info.r + gap : info.x - info.r - gap - pw
    x = Math.max(24, Math.min(W - pw - 24, x))
    let y = info.y - ph / 2
    y = Math.max(130, Math.min(H - ph - 32, y))
    const fade = info.dist < 3 ? Math.max(0, (info.dist - 1.5) / 1.5) : info.dist > 12 ? Math.max(0, (15 - info.dist) / 3) : 1
    panel.style.opacity = fade.toFixed(2)
    panel.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`
    panel.dataset.side = onLeft ? 'right' : 'left'
    // độ dài đường nối từ mép khối tới bảng
    const lineLen = onLeft ? x - (info.x + info.r) : info.x - info.r - (x + pw)
    panel.style.setProperty('--line', `${Math.max(0, Math.round(lineLen))}px`)
  }

  // Khởi tạo cảnh 3D
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 640px)')
    let raf
    const tick = () => {
      const chip = chipRef.current
      const pos = engine.screenPos(activeRef.current)
      if (chip) {
        if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y) && pos.dist > 2.5 && pos.dist < 14) {
          chip.style.opacity = '1'
          chip.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`
        } else {
          chip.style.opacity = '0'
        }
      }
      placePanel(engine.screenInfo(activeRef.current), narrow.matches)
      raf = requestAnimationFrame(tick)
    }
    let engine
    let dead = false
    const cancel = afterLoadIdle(() =>
      !hasHardwareGL()
        ? setFailed(true)
        : import('../three/space.js').then(({ createSpace }) => {
        if (dead) return
        engine = createSpace(canvasRef.current, {
          images: journey.map((j) => `/images/${j.image}-sm.webp`),
          mode: 'journey',
        })
        engineRef.current = engine
        raf = requestAnimationFrame(tick)
      }).catch(() => setFailed(true)),
    )
    return () => {
      dead = true
      cancel()
      cancelAnimationFrame(raf)
      engine?.dispose()
      engineRef.current = null
    }
  }, [])

  // Cuộn trang → tiến độ hành trình
  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const range = wrap.offsetHeight - window.innerHeight
      const f = Math.max(0, Math.min(1, window.scrollY / range))
      const pN = f * (N + 0.5)
      engineRef.current?.setProgress(pN / N)
      const idx = Math.max(0, Math.min(N - 1, Math.floor(pN + 0.3)))
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
      setPhase(window.scrollY > range + 10 ? 'after' : pN > N - 0.1 ? 'end' : 'journey')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const item = journey[active]

  return (
    <>
      <div className="journey" ref={wrapRef} style={{ height: `${(N + 1.5) * 100}vh` }}>
        <div className="journey__stage" aria-hidden="true">
          {!failed && <canvas ref={canvasRef} className="journey__canvas" />}
          {failed && <img className="journey__fallback" src={`/images/${item.image}-sm.webp`} alt="" key={item.image} />}
          <div className="space-bg__grain" />
          <span ref={chipRef} className="journey__chip">
            {item.name}
          </span>
        </div>

        <h1 className="visually-hidden">Top Win — nhà máy sản xuất OEM đồ gia dụng nhà bếp tại Việt Nam</h1>

        {phase === 'journey' && (
          <>
            <section
              className={`journey__panel${failed ? ' journey__panel--static' : ''}`}
              aria-live="polite"
              ref={panelRef}
              style={{ opacity: failed ? 1 : 0 }}
            >
              <div className="journey__card" key={active}>
                <p className="mono-label">{item.label}</p>
                <h2 className="journey__name">{item.name}</h2>
                <p className="journey__desc">{item.info}</p>
                <ul className="pill-list">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link to={item.to} className="case-btn">
                  Xem chi tiết
                </Link>
              </div>
            </section>
            <ol className="journey__dots" aria-label={`Mục ${active + 1} / ${N}`}>
              {journey.map((j, i) => (
                <li key={j.name} className={i === active ? 'is-active' : ''} />
              ))}
            </ol>
          </>
        )}

        {active === 0 && phase === 'journey' && (
          <p className="journey__hint mono-label" aria-hidden="true">
            Cuộn để khám phá ↓
          </p>
        )}

        <section className={`journey__end${phase !== 'journey' ? ' is-visible' : ''}`} aria-labelledby="end-title">
          <h2 className="glow-title end__email" id="end-title">
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </h2>

          <dl className="end__stats">
            {keyStats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
            <div>
              <dt>Chứng nhận</dt>
              <dd>ISO 9001:2015</dd>
            </div>
          </dl>

          <ul className="journey__links">
            <li>
              <Link to="/lien-he#bao-gia" className="end__cta">
                Yêu cầu báo giá
              </Link>
            </li>
            <li>
              <a href={company.phoneHref}>Gọi điện</a>
            </li>
            <li>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                Google Maps
              </a>
            </li>
          </ul>
        </section>
      </div>

    </>
  )
}
