import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useCms } from '@/cms/store'

export default function AdminLogin() {
  const { login, isAuthenticated } = useCms()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    navigate('/admin', { replace: true })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (res.ok) navigate('/admin', { replace: true })
    else setError(res.error || 'Login failed')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1624] px-4">
      <div className="w-full max-w-md border border-[#af915f]/30 bg-[#101f31] p-10 shadow-2xl">
        <p className="text-center text-[0.62rem] uppercase tracking-[0.4em] text-[#d8bc85]">Hotel Steel City</p>
        <h1 className="mt-4 text-center font-serif text-3xl font-light text-[#f6f1e7]">Admin Access</h1>
        <p className="mt-3 text-center text-sm font-light text-[#f6f1e7]/55">Sign in to manage your website</p>
        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div>
            <label className="text-[0.62rem] uppercase tracking-[0.3em] text-[#f6f1e7]/45">Email</label>
            <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-[#f6f1e7]/25 bg-transparent py-3 text-sm text-[#f6f1e7] outline-none focus:border-[#af915f]" />
          </div>
          <div>
            <label className="text-[0.62rem] uppercase tracking-[0.3em] text-[#f6f1e7]/45">Password</label>
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border-b border-[#f6f1e7]/25 bg-transparent py-3 text-sm text-[#f6f1e7] outline-none focus:border-[#af915f]" />
          </div>
          {error && <p className="text-center text-sm text-red-400" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="btn-split solid w-full disabled:opacity-60">
            <span>{loading ? 'Signing in…' : 'Sign In'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
