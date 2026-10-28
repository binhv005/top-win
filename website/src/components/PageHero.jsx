import { Link } from 'react-router-dom'
import SpaceBackground from './SpaceBackground.jsx'

// Đầu trang con: ảnh nền nhà xưởng / sản phẩm phủ lớp xanh tối, khối pha lê đặc phía sau.
export default function PageHero({ eyebrow, title, lead, image = 'factory-floor' }) {
  return (
    <>
      <SpaceBackground />
      <section className="page-hero" style={{ '--bg': `url(/images/${image}.webp)`, '--bg-md': `url(/images/${image}-md.webp)` }}>
        <div className="container page-hero__inner">
          <nav className="breadcrumb mono-label" aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{eyebrow || title}</span>
          </nav>
          <h1 className="page-hero__title">{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
        </div>
      </section>
    </>
  )
}
