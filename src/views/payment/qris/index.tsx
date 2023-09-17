import React from 'react'
import LoadingScreen from 'src/components/loadingScreen'
import QrisModel from './qris.model'
import ProcessOrderView from 'src/views/payment/processOrder'
import PendingPaymentQrisView from './views/pendingPayment'
import NotFoundView from 'src/views/error/404'

const PaymentView = () => {
  const {
    isLoading,
    salesOrderStatus
  } = QrisModel()

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <>
      {
        salesOrderStatus === 'P'
          ? <PendingPaymentQrisView/>
          : salesOrderStatus === 'A' || salesOrderStatus === 'Z' || salesOrderStatus === 'X'
            ? <ProcessOrderView/>
            : <NotFoundView/>
      }
    </>
  )
}

export default PaymentView
