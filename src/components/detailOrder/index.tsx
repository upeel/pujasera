import { Box } from '@chakra-ui/react'
import React from 'react'
import PaymentDetails from 'src/components/paymentDetails'
import GroupItemTenant from 'src/components/GroupItemTenant'
import ListItemOrder from 'src/components/ListItemOrder'
import Modal from 'src/components/modal'
import { formatCurrency } from 'src/utils/formatNumber'
import listToString from 'src/utils/listToString'
import { FormatManualGrouping, InvoiceItemsResponse } from 'src/api/index.type'
import SplitTakeAway from 'src/utils/spliteTakeAway'
import MainContainer from '../container'

interface DetailOrderViewProps {
  isOpen: boolean,
  onClose: () => void,
  carts: FormatManualGrouping<InvoiceItemsResponse[]>[],
  admin_fee: number,
  sub_total: number,
  tax: number,
  total: number,
  tax_name: string,
  admin_fee_percentage: number,
  payment_charge: number
}

const DetailOrderView:React.FC<DetailOrderViewProps> = ({
  isOpen,
  onClose,
  carts,
  admin_fee,
  sub_total,
  tax,
  tax_name,
  admin_fee_percentage,
  total,
  payment_charge
}) => {
  return (
    <Modal
      title="Detail pesanan"
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      modalBody={{ paddingX: '0' }}
      motionPreset={'slideInBottom'}
    >
      <MainContainer>
        {
          carts.length > 0 &&
          <section className="section-wrap">
            {
              carts.map((cart) => {
                return (
                  <Box key={cart.group_id} marginBottom="4">
                    <GroupItemTenant name={cart.group_name} total={cart.children.length} img={cart.photo}>
                      {
                        cart.children.map((val, j) => {
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
        <section className="section-wrap container-with-px">
          <PaymentDetails
            SumPrice={{
              admin_fee: admin_fee,
              sub_total: sub_total,
              tax: tax,
              total: total,
              payment_charge: payment_charge
            }}
            admin_fee_percentage={admin_fee_percentage}
            tax_name={tax_name}
          />
        </section>
      </MainContainer>
    </Modal>
  )
}

export default DetailOrderView
