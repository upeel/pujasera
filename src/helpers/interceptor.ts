import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Storage from 'src/utils/storage'
import { Cookies } from 'react-cookie'
import { ErrorResponseData, LoginResponse } from 'src/api/index.type'
import { httpErrorCode, INITIAL_STORAGE } from 'src/constant'
import { OlToast } from './toast'
import { clearAllStorage } from './clearStorage'
const { getItem } = Storage({})
const cookies = new Cookies()

declare module 'axios' {
  export interface AxiosRequestConfig {
    raw?: boolean
    silent?: boolean,
    withToken?: boolean
  }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const fdToken = getItem(INITIAL_STORAGE.initToken, '') as LoginResponse
  const accessToken = cookies.get(INITIAL_STORAGE.accessToken)
  if (config.withToken) {
    if (config.headers) {
      if (accessToken) {
        config.headers['Authorization'] = `${fdToken.token_type} ${accessToken}`
      } else {
        clearAllStorage()
        window.location.href = '/scan-qr'
      }
    }
  }
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (err: AxiosError<ErrorResponseData>): Promise<AxiosError> => {
  // if raw === true, handle error akan sepenuhnya dihandle oleh lokal
  // if raw === false, handle error akan sepenuhnya dihandle oleh interceptor, namun jika silent === false maka notifikasi yang ada di interceptor akan dibungkam
  if (err.config.raw) return Promise.reject(err)

  if (err.response) {
    const errData = err.response.data
    if (errData.error) {
      if (typeof errData.error === 'object') {
        if (typeof errData.error.error === 'object') {
          err.message = JSON.stringify(err.response.data.error.error)
        } else {
          err.message = err.response.data.error.error
        }
      } else {
        const errMessage = errData.error as string
        if (typeof errData.error === 'object') {
          err.message = JSON.stringify(errMessage)
        } else {
          err.message = errMessage
        }
      }
    }

    if (!err.config.silent) {
      if (err.response.status === 401) {
        clearAllStorage()
        location.href = '/scan-qr'
      } else if (err.response.status === 429) {
        OlToast.error({
          description: 'Server sidang sibuk..'
        })
      } else if (err.response.status >= 500 && err.response.status <= 599) {
        OlToast.error({
          description: 'Terjadi kesalahan pada server..'
        })
      } else if (err.response.status === 404) {
        return Promise.reject(err)
      } else {
        OlToast.error({
          description: err.message
        })
      }
    }
  } else if (err.request) {
    OlToast.error({
      description: 'Gagal menghubungkan ke server..'
    })
  } else {
    if (err.code === httpErrorCode.ERR_NETWORK) {
      OlToast.error({ description: 'Terjadi kesalahan pada jaringan Anda..' })
    }
  }
  return Promise.reject(err)
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
