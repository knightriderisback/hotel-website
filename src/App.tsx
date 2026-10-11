import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'

const AdminLogin = lazy(() => import('./admin/Login'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<AdminFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Suspense>
  )
}
