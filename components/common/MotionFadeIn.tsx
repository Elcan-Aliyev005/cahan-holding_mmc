"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

interface MotionFadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function MotionFadeIn({ children, delay = 0, duration = 0.6, className }: MotionFadeInProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
