import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/inter-tight/wght-italic.css'
import '@fontsource/space-mono/400.css'
import './styles.css'
import App from './App.jsx'

// Tải lại trang luôn bắt đầu từ đầu trang (không khôi phục vị trí cuộn cũ).
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.addEventListener('beforeunload', () => window.scrollTo(0, 0))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
