import React from 'react'
import { Box, Circle, Image, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import lottieProcess from 'src/assets/lottie/menyiapkan_pesanan.json'
import lottiePending from 'src/assets/lottie/payment.json'
import classNames from 'classnames/bind'
import styles from './bannerStatusOrder.module.scss'

const cx = classNames.bind(styles)

interface BannerStatusOrderProps {
  status: 'process' | 'done' | 'waitingPayment'
}

const BannerStatusOrder:React.FC<BannerStatusOrderProps> = ({ status }) => {
  const styleOption = {
    height: 144,
    width: 144
  }

  const changeBg = (sts: typeof status): string => {
    switch (sts) {
      case 'waitingPayment':
        return "url('/images/bg_order_process.jpg')"
      case 'process':
        return "url('/images/bg_order_process.jpg')"
      case 'done':
        return "url('/images/bg_order_success.jpg')"
      default:
        return ''
    }
  }

  return (
    <Box
      className={cx('bso-wrap')}
      backgroundImage={changeBg(status)}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      {
        status === 'waitingPayment' && (
          <>
            <Circle backgroundColor="white" overflow="hidden" position="relative" zIndex={1}>
              <Lottie
                animationData={lottiePending}
                style={styleOption}
              />
            </Circle>
            <Text fontWeight="bold" marginTop="3" textAlign="center">Segera lakukan pembayaran agar pesanan dapat diproses</Text>
          </>
        )
      }
      {
        status === 'process' && (
          <>
            <Circle backgroundColor="white" position="relative" zIndex={1}>
              <Lottie
                animationData={lottieProcess}
                style={styleOption}
              />
            </Circle>
            <Text fontWeight="bold" marginTop="3" textAlign="center">Sedang mempersiapkan pesanan</Text>
          </>
        )
      }
      {
        status === 'done' && (
          <>
            <Image src="/images/ol_check.svg" />
            <Text fontWeight="bold" marginTop="3" textAlign="center">Pesanan sudah selesai</Text>
          </>
        )
      }
    </Box>
  )
}

export default BannerStatusOrder
