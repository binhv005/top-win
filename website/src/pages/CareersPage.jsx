import { usePageTitle } from '../hooks/useReveal.js'
import { company, jobs } from '../content.js'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import { SectionHead } from '../components/Blocks.jsx'

export default function CareersPage() {
  usePageTitle('Tuyển dụng')
  return (
    <>
      <PageHero
        eyebrow="Tuyển dụng"
        title="Gia nhập đội ngũ Top Win"
        lead="Môi trường sản xuất bài bản theo tiêu chuẩn ISO, ban lãnh đạo người Đài Loan."
        image="packing"
      />

      <section className="section section--light">
        <div className="container">
          <SectionHead title="Các vị trí thường xuyên tuyển" desc={`Gửi CV qua email hoặc gọi ${company.phone} để biết vị trí đang tuyển.`} />
          <ul className="job-list">
            {jobs.map((j) => (
              <li key={j} data-reveal>
                <span className="job-list__name">{j}</span>
                <span className="job-list__place">
                  <Icon name="pin" size={16} /> Bình Dương
                </span>
                <a className="btn btn--outline btn--sm" href={`mailto:${company.email}?subject=${encodeURIComponent(`Ứng tuyển — ${j}`)}`}>
                  Ứng tuyển <Icon name="arrow" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  )
}
