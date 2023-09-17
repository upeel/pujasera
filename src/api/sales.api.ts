import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { InvoiceResponse, ListInvoiceResponse, MetaResponse, PaymentMethodListsResponse, SuccessResponse, SuccessResponseWithMeta } from './index.type'

/**
 * UNUSED
 * @param config
 * @param showDetailOrder
 * @param table_id
 * @returns
 */
export const getLatestInvoiceApi = (
  config: RequestConfig,
  showDetailOrder = 0,
  table_id: number | null
):Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/salesorder/latest_invoice?show_detail_order=${showDetailOrder}&table_id=${table_id || 0}`,
    method: 'GET',
    ...config
  })
}

/**
 * UNUSED
 * @param config
 * @param data
 * @returns
 */
export const updateStatusInvoiceAPI = (
  config: RequestConfig,
  data: {
    self_sales_order_id: string | number
  }
):Promise<AxiosResponse> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/salesorder/update_attr`,
    method: 'POST',
    data: {
      ...data,
      show_detail_order: 0,
      column: 'status',
      value: 'Z'
    },
    ...config
  })
}

/**
 *
 * @param config
 * @returns
 */
export const getPaymentMethodList = (
  config: RequestConfig
):Promise<AxiosResponse<SuccessResponse<PaymentMethodListsResponse[]>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/paymentmethod-channel`,
    method: 'GET',
    ...config
  })
}

interface ParamsGetTenantAPI {
  page?: number,
  perPage?: number,
  show_detail_order?: number,
  table_id: number
}
/**
 *
 * @param config
 * @param params
 * @returns
 */
export const getListInvoice = (
  config: RequestConfig,
  params: ParamsGetTenantAPI
):Promise<AxiosResponse<SuccessResponseWithMeta<ListInvoiceResponse[], MetaResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/salesorder/list_invoice`,
    method: 'GET',
    params: {
      page: params.page || 1,
      per_page: params.perPage || 20,
      show_detail_order: params.show_detail_order || 0,
      ...params
    },
    ...config
  })
}

export const detailInvoiceApi = (
  config: RequestConfig,
  self_order_id:string
):Promise<AxiosResponse<SuccessResponse<InvoiceResponse>>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/salesorder/detail_invoice/${self_order_id}`,
    method: 'GET',
    ...config
  })
}

export const cancelInvoiceApi = (
  config: RequestConfig,
  data: {
    self_order_id: string
  }
):Promise<AxiosResponse> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/salesorder/cancel_invoice`,
    method: 'POST',
    data,
    ...config
  })
}
