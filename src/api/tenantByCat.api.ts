import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { MenuGroupResponse, MetaResponse, SuccessResponseWithMeta, TenantResponse } from './index.type'

export type GetTenantByCatApi = SuccessResponseWithMeta<TenantResponse<MenuGroupResponse[]>[], MetaResponse>
export const getTenantByCatApi = (id: number | string, config: RequestConfig):Promise<AxiosResponse<GetTenantByCatApi>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenant-bycategory/${id}`,
    method: 'GET',
    ...config
  })
}
