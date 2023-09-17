import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { API_DOMAIN } from '.'
import { MetaResponse, SuccessResponseWithMeta, SearchResponse } from './index.type'

export type GetComboByKeywordApi = SuccessResponseWithMeta<SearchResponse[], MetaResponse>
export const getComboByKeywordApi = (keyword: string | string, config: RequestConfig):Promise<AxiosResponse<GetComboByKeywordApi>> => {
  return requestWithAuth()({
    url: `${API_DOMAIN}/tenantproductcombo-bykeyword?keyword=${keyword}`,
    method: 'GET',
    ...config
  })
}
