import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { MetaResponse, Product, SuccessResponseWithMeta, SearchResponse } from './index.type'

export type GetProductByKeywordApi = SuccessResponseWithMeta<SearchResponse[], MetaResponse>
export const getProductByKeywordApi = (keyword: string | string, config: RequestConfig):Promise<AxiosResponse<GetProductByKeywordApi>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenantproductsingle-bykeyword?keyword=${keyword}`,
    method: 'GET',
    ...config
  })
}

export type GetProductSearchApi<T> = SuccessResponseWithMeta<T, MetaResponse>
export const getProductSearchApi = (
  keyword:string | string,
  config:RequestConfig,
  page?:number, per_page?:number
):Promise<AxiosResponse<GetProductSearchApi<Product[]>>> => {
  page = page || 1
  per_page = per_page || 10
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenantproductsingle-bykeyword?keyword=${keyword}&page=${page}&per_page=${per_page}`,
    ...config
  })
}

export const getComboSearchApi = (
  keyword:string | string,
  config:RequestConfig,
  page?:number, per_page?:number
):Promise<AxiosResponse<GetProductSearchApi<Product[]>>> => {
  page = page || 1
  per_page = per_page || 10
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenantproductcombo-bykeyword?keyword=${keyword}&page=${page}&per_page=${per_page}`,
    ...config
  })
}
