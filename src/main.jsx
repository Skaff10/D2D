import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

import { LanguageProvider } from './context/LanguageContext'

// Initialize GA4 only in production
if (import.meta.env.MODE === 'production') {
  ReactGA.initialize('G-TR48LN4QM9')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
