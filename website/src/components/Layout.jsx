import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingContact from './FloatingContact.jsx'

// Đổi trang → về đầu trang; có #hash → cuộn tới phần tử tương ứng.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function Layout() {
  useScrollOnNavigate()
  useReveal()

  // Tải trước code các trang khi trình duyệt rảnh → chuyển trang hiện ngay
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const id = idle(() => {
      import('../pages/About.jsx')
      import('../pages/Products.jsx')
      import('../pages/ProductDetail.jsx')
      import('../pages/Capability.jsx')
      import('../pages/ProcessPage.jsx')
      import('../pages/CertificationPage.jsx')
      import('../pages/CareersPage.jsx')
      import('../pages/Contact.jsx')
    })
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Bỏ qua tới nội dung
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
