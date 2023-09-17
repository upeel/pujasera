import React from 'react'
import { AspectRatio, Box, Image, Stack, Text } from '@chakra-ui/react'
import { QrReader, OnResultFunction } from 'react-qr-reader'
import classNames from 'classnames/bind'
import styles from './scanQr.module.scss'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import StoreNotFound from '../error/StoreNotFound'
const cx = classNames.bind(styles)

const ScanQrView = () => {
  const navigate = useNavigate()
  const location_route = useLocation()
  const onRequest:OnResultFunction = throttle((result) => {
    if (result) {
      const pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(dine-check)(\/[0-9]*)(\/[0-9]*)/
      const text = result.getText()
      if (pattern.test(text)) {
        window.location.href = text
      } else {
        navigate('/scan-qr', { state: { notFound: true }})
        location.reload()
      }
    }
  }, 1000)

  if (location_route.state?.notFound) {
    return <StoreNotFound />
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" backgroundColor="white">
      <Box display="flex" alignItems="center" flexDirection="column" marginTop="40px" className="container-with-px" flex="1">
        <Stack spacing="4">
          <Text textAlign="center" fontSize="xl" fontWeight="bold">Oops, Anda telah keluar dari menu.</Text>
          <Text textAlign="center" fontSize="sm">Tenang, pesananmu tidak terhapus. Scan QR Code pada meja untuk kembali ke menu.</Text>
        </Stack>
        <AspectRatio maxW="100%" width="328px" ratio={1} className={cx('ol-qr_decoration')}>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={onRequest}
            className={cx('ol-qr_cointainer')}
            videoStyle={{
              objectFit: 'cover'
            }}
          />
        </AspectRatio>
      </Box>
      <Box
        as="footer"
        textAlign="center"
        justifyContent={'center'}
        display="flex"
        alignItems="center"
        py="4"
      >
        <Text fontSize="xs">Powered by</Text>
        <Image width="auto" height="21px" marginLeft="2" src="/images/ol_logo.png"/>
      </Box>
    </Box>
  )
}

export default ScanQrView
