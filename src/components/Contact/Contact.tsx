import { useState } from 'react'
import './Contact.css'

import type { FormEvent } from 'react'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

type FormState = typeof initialForm

type FormErrors = Partial<Record<keyof FormState, string>>

const Contact = () => {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address.'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!form.message.trim()) newErrors.message = 'Message is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      setSuccess(false)
      return
    }

    setSuccess(true)
    setForm(initialForm)
  }

  return (
    <section className="contact" id="contact">
      <div className="section-title">
        <span />
        <h2>Contact</h2>
      </div>
      <div className="contact__grid">
        <div className="contact__info fade-up">
          <p className="section-subtitle">
            Get in touch to discuss your next project, collaboration, or career opportunity.
          </p>
          <div className="contact__details">
            <div>
              <h3>Email</h3>
              <p>myothuaung2001pk@gmail.com</p>
            </div>
            <div>
              <h3>Phone</h3>
              <p>+95 967569658</p>
            </div>
            <div>
              <h3>Location</h3>
              <p>Yangon, Myanmar</p>
            </div>
            <div>
              <h3>LinkedIn</h3>
              <p>https://www.linkedin.com/in/myo-thu-aung-1830022ba/</p>
            </div>
            <div>
              <h3>GitHub</h3>
              <p>github.com/myothuaung</p>
            </div>
          </div>
        </div>

        <form className="contact__form fade-up" onSubmit={handleSubmit} noValidate>
          <div className="contact__fields">
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
            <label>
              Subject
              <input
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <span className="field-error">{errors.subject}</span>}
            </label>
            <label>
              Message
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </label>
          </div>
          <button type="submit" className="button button--primary">
            Send Message
          </button>
          {success && <p className="form-success">Your message has been sent successfully.</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact
