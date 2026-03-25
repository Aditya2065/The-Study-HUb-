import { useState } from 'react'
import { api } from '../api/client'

const DEFAULT_USER = { userId: 'User', password: 'User' }

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      setMessage('')
      const data = await api.login(userId, password)
      onAuthSuccess(data.token, data.userId)
    } catch (err) {
      setMessage('Invalid credentials. Try User / User.')
      console.error(err)
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    if (!userId.trim() || !password.trim()) {
      setMessage('User ID and password are required.')
      return
    }

    try {
      setMessage('')
      await api.signup(userId, password)
      setMessage('Account created. You can login now.')
      setMode('login')
    } catch (err) {
      setMessage('Unable to create account (User ID may already exist).')
      console.error(err)
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={mode === 'login' ? handleLogin : handleSignup}>
        <h2>The Study Hub</h2>
        <p className="muted">Simple authentication page</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <label>User ID</label>
        <input value={userId} onChange={(event) => setUserId(event.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="action-btn" type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        <p className="muted">Default account: User ID User and Password User</p>
        {message ? <p className="error">{message}</p> : null}
      </form>
    </div>
  )
}
