import React, { useEffect, useRef } from 'react'
import { Box, BoxProps, forwardRef } from '@chakra-ui/react'
import styles from './floatingBottomContainer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface FloatingBottomContainerProps extends BoxProps {
  children: React.ReactNode,
  withShadow?: boolean
}
const FloatingBottomContainer = forwardRef<FloatingBottomContainerProps, 'div'>(({ children, withShadow = true, ...others }, ref) => {
  const fbcRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fbcRef) {
      const el = document.getElementById('fbc-spacing')
      if (el) el.style.height = `${fbcRef.current?.clientHeight}px`
    }
  }, [])

  return (
    <>
      <Box id="fbc-spacing"></Box>
      <Box ref={ref || fbcRef} className={cx('fbc-container', { shadow: withShadow })} {...others}>
        {children}
      </Box>
    </>
  )
})

FloatingBottomContainer.displayName = 'FloatingBottomContainer'

export default FloatingBottomContainer
