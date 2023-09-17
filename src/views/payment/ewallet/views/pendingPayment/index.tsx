import React from 'react'
import { Box, Button, HStack, Image, Stack, Text } from '@chakra-ui/react'
import BannerStatusOrder from 'src/components/bannerStatusOrder/bannerStatusOrder'
import DetailOrderView from 'src/components/detailOrder'
import NavigationPane from 'src/components/navigationPane'
import OrderQueue from 'src/components/orderQueue'
import PendingPaymentEwalletModel from './pendingPayment.model'
import ModalExpiredPayment from 'src/components/modalExpiredPayment'
import InfoFoodCourtOrderDetail from 'src/components/infoFoodCourt/infoFoodCourtOrderDetail'
import AlertCountdownPayment from 'src/components/alertCountdownPayment'

const PendingPaymentEwalletView = () => {
  const {
    handleBack,
    isOpenDtm,
    onCloseDtm,
    onOpenDtm,
    invoice,
    ttlGenQrCode,
    groupOrderItems,
    getStore,
    isLoadingUpdatePayment,
    getStatusInvoice,
    isQrCodeExp,
    handleSetIsQrCodeExp
  } = PendingPaymentEwalletModel()

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
              <Image width="40px" height="40px" objectFit="cover" src={invoice?.ewallet_logo} fallbackSrc="/images/resto_placeholder.png"/>
              <Text fontSize="sm" fontWeight="semibold">{invoice?.ewallet_name}</Text>
            </HStack>
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
          onClick={handleBack}
        >
            Kembali ke menu
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

      <ModalExpiredPayment
        openModalExp={isQrCodeExp}
        isModeNoAction={true}
        onGoBack={handleBack}
      />
    </>
  )
}

export default PendingPaymentEwalletView
