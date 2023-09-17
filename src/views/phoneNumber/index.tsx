import React from 'react'
import { Box, Heading, Image, Text, Button, Link, HStack, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import { Link as LinkRouter } from 'react-router-dom'
import BannerImg from 'src/components/bannerImg/index'
import PhoneNumberInput from 'src/components/phoneNumberInput/index'
import TableNumber from 'src/components/tableNumber'
import PhoneNumberModel from './phoneNumber.model'
import { Controller } from 'react-hook-form'
import SelectCountry from 'src/components/form/selectCountry'
import LoadingScreen from 'src/components/loadingScreen'

const PhoneNumberInputView = () => {
  const {
    storeState,
    tableState,
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    loadingTableCheck
  } = PhoneNumberModel()
  return (
    <>
      <Box height="full" minHeight="100vh" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between" padding="4">
          {
            loadingTableCheck ? <SkeletonCircle
              width={{ base: '40px', sm: '40px' }}
              height={{ base: '40px', sm: '40px' }}
            />
              : <Image
                src={storeState.logo}
                alt="logo"
                boxSize={{ base: '40px', sm: '40px' }}
                borderRadius="full"
                fallbackSrc="/images/resto_placeholder.png"
              />
          }
          <HStack>
            <TableNumber isLoading={loadingTableCheck} number={tableState.name} />
            <div>
              <SelectCountry isDisabled={isLoading}/>
            </div>
          </HStack>
        </Box>
        <BannerImg isLoading={loadingTableCheck} img={storeState.logo} heightImg="200px" />
        <Box flex="1" marginLeft="4" marginRight="4">
          {
            loadingTableCheck
              ? <SkeletonCircle
                width="80px"
                height="80px"
                marginTop="-40px"
              />
              : <Image
                src={storeState.logo_xs}
                alt="logo"
                boxSize="80px"
                borderRadius="full"
                marginTop="-40px"
              />
          }
          <Text
            fontSize={{ base: 'medium' }}
            marginTop="4"
            textAlign="left"
          >
            Selamat datang di
          </Text>
          {
            loadingTableCheck
              ? <Skeleton height="20px" width="200px" maxW="100%" />
              : <Heading
                fontSize={{ base: '2xl' }}
                marginTop="1"
                className="splash-info-profile-name"
                textAlign="left"
              >
                { storeState.name }
              </Heading>
          }
          <Box marginTop="6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="phone"
                control={control}
                render={({ field, formState }) => (
                  <PhoneNumberInput
                    label="Nomor HP"
                    isError={!!formState.errors.phone}
                    errorMessage={formState.errors.phone?.message}
                    autoComplete="off"
                    {...field}
                  />
                )}
              />
            </form>
          </Box>
        </Box>
        <Box
          marginTop="4"
          justifyContent="left"
          display="flex"
          flexDirection="column"
          alignItems="left"
          py="4"
          marginLeft="4"
          marginRight="4"
        >
          <Text
            marginBottom="6"
            fontSize="14px"
            fontWeight="400"
          >
            Dengan menekan tombol “selanjutnya”, maka anda telah menyetujui <Link as={LinkRouter} to="/privacy-policy" color="#1A73E9" fontWeight="600">Kebijakan Privasi</Link>.
          </Text>
          <Button
            colorScheme="ol_green"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={loadingTableCheck || isLoading}
          >
            Selanjutnya
          </Button>
        </Box>
      </Box>
      {
        isLoading ? <LoadingScreen/> : null
      }
    </>
  )
}

export default PhoneNumberInputView
