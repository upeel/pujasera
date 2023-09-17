import React from 'react'
import { HStack, Image } from '@chakra-ui/react'

export interface InfoFoodCourtProps {
  logoSrc?: string,
}
interface InfoFoodCourtX extends InfoFoodCourtProps {
  children?: React.ReactNode
}
const InfoFoodCourt:React.FC<InfoFoodCourtX> = ({ logoSrc, children }) => {
  return (
    <>
      <HStack paddingX="2" paddingY="4" spacing="4">
        <Image width="80px" height="80px" objectFit="cover" src={logoSrc} fallbackSrc="/images/resto_placeholder.png"/>
        {children}
      </HStack>
    </>
  )
}

export default InfoFoodCourt
