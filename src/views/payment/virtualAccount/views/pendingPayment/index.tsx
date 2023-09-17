import React from 'react'
import { Box, Button, HStack, Image, Stack, Text } from '@chakra-ui/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import AlertCountdownPayment from 'src/components/alertCountdownPayment'
import BannerStatusOrder from 'src/components/bannerStatusOrder/bannerStatusOrder'
import BottomSheet from 'src/components/bottomSheet'
import MainContainer from 'src/components/container'
import DetailOrderView from 'src/components/detailOrder'
import ModalAlert from 'src/components/modalAlert'
import ModalExpiredPayment from 'src/components/modalExpiredPayment'
import NavigationPane from 'src/components/navigationPane'
import OrderQueue from 'src/components/orderQueue'
import { PaymentGuideVA } from 'src/components/paymentGuide'
import { paddingContainerChakra } from 'src/styles/theme.config'
import PendingPaymentVirtualAccountModel from './pendingPayment.model'
import InfoFoodCourtOrderDetail from 'src/components/infoFoodCourt/infoFoodCourtOrderDetail'

const PendingPaymentVirtualAccountView = () => {
  const {
    handleBack,
    isOpenDtm,
    onCloseDtm,
    onOpenDtm,
    isOpenGuide,
    onCloseGuide,
    onOpenGuide,
    handleOnCopyVirtualAccount,
    invoice,
    ttlGenQrCode,
    groupOrderItems,
    getStore,
    handleCancelPayment,
    isLodingCancelPayment,
    isOpenCancelOrder,
    onCloseCancelOrder,
    onOpenCancelOrder,
    navigate,
    isLoadingUpdatePayment,
    getStatusInvoice,
    isQrCodeExp,
    handleSetIsQrCodeExp
  } = PendingPaymentVirtualAccountModel()

  return (
    <>
      <NavigationPane title="Pembayaran" justTitle/>

      <BannerStatusOrder status="waitingPayment"/>

      <section className="section-wrap container-with-px">
        <Box boxShadow="md" borderRadius="8" px="2" py="2">

          <InfoFoodCourtOrderDetail
            foodCourtName={invoice?.foodcourt_nama}
            logoSrc={invoice?.foodcourt_logo}
            famount={invoice?.famount}
            customComponent={
              <button className="ol-btn-link" onClick={onOpenDtm}>Lihat detail pesanan</button>
            }
          />

          <Box px="2">
            <hr className="ol-divider"/>
          </Box>

          <Box paddingX="2" paddingY="4" display="flex" alignItems="center">
            <HStack flex="1">
              <Image width="40px" height="40px" objectFit="cover" src={invoice?.bank_logo} fallbackSrc="/images/resto_placeholder.png"/>
              <Stack spacing="0.5">
                <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>{invoice?.va_account_number}</Text>
                <Text fontSize="xs">{invoice?.bank_name}</Text>
              </Stack>
            </HStack>
            <CopyToClipboard text={invoice?.va_account_number || ''} onCopy={handleOnCopyVirtualAccount}>
              <Box as="i" className="bx bx-copy" fontSize="2xl" color="ol_blue.500"></Box>
            </CopyToClipboard>
          </Box>

          <Box px="2">
            <hr className="ol-divider"/>
          </Box>

          <HStack paddingX="2" paddingY="4" display="flex" alignItems="center">
            <Text fontSize="sm" fontWeight="semibold" flex="1">Total</Text>
            <Text fontSize="sm" fontWeight="semibold">{invoice?.famount}</Text>
          </HStack>

          <Box paddingX="2">
            <AlertCountdownPayment
              countdownConfig={{
                date: ttlGenQrCode,
                onComplete: () => {
                  if (!isQrCodeExp) {
                    handleSetIsQrCodeExp()
                  }
                }
              }}
            />
          </Box>

          <Box paddingX="2" paddingY="4">
            <Button variant="outline" colorScheme="ol_blue" w="full" onClick={onOpenGuide}>Lihat panduan pembayaran</Button>
          </Box>
        </Box>
      </section>

      <section className="section-wrap container-with-px">
        <OrderQueue
          meja={invoice?.order_datail.table_name}
          orderNumber={invoice?.order_datail.order_no}
          nomorHP={invoice?.order_datail.customer_phone}
        />
      </section>

      <Stack className="section-wrap container-with-px" py="4">
        <Button
          colorScheme="ol_blue"
          width="full"
          boxShadow="md"
          disabled={isLoadingUpdatePayment}
          isLoading={isLoadingUpdatePayment}
          onClick={getStatusInvoice}
        >
            Update status pembayaran
        </Button>
        <Button
          backgroundColor="white"
          boxShadow="md"
          onClick={() => navigate('/menu')}
        >
            Kembali ke menu
        </Button>
        <Button
          backgroundColor="white"
          boxShadow="md"
          color="ol_red.500"
          disabled={isLodingCancelPayment}
          isLoading={isLodingCancelPayment}
          onClick={onOpenCancelOrder}
        >
            Batalkan pesanan
        </Button>
      </Stack>

      <DetailOrderView
        isOpen={isOpenDtm}
        onClose={onCloseDtm}
        carts={groupOrderItems}
        admin_fee={Number(invoice?.order_datail.service_charge_amount || 0)}
        admin_fee_percentage={Number(getStore.service_charge_rate_percentage || 0)}
        sub_total={Number(invoice?.order_datail.order_amount || 0)}
        tax={Number(invoice?.order_datail.tax_amount || 0)}
        tax_name={getStore?.tax_name}
        total={Number(invoice?.order_datail.total_amount || 0)}
        payment_charge={Number(invoice?.order_datail.payment_charge || 0)}
      />

      <ModalAlert
        isOpen={isOpenCancelOrder}
        title="Apakah Anda yakin ingin membatalkan pesanan ini?"
        showCancelButton
        cancelButtonText="Kembali"
        confirmButtonText="Ya, batalkan"
        disabledBtnCancel={isLodingCancelPayment}
        disabledBtnConfirm={isLodingCancelPayment}
        loadingBtnConfirm={isLodingCancelPayment}
        onCancel={onCloseCancelOrder}
        onConfirm={handleCancelPayment}
      />

      <BottomSheet
        isOpen={isOpenGuide}
        onClose={onCloseGuide}
        snapPoint="middle"
      >
        <MainContainer py="4">
          <Text fontSize="lg" mx={paddingContainerChakra} fontWeight="bold">Panduan Pembayaran</Text>
          <Box height={paddingContainerChakra}>
            <PaymentGuideVA code={invoice?.bank_code || ''} virtualAccount={invoice?.va_account_number || ''}/>
          </Box>
        </MainContainer>
      </BottomSheet>

      <ModalExpiredPayment
        openModalExp={isQrCodeExp}
        isModeNoAction={true}
        onGoBack={handleBack}
      />
    </>
  )
}

export default PendingPaymentVirtualAccountView
