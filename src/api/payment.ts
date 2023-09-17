import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { InvoiceBody, InvoiceResponse, SuccessResponse } from './index.type'

// QRIS
export const createInvoiceQrisApi = (
  config: RequestConfig,
  data:InvoiceBody
):Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/netzmepayment/invoice`,
    method: 'POST',
    data,
    ...config
  })
}

export const cancelInvoiceQrisApi = (
  config: RequestConfig,
  data: {
    invoice_id: string
  }
):Promise<AxiosResponse> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/netzmepayment/cancel_invoice`,
    method: 'POST',
    data,
    ...config
  })
}
// END QRIS

// Virtual Account
export const createInvoiceVaApi = (
  config: RequestConfig,
  data:InvoiceBody
):Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/xenditpayment/create_va_payment`,
    method: 'POST',
    data,
    ...config
  })
}

export const cancelInvoiceVaApi = (
  config: RequestConfig,
  data: {
    self_order_id: string | number
  }
):Promise<AxiosResponse> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/xenditpayment/cancel_va_payment`,
    method: 'POST',
    data,
    ...config
  })
}

export const detailInvoiceVaApi = (
  config: RequestConfig,
  self_order_id:string
):Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/xenditpayment/detail_va_payment/${self_order_id}`,
    method: 'GET',
    ...config
  })
}
// END Virtual Account

// E-WALLET
export const createInvoiceEwalletApi = (
  config: RequestConfig,
  data: InvoiceBody
): Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/xenditpayment/create_ewallet_payment`,
    method: 'POST',
    data,
    ...config
  })
}
