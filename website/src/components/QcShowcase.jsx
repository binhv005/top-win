import Icon from './Icon.jsx'

// Tiêu chuẩn nghiệm hàng — timeline zigzag: ô hình thoi có icon, số thứ tự nghiêng,
// tiêu đề màu + gạch chân, chỉ số và mô tả; các bước so le lên/xuống, nối bằng đường gấp khúc.
const icons = ['gear', 'press', 'clock', 'drop', 'check']
const colors = ['#2ec5e6', '#5a63ff', '#a24dff', '#ff3d8b', '#f26b1d']

export default function QcShowcase({ tests }) {
  const n = tests.length
  const pts = tests.map((_, i) => `${((i + 0.5) / n) * 1000},${i % 2 ? 214 : 104}`).join(' ')

  return (
    <div className="qc-flow">
      <svg className="qc-flow__line" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={pts} />
      </svg>
      <ol className="qc-flow__list">
        {tests.map((t, i) => (
          <li key={t.name} className="qc-step" style={{ '--c': colors[i % colors.length] }} data-reveal>
            <span className="qc-step__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="qc-step__tile" aria-hidden="true">
              <Icon name={icons[i % icons.length]} size={26} />
            </span>
            <h3 className="qc-step__title">{t.name}</h3>
            {t.standard && <p className="qc-step__value">{t.standard}</p>}
            <p className="qc-step__detail">{t.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
