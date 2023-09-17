import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { MenuGroupResponse, MetaResponse, SuccessResponseWithMeta, TenantResponse } from './index.type'

export type GetTenantApi = SuccessResponseWithMeta<TenantResponse<MenuGroupResponse[]>[], MetaResponse>
interface ParamsGetTenantAPI {
  page?: number,
  perPage?: number,
  category_id?: number | string,
  keyword?: string
}
export const getTenantApi =
  (config: RequestConfig, params: ParamsGetTenantAPI):Promise<AxiosResponse<GetTenantApi>> => {
    return requestWithAuth()({
      url: `${API_DOMAIN}/tenant`,
      method: 'GET',
      params: {
        page: params.page || 1,
        per_page: params.perPage || 20,
        ...params
      },
      ...config
    })
  }

export const getSingleTenantApi = (id: number | string, config: RequestConfig):Promise<AxiosResponse<GetTenantApi>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenant/${id}`,
    method: 'GET',
    ...config
  })
}

// export type GetTenantByCatApi = SuccessResponseWithMeta<TenantResponse<MenuGroupResponse[]>[], MetaResponse>
// export const getTenantByCatApi = (id: number | string, config: RequestConfig):Promise<AxiosResponse<GetTenantByCatApi>> => {
//   return requestWithAuth({
//     url: `${API_DOMAIN}/tenant-bycategory/${id}`,
//     method: 'GET',
//     ...config
//   })
// }
