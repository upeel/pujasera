import { AxiosResponse } from 'axios'
import { RequestConfig, request } from 'src/utils/request'
import { TableCheckResponse, LoginApiBody, LoginResponse } from './index.type'

interface GetInitialStore extends RequestConfig {
  store_id: number,
  table_id: number,
  config?: RequestConfig
}

export const getInitialStore = ({ store_id, table_id, config }:GetInitialStore):Promise<AxiosResponse<TableCheckResponse>> => {
  return request({
    url: `dine-check/${store_id}/${table_id}`,
    method: 'GET',
    ...config
  })
}

interface LoginApi extends LoginApiBody, RequestConfig{}

export const loginAPI = ({ phone, store_id, ...config }:LoginApi):Promise<AxiosResponse<LoginResponse>> => {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      phone: phone,
      store_id: store_id
    },
    ...config
  })
}
