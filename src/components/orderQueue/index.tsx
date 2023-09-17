import React from 'react'
import { Box, HStack, SkeletonText, Stack, Text } from '@chakra-ui/react'
import TableNumber from 'src/components/tableNumber'
import classNames from 'classnames/bind'
import styles from './orderQueue.module.scss'

const cx = classNames.bind(styles)

interface OrderQueueProps {
  orderNumber?: number | string,
  meja?: number | string,
  isLoading?: boolean,
  nomorHP?: string
}

const OrderQueue:React.FC<OrderQueueProps> = ({ orderNumber, nomorHP, meja, isLoading }) => {
  return (
    <Stack paddingX="4" paddingY="4" spacing="4" boxShadow="md" borderRadius="8">
      <HStack alignItems="center">
        <Stack flex="1">
          <Text className={cx('oq-lbl')}>Order number</Text>
          {
            isLoading
              ? <SkeletonText noOfLines={1} width="50%"/>
              : <Text className={cx('oq-value')}>{orderNumber || '-'}</Text>
          }
        </Stack>
        <TableNumber number={meja || '-'} isLoading={isLoading}/>
      </HStack>
      <hr className="ol-divider"/>
      <HStack>
        <Box flex="1">
          <Text fontSize="sm">Nomor HP</Text>
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="semibold">{nomorHP || '-'}</Text>
        </Box>
      </HStack>
    </Stack>
  )
}

export default OrderQueue
