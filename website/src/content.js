// Nội dung website — chỉ lấy từ brief (docs.md) và tài liệu dự án (file quy trình, BOM, danh sách máy, hồ sơ ISO).
// Các giá trị để trống ('') là thông tin còn chờ khách hàng cung cấp; thành phần liên quan sẽ tự ẩn.

export const company = {
  name: 'Top Win',
  legalName: 'Công ty TNHH Top Win Việt Nam',
  address: 'Lô CN1, Đường Số 3, KCN Sóng Thần 3, Bình Dương, Hồ Chí Minh, Việt Nam',
  phone: '0274 381 5899',
  phoneHref: 'tel:+842743815899',
  fax: '0650.3815899', // theo Giấy chứng nhận ĐKDN (mã vùng cũ)
  email: 'ctytopwinvn@gmail.com',
  taxId: '3700775738',
  contactPerson: 'Thủy Tiên',
  mapsUrl: 'https://maps.app.goo.gl/6pPS8fuYWkQuCTNK7',
  mapsEmbed:
    'https://www.google.com/maps?q=KCN+S%C3%B3ng+Th%E1%BA%A7n+3,+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t,+B%C3%ACnh+D%C6%B0%C6%A1ng&output=embed',
  whatsapp: '', // ví dụ: '84901234567' — chờ khách cung cấp
  zalo: '', // ví dụ: '0901234567' — chờ khách cung cấp
  // Endpoint nhận form báo giá (Formspree, API riêng…). Để trống → mở ứng dụng email.
  quoteEndpoint: '',
}

export const nav = [
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/nang-luc', label: 'Năng lực' },
  { to: '/quy-trinh', label: 'Quy trình' },
  { to: '/chung-nhan', label: 'Chứng nhận' },
  { to: '/tuyen-dung', label: 'Tuyển dụng' },
  { to: '/lien-he', label: 'Liên hệ' },
]

export const about = {
  paragraphs: [
    'Top Win — xưởng sản xuất (cơ khí, in ấn, bao bì) tại Lô CN1, Đường Số 3, KCN Sóng Thần 3, Bình Dương. Ban lãnh đạo người Đài Loan.',
    'Sản phẩm: dụng cụ nhà bếp (dao gọt vỏ / dao bào); sản phẩm dây sắt (vỉ / giá làm nguội bánh 10×15, 10×16 inch, lưới hàn); sản phẩm, chi tiết gỗ gia dụng (CNC, tiện, chà nhám); sản phẩm nhựa ép, nhúng PE; gia công khuôn mẫu và dập kim loại theo bản vẽ khách hàng.',
    'Nhà máy khép kín 7 bộ phận: Gỗ, Dây sắt, Nhựa, Khuôn, Dập, Đánh bóng, Đóng gói, với hơn 250 máy móc. Tự làm khuôn tại xưởng. Hệ thống quản lý chất lượng ISO 9001:2015, QC ở từng công đoạn. Đã xuất hàng thị trường châu Âu.',
  ],
}

// Quy trình theo sản phẩm — docs.md mục 5.3 (file quy trình sản xuất, biểu BOM)
export const caseStudies = [
  {
    name: 'Dao gọt vỏ 1071',
    image: 'peelers',
    steps: [
      'Làm thân dao: trộn nguyên liệu, ép nhựa, tách thân, loại lỗi',
      'Bọc áo: vận hành máy bọc áo, kiểm tra',
      'Lắp cán lưỡi: kiểm tra cán sắt, đóng lưỡi, kiểm tra lưỡi xoay và kích thước',
      'Đóng gói: vỏ PE bảo vệ lưỡi, túi PE, 12 sản phẩm/thùng con, 10 thùng con/thùng mẹ',
    ],
  },
  {
    name: 'Búa đập thịt',
    image: 'meat-tenderizer',
    steps: [
      'Ép nhựa thân búa',
      'Ép nhựa bọc tay cầm',
      'Lắp ráp: kiểm tra đầu búa, lắp đầu búa và thân',
      'Đóng gói: 4 sản phẩm/túi, 12 túi/thùng',
    ],
  },
  {
    name: 'Kệ dao gỗ',
    image: 'knife-block',
    steps: [
      'Gia công bán thành phẩm, đo độ ẩm',
      'Xử lý bán thành phẩm',
      'Khắc logo',
      'Xác định vị trí lắp chân',
      'Sơn lót',
      'Xử lý sau sơn lót',
      'Sơn màu',
      'Lắp ráp chân',
      'Bọc túi màng co',
      'Đóng gói: 4 thùng nhỏ/thùng lớn',
    ],
  },
  {
    name: 'Vỉ làm nguội bánh 10×15, 10×16 inch',
    image: 'cooling-rack',
    steps: [
      'Kiểm tra liệu, chạy CNC vành',
      'Dập chân vành',
      'Hàn nối vành',
      'Hàn lưới',
      'Nắn thẳng lưới',
      'Bẻ góc, vào khuôn, dập hàn viền cạnh dài / cạnh ngắn',
    ],
  },
  {
    name: 'Cây lăn bột',
    image: 'wood-rods',
    steps: [
      'Cắt liệu theo thiết kế',
      'Tiện tay cầm',
      'Gọt tròn thân và tay cầm',
      'Cắt thân',
      'Khoan lỗ',
      'Lắp ráp: thân, tay cầm, nút nhựa, ty',
    ],
  },
  {
    name: 'Kệ PE lớn / nhỏ',
    image: 'caddy-pe-finished',
    steps: [
      'Cắt liệu dài',
      'Cắt liệu ngắn',
      'Cắt liệu vỉ',
      'CNC chân',
      'Bẻ vành',
      'Hàn vỉ',
      'Cắt viền vỉ',
      'Bẻ vỉ',
      'Hàn bán thành phẩm',
      'Cắt viền bán thành phẩm',
      'Sửa bán thành phẩm',
      'Nhúng PE',
      'Đóng gói: kệ lớn 8 cái/thùng, kệ nhỏ 24 cái/thùng',
    ],
  },
]

// Hành trình 3D ở trang chủ — mỗi mục là một khối pha lê.
export const journey = [
  {
    label: 'Top Win',
    name: 'Nhà máy Top Win',
    image: 'factory-floor',
    info: 'KCN Sóng Thần 3, Bình Dương. Ban lãnh đạo người Đài Loan. Đã xuất hàng thị trường châu Âu.',
    tags: ['7 bộ phận', '250+ máy móc', 'ISO 9001:2015'],
    to: '/gioi-thieu',
  },
  {
    label: 'Top Win',
    name: 'Dụng cụ nhà bếp',
    image: 'peelers',
    info: 'Dao gọt vỏ / dao bào, búa đập thịt, cây lăn bột, kệ dao gỗ.',
    tags: ['Dao gọt vỏ', 'Búa đập thịt', 'Cây lăn bột', 'Kệ dao'],
    to: '/san-pham?nhom=dung-cu-nha-bep',
  },
  {
    label: 'Top Win',
    name: 'Sản phẩm dây sắt',
    image: 'cooling-rack',
    info: 'Vỉ / giá làm nguội bánh 10×15, 10×16 inch, lưới hàn, kệ dây sắt.',
    tags: ['Vỉ làm nguội', 'Lưới hàn', 'Kệ dây sắt'],
    to: '/san-pham?nhom=day-sat',
  },
  {
    label: 'Top Win',
    name: 'Sản phẩm gỗ gia dụng',
    image: 'wood-blocks',
    info: 'Sản phẩm, chi tiết gỗ gia dụng: CNC, tiện, chà nhám.',
    tags: ['CNC', 'Tiện', 'Chà nhám'],
    to: '/san-pham?nhom=go-gia-dung',
  },
  {
    label: 'Top Win',
    name: 'Nhựa ép & nhúng PE',
    image: 'caddy-pe-finished',
    info: 'Sản phẩm nhựa ép, nhúng PE.',
    tags: ['Ép nhựa', 'Nhúng PE'],
    to: '/san-pham?nhom=nhua-pe',
  },
  {
    label: 'Top Win',
    name: 'Khuôn mẫu & dập kim loại',
    image: 'stamping-press',
    info: 'Gia công khuôn mẫu và dập kim loại theo bản vẽ khách hàng. Tự làm khuôn tại xưởng.',
    tags: ['Khuôn mẫu', 'Dập kim loại', 'Theo bản vẽ'],
    to: '/san-pham?nhom=khuon-dap',
  },
  {
    label: 'Năng lực',
    name: '7 bộ phận, 250+ máy móc',
    image: 'injection-molding',
    info: 'Nhà máy khép kín 7 bộ phận: Gỗ, Dây sắt, Nhựa, Khuôn, Dập, Đánh bóng, Đóng gói.',
    tags: ['250+ máy móc', 'Tự làm khuôn'],
    to: '/nang-luc',
  },
  {
    label: 'Chất lượng',
    name: 'ISO 9001:2015',
    image: 'moisture-check',
    info: 'QC ở từng công đoạn: test kéo ≥ 15 kg, test nén, test máy rửa chén.',
    tags: ['Test kéo', 'Test nén', 'Máy rửa chén'],
    to: '/quy-trinh',
  },
]

// Dải số liệu (từ "máy móc 2026.xls", làm tròn theo brief)
export const keyStats = [
  { icon: 'layers', value: '7', label: 'Bộ phận khép kín' },
  { icon: 'gear', value: '250+', label: 'Máy móc thiết bị' },
  { icon: 'press', value: '35+', label: 'Máy dập' },
  { icon: 'globe', value: 'CHÂU ÂU', label: 'Đã xuất hàng' },
]

// Nhóm sản phẩm theo brief; chi tiết từ file quy trình sản xuất và biểu BOM.
export const products = [
  {
    key: 'dung-cu-nha-bep',
    name: 'Dụng cụ nhà bếp',
    image: 'peelers',
    desc: 'Dao gọt vỏ / dao bào: thân nhựa ép, bọc tay cầm, lưỡi dao, vỏ PE bảo vệ lưỡi. Búa đập thịt: thân nhựa ép, bọc tay cầm, đầu búa. Cây lăn bột, kệ dao gỗ.',
    items: ['Dao gọt vỏ / dao bào (item 1071)', 'Búa đập thịt', 'Cây lăn bột', 'Kệ dao gỗ'],
    gallery: ['peelers', 'meat-tenderizer', 'knife-block', 'tenderizer-head', 'tenderizer-assembly'],
  },
  {
    key: 'day-sat',
    name: 'Sản phẩm dây sắt',
    image: 'cooling-rack',
    desc: 'Vỉ / giá làm nguội bánh 10×15, 10×16 inch (dây liệu Ø 3,4 mm), lưới hàn, kệ dây sắt.',
    items: ['Vỉ làm nguội bánh 10×15 inch', 'Vỉ làm nguội bánh 10×16 inch', 'Lưới hàn', 'Kệ dây sắt'],
    gallery: ['cooling-rack', 'caddy-pe-finished', 'shelf-welded', 'caddy-welded', 'cnc-hook'],
  },
  {
    key: 'go-gia-dung',
    name: 'Sản phẩm gỗ gia dụng',
    image: 'wood-blocks',
    desc: 'Sản phẩm, chi tiết gỗ gia dụng: CNC, tiện, chà nhám, khắc logo, sơn lót, sơn màu. Độ ẩm gỗ đạt 8–12% trước khi gia công.',
    items: ['CNC', 'Tiện', 'Chà nhám', 'Khắc logo', 'Sơn lót, sơn màu'],
    gallery: ['wood-blocks', 'wood-rods', 'laser-engraving', 'wood-assembly', 'paint-line'],
  },
  {
    key: 'nhua-pe',
    name: 'Nhựa ép & nhúng PE',
    image: 'caddy-pe-finished',
    desc: 'Sản phẩm nhựa ép, nhúng PE: ép nhựa thân sản phẩm, bọc tay cầm; kệ dây sắt nhúng bột PE.',
    items: ['Ép nhựa', 'Bọc tay cầm', 'Nhúng PE', 'Kệ PE lớn: 10″ × 3,5″ × 18″, 294 g', 'Kệ PE nhỏ: 221 × 56 × 465 mm, 134 g'],
    gallery: ['caddy-pe-finished', 'tenderizer-handle', 'injection-molding', 'caddy-raw', 'meat-tenderizer'],
  },
  {
    key: 'khuon-dap',
    name: 'Khuôn mẫu & dập kim loại',
    image: 'stamping-press',
    desc: 'Gia công khuôn mẫu và dập kim loại theo bản vẽ khách hàng. Tự làm khuôn tại xưởng.',
    items: ['Khuôn mẫu', 'Dập kim loại', 'Theo bản vẽ khách hàng'],
    gallery: ['stamping-press', 'wire-cutting', 'rack-welding', 'bent-wire', 'wire-payoff'],
  },
]

// Bộ phận & máy móc — theo "máy móc 2026.xls" (số máy làm tròn).
export const departments = [
  {
    name: 'Gỗ',
    icon: 'saw',
    machines: '50+',
    image: 'wood-lathe',
    capability: 'Chà nhám tay, ghép, khoan, CNC phay, bào, tubi tự động, tiện, tubi, cắt, nhám chổi, in chữ, chà nhám băng, chà nhám thùng, bo, rong.',
  },
  {
    name: 'Dây sắt',
    icon: 'wire',
    machines: '55+',
    image: 'wire-cutting',
    capability: 'Hàn bấm, hàn chập, CNC, cắt liệu, dập, CNC 3D, uốn thủy lực, hàn TIG, cắt viền, duỗi, hàn TĐ.',
  },
  {
    name: 'Nhựa',
    icon: 'drop',
    machines: '10+',
    image: 'injection-molding',
    capability: 'Ép nhựa, trộn liệu, xay liệu, làm lạnh, nhúng PE, xay bột PE, quay ba vớ.',
  },
  {
    name: 'Khuôn',
    icon: 'mold',
    machines: '15',
    image: 'rack-welding',
    capability: 'CNC phay, bắn điện, cắt dây, tiện, phay cơ, mài, khoan cần, mài dao. Tự làm khuôn tại xưởng.',
  },
  {
    name: 'Dập',
    icon: 'press',
    machines: '60+',
    image: 'stamping-press',
    capability: 'Cắt liệu, cuốn, thủy lực, dập, hàn, cắt viền, nóng, mài, cán CLB.',
  },
  {
    name: 'Đánh bóng',
    icon: 'spark',
    machines: '15+',
    image: 'wood-sanding',
    capability: 'Mài, khoan, cưa, chà nhám TĐ, đánh bóng.',
  },
  {
    name: 'Đóng gói',
    icon: 'box',
    machines: '30+',
    image: 'film-wrapping',
    capability: 'Khắc logo, cắt túi, nóng, bắn dây, bắn tem, ép túi, ép tem, dán tem, dập, đai thùng, bắn ron.',
  },
]

export const qcTests = [
  { name: 'Test kéo', standard: '≥ 15 kg', detail: 'Kéo ≥ 15 kg không bung → đạt' },
  { name: 'Test nén', standard: '≥ 7,5 kg', detail: 'Nén ≥ 7,5 kg không gãy, không bung → đạt' },
  { name: 'Test máy rửa chén', standard: '30 phút', detail: 'Chạy máy 30 phút với xà phòng; không biến dạng, ăn mòn, mẻ lưỡi → đạt' },
  { name: 'Độ ẩm gỗ', standard: '8–12%', detail: 'Đạt 8–12%; trên 12% đem sấy lại' },
  { name: 'Ngoại quan', detail: 'Trầy xước, biến dạng, dư liệu, khuyết liệu, cấn móp, oxy hóa' },
]

// Danh sách vị trí mẫu — cần khách xác nhận vị trí đang tuyển thực tế.
export const jobs = ['Công nhân sản xuất', 'Thợ CNC', 'Thợ hàn', 'Kỹ thuật khuôn', 'Nhân viên QC']

// Bộ ảnh "Bên trong nhà máy" (trang Giới thiệu, Năng lực)
export const factoryGallery = [
  { image: 'wire-payoff', caption: 'Cấp phôi dây thép' },
  { image: 'wire-cutting', caption: 'Cắt liệu theo bản vẽ' },
  { image: 'cnc-hook', caption: 'Uốn dây CNC' },
  { image: 'shelf-welded', caption: 'Hàn chập lưới' },
  { image: 'caddy-frame', caption: 'Hàn khung bán thành phẩm' },
  { image: 'caddy-pe-finished', caption: 'Thành phẩm phủ PE' },
  { image: 'tenderizer-assembly', caption: 'Lắp ráp búa đập thịt' },
  { image: 'wood-assembly', caption: 'Xử lý bán thành phẩm gỗ' },
  { image: 'laser-engraving', caption: 'Khắc logo laser' },
  { image: 'knife-block-bagging', caption: 'Bọc túi màng co' },
  { image: 'shrink-tunnel', caption: 'Máy co nhiệt' },
  { image: 'film-wrapping', caption: 'Đóng gói' },
]

// Danh mục sản phẩm chi tiết (trang Sản phẩm & Chi tiết sản phẩm).
// Thông số chỉ lấy từ docs.md mục 3, 5 (file quy trình sản xuất, biểu BOM) — không thêm giá, MOQ, thời gian giao hàng.
export const catalog = [
  {
    slug: 'dao-got-vo-1071',
    name: 'Dao gọt vỏ / dao bào',
    code: '1071',
    groups: ['dung-cu-nha-bep', 'nhua-pe'],
    images: ['peelers'],
    specs: [
      ['Cấu tạo', 'Thân nhựa ép, bọc áo (tay cầm), cán sắt, lưỡi dao, vỏ PE bảo vệ lưỡi'],
      ['Test kéo', 'Kéo ≥ 15 kg không bung'],
      ['Test nén', 'Nén ≥ 7,5 kg không gãy, không bung'],
      ['Test máy rửa chén', '30 phút với xà phòng; không biến dạng, ăn mòn, mẻ lưỡi'],
    ],
    packing: '12 sản phẩm/thùng con, 10 thùng con/thùng mẹ',
    process: ['Làm thân dao', 'Bọc áo', 'Lắp cán lưỡi', 'Đóng gói'],
  },
  {
    slug: 'bua-dap-thit',
    name: 'Búa đập thịt',
    groups: ['dung-cu-nha-bep', 'nhua-pe'],
    images: ['meat-tenderizer', 'tenderizer-head', 'tenderizer-handle', 'tenderizer-assembly'],
    specs: [['Cấu tạo', 'Thân búa ép nhựa, bọc tay cầm, đầu búa']],
    packing: '4 sản phẩm/túi, 12 túi/thùng',
    process: ['Ép nhựa thân búa', 'Ép nhựa bọc tay cầm', 'Lắp ráp búa', 'Đóng gói'],
  },
  {
    slug: 'ke-dao-go',
    name: 'Kệ dao gỗ',
    groups: ['dung-cu-nha-bep', 'go-gia-dung'],
    images: ['knife-block', 'laser-engraving', 'knife-block-bagging', 'wood-assembly'],
    specs: [
      ['Chất liệu', 'Gỗ'],
      ['Độ ẩm gỗ', '8–12% (trên 12% đem sấy lại)'],
      ['Hoàn thiện', 'Khắc logo 2 mặt, sơn lót, sơn màu, lắp chân'],
    ],
    packing: 'Bọc túi màng co; 4 thùng nhỏ/thùng lớn',
    process: ['Gia công bán thành phẩm', 'Khắc logo', 'Sơn lót', 'Sơn màu', 'Lắp ráp chân', 'Bọc túi màng co', 'Đóng gói'],
  },
  {
    slug: 'cay-lan-bot',
    name: 'Cây lăn bột',
    groups: ['dung-cu-nha-bep', 'go-gia-dung'],
    images: ['wood-rods'],
    specs: [
      ['Chất liệu', 'Gỗ'],
      ['Cấu tạo', 'Thân lăn bột, tay cầm (2), nút nhựa (2), ty lăn bột'],
    ],
    process: ['Cắt liệu', 'Tiện tay cầm', 'Gọt tròn thân và tay cầm', 'Cắt thân', 'Khoan lỗ', 'Lắp ráp'],
  },
  {
    slug: 'vi-lam-nguoi-banh',
    name: 'Vỉ làm nguội bánh',
    groups: ['day-sat'],
    images: ['cooling-rack'],
    specs: [
      ['Kích thước', '10×15 inch, 10×16 inch'],
      ['Dây liệu', 'Ø 3,4 mm'],
      ['Cấu tạo', 'Vành, chân vành, lưới hàn'],
    ],
    process: ['Chạy CNC vành', 'Dập chân vành', 'Hàn nối vành', 'Hàn lưới', 'Nắn thẳng lưới', 'Dập hàn viền'],
  },
  {
    slug: 'luoi-han',
    name: 'Lưới hàn',
    groups: ['day-sat'],
    images: ['shelf-grid', 'shelf-welded'],
    specs: [['Chất liệu', 'Dây sắt']],
  },
  {
    slug: 'ke-pe-lon',
    name: 'Kệ PE lớn',
    groups: ['day-sat', 'nhua-pe'],
    images: ['caddy-pe-finished', 'caddy-welded', 'caddy-frame'],
    specs: [
      ['Kích thước', '10″ × 3,5″ × 18″'],
      ['Trọng lượng', '294 g'],
      ['Nguyên liệu', 'Sắt Ø 3,2 và Ø 2,0, hạt nhựa PE'],
    ],
    packing: '8 cái/thùng',
    process: ['Cắt liệu', 'CNC chân', 'Bẻ vành', 'Hàn vỉ', 'Cắt viền', 'Hàn bán thành phẩm', 'Nhúng PE', 'Đóng gói'],
  },
  {
    slug: 'ke-pe-nho',
    name: 'Kệ PE nhỏ',
    groups: ['day-sat', 'nhua-pe'],
    images: ['caddy-raw', 'bent-wire', 'cnc-hook'],
    specs: [
      ['Kích thước', '221 × 56 × 465 mm'],
      ['Trọng lượng', '134 g'],
      ['Nguyên liệu', 'Sắt Ø 2,7, Ø 2,0, Ø 1,55, hạt nhựa PE'],
    ],
    packing: '24 cái/thùng',
    process: ['Cắt liệu', 'CNC chân', 'Bẻ vành', 'Hàn vỉ', 'Cắt viền', 'Hàn bán thành phẩm', 'Nhúng PE', 'Đóng gói'],
  },
  {
    slug: 'chi-tiet-go-gia-dung',
    name: 'Chi tiết gỗ gia dụng',
    groups: ['go-gia-dung'],
    images: ['wood-blocks', 'wood-sanding', 'paint-line'],
    specs: [
      ['Gia công', 'CNC, tiện, chà nhám'],
      ['Hoàn thiện', 'Khắc logo, sơn lót, sơn màu'],
    ],
  },
  {
    slug: 'khuon-mau-dap-kim-loai',
    name: 'Khuôn mẫu & dập kim loại',
    groups: ['khuon-dap'],
    images: ['stamping-press', 'wire-cutting', 'wire-payoff'],
    specs: [
      ['Gia công', 'Theo bản vẽ khách hàng'],
      ['Khuôn', 'Tự làm khuôn tại xưởng'],
    ],
  },
]
