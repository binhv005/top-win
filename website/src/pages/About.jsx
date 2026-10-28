import { usePageTitle } from '../hooks/useReveal.js'
import { about, keyStats, factoryGallery } from '../content.js'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { SectionHead, StatsStrip, Gallery } from '../components/Blocks.jsx'

export default function About() {
  usePageTitle('Giới thiệu')
  return (
    <>
      <PageHero eyebrow="Giới thiệu" title="Giới thiệu Top Win" image="paint-line" />
      <StatsStrip items={keyStats} />

      <section className="section section--light">
        <div className="container two-col">
          <figure className="two-col__media" data-reveal>
            <img src="/images/factory-floor.webp" alt="Khu vực sản xuất trong nhà máy Top Win" loading="lazy" />
          </figure>
          <div data-reveal>
            <h2 className="section-title">Về Top Win</h2>
            <div className="prose">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Hình ảnh nhà máy" />
          <Gallery items={factoryGallery} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
