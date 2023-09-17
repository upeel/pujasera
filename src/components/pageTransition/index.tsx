import React from 'react'
import { motion } from 'framer-motion'
import { constantDefaultTransition } from 'src/constant'

interface PageTransitionProps {
  children: React.ReactNode
}
const PageTransition:React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.1 }}}
      transition={constantDefaultTransition}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
