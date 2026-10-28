import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Capability = lazy(() => import('./pages/Capability.jsx'))
const ProcessPage = lazy(() => import('./pages/ProcessPage.jsx'))
const CertificationPage = lazy(() => import('./pages/CertificationPage.jsx'))
const CareersPage = lazy(() => import('./pages/CareersPage.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gioi-thieu" element={<About />} />
        <Route path="san-pham" element={<Products />} />
        <Route path="san-pham/:slug" element={<ProductDetail />} />
        <Route path="nang-luc" element={<Capability />} />
        <Route path="quy-trinh" element={<ProcessPage />} />
        <Route path="chung-nhan" element={<CertificationPage />} />
        <Route path="tuyen-dung" element={<CareersPage />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
