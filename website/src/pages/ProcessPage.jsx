import { usePageTitle } from '../hooks/useReveal.js'
import { qcTests, caseStudies } from '../content.js'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { SectionHead } from '../components/Blocks.jsx'
import QcShowcase from '../components/QcShowcase.jsx'

export default function ProcessPage() {
  usePageTitle('Quy trình & Kiểm soát chất lượng')
  return (
    <>
      <PageHero
        eyebrow="Quy trình & QC"
        title="Kiểm soát chất lượng ở từng công đoạn"
        lead="Sản phẩm không đạt chất lượng được tách riêng và báo cán bộ quản lý."
        image="moisture-check"
      />

      <section className="section section--dark">
        <div className="container">
          <SectionHead title="Tiêu chuẩn nghiệm hàng" />
          <QcShowcase tests={qcTests} />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead title="Quy trình sản xuất theo sản phẩm" />
          <div className="grid grid--3">
            {caseStudies.map((c) => (
              <article className="case-card" key={c.name} data-reveal>
                <img src={`/images/${c.image}-sm.webp`} alt={c.name} loading="lazy" />
                <div className="case-card__body">
                  <h3>{c.name}</h3>
                  <ol>
                    {c.steps.map((s, k) => (
                      <li key={s}>
                        <span className="case-card__n">{String(k + 1).padStart(2, '0')}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
