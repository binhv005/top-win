# Top Win — Website (React + Vite)

Landing page B2B cho Top Win, bố cục lấy cảm hứng từ https://k95.it/en/studio, nội dung theo `../docs.md`.

## Chạy

```bash
npm install      # cache npm đặt ở ổ D qua file .npmrc
npm run dev      # http://localhost:5173
npm run build    # xuất ra dist/
npm run preview  # xem bản build tại http://localhost:4173
```

## Các trang

| Đường dẫn | Trang | File |
|---|---|---|
| `/` | Trang chủ | `src/pages/Home.jsx` |
| `/gioi-thieu` | Giới thiệu | `src/pages/About.jsx` |
| `/san-pham` | Sản phẩm (neo `#dung-cu-nha-bep`, `#day-sat`…) | `src/pages/Products.jsx` |
| `/nang-luc` | Năng lực nhà máy | `src/pages/Capability.jsx` |
| `/quy-trinh` | Quy trình & QC | `src/pages/ProcessPage.jsx` |
| `/chung-nhan` | Chứng nhận ISO | `src/pages/CertificationPage.jsx` |
| `/oem` | Dịch vụ OEM | `src/pages/Oem.jsx` |
| `/tuyen-dung` | Tuyển dụng | `src/pages/CareersPage.jsx` |
| `/lien-he` | Liên hệ & form báo giá (`?san-pham=...` điền sẵn nhóm sản phẩm) | `src/pages/Contact.jsx` |

**Khi đưa lên hosting:** web dùng React Router (BrowserRouter), nên server phải trả `index.html` cho mọi đường dẫn — ví dụ Netlify: file `public/_redirects` với dòng `/* /index.html 200`; Vercel / Cloudflare Pages tự xử lý; Nginx: `try_files $uri /index.html;`.

## Chỉnh nội dung

Toàn bộ chữ, số liệu và thông tin liên hệ nằm trong `src/content.js`.

| Cần làm | Sửa ở đâu |
|---|---|
| Thêm WhatsApp / Zalo (nút liên hệ nổi tự hiện) | `company.whatsapp`, `company.zalo` |
| Form báo giá gửi thẳng về server thay vì mở ứng dụng email | `company.quoteEndpoint` (Formspree hoặc API riêng) |
| Vị trí tuyển dụng | `jobs` |
| Thay ảnh | `public/images/*.jpg` (giữ nguyên tên file hoặc đổi tên trong `content.js`) |
| Thay logo chữ tạm bằng logo chính thức | `src/components/Logo.jsx` |

## Thiết kế (theo https://showcase.noomoagency.com/)

| Noomo Showcase | Top Win |
|---|---|
| Preloader thanh % + nút "Get started" | Preloader "TOP ▭ WIN" + nút "Bắt đầu" (chỉ hiện 1 lần mỗi phiên) |
| Cảnh WebGL: khối pha lê chứa ảnh dự án, mảnh kính, bụi sáng, camera bay theo cuộn | `src/three/space.js` (three.js) — 8 khối: Top Win, 5 nhóm sản phẩm, Năng lực, QC/ISO |
| Bảng "Project / Info" + nút "VIEW CASE STUDY" + tag | Bảng "Hạng mục / Thông tin" + nút "XEM CHI TIẾT" dẫn tới trang tương ứng |
| Nhãn xanh bám theo khối pha lê | `.journey__chip`, vị trí tính từ toạ độ 3D mỗi khung hình |
| Màn kết "WITH US IT HAPPENS. HELLO@…" | "Với Top Win, bản vẽ thành sản phẩm." + email + liên kết |
| Font PP Neue Montreal / mono | Inter Tight + Space Mono (bản quyền mở, có tiếng Việt) |

- Nội dung các khối pha lê: mảng `journey` trong `src/content.js`.
- Trang con dùng `SpaceBackground` (1 khối pha lê mang ảnh của trang) + thẻ kính mờ.
- Máy không hỗ trợ WebGL: tự chuyển sang ảnh tĩnh cắt hình pha lê, nội dung vẫn đầy đủ.
- Màu: đen `#000`, xanh điện `#0004eb`, chữ `#d2e0ff`; cam logo `#f26b1d` chỉ làm điểm nhấn (`:root` trong `src/styles.css`).
