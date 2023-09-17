import React from 'react'
import { Box, HStack, Image, Skeleton, Text } from '@chakra-ui/react'
import styles from './listItemInvoice.module.scss'
import classNames from 'classnames/bind'
import { OrderStatus } from 'src/api/index.type'

const cx = classNames.bind(styles)

interface ListItemInvoiceProps {
  invoice?: string,
  withDivider?: boolean,
  onClick?: () => void,
  status?: OrderStatus,
  total?: string
}

const ListItemInvoice = React.forwardRef<HTMLDivElement, ListItemInvoiceProps>(({
  invoice = 12345678,
  withDivider = true,
  onClick = () => alert(`Payment: ${invoice}`),
  status = 'P',
  total = '0'
}, ref) => {
  const iconUrl = ():string => {
    switch (status) {
      case 'P':
        return '/images/order_list_pending.png'
      case 'A':
        return '/images/order_list_process.png'
      case 'X':
        return '/images/order_list_cancel.png'
      default:
        return '/images/order_list_pending.png'
    }
  }

  return (
    <Box paddingX="4" className={cx('list-item-invoice')} onClick={onClick} ref={ref}>
      <HStack paddingY="4" className={cx('list-item-invoice__inner', { withDivider: withDivider })}>
        <Box minW="10" minH="10" maxW="10" maxH="10" rounded="lg" overflow="hidden">
          <Image
            src={iconUrl()}
            width="full"
            height="full"
            objectFit="contain"
            objectPosition="center"
          />
        </Box>
        <Box flex="1">
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>{invoice}</Text>
          <Text
            fontSize="xs"
            className={cx('list-item-invoice__status',
              {
                pending: status === 'P',
                process: status === 'A',
                cancel: status === 'X'
              })
            }
            noOfLines={1}
          >
            {
              status === 'P'
                ? 'Menunggu pembayaran'
                : status === 'A'
                  ? 'Sedang menyiapkan pesanan'
                  : status === 'X'
                    ? 'Pesanan gagal'
                    : ''
            }
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="semibold">{total}</Text>
        </Box>
      </HStack>
    </Box>
  )
})
ListItemInvoice.displayName = 'ListItemInvoice'

export const ListItemInvoiceSkeleton = () => {
  return (
    <Box paddingX="4" className={cx('list-item-invoice')}>
      <HStack paddingY="4" className={cx('list-item-invoice__inner', { withDivider: true })}>
        <Box>
          <Skeleton w="10" height="10" rounded="lg"/>
        </Box>
        <Box flex="1">
          <Skeleton width="100px" height="10px" noOfLines={1} />
          <Skeleton width="100px" height="10px" noOfLines={1} mt="2" />
        </Box>
        <Box>
          <Skeleton width="100px" height="10px" noOfLines={1} />
        </Box>
      </HStack>
    </Box>
  )
}

export default ListItemInvoice
