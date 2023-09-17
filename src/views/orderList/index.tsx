import React from 'react'
import { Box } from '@chakra-ui/react'
import ItemNotFound from 'src/components/itemNotFound'
import NavigationPane from 'src/components/navigationPane'
import ListItemInvoice, { ListItemInvoiceSkeleton } from 'src/components/listItemInvoice'
import OrderListModel from './orderList.model'

const OrderList = () => {
  const {
    isLoading,
    listInvoice,
    refLastInvoice,
    handleNavigateToPayment,
    handleBack
  } = OrderListModel()

  return (
    <>
      <NavigationPane title="Pesanan" onClick={handleBack}/>
      <Box pb="4">
        {
          !isLoading && listInvoice.length < 1
            ? <Box className="container-with-px" marginTop={4}>
              <Box backgroundColor="#F5F5F5" padding="8" borderRadius="md">
                <ItemNotFound title="Belum ada pesanan"/>
              </Box>
            </Box>
            : null
        }

        <Box marginTop={4}>
          {
            listInvoice.length > 0
              ? (
                listInvoice.map((invoice, i) => {
                  if (listInvoice.length === i + 1) {
                    return (
                      <ListItemInvoice
                        ref={refLastInvoice}
                        key={i.toString()} total={invoice.famount}
                        status={invoice.sales_order_status}
                        invoice={invoice.order_no}
                        onClick={() => handleNavigateToPayment(invoice.self_sales_order_id)}
                      />
                    )
                  }
                  return (
                    <ListItemInvoice
                      key={i.toString()} total={invoice.famount}
                      status={invoice.sales_order_status}
                      invoice={invoice.order_no}
                      onClick={() => handleNavigateToPayment(invoice.self_sales_order_id)}
                    />
                  )
                })
              ) : null
          }
          {
            isLoading ? new Array(4).fill(undefined).map((_, i) => (
              <ListItemInvoiceSkeleton key={i.toString()}/>
            )) : null
          }
        </Box>
      </Box>
    </>
  )
}

export default OrderList
