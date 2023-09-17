import React from 'react'
import { Box, HStack, Image, Skeleton, Text } from '@chakra-ui/react'
import styles from './paymentItem.module.scss'
import classNames from 'classnames/bind'
import { OlToast } from 'src/helpers/toast'

const cx = classNames.bind(styles)

interface PaymentItemProps {
  imgUrl?: string
  name?: string,
  withDivider?: boolean,
  onClick?: () => void,
  disabled?: boolean
}

const PaymentItem:React.FC<PaymentItemProps> = ({
  imgUrl = '',
  name = 'VA/E-Wallet/Credit/Qris',
  withDivider = true,
  onClick = () => alert(`Payment: ${name}`),
  disabled = false
}) => {
  const paymentDisabled = () => {
    OlToast.info({ description: 'Pembayaran belum tersedia' })
  }

  return (
    <Box paddingX="4" className={cx('payment-item', { disabled })} onClick={() => {
      if (disabled) return paymentDisabled()
      onClick()
    }}>
      <HStack paddingY="3" className={cx('payment-item__inner', { withDivider: withDivider })}>
        <Box w="10" height="10" rounded="lg" overflow="hidden">
          <Image
            src={imgUrl}
            fallbackSrc="/images/resto_placeholder.png"
            width="full"
            height="full"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
        <Text flex="1" fontSize="sm" fontWeight="semibold" noOfLines={1}>{name}</Text>
      </HStack>
    </Box>
  )
}

export const PaymentItemSkeleton = () => {
  return (
    <Box paddingX="4" className={cx('payment-item')}>
      <HStack paddingY="3" className={cx('payment-item__inner', { withDivider: true })}>
        <Skeleton w="10" height="10" rounded="lg"/>
        <Skeleton width="100px" height="10px" noOfLines={1} />
      </HStack>
    </Box>
  )
}

export default PaymentItem
