import React from 'react'
import { Container, ContainerProps } from '@chakra-ui/react'

interface MainContainerProps extends ContainerProps {
  children: React.ReactNode
}

const MainContainer:React.FC<MainContainerProps> = ({ children, ...props }) => {
  return (
    <Container maxW="container.sm" paddingX="0" {...props}>
      {children}
    </Container>
  )
}

export default MainContainer
