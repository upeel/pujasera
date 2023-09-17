import React from 'react'
import LoadingScreen from 'src/components/loadingScreen'
import VirtualAccountModel from './virtualAccount.model'
import PendingPaymentVirtualAccountView from './views/pendingPayment'
import ProcessOrderView from 'src/views/payment/processOrder'
import NotFoundView from 'src/views/error/404'

const PaymentView = () => {
  const { isLoading, salesOrderStatus } = VirtualAccountModel()
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {
        salesOrderStatus === 'P'
          ? <PendingPaymentVirtualAccountView/>
          : salesOrderStatus === 'A' || salesOrderStatus === 'Z' || salesOrderStatus === 'X'
            ? <ProcessOrderView/>
            : <NotFoundView/>
      }
    </>
  )
}

export default PaymentView
