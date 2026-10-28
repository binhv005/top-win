import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../content.js'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

// Logo nằm giữa header (bấm để về trang chủ); menu chia đều hai bên.
const half = Math.ceil(nav.length / 2)
const navLeft = nav.slice(0, half)
const navRight = nav.slice(half)

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.body.classList.toggle('menu-open', open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`header${solid ? ' header--solid' : ''}${solid && pathname !== '/' ? ' header--filled' : ''}${open ? ' header--open' : ''}`}>
      <div className="header__inner container">
        <nav className="header__nav header__nav--left" aria-label="Điều hướng chính">
          {navLeft.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="header__logo" aria-label="Top Win — Trang chủ">
          <Logo />
        </Link>

        <div className="header__right">
          <nav className="header__nav" aria-label="Điều hướng phụ">
            {navRight.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/lien-he#bao-gia" className="mail-btn header__cta">
            Báo giá
            <span className="mail-btn__arrow">
              <Icon name="arrow" size={14} strokeWidth={2.2} />
            </span>
          </Link>

          <button
            className="header__burger"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
        <Link to="/lien-he#bao-gia" className="case-btn">
          Yêu cầu báo giá
        </Link>
      </div>
    </header>
  )
}
