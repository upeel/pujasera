import React, { useLayoutEffect } from 'react'
import { Box, Portal } from '@chakra-ui/react'
import lottieLoadingPage from 'src/assets/lottie/loading.json'
import styles from './loadingScreen.module.scss'
import classNames from 'classnames/bind'
import Lottie from 'lottie-react'

const cx = classNames.bind(styles)

const LoadingScreen = () => {
  useLayoutEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    return () => {
      document.getElementsByTagName('body')[0].removeAttribute('style')
    }
  }, [])
  return (
    <Portal>
      <Box
        className={cx('loading-screen_container')}
      >
        <Box className={cx('lottie-anim_wrapper')}>
          <Lottie
            animationData={lottieLoadingPage}
            style={{
              scale: '1.5'
            }}
          />
        </Box>
      </Box>
    </Portal>
  )
}

export default LoadingScreen
