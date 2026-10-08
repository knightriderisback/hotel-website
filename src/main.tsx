import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { CmsProvider } from './cms/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CmsProvider>
        <App />
      </CmsProvider>
    </BrowserRouter>
  </StrictMode>,
)
