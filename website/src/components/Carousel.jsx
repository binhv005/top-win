import { Children, useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// Hàng trượt ngang: cuộn/vuốt để xem, nút ‹ ›, chấm vị trí, tự trượt mỗi `interval` ms.
// Tạm dừng khi rê chuột / focus vào hàng, khi tab bị ẩn hoặc khi người dùng bật giảm chuyển động.
export default function Carousel({ children, interval = 5000, label }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = Children.count(children)

  const scrollToIndex = useCallback((i) => {
    const track = trackRef.current
    if (!track) return
    const items = track.children
    const n = ((i % items.length) + items.length) % items.length
    track.scrollTo({ left: items[n].offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  // Cập nhật chấm theo vị trí cuộn thực tế
  useEffect(() => {
    const track = trackRef.current
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const items = [...track.children]
        const left = track.scrollLeft + track.offsetLeft
        let best = 0
        items.forEach((el, k) => {
          if (Math.abs(el.offsetLeft - left) < Math.abs(items[best].offsetLeft - left)) best = k
        })
        // ở cuối hàng: chọn thẻ cuối
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = items.length - 1
        setIndex(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Tự trượt
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (document.hidden) return
      const track = trackRef.current
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
      scrollToIndex(atEnd ? 0 : index + 1)
    }, interval)
    return () => clearInterval(id)
  }, [paused, index, interval, scrollToIndex])

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
    >
      <div className="carousel__track" ref={trackRef} tabIndex={0}>
        {children}
      </div>
      <div className="carousel__controls">
        <button type="button" className="carousel__btn carousel__btn--prev" aria-label="Trước" onClick={() => scrollToIndex(index - 1)}>
          <Icon name="arrow" size={18} strokeWidth={2.2} />
        </button>
        <ol className="carousel__dots">
          {Array.from({ length: count }, (_, k) => (
            <li key={k}>
              <button
                type="button"
                aria-label={`Đến mục ${k + 1}`}
                aria-current={k === index}
                className={k === index ? 'is-active' : ''}
                onClick={() => scrollToIndex(k)}
              />
            </li>
          ))}
        </ol>
        <button type="button" className="carousel__btn" aria-label="Tiếp" onClick={() => scrollToIndex(index + 1)}>
          <Icon name="arrow" size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  )
}
