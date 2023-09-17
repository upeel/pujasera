import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'

interface GroupItemProps {
  name?: string,
  img?: string,
  total?: string | number,
  children: React.ReactNode
}
const GroupItemTenant: React.FC<GroupItemProps> = ({ img, name, total, children }) => {
  return (
    <Box>
      <HStack paddingX="4" paddingY="2" justifyContent="space-between" backgroundColor="#F5F5F5">
        <HStack>
          <Image src={img} w="6" h="6" borderRadius="full" fallbackSrc="/images/resto_placeholder.png"/>
          <Text fontSize="sm">{name || 'Tenant'}</Text>
        </HStack>
        <Text fontSize="sm">
          {total || 0} menu
        </Text>
      </HStack>
      {children}
    </Box>
  )
}

export default GroupItemTenant
