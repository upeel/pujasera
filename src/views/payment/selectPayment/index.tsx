import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import Modal from 'src/components/modal'
import NavigationPane from 'src/components/navigationPane'
import { PaymentItem, PaymentGroupItem } from 'src/components/paymentItem'
import FormPhoneNumberEWallet from 'src/components/formPhoneNumberEWallet'
import SelectPaymentModel from './selectPayment.module'
import { PaymentGroupItemSkeleton } from 'src/components/paymentItem/paymentGroupItem'
import { PaymentItemSkeleton } from 'src/components/paymentItem/paymentItem'
import LoadingScreen from 'src/components/loadingScreen'

const SelectPayment = () => {
  const {
    isLoading,
    isOpenEWallet,
    onCloseFormNumberPhone,
    paymentList,
    handleSelectPayment,
    isLoadingCreateInvoice,
    selectEwallet,
    handleCheckoutEwallet
  } = SelectPaymentModel()

  return (
    <>
      <NavigationPane title="Pilih metode pembayaran"/>
      <Box pb="8">
        {
          isLoading ? <Box marginTop={4}>
            {
              new Array(2).fill(undefined).map((_, i) => (
                <PaymentGroupItemSkeleton key={i.toString()}>
                  {
                    new Array(3).fill(undefined).map((_, j) => (
                      <PaymentItemSkeleton key={j.toString()}/>
                    ))
                  }
                </PaymentGroupItemSkeleton>
              ))
            }
          </Box> : null
        }
        {
          !isLoading && paymentList.length > 0 ? paymentList.map((payment) => {
            if (payment.detail.length > 0) {
              return (
                <Box key={payment.code} marginTop={4}>
                  <PaymentGroupItem groupName={payment.name}>
                    {
                      payment.detail.map((item) => {
                        const disabledPayment = payment.enabled === 0 && item.enabled === 1 ? true : !!(payment.enabled === 1 && item.enabled === 0)
                        return (
                          <PaymentItem
                            name={item.name}
                            imgUrl={item.image}
                            key={item.code}
                            onClick={() => handleSelectPayment(payment.code, item)}
                            disabled={Boolean(disabledPayment)}
                          />
                        )
                      })
                    }
                  </PaymentGroupItem>
                </Box>
              )
            }
            return null
          })
            : null
        }
      </Box>

      <Modal
        isOpen={isOpenEWallet}
        onClose={onCloseFormNumberPhone}
        withModalBody={false}
        withHeader={false}
        size="full"
        showCloseButton={false}
        motionPreset="slideInBottom"
      >
        <Container maxW="container.sm" paddingX="0" display="flex" flex="1" flexDirection="column">
          <NavigationPane title="Pilih metode pembayaran" onClick={onCloseFormNumberPhone}/>
          <FormPhoneNumberEWallet
            ewalletName={selectEwallet.name}
            logoEwallet={selectEwallet.image}
            ewalletCode={selectEwallet.code}
            onCheckout={handleCheckoutEwallet}
            isLoadingAfterSubmit={isLoadingCreateInvoice}
          />
        </Container>
      </Modal>

      {
        isLoadingCreateInvoice ? <LoadingScreen/> : null
      }
    </>
  )
}

export default SelectPayment
