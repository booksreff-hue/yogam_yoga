import React from "react"
import { motion } from "framer-motion"

type Props = React.PropsWithChildren<{
  className?: string
  delay?: number
}>

export default function FadeIn({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
