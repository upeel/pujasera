import React from 'react'
import LoadingScreen from 'src/components/loadingScreen'
import EwalletModel from './ewallet.model'
import PendingPaymentEwalletView from './views/pendingPayment'
import ProcessOrderView from 'src/views/payment/processOrder'
import NotFoundView from 'src/views/error/404'

const PaymentView = () => {
  const { isLoading, salesOrderStatus } = EwalletModel()
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {
        salesOrderStatus === 'P'
          ? <PendingPaymentEwalletView/>
          : salesOrderStatus === 'A' || salesOrderStatus === 'Z' || salesOrderStatus === 'X'
            ? <ProcessOrderView/>
            : <NotFoundView/>
      }
    </>
  )
}

export default PaymentView
