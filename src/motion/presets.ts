import type { Transition, Variants } from 'motion/react'

export const motionEase: NonNullable<Transition['ease']> = [0.22, 1, 0.36, 1]

export const fadeUpTransition: Transition = {
  duration: 0.55,
  ease: motionEase,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: fadeUpTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: motionEase } },
}

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionEase, staggerChildren: 0.08 },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
}

export const viewportOnce = {
  once: true,
  amount: 0.22,
} as const

export const hoverLift = {
  y: -3,
  transition: { type: 'spring' as const, stiffness: 420, damping: 24 },
}

export const tapPress = {
  scale: 0.97,
}

export const chipHover = {
  scale: 1.035,
  rotate: 0.6,
  y: -1,
  transition: { type: 'spring' as const, stiffness: 380, damping: 22 },
}

export const cardHover = {
  y: -4,
  scale: 1.012,
  transition: { type: 'spring' as const, stiffness: 360, damping: 22 },
}

export const gameCardHover = {
  y: -5,
  scale: 1.045,
  rotate: -0.6,
  transition: { type: 'spring' as const, stiffness: 340, damping: 18 },
}

export const floatTransition: Transition = {
  duration: 5.8,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
}

export const navIndicatorTransition: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
}

export const interactiveMotion = {
  whileHover: hoverLift,
  whileTap: tapPress,
} as const

export const projectCard: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: fadeUpTransition },
  hovered: { y: -4, transition: { type: 'spring', stiffness: 360, damping: 22 } },
}

export const projectZoom: Variants = {
  hidden: { scale: 1 },
  visible: { scale: 1 },
  hovered: { scale: 1.03, transition: { duration: 0.35, ease: motionEase } },
}
