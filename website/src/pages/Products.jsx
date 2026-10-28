import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../hooks/useReveal.js'
import { products, catalog } from '../content.js'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'

// Trang danh mục (bố cục theo haprocraft.com): thanh lọc nhóm + từ khóa, lưới thẻ sản phẩm 4 cột.
export default function Products() {
  const [params, setParams] = useSearchParams()
  const group = params.get('nhom') || ''
  const q = params.get('q') || ''
  const current = products.find((p) => p.key === group)
  usePageTitle(current ? current.name : 'Sản phẩm')

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return catalog.filter((c) => (!group || c.groups.includes(group)) && (!kw || c.name.toLowerCase().includes(kw) || (c.code || '').includes(kw)))
  }, [group, q])

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageHero eyebrow="Sản phẩm" title={current ? current.name : 'Danh mục sản phẩm'} image="wood-blocks" />

      <section className="section cat">
        <div className="container">
          <div className="cat__bar">
            <nav className="cat__crumb mono-label" aria-label="Breadcrumb">
              <Link to="/">Trang chủ</Link> <span>»</span> <Link to="/san-pham">Sản phẩm</Link>
              {current && (
                <>
                  {' '}
                  <span>»</span> <em>{current.name}</em>
                </>
              )}
            </nav>
            <Link to="/lien-he#bao-gia" className="cat__request">
              <Icon name="box" size={20} />
              <span>
                <strong>Yêu cầu báo giá</strong>
                Sản phẩm, số lượng, bản vẽ
              </span>
            </Link>
          </div>

          <div className="cat__filters">
            <label>
              <span className="visually-hidden">Nhóm sản phẩm</span>
              <select value={group} onChange={(e) => update('nhom', e.target.value)}>
                <option value="">Tất cả nhóm sản phẩm</option>
                {products.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="cat__search">
              <span className="visually-hidden">Từ khóa</span>
              <input type="search" placeholder="Từ khóa…" value={q} onChange={(e) => update('q', e.target.value)} />
            </label>
          </div>

          {list.length === 0 ? (
            <p className="cat__empty">Không có sản phẩm phù hợp.</p>
          ) : (
            <ul className="cat__grid">
              {list.map((c) => (
                <li key={c.slug} className="pcard">
                  <Link to={`/san-pham/${c.slug}`} className="pcard__media">
                    <img src={`/images/${c.images[0]}-sm.webp`} alt={c.name} loading="lazy" />
                  </Link>
                  <h2 className="pcard__name">
                    <Link to={`/san-pham/${c.slug}`}>{c.name}</Link>
                  </h2>
                  {c.code && <p className="pcard__code">Mã {c.code}</p>}
                  <Link to={`/san-pham/${c.slug}`} className="pcard__more">
                    <span className="pcard__plus" aria-hidden="true">+</span> Xem chi tiết
                  </Link>
                  <Link
                    to={`/lien-he?san-pham=${encodeURIComponent(products.find((p) => p.key === c.groups[0]).name)}#bao-gia`}
                    className="pcard__quote"
                  >
                    <Icon name="box" size={14} /> Yêu cầu báo giá
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
