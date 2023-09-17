import { PaymentCode } from 'src/api/index.type'

function specifyPaymentUrl(paymentMode:PaymentCode) {
  let url = ''
  if (paymentMode === 'OQ') {
    url = '/payment/qris'
  } else if (paymentMode === 'BT') {
    url = '/payment/virtual-account'
  } else if (paymentMode === 'EW') {
    url = '/payment/ewallet'
  } else if (paymentMode === 'CC') {
    url = '/payment/credit-cards'
  } else {
    url = ''
  }
  return url
}

export default specifyPaymentUrl
