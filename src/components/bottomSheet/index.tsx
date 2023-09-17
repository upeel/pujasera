import React, { useEffect } from 'react'
import styles from './bottomSheet.module.scss'
import classNames from 'classnames/bind'
import { AnimatePresence, isValidMotionProp, motion, PanInfo } from 'framer-motion'
import { chakra, IconButton, Portal, shouldForwardProp } from '@chakra-ui/react'
import { constantDefaultTransition } from 'src/constant'

const cx = classNames.bind(styles)

interface BottomSheetProps {
  overlay?: boolean
  isOpen?: boolean,
  onClose?: () => void
  children: React.ReactNode,
  isCloseable?: boolean,
  withButtonClose?: boolean,
  withExitBoard?: boolean,
  withHeader?: boolean,
  snapPoint?: 'top' | 'middle' | 'bottom' | 'auto' | number
}

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop)
})
/**
 *
 * @prop snapPoint (unit in %)
 */
const BottomSheet:React.FC<BottomSheetProps> = ({
  overlay = true,
  children,
  isOpen = false,
  onClose = () => console.log(''),
  isCloseable = true,
  withButtonClose = true,
  withExitBoard = true,
  withHeader = true,
  snapPoint = 'middle'
}) => {
  const btsOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.1 }},
    exit: { opacity: 0, transition: { duration: 0.1 }}
  }

  const btsVariants = {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%', transition: { duration: 0.2 }}
  }

  const onDragEnd = (event: any, info:PanInfo) => {
    if (info.offset.y > 200) onClose()
  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    isOpen ? body.style.overflow = 'hidden' : body.removeAttribute('style')
  }, [isOpen])

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    return () => {
      body.removeAttribute('style')
    }
  }, [])

  const calcHeight = ():string => {
    if (snapPoint === 'top') {
      return '100%'
    } else if (snapPoint === 'middle') {
      return '50%'
    } else if (snapPoint === 'bottom') {
      return '20%'
    } else if (snapPoint === 'auto') {
      return 'auto'
    } else if (typeof snapPoint === 'number') {
      return `${snapPoint}%`
    } else {
      return 'auto'
    }
  }

  return (
    <Portal>
      <AnimatePresence>
        {
          isOpen &&
        <>
          {
            overlay && <motion.div
              variants={btsOverlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => {
                if (isCloseable) onClose()
              }}
              className={cx('bts-overlay')}></motion.div>
          }
          <motion.div
            variants={btsVariants}
            transition={constantDefaultTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cx('bts-container')}
          >
            <ChakraBox
              drag={isCloseable ? 'y' : false}
              dragConstraints={{
                top: 0,
                bottom: 0
              }}
              dragPropagation
              dragMomentum={false}
              dragElastic={{
                top: 0,
                bottom: 0.8
              }}
              onDragEnd={onDragEnd}
              className={cx('bts-modal')}
              height={calcHeight()}
              maxHeight="full"
            >
              {
                withButtonClose && <IconButton
                  position="absolute"
                  borderRadius="full"
                  fontSize="2xl"
                  icon={<i className="bx bx-x"></i>}
                  aria-label="bts close"
                  top="-14"
                  right="4"
                  backgroundColor="white"
                  onClick={() => {
                    if (isCloseable) onClose()
                  }}
                />
              }
              {
                withHeader && (
                  <motion.div
                    className={cx('bts-modal_header')}
                  >
                    {
                      withExitBoard && <div className={cx('bts-modal_header__btc')}></div>
                    }
                  </motion.div>
                )
              }
              <div className={cx('bts-modal_body')}>
                {children}
              </div>
            </ChakraBox>
          </motion.div>
        </>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default BottomSheet
