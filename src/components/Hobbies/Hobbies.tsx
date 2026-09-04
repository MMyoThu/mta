import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { hobbies, interests, type Hobby } from '../../data/hobbies'
import backImage from '../../assets/icons/about/backimg.jpg'
import { cardHover, fadeUp, hoverLift, pageEnter, tapPress, viewportOnce } from '../../motion/presets'
import './Hobbies.css'

const icons: Record<string, ReactElement> = {
  football: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.2 14.4 9l-.9 2.8H10.5L9.6 9 12 7.2Zm-2.4 5.2 1.1 2.2-2.1 1.6M14.4 12.4l-1.1 2.2 2.1 1.6M9.4 16.2h5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chinlone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3.5v3.2M12 17.3v3.2M3.5 12h3.2M17.3 12h3.2M6.2 6.2l2.3 2.3M15.5 15.5l2.3 2.3M17.8 6.2l-2.3 2.3M8.5 15.5l-2.3 2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 7.5 10.2 5.4h3.6L15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="10.2" r="0.7" fill="currentColor" />
    </svg>
  ),
  fishing: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.5c4.2 1.2 7.4 4.6 8.8 8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M13.6 14.2c.9 2.6 2.8 4.4 5.6 5.2-1.1-2.6-3.2-4.3-5.6-5.2Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.8 5.5h6.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13.8" cy="14.4" r="0.8" fill="currentColor" />
    </svg>
  ),
  coding: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M13.2 6.5 10.8 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  reading: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 7.2c-1.8-1.4-4.2-1.8-6.6-1.2v11c2.5-.6 5 .1 6.6 1.6 1.6-1.5 4.1-2.2 6.6-1.6v-11c-2.4-.6-4.8-.2-6.6 1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 7.4v11" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  'learning-it': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 5.2V3.6M12 20.4v-1.6M5.2 12H3.6M20.4 12h-1.6M7.2 7.2 6.1 6.1M17.9 17.9l-1.1-1.1M16.8 7.2l1.1-1.1M7.2 16.8l-1.1 1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  travelling: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.6v16.8M3.6 12h16.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  boxing: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 10.2c0-2 1.5-3.6 3.4-3.6h2.2c2.6 0 4.8 2.1 4.8 4.7v3.4c0 2.3-1.9 4.2-4.2 4.2H11c-2.1 0-3.8-1.7-3.8-3.8v-4.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M7.2 12.4H5.4c-1 0-1.8-.8-1.8-1.8v-.2c0-1.6 1.3-2.8 2.8-2.8H7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  'watching-football': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.4" y="5.2" width="17.2" height="11.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 19.2h8M12 16.4v2.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="10.6" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
}

const HobbyRow = ({ hobby, index }: { hobby: Hobby; index: number }) => (
  <motion.article
    className="hobby-row"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    whileHover={{ x: 4 }}
  >
    <span className="hobby-row__index">{String(index + 1).padStart(2, '0')}</span>
    <motion.div className="hobby-row__icon" whileHover={{ scale: 1.08, rotate: -4 }}>
      {icons[hobby.id]}
    </motion.div>
    <div className="hobby-row__body">
      <p className="hobby-row__tag">{hobby.tag}</p>
      <h3>{hobby.title}</h3>
      <p>{hobby.description}</p>
    </div>
  </motion.article>
)

const Hobbies = () => {
  return (
    <motion.section className="hobbies-page" variants={pageEnter} initial="hidden" animate="visible">
      <div className="hobbies-shell">
        <motion.div className="hobbies-header" variants={fadeUp}>
          <div>
            <p className="hobbies-kicker">Off the clock</p>
            <h1>Hobbies & Interests</h1>
          </div>
          <motion.a href="/" className="button button--secondary" whileHover={hoverLift} whileTap={tapPress}>
            Back to home
          </motion.a>
        </motion.div>

        <div className="hobbies-intro">
          <motion.div
            className="hobbies-intro__copy"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p>
              Football, chinlone, a camera, and quiet water — plus the IT topics, trips, and match nights I keep
              learning from.
            </p>
            <p>Weekends away from the keyboard, still with the same kind of focus.</p>
          </motion.div>
          <motion.figure
            className="hobbies-portrait"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35 }}
          >
            <img src={backImage} alt="Looking out over a lake from a wooden deck" />
          </motion.figure>
        </div>

        <ol className="hobby-list">
          {hobbies.map((hobby, index) => (
            <li key={hobby.id}>
              <HobbyRow hobby={hobby} index={index} />
            </li>
          ))}
        </ol>

        <div className="hobbies-curious">
          <motion.p
            className="hobbies-curious__kicker"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Currently curious about
          </motion.p>
          <div className="hobbies-curious__grid">
            {interests.map((interest) => (
              <motion.article
                key={interest.id}
                className="curious-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                whileHover={cardHover}
              >
                <motion.span className="curious-item__icon" whileHover={{ rotate: -8, scale: 1.08 }}>
                  {icons[interest.id]}
                </motion.span>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hobbies
