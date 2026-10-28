import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/useReveal.js'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'

export default function NotFound() {
  usePageTitle('Không tìm thấy trang')
  return (
    <>
      <PageHero eyebrow="404" title="Không tìm thấy trang" lead="Trang bạn tìm không tồn tại hoặc đã được di chuyển." />
      <section className="section section--light">
        <div className="container">
          <Link to="/" className="btn btn--accent">
            Về trang chủ <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
