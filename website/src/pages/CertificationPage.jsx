import { usePageTitle } from '../hooks/useReveal.js'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'

// Theo quy định sử dụng dấu chứng nhận: ghi rõ chuẩn áp dụng và đây là chứng nhận hệ thống quản lý,
// không phải chứng nhận sản phẩm; không đặt logo ISO lên ảnh sản phẩm.
export default function CertificationPage() {
  usePageTitle('Chứng nhận ISO 9001:2015')
  return (
    <>
      <PageHero eyebrow="Chứng nhận" title="ISO 9001:2015" lead="Hệ thống quản lý chất lượng được chứng nhận." image="knife-block" />

      <section className="section section--light">
        <div className="container two-col two-col--center">
          <figure className="cert-logo" data-reveal>
            <img
              src="/images/iso-9001-act.png"
              alt="Dấu chứng nhận ACT — ISO 9001:2015"
              width="423"
              height="585"
            />
            <figcaption className="mono-label">Chứng nhận hệ thống quản lý chất lượng</figcaption>
          </figure>
          <div data-reveal>
            <h2 className="section-title">ISO 9001:2015</h2>
            <div className="prose">
              <p>Hệ thống quản lý chất lượng ISO 9001:2015.</p>
              <p className="fine">
                Chứng nhận áp dụng cho hệ thống quản lý chất lượng, không phải chứng nhận sản phẩm. Tra cứu hiệu lực chứng nhận tại{' '}
                <a href="https://www.iafcertsearch.org/" target="_blank" rel="noreferrer">
                  IAF CertSearch
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
