import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../hooks/useReveal.js'
import { company } from '../content.js'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import QuoteForm from '../components/QuoteForm.jsx'

export default function Contact() {
  usePageTitle('Liên hệ & Báo giá')
  const [params] = useSearchParams()
  const [product, setProduct] = useState(params.get('san-pham') || '')

  const info = [
    { icon: 'pin', label: 'Địa chỉ', value: <a href={company.mapsUrl} target="_blank" rel="noreferrer">{company.address}</a> },
    { icon: 'phone', label: 'Điện thoại', value: <a href={company.phoneHref}>{company.phone}</a> },
    { icon: 'mail', label: 'Email', value: <a href={`mailto:${company.email}`}>{company.email}</a> },
  ]

  return (
    <>
      <PageHero eyebrow="Liên hệ" title="Liên hệ & yêu cầu báo giá" lead={company.legalName} image="shrink-wrap" />

      <section className="section section--light">
        <div className="container">
          <div className="contact-main">
            <QuoteForm product={product} setProduct={setProduct} />
            <div className="contact-map" data-reveal>
              <article className="contact-card">
                <h2 className="contact-card__title">Thông tin liên hệ</h2>
                <ul className="contact-card__list">
                  {info.map((i) => (
                    <li key={i.label}>
                      <span className="contact-card__icon">
                        <Icon name={i.icon} size={20} />
                      </span>
                      <div>
                        <p className="contact-card__label">{i.label}</p>
                        <p className="contact-card__value">{i.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
              <div className="contact-photos">
                {[
                  ['factory-floor', 'Khu vực sản xuất'],
                  ['wire-payoff', 'Bộ phận dây sắt'],
                ].map(([img, cap]) => (
                  <figure key={img}>
                    <img src={`/images/${img}-sm.webp`} alt={cap} loading="lazy" />
                    <figcaption className="mono-label">{cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
