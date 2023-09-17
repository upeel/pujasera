import axios, { AxiosRequestConfig } from 'axios'
import i18n from '../../i18n'
import { setupInterceptorsTo } from 'src/helpers/interceptor'

export type RequestConfig = AxiosRequestConfig
export const requestWithAuth = (locale = true) => {
  let baseUrl = `${import.meta.env.VITE_API_BASE_URL}/v1`
  if (locale) {
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/${i18n.language}`
  }
  return setupInterceptorsTo(axios.create({
    baseURL: baseUrl,
    raw: false,
    silent: false,
    withToken: true
  }))
}

export const request = setupInterceptorsTo(axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  raw: false,
  silent: false,
  withToken: false
}))
