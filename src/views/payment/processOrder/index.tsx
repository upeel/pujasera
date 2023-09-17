import React from 'react'
import { Alert, Box, Button, HStack, Text } from '@chakra-ui/react'
import GroupItemTenant from 'src/components/GroupItemTenant'
import ListItemOrder from 'src/components/ListItemOrder'
import NavigationPane from 'src/components/navigationPane'
import OrderQueue from 'src/components/orderQueue'
import PaymentDetails from 'src/components/paymentDetails'
import BannerStatusOrder from 'src/components/bannerStatusOrder/bannerStatusOrder'
import FloatingBottomContainer from 'src/components/floatingBottomContainer'
import { formatCurrency } from 'src/utils/formatNumber'
import listToString from 'src/utils/listToString'
import SplitTakeAway from 'src/utils/spliteTakeAway'
import MainContainer from 'src/components/container'
import ProcessOrderModel from './processOrder.model'
import InfoFoodCourtOrderDetail from 'src/components/infoFoodCourt/infoFoodCourtOrderDetail'
import BadgeStatusOrder from 'src/components/badgeStatusOrder'

const ProcessOrderView = () => {
  const { getStore, groupOrderItems, invoice, salesOrderStatus, backToMenu } = ProcessOrderModel()

  return (
    <>
      <Box paddingBottom="5">
        <NavigationPane title="Detail Pesanan" justTitle />
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
            ? (
              <section className="section-wrap">
                <BannerStatusOrder status={salesOrderStatus === 'A' ? 'process' : 'done'}/>
              </section>
            )
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
          <InfoFoodCourtOrderDetail
            foodCourtName={invoice?.foodcourt_nama}
            logoSrc={invoice?.foodcourt_logo}
            famount={invoice?.famount}
            customComponent={
              <BadgeStatusOrder status={salesOrderStatus} />
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
            paymentMethod={invoice?.ewallet_name || invoice?.bank_name || 'QRIS'}
          />
        </section>
      </Box>

      <FloatingBottomContainer>
        <MainContainer paddingX="4">
          <Button
            backgroundColor="white"
            boxShadow="md"
            width="full"
            onClick={backToMenu}
          >
            Kembali ke menu
          </Button>
        </MainContainer>
      </FloatingBottomContainer>
    </>
  )
}

export default ProcessOrderView
