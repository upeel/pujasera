import React from 'react'
import { Image, HStack, Text, StackProps, TextProps, SkeletonCircle, SkeletonText, forwardRef, Flex, Box, ImageProps } from '@chakra-ui/react'
import { paddingContainerChakra } from 'src/styles/theme.config'

interface CardRestoNameCompactProps {
  styleContainer?: StackProps,
  imageProps?: ImageProps,
  nameProps?: TextProps,
  name?: string,
  onClick?: () => void,
  badge?: number,
  img?: string
}
const CardRestoNameCompact = forwardRef<CardRestoNameCompactProps, 'div'>(({ styleContainer, imageProps, nameProps, name, onClick, badge, img }, ref) => {
  return (
    <>
      <Flex
        ref={ref}
        justifyContent="space-between"
        alignItems="center"
        padding={paddingContainerChakra}
        backgroundColor="#E5F4FF"
        {...styleContainer}
        onClick={onClick}>
        <HStack>
          <Image width="32px" height="32px" rounded="full" src={img} fallbackSrc="/images/resto_placeholder.png" {...imageProps}/>
          <Text fontSize="lg" noOfLines={1} {...nameProps}>{name || 'Tenant Foodcourt'}</Text>
        </HStack>
        {
          (badge && badge > 0) ? <Box ml="2" className="badge-notif">{badge}</Box> : ''
        }
      </Flex>
    </>
  )
})

export const CardRestoNameCompactSkeleton = () => {
  return (
    <>
      <HStack padding={paddingContainerChakra}>
        <SkeletonCircle minWidth="30px" height="30px"/>
        <SkeletonText noOfLines={2} width="full"/>
      </HStack>
    </>
  )
}

export default React.memo(CardRestoNameCompact)
