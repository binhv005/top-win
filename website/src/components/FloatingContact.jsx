import { useState } from 'react'
import { company } from '../content.js'
import QuickActions from './QuickActions.jsx'

const icons = {
  phone: <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />,
  mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" />,
  chat: <path d="M4 4h16v12H8l-4 4z" />,
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const links = [
    company.whatsapp && { label: 'WhatsApp', href: `https://wa.me/${company.whatsapp}`, icon: 'chat' },
    company.zalo && { label: 'Zalo', href: `https://zalo.me/${company.zalo}`, icon: 'chat' },
    { label: 'Email', href: `mailto:${company.email}`, icon: 'mail' },
    { label: 'Gọi điện', href: company.phoneHref, icon: 'phone' },
  ].filter(Boolean)

  return (
    <div className={`fab${open ? ' fab--open' : ''}`}>
      <ul className="fab__list" id="fab-list" hidden={!open}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                {icons[l.icon]}
              </svg>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <QuickActions />
      <button
        className="fab__toggle"
        aria-expanded={open}
        aria-controls="fab-list"
        aria-label={open ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          {open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" /> : icons.chat}
        </svg>
      </button>
    </div>
  )
}
