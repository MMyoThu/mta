import { useState } from 'react'
import './Login.css'
import { clearAuthSession, login, persistAuthSession } from '../../services/api'

import type { FormEvent } from 'react'

type LoginFormState = {
  username: string
  password: string
}

const initialForm = {
  username: '',
  password: '',
}

const Login = () => {
  const [form, setForm] = useState<LoginFormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await login({
        username: form.username,
        password: form.password,
      })

      if (response.success) {
        persistAuthSession(response)
        setMessage(response.message || 'Logged in successfully.')
        setForm(initialForm)
      } else {
        setIsError(true)
        setMessage(response.message || 'Login failed.')
      }
    } catch (error) {
      setIsError(true)
      setMessage(error instanceof Error ? error.message : 'Unable to sign in right now.')
      clearAuthSession()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="login" aria-labelledby="login-title">
      <div className="login__card">
        <div className="login__header">
          <h2 id="login-title">Admin Login</h2>
          <p>Use your backend credentials to sign in.</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <label>
            Email / Username
            <input
              type="text"
              value={form.username}
              onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
              placeholder="mta@gmail.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="Enter your password"
              required
            />
          </label>

          <button type="submit" className="button button--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className={`login__message ${isError ? 'login__message--error' : ''}`} role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}

export default Login
