import React from 'react'
import { AspectRatio, Box, Button, Image, Skeleton, Stack, Text } from '@chakra-ui/react'
import NavigationPane from 'src/components/navigationPane'
import DetailOrderView from 'src/components/detailOrder'
import PendingPaymentQrisModel from './pendingPayment.model'
import OrderQueue from 'src/components/orderQueue'
import ModalAlert from 'src/components/modalAlert'
import ModalExpiredPayment from 'src/components/modalExpiredPayment'
import { PaymentGuideQris } from 'src/components/paymentGuide'
import InfoFoodCourtOrderDetail from 'src/components/infoFoodCourt/infoFoodCourtOrderDetail'
import AlertCountdownPayment from 'src/components/alertCountdownPayment'

const PendingPaymentQrisView = () => {
  const {
    isOpenDtm,
    onCloseDtm,
    onOpenDtm,
    navigate,
    onCloseCancelOrder,
    isOpenCancelOrder,
    onOpenCancelOrder,
    invoice,
    ttlGenQrCode,
    handleSetIsQrCodeExp,
    isQrCodeExp,
    isLoading,
    handleRefreshQrCode,
    handleNotContinueInvoice,
    handleUpdateStatusPayment,
    isLoadingUpdatePayment,
    isLodingCancelPayment,
    handleCancelPayment,
    groupOrderItems,
    isOpenAlertCancel,
    onOpenAlertCancel,
    onCloseAlertCancel,
    getStore,
    handleDownloadFile,
    isDownloadLoading
  } = PendingPaymentQrisModel()

  return (
    <>
      <Box paddingBottom="4">
        <NavigationPane title="Pembayaran" justTitle/>
        <Box as="section" display="flex" justifyContent="center" className="section-wrap container-with-px">
          <AspectRatio width="328px" ratio={1}>
            <Skeleton height="auto" width="full" isLoaded={!isLoading}>
              <Image maxH="100%" src={invoice?.qr_image}/>
            </Skeleton>
          </AspectRatio>
        </Box>
        <section className="section-wrap container-with-px">
          <Button
            colorScheme="ol_green"
            width="full"
            onClick={() => handleDownloadFile(invoice?.qr_image || '')}
            leftIcon={<Text as="i" className="bx bx-download" fontSize="2xl"></Text>}
            isLoading={isDownloadLoading}
            disabled={isDownloadLoading}
          >
            Download QRIS
          </Button>
        </section>
        <section className="section-wrap container-with-px">
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
        </section>
        <section className="section-wrap container-with-px">
          <InfoFoodCourtOrderDetail
            foodCourtName={invoice?.foodcourt_nama}
            logoSrc={invoice?.foodcourt_logo}
            famount={invoice?.famount}
            customComponent={
              <button className="ol-btn-link" onClick={onOpenDtm}>Lihat detail pesanan</button>
            }
          />
        </section>
        <section className="section-wrap container-with-px">
          <OrderQueue
            meja={invoice?.order_datail.table_name}
            orderNumber={invoice?.order_datail.order_no}
            nomorHP={invoice?.order_datail.customer_phone}
          />
        </section>

        <section className="section-wrap container-with-px">
          <PaymentGuideQris />
        </section>

        <Stack className="section-wrap container-with-px">
          <Button
            colorScheme="ol_blue"
            width="full"
            boxShadow="md"
            disabled={isLoadingUpdatePayment}
            isLoading={isLoadingUpdatePayment}
            onClick={handleUpdateStatusPayment}
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
            disabled={isLodingCancelPayment}
            color="ol_red.500"
            onClick={onOpenCancelOrder}
            isLoading={isLodingCancelPayment}
          >
            Batalkan pesanan
          </Button>
        </Stack>
      </Box>
      {/* MODAL DETAIL PESANAN */}
      {
        React.useMemo(() => {
          return (
            <DetailOrderView
              isOpen={isOpenDtm}
              onClose={onCloseDtm}
              carts={groupOrderItems}
              admin_fee={Number(invoice?.order_datail.service_charge_amount || 0)}
              admin_fee_percentage={Number(getStore?.service_charge_rate_percentage || 0)}
              sub_total={Number(invoice?.order_datail.order_amount || 0)}
              tax={Number(invoice?.order_datail.tax_amount || 0)}
              tax_name={getStore?.tax_name || ''}
              total={Number(invoice?.order_datail.total_amount || 0)}
              payment_charge={Number(invoice?.order_datail.payment_charge || 0)}
            />
          )
        }, [isOpenDtm, invoice])
      }
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

      <ModalExpiredPayment
        openModalExp={isQrCodeExp}
        isLoadingRefreshPayment={isLoading}
        onClickRefreshPayment={handleRefreshQrCode}
        onOpenAlertCancel={onOpenAlertCancel}
        openAlertCancel={isOpenAlertCancel}
        isLoadingCancelPayment={isLodingCancelPayment}
        onCloseAlertCancel={onCloseAlertCancel}
        onClickNotContinuePayment={handleNotContinueInvoice}
      />
    </>
  )
}

export default PendingPaymentQrisView
