// Logo chính thức (public/logo-topwin.png — tách nền từ public/logo.png).
export default function Logo({ size = 'md' }) {
  return (
    <span className={`logo logo--${size}`}>
      <img className="logo__img" src="/logo-topwin.png" alt="Top Win" width="480" height="330" />
    </span>
  )
}
