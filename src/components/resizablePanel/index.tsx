import React from 'react'
import { motion } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { Box } from '@chakra-ui/react'
import { constantDefaultTransition } from 'src/constant'

interface ResizablePanelProps {
  children: React.ReactNode,
}
const ResizablePanel:React.FC<ResizablePanelProps> = ({ children }) => {
  const [ref, { height }] = useMeasure()
  return (
    <motion.div transition={constantDefaultTransition} key={children?.toString()} animate={{ height }}>
      <Box ref={ref}>
        {children}
      </Box>
    </motion.div>
  )
}

export default ResizablePanel
