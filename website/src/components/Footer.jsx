import { Link } from 'react-router-dom'
import { company, nav, products } from '../content.js'
import Icon from './Icon.jsx'

// Footer theo bố cục mẫu: dải navy viền trên cắt bậc; logo + link phía trên;
// thẻ sáng có tab nhô (logo lớn, nút báo giá, email dạng viên, icon liên hệ) và góc khuyết dưới trái.
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ft">
      <div className="container ft__top">
        <div className="ft__brand">
          <img className="ft__mark" src="/logo-topwin.png" alt="Top Win" width="480" height="330" />
        </div>
        <nav className="ft__links" aria-label="Liên kết chân trang">
          <ul>
            {nav.slice(0, 3).map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <ul>
            {nav.slice(3).map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <ul>
            {products.map((p) => (
              <li key={p.key}>
                <Link to={`/san-pham?nhom=${p.key}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container">
        <div className="ft__card-wrap">
          <p className="ft__tab-note">ISO 9001:2015 · MST {company.taxId}</p>
          <div className="ft__card">
            <div className="ft__card-main">
              <div className="ft__card-left">
                <img className="ft__wordmark" src="/logo-topwin.png" alt="" width="480" height="330" />
              </div>
              <div className="ft__card-right">
                <Link to="/lien-he#bao-gia" className="ft__cta">
                  Yêu cầu báo giá
                </Link>
                <div className="ft__map">
                  <iframe
                    title="Bản đồ nhà máy Top Win — KCN Sóng Thần 3, Bình Dương"
                    src={company.mapsEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="ft__card-foot">
              <p className="ft__address">{company.address}</p>
              <ul className="ft__icons">
                <li>
                  <a href={company.phoneHref} aria-label={`Gọi ${company.phone}`}>
                    <Icon name="phone" size={22} />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`} aria-label="Gửi email">
                    <Icon name="mail" size={22} />
                  </a>
                </li>
                <li>
                  <a href={company.mapsUrl} target="_blank" rel="noreferrer" aria-label="Mở Google Maps">
                    <Icon name="pin" size={22} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="ft__notch-note">
            © {year} {company.legalName}
          </p>
        </div>
      </div>
    </footer>
  )
}
