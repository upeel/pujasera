import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, HStack, Image, Stack, Text } from '@chakra-ui/react'
import PhoneNumberInput from 'src/components/phoneNumberInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { HandleCheckoutEwallet } from 'src/views/payment/selectPayment/selectPayment.module'
import { useAppSelector } from 'src/hooks/useActionStore'
import { formatCurrency } from 'src/utils/formatNumber'
import { getSumPriceState } from 'src/store/cart/cartSlice'

interface SchemaForm {
  phone: string
}
const schemaForm: yup.SchemaOf<SchemaForm> = yup.object().shape({
  phone: yup
    .string()
    .nullable()
    .required('Nomor hp wajib diisi!')
    .test('phone-number', 'Nomor hp anda tidak valid', (value) => value ? isValidPhoneNumber(value) : false)
})

interface FormPhoneNumberEwalletProps {
  ewalletName: string,
  logoEwallet: string,
  ewalletCode: string,
  onCheckout: HandleCheckoutEwallet,
  isLoadingAfterSubmit?: boolean
}

const FormPhoneNumberEWallet:React.FC<FormPhoneNumberEwalletProps> = ({
  ewalletName,
  logoEwallet,
  ewalletCode,
  onCheckout,
  isLoadingAfterSubmit = false
}) => {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      phone: ''
    }
  })
  const watchPhone = watch('phone')
  const getStore = useAppSelector(state => state.app.store)
  const getSumPrice = useAppSelector(state => getSumPriceState(state))

  const onSubmit = (data:SchemaForm) => {
    onCheckout(ewalletCode, data.phone)
  }

  return (
    <>
      <Box height="full" display="flex" flexDirection="column" flex="1">
        <section className="section-wrap container-with-px">
          <HStack paddingX="2" paddingY="4" spacing="4" boxShadow="md" borderRadius="8">
            <Image width="80px" height="80px" objectFit="cover" src={getStore.logo} fallbackSrc="/images/resto_placeholder.png"/>
            <Stack spacing="2">
              <Text fontSize="lg" fontWeight="semibold" noOfLines={2}>{getStore.name}</Text>
              <Text fontSize="sm">{formatCurrency(getSumPrice.total)}</Text>
            </Stack>
          </HStack>
        </section>

        <section className="section-wrap container-with-px">
          <HStack paddingX="2" paddingY="4">
            <Image width="40px" height="40px" objectFit="cover" src={logoEwallet} fallbackSrc="/images/resto_placeholder.png"/>
            <Stack spacing="0.5">
              <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>{ewalletName}</Text>
              <Text fontSize="xs">Masukkan nomor HP</Text>
            </Stack>
          </HStack>
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
        </section>

        {/* <Box as="section" className="container-with-px" mt="6">
          <Box width="full" bg="#F5F5F5" borderRadius="md" p="4">
            <Text fontWeight="semibold">Syarat dan Ketentuan</Text>
            <OrderedList mt="2">
              <li>Sudah terinstall aplikasi OVO dan memiliki akun OVO yang aktif.</li>
              <li>Sudah terinstall aplikasi OVO dan memiliki akun OVO yang aktif.</li>
              <li>Saldo OVO mencukupi total yang harus dibayar.</li>,
              <li>Pembayaran Anda akan diteruskan ke Aplikasi OVO untuk menyelesaikan pembayaran.</li>
              <li>Pembayaran berhasil jika sukses melakukan pembayaran di aplikasi OVO.</li>
            </OrderedList>
          </Box>
        </Box> */}
      </Box>
      <Box as="section" className="container-with-px" my="4">
        <Button
          colorScheme="ol_green"
          width="full"
          onClick={handleSubmit(onSubmit)}
          disabled={!watchPhone || isLoadingAfterSubmit}
          isLoading={isLoadingAfterSubmit}
        >
            Selanjutnya
        </Button>
      </Box>
    </>
  )
}

export default FormPhoneNumberEWallet
