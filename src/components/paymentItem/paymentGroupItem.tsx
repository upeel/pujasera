import React from 'react'
import { Box, Skeleton, Text } from '@chakra-ui/react'

interface PaymentItemGroupProps {
  groupName?: string,
  children: React.ReactNode
}
const PaymentGroupItem:React.FC<PaymentItemGroupProps> = ({ groupName = 'Group Name', children }) => {
  return (
    <>
      <Box px="4" py="2">
        <Text fontSize="lg" fontWeight="bold">{groupName}</Text>
      </Box>
      <Box>
        {children}
      </Box>
    </>
  )
}

export const PaymentGroupItemSkeleton = ({ children }:{ children: React.ReactNode }) => {
  return (
    <>
      <Box px="4" py="2">
        <Skeleton width="100px" height="20px" noOfLines={1} />
      </Box>
      <Box>
        {children}
      </Box>
    </>
  )
}

export default PaymentGroupItem
