import { useEffect } from 'react'

// Thêm class "is-in" cho các phần tử [data-reveal] khi cuộn tới.
// Theo dõi cả phần tử được thêm sau (trang tải lazy, nội dung đổi) bằng MutationObserver.
export function useReveal() {
  useEffect(() => {
    const show = (el) => el.classList.add('is-in')
    if (!('IntersectionObserver' in window)) {
      const all = () => document.querySelectorAll('[data-reveal]').forEach(show)
      all()
      const mo = new MutationObserver(all)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in):not([data-observed])').forEach((el) => {
      el.setAttribute('data-observed', '')
      io.observe(el)
    })
    scan()
    let raf
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(scan)
    })
    mo.observe(document.body, { childList: true, subtree: true })
    // Cuộn nhanh (kéo thanh cuộn, phím End, link #) có thể bỏ qua IntersectionObserver:
    // hiện mọi phần tử đã nằm phía trên hoặc trong màn hình.
    let raf2
    const sweep = () => {
      cancelAnimationFrame(raf2)
      raf2 = requestAnimationFrame(() => {
        const limit = window.innerHeight * 0.92
        document.querySelectorAll('[data-observed]:not(.is-in)').forEach((el) => {
          if (el.getBoundingClientRect().top < limit) {
            show(el)
            io.unobserve(el)
          }
        })
      })
    }
    window.addEventListener('scroll', sweep, { passive: true })
    return () => {
      mo.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', sweep)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
    }
  }, [])
}

// Đặt tiêu đề tab trình duyệt cho từng trang.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Top Win` : 'Top Win — Nhà máy sản xuất OEM đồ gia dụng nhà bếp'
  }, [title])
}
