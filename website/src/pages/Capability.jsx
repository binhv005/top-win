import { usePageTitle } from '../hooks/useReveal.js'
import { departments, keyStats, factoryGallery } from '../content.js'
import Icon from '../components/Icon.jsx'
import Carousel from '../components/Carousel.jsx'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { SectionHead, StatsStrip, Gallery } from '../components/Blocks.jsx'

export default function Capability() {
  usePageTitle('Năng lực nhà máy')
  return (
    <>
      <PageHero
        eyebrow="Năng lực nhà máy"
        title="7 bộ phận, 250+ máy móc"
        lead="Nhà máy khép kín 7 bộ phận. Tự làm khuôn tại xưởng."
        image="injection-molding"
      />
      <StatsStrip items={keyStats} />

      <section className="section section--dark">
        <div className="container">
          <SectionHead title="Bộ phận sản xuất" />
          <Carousel label="Bộ phận sản xuất">
            {departments.map((d) => (
              <article className="dept-card" key={d.name}>
                <div className="dept-card__media">
                  <img src={`/images/${d.image}-sm.webp`} alt={`Bộ phận ${d.name}`} loading="lazy" />
                  <span className="dept-card__count">
                    {d.machines}
                    <small>máy</small>
                  </span>
                </div>
                <div className="dept-card__body">
                  <span className="service-card__icon">
                    <Icon name={d.icon} size={22} />
                  </span>
                  <h3 className="service-card__title">{d.name}</h3>
                  <p className="service-card__desc">{d.capability}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <SectionHead title="Máy móc theo bộ phận" />
          <div className="data-table" role="table" aria-label="Thiết bị theo bộ phận" data-reveal>
            <div className="data-table__row data-table__row--head" role="row">
              <span role="columnheader">Bộ phận</span>
              <span role="columnheader">Loại máy</span>
              <span role="columnheader">Số máy</span>
            </div>
            {departments.map((d) => (
              <div className="data-table__row" role="row" key={d.name}>
                <span role="cell" className="data-table__strong">
                  {d.name}
                </span>
                <span role="cell">{d.capability}</span>
                <span role="cell" className="data-table__num">
                  {d.machines}
                </span>
              </div>
            ))}
            <div className="data-table__row data-table__row--total" role="row">
              <span role="cell">Tổng cộng</span>
              <span role="cell" />
              <span role="cell" className="data-table__num">
                250+
              </span>
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
