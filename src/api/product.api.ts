import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { DetailProduct, MetaResponse, Product, ProductAddons, ProductVariants, SuccessResponse, SuccessResponseWithMeta } from './index.type'

export type GetProductApi = SuccessResponse<DetailProduct<ProductVariants[], ProductAddons[]>>
export const getProductApi = (id: number | string, type: string, config:RequestConfig):Promise<AxiosResponse<GetProductApi>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/product?id=${id}&product_type=${type.toUpperCase()}`,
    ...config
  })
}

export type GetProductsApi<T> = SuccessResponseWithMeta<T, MetaResponse>
export const getProductsApi = (
  id:number | string,
  config:RequestConfig,
  page?:number, per_page?:number
):Promise<AxiosResponse<GetProductsApi<Product[]>>> => {
  page = page || 1
  per_page = per_page || 20
  return requestWithAuth()({
    url: `${API_DOMAIN}/productsingle-bytenant/${id}?page=${page}&per_page=${per_page}`,
    ...config
  })
}

export const getCombosApi = (
  id:number | string,
  config:RequestConfig,
  page?:number, per_page?:number
): Promise<AxiosResponse<GetProductsApi<Product[]>>> => {
  page = page || 1
  per_page = per_page || 20
  return requestWithAuth()({
    url: `${API_DOMAIN}/productcombo-bytenant/${id}?page=${page}&per_page=${per_page}`,
    ...config
  })
}
