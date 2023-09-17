import React from 'react'
import LoadingScreen from 'src/components/loadingScreen'
import NotFoundView from '../error/404'
import OrderDetailModel from './orderDetail.module'
import OrderDetailPending from './view/orderDetailPending'

const OrderDetailView = () => {
  const { isLoading, salesOrderStatus } = OrderDetailModel()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {
        salesOrderStatus === 'P' || salesOrderStatus === 'A' || salesOrderStatus === 'Z' || salesOrderStatus === 'X'
          ? <OrderDetailPending/>
          : <NotFoundView />
      }
    </>
  )
}

export default OrderDetailView
