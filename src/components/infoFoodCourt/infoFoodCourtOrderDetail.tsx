import { Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import InfoFoodCourt, { InfoFoodCourtProps } from '.'

interface InfoFoodCourtOrderDetailProps extends InfoFoodCourtProps {
  customComponent?: React.ReactNode,
  foodCourtName?: string
  famount?: string
}

const InfoFoodCourtOrderDetail:React.FC<InfoFoodCourtOrderDetailProps> = ({ logoSrc, customComponent, foodCourtName, famount }) => {
  return (
    <InfoFoodCourt logoSrc={logoSrc}>
      <Stack spacing="2" width="full">
        <Text fontSize="lg" fontWeight="semibold" noOfLines={2}>{foodCourtName || ''}</Text>
        <Text fontSize="sm">{famount || 0}</Text>
        <Box marginTop="3">
          {customComponent}
        </Box>
      </Stack>
    </InfoFoodCourt>
  )
}

export default InfoFoodCourtOrderDetail
