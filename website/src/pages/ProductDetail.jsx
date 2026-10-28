import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePageTitle } from '../hooks/useReveal.js'
import { products, catalog } from '../content.js'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import NotFound from './NotFound.jsx'

// Trang chi tiết sản phẩm (bố cục theo haprocraft.com): ảnh thumbnail dọc + ảnh lớn, bảng chi tiết bên phải,
// nút yêu cầu báo giá và "Có thể bạn quan tâm".
export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = catalog.find((c) => c.slug === slug)
  const [img, setImg] = useState(0)
  usePageTitle(item ? item.name : 'Sản phẩm')

  useEffect(() => {
    setImg(0)
  }, [slug])

  if (!item) return <NotFound />

  const group = products.find((p) => p.key === item.groups[0])
  const related = catalog.filter((c) => c.slug !== slug && c.groups.some((g) => item.groups.includes(g))).slice(0, 4)

  return (
    <>
      <PageHero eyebrow="Sản phẩm" title={group.name} image={item.images[0]} />

      <section className="section pd">
        <div className="container">
          <div className="cat__bar">
            <nav className="cat__crumb mono-label" aria-label="Breadcrumb">
              <Link to="/">Trang chủ</Link> <span>»</span> <Link to="/san-pham">Sản phẩm</Link> <span>»</span>{' '}
              <Link to={`/san-pham?nhom=${group.key}`}>{group.name}</Link> <span>»</span> <em>{item.name}</em>
            </nav>
          </div>

          <button type="button" className="pd__back" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/san-pham'))}>
            <Icon name="arrow" size={16} /> Quay lại
          </button>

          <div className="pd__main">
            <div className="pd__gallery">
              {item.images.length > 1 && (
                <ul className="pd__thumbs">
                  {item.images.map((im, i) => (
                    <li key={im}>
                      <button type="button" className={i === img ? 'is-active' : ''} onClick={() => setImg(i)} aria-label={`Ảnh ${i + 1}`}>
                        <img src={`/images/${im}-sm.webp`} alt="" loading="lazy" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <figure className="pd__photo">
                <img src={`/images/${item.images[img]}.webp`} alt={item.name} key={item.images[img]} />
              </figure>
            </div>

            <div className="pd__info">
              <h1 className="pd__title">
                {item.code ? (
                  <>
                    Mã sản phẩm: <span>{item.code}</span>
                  </>
                ) : (
                  <span>{item.name}</span>
                )}
              </h1>
              {item.code && <p className="pd__sub">{item.name}</p>}

              <h2 className="pd__heading">Chi tiết sản phẩm</h2>
              <dl className="pd__specs">
                <div>
                  <dt>Nhóm sản phẩm</dt>
                  <dd>{item.groups.map((g) => products.find((p) => p.key === g).name).join(', ')}</dd>
                </div>
                {item.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              {item.packing && (
                <>
                  <h2 className="pd__heading">Đóng gói</h2>
                  <p className="pd__text">{item.packing}</p>
                </>
              )}

              {item.process && (
                <>
                  <h2 className="pd__heading">Quy trình sản xuất</h2>
                  <ol className={`pd__process${item.process.length > 4 ? ' pd__process--cols' : ''}`}>
                    {item.process.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </>
              )}

              <Link to={`/lien-he?san-pham=${encodeURIComponent(group.name)}#bao-gia`} className="pd__quote">
                Yêu cầu báo giá
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="pd__more">
              <h2 className="pd__more-title">Có thể bạn quan tâm</h2>
              <ul className="cat__grid">
                {related.map((c) => (
                  <li key={c.slug} className="pcard pcard--mini">
                    <Link to={`/san-pham/${c.slug}`} className="pcard__media">
                      <img src={`/images/${c.images[0]}-sm.webp`} alt={c.name} loading="lazy" />
                    </Link>
                    <h3 className="pcard__name">
                      <Link to={`/san-pham/${c.slug}`}>{c.name}</Link>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
