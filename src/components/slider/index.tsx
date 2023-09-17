import React, { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './slider.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface SlideHorizontalProps {
  children: React.ReactNode
}
export const SliderHorizontal:React.FC<SlideHorizontalProps> = ({ children }) => {
  const [constraintsLeft, setContstraintLeft] = useState<number>(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (sliderRef.current) {
      setContstraintLeft(sliderRef?.current?.scrollWidth - sliderRef?.current?.offsetWidth)
    }
  }, [])

  return (
    <motion.div ref={sliderRef} className={cx('slider-horizontal')}>
      <motion.div drag="x" dragConstraints={{ right: 0, left: -constraintsLeft }} className={cx('slider-horizontal__inner')}>
        { children }
      </motion.div>
    </motion.div>
  )
}

export const ScrollHorizontal:React.FC<SlideHorizontalProps> = ({ children }) => {
  return (
    <div className={cx('scroll-horizontal', 'ol-hd-scb')}>
      <div className={cx('scroll-horizontal__inner')}>
        {children}
      </div>
    </div>
  )
}
