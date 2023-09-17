import React from 'react'
import { Badge, BadgeProps } from '@chakra-ui/react'
import { OrderStatus } from 'src/api/index.type'

const BadgeCustom: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <Badge px="2" py="1" rounded="md" textTransform="initial" whiteSpace="normal" {...props}>
      {children}
    </Badge>
  )
}

interface BadgeStatusOrderProps {
  status?: OrderStatus,
  textPending?: string,
  textProcess?: string,
  textFailed?: string,
  textFinished?: string
}

const BadgeStatusOrder:React.FC<BadgeStatusOrderProps> = ({
  status = 'P',
  textFailed,
  textFinished,
  textPending,
  textProcess
}) => {
  switch (status) {
    case 'P':
      return (
        <BadgeCustom colorScheme="ol_orange" variant="outline">
          {textPending || `Menunggu pembayaran`}
        </BadgeCustom>
      )
    case 'A':
      return (
        <BadgeCustom colorScheme="ol_blue" variant="outline">
          {textProcess || `Sedang menyiapkan pesanan`}
        </BadgeCustom>
      )
    case 'Z':
      return (
        <BadgeCustom colorScheme="ol_green" variant="outline">
          {textFinished || `Selesai`}
        </BadgeCustom>
      )
    case 'X':
      return (
        <BadgeCustom colorScheme="ol_red" variant="outline">
          { textFailed || `Pesanan gagal`}
        </BadgeCustom>
      )
    default:
      return null
  }
}

export default BadgeStatusOrder
