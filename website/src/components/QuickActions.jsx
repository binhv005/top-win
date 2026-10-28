import { useEffect, useState } from 'react'
import { company } from '../content.js'
import Icon from './Icon.jsx'

// Nút lên đầu trang + nút gọi điện, xếp trên nút nhắn tin ở góc phải (lên đầu trang → gọi → nhắn tin).
export default function QuickActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <div className="quick-actions">
      <a className="quick-actions__btn quick-actions__btn--call" href={company.phoneHref} aria-label={`Gọi ${company.phone}`}>
        <Icon name="phone" size={22} />
        <span className="quick-actions__tip">{company.phone}</span>
      </a>
      <button
        type="button"
        className={`quick-actions__btn quick-actions__btn--top${showTop ? ' is-visible' : ''}`}
        aria-label="Lên đầu trang"
        tabIndex={showTop ? 0 : -1}
        onClick={toTop}
      >
        <Icon name="arrow" size={22} strokeWidth={2.2} />
      </button>
    </div>
  )
}
