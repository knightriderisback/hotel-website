import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AdminLogin from './admin/Login'
import AdminApp from './admin/AdminApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminApp />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  )
}
