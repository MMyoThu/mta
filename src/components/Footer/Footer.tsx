import { motion } from 'motion/react'
import githubIcon from '../../assets/icons/github.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import { fadeUp, tapPress, viewportOnce } from '../../motion/presets'
import './Footer.css'

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="footer__top">
        <p>© {new Date().getFullYear()} Myo Thu Aung. Crafted with care in Yangon.</p>
        <motion.a href="#hero" className="footer__top-link" whileHover={{ y: -1 }} whileTap={tapPress}>
          Back to top
        </motion.a>
      </div>
      <div className="footer__socials">
        <motion.a
          href="https://github.com/MMyoThu"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -3, rotate: -6 }}
          whileTap={tapPress}
        >
          <img src={githubIcon} alt="GitHub" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/myo-thu-aung-1830022ba/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -3, rotate: 6 }}
          whileTap={tapPress}
        >
          <img src={linkedinIcon} alt="LinkedIn" />
        </motion.a>
      </div>
    </motion.footer>
  )
}

export default Footer
