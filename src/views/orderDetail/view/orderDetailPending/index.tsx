import React from 'react'
import { Alert, Box, Button, HStack, Image, Stack, Text } from '@chakra-ui/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import BannerStatusOrder from 'src/components/bannerStatusOrder/bannerStatusOrder'
import NavigationPane from 'src/components/navigationPane'
import OrderQueue from 'src/components/orderQueue'
import OrderDetailPendingModel from './orderDetailPending.module'
import Modal from 'src/components/modal'
import BottomSheet from 'src/components/bottomSheet'
import MainContainer from 'src/components/container'
import { PaymentGuideQris, PaymentGuideVA } from 'src/components/paymentGuide'
import { paddingContainerChakra } from 'src/styles/theme.config'
import ModalAlert from 'src/components/modalAlert'
import GroupItemTenant from 'src/components/GroupItemTenant'
import SplitTakeAway from 'src/utils/spliteTakeAway'
import ListItemOrder from 'src/components/ListItemOrder'
import { formatCurrency } from 'src/utils/formatNumber'
import listToString from 'src/utils/listToString'
import PaymentDetails from 'src/components/paymentDetails'
import ModalExpiredPayment from 'src/components/modalExpiredPayment'
import InfoFoodCourtOrderDetail from 'src/components/infoFoodCourt/infoFoodCourtOrderDetail'
import BadgeStatusOrder from 'src/components/badgeStatusOrder'
import AlertCountdownPayment from 'src/components/alertCountdownPayment'

const OrderDetailPending = () => {
  const {
    invoice,
    isLoadingUpdatePayment,
    getStatusInvoice,
    handleBack,
    onOpenQris,
    onCloseQris,
    isOpenQris,
    handleDownloadFile,
    isDownloadLoading,
    groupOrderItems,
    getStore,
    isOpenGuide,
    onCloseGuide,
    onOpenGuide,
    isOpenCancelOrder,
    onCloseCancelOrder,
    onOpenCancelOrder,
    handleCancelPayment,
    isLodingCancelPayment,
    handleOnCopyVirtualAccount,
    ttlGenQrCode,
    handleSetIsQrCodeExp,
    isQrCodeExp,
    isLoadingCreateInvoice,
    hadleCreateInvoiceQris,
    isOpenAlertCancel,
    onCloseAlertCancel,
    onOpenAlertCancel,
    salesOrderStatus
  } = OrderDetailPendingModel()

  const namePayment = () => {
    if (invoice?.payment_mode === 'BT') {
      return (
        <>
          <HStack flex="1">
            <Image
              width="40px"
              height="40px"
              objectFit="cover"
              src={invoice.bank_logo}
            />
            <Stack spacing="0.5">
              <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                {invoice.va_account_number}
              </Text>
              <Text fontSize="xs">{invoice.bank_name}</Text>
            </Stack>
          </HStack>
          <CopyToClipboard text={invoice.va_account_number} onCopy={handleOnCopyVirtualAccount}>
            <Box as="i" className="bx bx-copy" fontSize="2xl" color="ol_blue.500"></Box>
          </CopyToClipboard>
        </>
      )
    }

    if (invoice?.payment_mode === 'EW') {
      return (
        <>
          <HStack flex="1">
            <Image width="40px" height="40px" objectFit="cover" src={invoice.ewallet_logo} fallbackSrc="/images/resto_placeholder.png"/>
            <Text fontSize="sm" fontWeight="semibold">{invoice.ewallet_name}</Text>
          </HStack>
        </>
      )
    }

    if (invoice?.payment_mode === 'OQ') {
      return (
        <>
          <HStack flex="1">
            <Image
              width="40px"
              height="40px"
              objectFit="cover"
              src={invoice.logo_qris}
            />
            <Stack spacing="0.5">
              <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
              QRIS
              </Text>
            </Stack>
          </HStack>
          <button className="ol-btn-link" onClick={onOpenQris}>Lihat QR</button>
        </>
      )
    }
  }

  return (
    <>
      <NavigationPane title="Detail pesanan"/>
      <Box pb="4">
        {
          salesOrderStatus === 'A'
            ? <section className="section-wrap container-with-px">
              <HStack spacing="4" backgroundColor="white" p="4" boxShadow="md" borderRadius="8">
                <Text as="i" className="bx bx-check-circle" fontSize="5xl" color="ol_green.500"></Text>
                <Box>
                  <Text fontSize="lg" fontWeight="semibold">Pembayaran Anda sukses!</Text>
                  <Text fontSize="sm">{invoice?.famount}</Text>
                </Box>
-              </HStack>
            </section>
            : null
        }
        {
          salesOrderStatus !== 'X'
            ? <section className="section-wrap">
              <BannerStatusOrder status={
                salesOrderStatus === 'A'
                  ? 'process'
                  : salesOrderStatus === 'Z'
                    ? 'done'
                    : 'waitingPayment'
              }/>
            </section>
            : null
        }
        {
          salesOrderStatus === 'Z'
            ? <section className="section-wrap container-with-px">
              <Alert bgColor="ol_blue.50" flexDirection="row" alignItems="start" borderRadius="8">
                <Box display="flex">
                  <Text as="i" className="bx bx-info-circle" mr="4" fontSize="2xl"></Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                  Pastikan pesananmu sudah diantarkan.
                  </Text>
                  <Text fontSize="xs">
                Jika pesanan belum diantar, segera cek ke resto terkait.
                  </Text>
                </Box>
              </Alert>
            </section>
            : null
        }
        <section className="section-wrap container-with-px">
          <Box boxShadow="md" borderRadius="8" px="2" py="2">
            <InfoFoodCourtOrderDetail
              foodCourtName={invoice?.foodcourt_nama}
              logoSrc={invoice?.foodcourt_logo}
              famount={invoice?.famount}
              customComponent={
                <BadgeStatusOrder status={salesOrderStatus} />
              }
            />
            {
              salesOrderStatus === 'P'
                ? (
                  <>
                    <Box px="2">
                      <hr className="ol-divider"/>
                    </Box>

                    <Box paddingX="2" paddingY="4" display="flex" alignItems="center">
                      {namePayment()}
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
                    {
                      invoice?.payment_mode === 'BT' || invoice?.payment_mode === 'OQ'
                        ? <Box paddingX="2" paddingY="4">
                          <Button variant="outline" colorScheme="ol_blue" w="full" onClick={onOpenGuide}>Lihat panduan pembayaran</Button>
                        </Box>
                        : null
                    }
                  </>
                )
                : null
            }
          </Box>
        </section>

        <section className="section-wrap container-with-px">
          <OrderQueue
            meja={invoice?.order_datail.table_name}
            orderNumber={invoice?.order_datail.order_no}
            nomorHP={invoice?.order_datail.customer_phone}
          />
        </section>

        {/* Order */}
        {
          groupOrderItems.length > 0 &&
          <section className="section-wrap">
            {
              groupOrderItems.map((item) => {
                return (
                  <Box key={item.group_id} marginBottom="4">
                    <GroupItemTenant name={item.group_name} total={item.children.length} img={item.photo}>
                      {
                        item.children.map((val, j) => {
                          const { isTakeAway, getNote } = SplitTakeAway(val.note, ',')
                          return (
                            <Box paddingX="4" key={j}>
                              <ListItemOrder
                                totalItem={val.qty}
                                name={val.item_name}
                                price={formatCurrency(val.amount)}
                                additional={
                                  listToString([
                                    { list: val.variants, key: val.type === 'P' ? 'name' : 'product_name' },
                                    { list: val.addons, key: 'name' }
                                  ], ', ')
                                }
                                notes={getNote}
                                isTakeAway={isTakeAway}
                              />
                            </Box>
                          )
                        })
                      }
                    </GroupItemTenant>
                  </Box>
                )
              })
            }
          </section>
        }
        {/* End Order */}

        <section className="section-wrap container-with-px">
          <PaymentDetails
            SumPrice={{
              admin_fee: Number(invoice?.order_datail.service_charge_amount || 0),
              sub_total: Number(invoice?.order_datail.order_amount || 0),
              tax: Number(invoice?.order_datail.tax_amount || 0),
              total: Number(invoice?.order_datail.total_amount || 0),
              payment_charge: Number(invoice?.order_datail.payment_charge || 0)
            }}
            admin_fee_percentage={Number(getStore.service_charge_rate_percentage || 0)}
            tax_name={getStore.tax_name}
            paymentMethod={salesOrderStatus !== 'P' ? invoice?.ewallet_name || invoice?.bank_name || 'QRIS' : ''}
          />
        </section>

        {
          salesOrderStatus === 'P'
            ? (
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
                Kembali ke pesanan
                </Button>
                {
                  invoice?.payment_mode === 'BT' || invoice?.payment_mode === 'OQ'
                    ? <Button
                      backgroundColor="white"
                      boxShadow="md"
                      color="ol_red.500"
                      disabled={isLodingCancelPayment}
                      isLoading={isLodingCancelPayment}
                      onClick={onOpenCancelOrder}
                    >
                    Batalkan pesanan
                    </Button>
                    : null
                }
              </Stack>
            )
            : null
        }
      </Box>
      {
        invoice?.payment_mode === 'OQ'
          ? <Modal
            isOpen={isOpenQris}
            isCentered
            onClose={onCloseQris}
            size="sm"
            modalContent={{ marginX: '4' }}
            withFooter
            footerChildren={
              <Stack w="full">
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
                <Button
                  backgroundColor="white"
                  boxShadow="md"
                  onClick={onCloseQris}
                >
                  Kembali
                </Button>
              </Stack>
            }
          >
            <Image src={invoice?.qr_image} width="full"/>
          </Modal>
          : null
      }
      {
        salesOrderStatus === 'P'
          ? (
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
          )
          : null
      }

      {
        salesOrderStatus === 'P'
          ? (
            <BottomSheet
              isOpen={isOpenGuide}
              onClose={onCloseGuide}
              snapPoint="middle"
            >
              <MainContainer py="4">
                <Text fontSize="lg" mx={paddingContainerChakra} fontWeight="bold">Panduan Pembayaran</Text>
                {
                  invoice?.payment_mode === 'BT'
                    ? <PaymentGuideVA code={invoice?.bank_code || ''} virtualAccount={invoice?.va_account_number || ''}/>
                    : null
                }
                {
                  invoice?.payment_mode === 'OQ'
                    ? <Box px={paddingContainerChakra}>
                      <PaymentGuideQris />
                    </Box>
                    : null

                }
              </MainContainer>
            </BottomSheet>
          )
          : null
      }

      {
        salesOrderStatus === 'P'
          ? (
            invoice?.payment_mode === 'OQ'
              ? (
                <ModalExpiredPayment
                  openModalExp={isQrCodeExp}
                  isLoadingRefreshPayment={isLoadingCreateInvoice}
                  onClickRefreshPayment={hadleCreateInvoiceQris}
                  onOpenAlertCancel={onOpenAlertCancel}
                  openAlertCancel={isOpenAlertCancel}
                  isLoadingCancelPayment={isLodingCancelPayment}
                  onCloseAlertCancel={onCloseAlertCancel}
                  onClickNotContinuePayment={handleCancelPayment}
                />
              )
              : <ModalExpiredPayment
                openModalExp={isQrCodeExp}
                isModeNoAction={true}
                onGoBack={handleBack}
              />
          )
          : null

      }
    </>
  )
}

export default OrderDetailPending
