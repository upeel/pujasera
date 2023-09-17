import React from 'react'
import { Box, Button, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const StoreNotFound = () => {
  const navigate = useNavigate()
  return (
    <Box height="100vh" display="flex" flexDirection="column" backgroundColor="white">
      <Box display="flex" alignItems="center" justifyContent="center" className="container-with-px" flex="1">
        <Box>
          <Image width="328px" height="328px" src="images/qr_mobile.svg" />
          <Stack spacing="4">
            <Text textAlign="center" fontSize="lg" fontWeight="semibold">QR code tidak terdaftar :(</Text>
            <Text textAlign="center" fontSize="sm">Pastikan scan QR code yang terdapat di meja foodcourt.</Text>
            <Button colorScheme="ol_green" onClick={() => navigate(location.pathname, { state: { notFound: false }})} width="100%">Coba kembali</Button>
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

export default StoreNotFound
