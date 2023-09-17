import React from 'react'
import { Box, Button, Image, Stack, Text } from '@chakra-ui/react'
import Storage from 'src/utils/storage'
import { INITIAL_STORAGE } from 'src/constant'
import { useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
const { getItem } = Storage({})
const cookies = new Cookies()

const NotFoundView = () => {
  const getStore = getItem(INITIAL_STORAGE.storeId, '')
  const navigate = useNavigate()
  const isAuth = cookies.get(INITIAL_STORAGE.accessToken)

  return (
    <Box height="100vh" display="flex" flexDirection="column" backgroundColor="white">
      <Box display="flex" alignItems="center" justifyContent="center" className="container-with-px" flex="1">
        <Box>
          <Image width="328px" height="328px" src="/images/404.svg" />
          <Stack spacing="4" marginTop="7">
            <Text textAlign="center" fontSize="lg" fontWeight="semibold">Oops, halaman tidak ditemukan</Text>
            <Text textAlign="center" fontSize="sm">Maaf, sepertinya halaman yang Anda cari tidak Ada.</Text>
            {
              isAuth
                ? <Button colorScheme="ol_blue" variant="outline" onClick={() => navigate('/menu')}>Kembali ke menu</Button>
                : getStore
                  ? <Button colorScheme="ol_blue" variant="outline" onClick={() => navigate('/')}>Kembali</Button>
                  : null
            }
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

export default NotFoundView
