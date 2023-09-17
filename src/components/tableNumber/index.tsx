import { Badge, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import DeskIcon from 'src/assets/icons/DeskIcon'

interface TableNumberProps {
  number?: number | string | null,
  isLoading?: boolean
}

const TableNumber:React.FC<TableNumberProps> = ({ number, isLoading }) => {
  if (isLoading) {
    return <TableNumberSkeleton />
  }
  return (
    <Badge display="flex" alignItems="center" backgroundColor="#F5F5F5" width="fit-content" textTransform="capitalize">
      <DeskIcon marginRight="1" boxSize="4"/>
      <Text>Meja {number || 0}</Text>
    </Badge>
  )
}

export const TableNumberSkeleton = () => {
  return (
    <Skeleton height="16px" width="60px"/>
  )
}

export default TableNumber
