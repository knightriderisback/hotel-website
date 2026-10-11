import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { CmsProvider } from './cms/store'
import MotionProvider from './components/MotionProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CmsProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </CmsProvider>
    </BrowserRouter>
  </StrictMode>,
)
