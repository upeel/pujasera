import { AxiosResponse } from 'axios'
import { RequestConfig, requestWithAuth } from 'src/utils/request'
import { MetaResponse, SuccessResponseWithMeta, CategoryResponse } from './index.type'

export type GetCategoryApi = SuccessResponseWithMeta<CategoryResponse[], MetaResponse>
export const getCategoryApi =
  (config: RequestConfig, page?:number, per_page?:number):Promise<AxiosResponse<GetCategoryApi>> => {
    page = page || 1
    per_page = per_page || 20
    return requestWithAuth()({
      url: `/categories?page=${page}&per_page=${per_page}`,
      method: 'GET',
      ...config
    })
  }
