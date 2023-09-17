import React from 'react'
import { Image, Stack, Text } from '@chakra-ui/react'

interface ItemNotFoundProps {
  title?: string,
  description?: string,
}
const ItemNotFound:React.FC<ItemNotFoundProps> = ({ title, description }) => {
  return (
    <Stack textAlign="center" display="flex" alignItems="center">
      <Image src="/images/img_no_data.png" alt="No data" width="auto" height="90px"/>
      {
        title && <Text fontSize="lg" fontWeight="bold">{title}</Text>
      }
      {
        description && <Text>{description}</Text>
      }
    </Stack>
  )
}

export default React.memo(ItemNotFound)
