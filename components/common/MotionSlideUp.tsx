"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

interface MotionSlideUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function MotionSlideUp({ children, delay = 0, duration = 0.8, className }: MotionSlideUpProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
