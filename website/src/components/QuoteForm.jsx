import { useState } from 'react'
import { company, products } from '../content.js'

export default function QuoteForm({ product, setProduct }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [errors, setErrors] = useState({})

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next = {}
    for (const f of ['name', 'company', 'email', 'product', 'quantity']) {
      if (!String(data.get(f) || '').trim()) next[f] = 'Vui lòng nhập thông tin này'
    }
    const email = String(data.get('email') || '')
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Email chưa đúng định dạng'
    if (!data.get('consent')) next.consent = 'Vui lòng đồng ý để chúng tôi liên hệ lại'
    const file = data.get('drawing')
    if (file && file.size > 10 * 1024 * 1024) next.drawing = 'Tệp đính kèm tối đa 10 MB'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    if (company.quoteEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(company.quoteEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        form.reset()
      } catch {
        setStatus('error')
      }
      return
    }

    // Chưa có backend: mở ứng dụng email với nội dung đã điền sẵn.
    const lines = [
      `Họ tên: ${data.get('name')}`,
      `Công ty: ${data.get('company')}`,
      `Email: ${data.get('email')}`,
      `Điện thoại / WhatsApp: ${data.get('phone') || '-'}`,
      `Nhóm sản phẩm: ${data.get('product')}`,
      `Số lượng: ${data.get('quantity')} ${data.get('unit')}`,
      '',
      `Mô tả: ${data.get('description')}`,
      file && file.name ? `\n(Vui lòng đính kèm tệp "${file.name}" vào email này.)` : '',
    ]
    const href = `mailto:${company.email}?subject=${encodeURIComponent(`Yêu cầu báo giá — ${data.get('company')}`)}&body=${encodeURIComponent(lines.join('\n'))}`
    window.location.href = href
    setStatus('mailto')
  }

  const err = (f) =>
    errors[f] ? (
      <span className="field__error" id={`${f}-error`}>
        {errors[f]}
      </span>
    ) : null
  const aria = (f) => (errors[f] ? { 'aria-invalid': true, 'aria-describedby': `${f}-error` } : {})

  return (
    <section className="quote" id="bao-gia" aria-labelledby="quote-title">
      <div className="quote__grid">
        <div className="quote__intro">
          <h2 className="section-title" id="quote-title">
            Yêu cầu báo giá
          </h2>
          <p>Sản phẩm, số lượng, đính kèm bản vẽ.</p>
          <p className="quote__small">
            Hoặc liên hệ trực tiếp {company.contactPerson}: <a href={company.phoneHref}>{company.phone}</a> ·{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>

        {status === 'sent' ? (
          <div className="quote__done" role="status">
            <p>Cảm ơn bạn. Chúng tôi đã nhận được yêu cầu và sẽ phản hồi sớm nhất.</p>
            <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
              Gửi yêu cầu khác
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>Họ tên *</span>
              <input name="name" autoComplete="name" {...aria('name')} />
              {err('name')}
            </label>
            <label className="field">
              <span>Công ty *</span>
              <input name="company" autoComplete="organization" {...aria('company')} />
              {err('company')}
            </label>
            <label className="field">
              <span>Email *</span>
              <input name="email" type="email" autoComplete="email" {...aria('email')} />
              {err('email')}
            </label>
            <label className="field">
              <span>Điện thoại / WhatsApp</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className="field">
              <span>Nhóm sản phẩm *</span>
              <select name="product" value={product} onChange={(e) => setProduct(e.target.value)} {...aria('product')}>
                <option value="" disabled>
                  Chọn nhóm sản phẩm
                </option>
                {products.map((p) => (
                  <option key={p.key}>{p.name}</option>
                ))}
                <option>Khác</option>
              </select>
              {err('product')}
            </label>
            <label className="field field--wide">
              <span>Mô tả sản phẩm</span>
              <textarea name="description" rows="4" />
            </label>
            <div className="field field--qty">
              <label htmlFor="quantity">Số lượng dự kiến *</label>
              <div className="field__inline">
                <input id="quantity" name="quantity" type="number" min="1" {...aria('quantity')} />
                <select name="unit" aria-label="Đơn vị số lượng" defaultValue="pcs/đơn hàng">
                  <option>pcs/đơn hàng</option>
                  <option>pcs/năm</option>
                </select>
              </div>
              {err('quantity')}
            </div>
            <label className="field field--wide field--file">
              <span>Đính kèm bản vẽ / ảnh mẫu (PDF, DWG, DXF, STEP, JPG, PNG — tối đa 10 MB)</span>
              <input name="drawing" type="file" accept=".pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png" {...aria('drawing')} />
              {err('drawing')}
            </label>
            <label className="field field--wide field--check">
              <input name="consent" type="checkbox" {...aria('consent')} />
              <span>Tôi đồng ý để Top Win sử dụng thông tin này nhằm liên hệ và báo giá. *</span>
              {err('consent')}
            </label>
            <div className="field--wide form__actions">
              <button className="btn btn--accent" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Đang gửi…' : 'Gửi yêu cầu báo giá →'}
              </button>
              {status === 'mailto' && (
                <p className="form__status" role="status">
                  Ứng dụng email của bạn đã được mở với nội dung điền sẵn — vui lòng đính kèm bản vẽ (nếu có) và bấm gửi.
                </p>
              )}
              {status === 'error' && (
                <p className="form__status form__status--error" role="alert">
                  Chưa gửi được yêu cầu. Vui lòng thử lại hoặc email trực tiếp {company.email}.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
