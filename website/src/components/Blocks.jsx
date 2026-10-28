import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Nhãn nhỏ màu nhấn + tiêu đề khối (như "SHËRBIMET TONA / Zgjidhje profesionale…" của template).
export function SectionHead({ title, desc, center = false }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`} data-reveal>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  )
}

// Số chạy tăng dần từ 0 khi cuộn tới (vd "250+" → 0…250 rồi thêm "+"); chữ không có số thì giữ nguyên.
export function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null)
  const match = /^(\D*)(\d+)(.*)$/.exec(String(value))
  const target = match ? Number(match[2]) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setN(target)
      return
    }
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (t) => {
          const p = Math.min((t - start) / duration, 1)
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration, !!match])

  if (!match) return value
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {n}
        <span className="count__suffix">{match[3]}</span>
      </span>
    </span>
  )
}

export function StatsStrip({ items }) {
  return (
    <section className="stats-strip" aria-label="Số liệu nổi bật">
      <dl className="container stats-strip__grid">
        {items.map((s) => (
          <div className="stat" key={s.label} data-reveal>
            <Icon name={s.icon} size={30} className="stat__icon" />
            <dd className="stat__value">
              <CountUp value={s.value} />
            </dd>
            <dt className="stat__label">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

// Lưới ảnh có chú thích ("Bên trong nhà máy").
export function Gallery({ items }) {
  return (
    <ul className="gallery">
      {items.map((g) => (
        <li key={g.image} data-reveal>
          <figure>
            <img src={`/images/${g.image}-sm.webp`} alt={g.caption} loading="lazy" />
            <figcaption className="mono-label">{g.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
