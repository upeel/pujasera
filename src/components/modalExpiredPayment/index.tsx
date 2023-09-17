import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import BottomSheet from '../bottomSheet'
import MainContainer from '../container'
import ModalAlert from '../modalAlert'

interface ModalExpiredPaymentProps {
  openModalExp?: boolean,
  isLoadingRefreshPayment?: boolean,
  onClickRefreshPayment?: () => void
  openAlertCancel?: boolean,
  onOpenAlertCancel?: () => void,
  isLoadingCancelPayment?: boolean,
  onCloseAlertCancel?: () => void,
  onClickNotContinuePayment?: () => void,
  isModeNoAction?: boolean,
  onGoBack?: () => void
}

const ModalExpiredPayment:React.FC<ModalExpiredPaymentProps> = (
  {
    openModalExp,
    isLoadingRefreshPayment,
    onClickRefreshPayment,
    onOpenAlertCancel,
    isLoadingCancelPayment,
    openAlertCancel,
    onClickNotContinuePayment,
    onCloseAlertCancel,
    isModeNoAction = false,
    onGoBack
  }
) => {
  return (
    <>
      <BottomSheet
        isOpen={openModalExp}
        isCloseable={false}
        withButtonClose={false}
        withExitBoard={false}
        withHeader={false}
        snapPoint="auto"
      >
        <MainContainer p="4">
          <Flex alignItems="center" flexDirection="column">
            <Image src="/images/ol_clock.svg" />
            <Stack spacing="2" marginTop="8" textAlign="center">
              <Text fontSize="lg" fontWeight="bold">Waktu bayar telah habis :(</Text>
              <Text>
                {
                  !isModeNoAction
                    ? `Tenang, pesananmu sebelumnya masih bisa diproses. Apakah Anda ingin mengulang pembayaran?`
                    : `Kembali ke menu untuk membuat pesanan baru lagi`
                }
              </Text>
            </Stack>
          </Flex>
          <Stack spacing="2" marginTop="6" marginBottom="4">
            {
              !isModeNoAction
                ? (
                  <>
                    <Button
                      colorScheme="ol_green"
                      width="full"
                      disabled={isLoadingRefreshPayment}
                      isLoading={isLoadingRefreshPayment}
                      onClick={onClickRefreshPayment}
                    >
                    Ya, lakukan pembayaran
                    </Button><Button
                      backgroundColor="white"
                      boxShadow="md"
                      width="full"
                      disabled={isLoadingRefreshPayment}
                      onClick={onOpenAlertCancel}
                    >
                      Pilih ulang menu
                    </Button>
                  </>
                )
                : (
                  <Button
                    backgroundColor="white"
                    boxShadow="md"
                    width="full"
                    onClick={onGoBack}
                  >
              Kembali ke menu
                  </Button>
                )
            }
          </Stack>
        </MainContainer>
      </BottomSheet>

      <ModalAlert
        isOpen={openAlertCancel}
        title="Pilih ulang menu"
        description="Pesanan sebelumnya akan terhapus. Apakah Anda yakin?"
        showCancelButton
        cancelButtonText="Kembali"
        confirmButtonText="Ya, pilih ulang menu"
        disabledBtnCancel={isLoadingCancelPayment}
        disabledBtnConfirm={isLoadingCancelPayment}
        loadingBtnConfirm={isLoadingCancelPayment}
        onCancel={onCloseAlertCancel}
        onConfirm={onClickNotContinuePayment}
        buttonConfirmStyle={{ colorScheme: 'ol_blue' }}
      />
    </>
  )
}

export default ModalExpiredPayment
