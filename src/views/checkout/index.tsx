import React from 'react'
import { Image, HStack, Text, Stack, Box, Button } from '@chakra-ui/react'
import NavigationPane from 'src/components/navigationPane'
import TableNumber from 'src/components/tableNumber'
import GroupItemTenant from 'src/components/GroupItemTenant'
import ListItemOrder from 'src/components/ListItemOrder'
import CheckoutModel from './checkout.model'
// import styles from './checkout.module.scss'
// import classNames from 'classnames/bind'
import PaymentDetails from 'src/components/paymentDetails'
import FloatingBottomContainer from 'src/components/floatingBottomContainer'
import { formatCurrency } from 'src/utils/formatNumber'
import listToString from 'src/utils/listToString'
import Modal from 'src/components/modal'
import LoadingScreen from 'src/components/loadingScreen'
import DetailMenuView from '../detailMenu'
import ItemNotFound from 'src/components/itemNotFound'
import MainContainer from 'src/components/container'

// const cx = classNames.bind(styles)

const CheckoutView = () => {
  const {
    navigate,
    dataStore,
    dataTable,
    groupingCart,
    handlCloseUpdateMenu,
    handleOpenUpdateMenu,
    openDetailMenu,
    handleUpdateRemark,
    sumPrice,
    handleCheckout
  } = CheckoutModel()
  return (
    <>
      <Box paddingBottom="4">
        <NavigationPane title="Checkout" type="LEFT" onClick={() => navigate('/menu')}/>
        {/* Info Tenant */}
        {
          React.useMemo(() => (
            <section className="section-wrap container-with-px">
              <HStack padding="2" spacing="4" boxShadow="md" borderRadius="8">
                <Image width="80px" height="80px" objectFit="cover" src={dataStore.logo_xs} fallbackSrc={'/images/resto_placeholder.png'}/>
                <Stack spacing="2">
                  <Text fontSize="lg" fontWeight="medium" noOfLines={2}>{ dataStore.name }</Text>
                  <TableNumber number={dataTable.name}/>
                </Stack>
              </HStack>
            </section>
          ), [dataStore])
        }
        {/* End Info Tenant */}

        {
          groupingCart.length < 1 &&
          <Box className="section-wrap" alignItems="center" display="flex" flexDirection="column">
            <ItemNotFound
              title="Keranjangmu masih kosong"
              description="silahkan pilih menu makanan terlebih dahulu ;)"
            />
            <Button colorScheme="ol_green" mt="4" onClick={() => navigate('/menu')}>Belanja sekarang</Button>
          </Box>
        }

        {/* Order */}
        {
          groupingCart.length > 0 &&
          <section className="section-wrap">
            {
              groupingCart.map((cart) => {
                return (
                  <Box key={cart.group_id} marginBottom="4">
                    <GroupItemTenant name={cart.group_name} total={cart.children.length} img={cart.photo}>
                      {
                        cart.children.map((val, j) => {
                          return (
                            <Box paddingX="4" key={j}>
                              <ListItemOrder
                                id={val.cart_id}
                                totalItem={val.qty}
                                name={val.name_product}
                                price={formatCurrency(val.totalPrice)}
                                isProcessCheckout
                                additional={
                                  listToString([
                                    { list: val.variants, key: 'name' },
                                    { list: val.addons, key: 'name' }
                                  ], ', ')
                                }
                                notes={val.note}
                                onUpdate={() => handleOpenUpdateMenu({
                                  isUpdate: true,
                                  id: val.id.toString(),
                                  type: val.type_code
                                }, val)}
                                remark={val.remark}
                                onUpdateRemark={handleUpdateRemark}
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

        {/* Payment Details */}
        {
          React.useMemo(() => (
            groupingCart.length > 0 &&
            <section className="section-wrap container-with-px">
              <PaymentDetails
                SumPrice={sumPrice}
                admin_fee_percentage={Number(dataStore.service_charge_rate_percentage)}
                tax_name={dataStore.tax_name}
              />
            </section>
          ), [sumPrice])
        }
        {/* End Payment Details */}
      </Box>

      {/* PDP Action */}
      {
        React.useMemo(() => (
          groupingCart.length > 0 &&
          <FloatingBottomContainer>
            <MainContainer maxW="container.sm" paddingX="4">
              <Button colorScheme="ol_green" width="full" onClick={handleCheckout}>
                Selanjutnya
              </Button>
            </MainContainer>
          </FloatingBottomContainer>
        ), [groupingCart])
      }
      {/* End PDP Action */}

      {/* Modal Update Menu */}
      {
        <Modal
          isOpen={openDetailMenu.isOpen}
          onClose={handlCloseUpdateMenu}
          size="full"
          withHeader={false}
          showCloseButton={false}
          withModalBody={false}
          customElementHeader={() => (
            <MainContainer>
              <NavigationPane title="Ubah menu" type="RIGHT" onClick={handlCloseUpdateMenu}/>
            </MainContainer>
          )}
        >
          <MainContainer height="full">
            {
              React.useMemo(() => (
                <React.Suspense fallback={<LoadingScreen />}>
                  <DetailMenuView />
                </React.Suspense>
              ), [])
            }
          </MainContainer>
        </Modal>
      }
      {/* End Modal Update Menu */}
    </>
  )
}

export default React.memo(CheckoutView)
