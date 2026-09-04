import { motion } from 'motion/react'
import SectionHeader from '../../motion/SectionHeader'
import { cardHover, fadeUp, stagger, tapPress, viewportOnce } from '../../motion/presets'
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
      <SectionHeader
        index="05"
        kicker="Let’s talk"
        title="Contact"
        subtitle="Contact me directly on Gmail, Telegram, Facebook, or LinkedIn."
      />

      <motion.div
        className="contact__channels"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {channels.map((channel) => (
          <motion.a
            key={channel.name}
            className="contact-card"
            href={channel.href}
            target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={channel.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            variants={fadeUp}
            whileHover={cardHover}
            whileTap={tapPress}
            whileFocus={{ y: -3, scale: 1.01 }}
          >
            <span className="contact-card__name">{channel.name}</span>
            <strong>{channel.label}</strong>
            <span className="contact-card__hint">{channel.hint}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.p
        className="contact__meta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Yangon, Myanmar
      </motion.p>
    </section>
  )
}

export default Contact
