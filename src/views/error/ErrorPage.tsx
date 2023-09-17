import React from 'react'
import { Box, Button, Image, Stack, Text } from '@chakra-ui/react'
import { FallbackProps } from 'react-error-boundary'

const ErrorPage:React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" backgroundColor="white">
      <Box display="flex" alignItems="center" justifyContent="center" className="container-with-px" flex="1">
        <Box>
          <Image width="328px" height="328px" src="/images/paper_airline.svg" marginX="auto"/>
          <Stack spacing="4">
            <Text textAlign="center" fontSize="lg" fontWeight="semibold">Oops, Something went wrong.</Text>
            <Text textAlign="center" fontSize="sm">{error.message}</Text>
            <Button colorScheme="ol_green" width="100%" onClick={resetErrorBoundary}>Coba kembali</Button>
          </Stack>
        </Box>
      </Box>
      <Box
        as="footer"
        textAlign="center"
        justifyContent={'center'}
        display="flex"
        alignItems="center"
        py="4"
      >
        <Text fontSize="xs">Powered by</Text>
        <Image width="auto" height="21px" marginLeft="2" src="/images/ol_logo.png"/>
      </Box>
    </Box>
  )
}

export default ErrorPage

