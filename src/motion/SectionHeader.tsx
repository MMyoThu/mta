import { motion } from 'motion/react'
import { fadeUp, stagger, viewportOnce } from './presets'

type SectionHeaderProps = {
  index: string
  kicker: string
  title: string
  subtitle: string
}

const SectionHeader = ({ index, kicker, title, subtitle }: SectionHeaderProps) => (
  <>
    <motion.div
      className="section-heading"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.p className="section-kicker" variants={fadeUp}>
        <span>{index}</span> {kicker}
      </motion.p>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
    </motion.div>
    <motion.p
      className="section-subtitle"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {subtitle}
    </motion.p>
  </>
)

export default SectionHeader
