import githubIcon from '../../assets/icons/github.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <p>© {new Date().getFullYear()} Myo Thu Aung. Crafted with care in Yangon.</p>
        <a href="#hero" className="footer__top-link">
          Back to top
        </a>
      </div>
      <div className="footer__socials">
        <a href="https://github.com/MMyoThu" target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/myo-thu-aung-1830022ba/" target="_blank" rel="noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
