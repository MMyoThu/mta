import './Contact.css'

const channels = [
  {
    name: 'Gmail',
    label: 'myothuaung2001pk@gmail.com',
    href: 'mailto:myothuaung2001pk@gmail.com',
    hint: 'Email me directly',
  },
  {
    name: 'Telegram',
    label: '@mta200125',
    href: 'https://t.me/mta200125',
    hint: 'Message on Telegram',
  },
  {
    name: 'Facebook',
    label: 'Myo Thu Aung',
    href: 'https://www.facebook.com/share/1Cne6WFzJy/?mibextid=wwXIfr',
    hint: 'Reach me on Facebook',
  },
  {
    name: 'LinkedIn',
    label: 'linkedin.com/in/myo-thu-aung',
    href: 'https://www.linkedin.com/in/myo-thu-aung-1830022ba/',
    hint: 'Connect professionally',
  },
]

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="section-heading">
        <p className="section-kicker">
          <span>05</span> Let’s talk
        </p>
        <h2>Contact</h2>
      </div>
      <p className="section-subtitle">
        Contact me directly on Gmail, Telegram, Facebook, or LinkedIn.
      </p>

      <div className="contact__channels fade-up">
        {channels.map((channel) => (
          <a
            key={channel.name}
            className="contact-card"
            href={channel.href}
            target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={channel.href.startsWith('mailto:') ? undefined : 'noreferrer'}
          >
            <span className="contact-card__name">{channel.name}</span>
            <strong>{channel.label}</strong>
            <span className="contact-card__hint">{channel.hint}</span>
          </a>
        ))}
      </div>

      <p className="contact__meta">Yangon, Myanmar</p>
    </section>
  )
}

export default Contact
