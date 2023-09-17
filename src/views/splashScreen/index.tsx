import React from 'react'
import { Box, Heading, Image, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import BannerImg from 'src/components/bannerImg/index'
import Lottie from 'lottie-react'
import lottieLoadingPage from 'src/assets/lottie/loading.json'
import SplashScreenModel from './splashScreen.model'

const SplashScreenView = () => {
  const { storeTableCheck, isLoading } = SplashScreenModel()
  return (
    <>
      <Box height="full">
        <BannerImg isLoading={isLoading} img={storeTableCheck.logo} />
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px="4">
          {
            isLoading
              ? <SkeletonCircle
                width={{ base: '90px', sm: '120px' }}
                height={{ base: '90px', sm: '120px' }}
                marginTop={{ base: '-45px', sm: '-60px' }}
              />
              : <Image
                src={storeTableCheck.logo_xs}
                alt="logo"
                boxSize={{ base: '90px', sm: '120px' }}
                borderRadius="full"
                marginTop={{ base: '-45px', sm: '-60px' }}
              />
          }
          <Box marginTop="4">
            {
              isLoading
                ? <Skeleton height="20px" w="200px"/>
                : <Heading
                  fontSize={{ base: '2xl' }}
                  className="splash-info-profile_name"
                >
                  {storeTableCheck.name}
                </Heading>
            }
          </Box>
        </Box>
        <Lottie
          animationData={lottieLoadingPage}
          style={{
            height: 200
          }}
        />
        <Box
          as="footer"
          textAlign="center"
          justifyContent={'center'}
          display="flex"
          alignItems="center"
          py="4"
          position="fixed"
          width="100%"
          bottom="0"
          left="0"
        >
          <Text fontSize="xs">Powered by</Text>
          <Image width="auto" height="21px" marginLeft="2" src="/images/ol_logo.png"/>
        </Box>
      </Box>
    </>
  )
}

export default SplashScreenView
