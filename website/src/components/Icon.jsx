// Bộ icon nét (stroke) dùng chung, vẽ trên lưới 24×24.
const paths = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3m0 13v3M2.5 12h3m13 0h3M5.3 5.3l2.1 2.1m9.2 9.2 2.1 2.1M5.3 18.7l2.1-2.1m9.2-9.2 2.1-2.1" />
    </>
  ),
  press: <path d="M4 3h16v4H4zM8 7v5h8V7M10 12v3h4v-3M3 21h18M6 21v-4h12v4" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  drawing: <path d="M4 20h16M4 20V4h11l5 5v11M15 4v5h5M8 15l3-3 2 2 3-4" />,
  box: <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v0M4 7.5l8 4.5 8-4.5M12 12v9" />,
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8.1 8 9 4.6-.9 8-4.5 8-9V6l-8-3Zm-3.5 9 2.5 2.5 4.5-5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  saw: <path d="M3 17 17 3l4 4L7 21H3v-4Zm5-5 4 4m-1-7 4 4" />,
  wire: <path d="M4 4h16v16H4zM4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" />,
  drop: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />,
  mold: <path d="M3 5h18v5H3zM3 14h18v5H3zM8 10v4m8-4v4" />,
  spark: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />,
  mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2" />
    </>
  ),
  chat: <path d="M4 4h16v12H8l-4 4V4Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  file: <path d="M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6m-6 4h6" />,
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.7 }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
