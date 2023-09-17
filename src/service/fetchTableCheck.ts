import { getInitialStore } from 'src/api/auth.api'
import { INITIAL_STORAGE } from 'src/constant'
import { clearAllStorage } from 'src/helpers/clearStorage'
import { OlToast } from 'src/helpers/toast'
import { store } from 'src/store'
import { setIsGetStore, setLoadingTableCheck, setTableCheck } from 'src/store/app/appSlice'
import { RequestConfig } from 'src/utils/request'
import Storage from 'src/utils/storage'
const { setItem, getItem } = Storage({})

interface FetchInitialStore {
  store_id: number | string,
  table_id: number | string,
  isScanQr: boolean,
  config?: RequestConfig
}
const fetchInitialStore = async({ store_id, table_id, isScanQr, config }:FetchInitialStore) => {
  const getStoreId = getItem(INITIAL_STORAGE.storeId, '')
  const getTableId = getItem(INITIAL_STORAGE.tableId, '')
  try {
    store.dispatch(setLoadingTableCheck(true))
    const res = await getInitialStore({
      store_id: Number(store_id),
      table_id: Number(table_id),
      config: config
    })
    /**
     * Jika kondisinya baru pertama kali scan qr maka akan set store_id dan table_id ke local storage.
     * Jika kondisinya sudah scan qr dan masuk ke halaman private tapi dia ke refresh, maka tidak ada perubahan store_id dan table_id pada local storage.
     */
    if (isScanQr || !getStoreId && !getTableId) {
      setItem(INITIAL_STORAGE.storeId, store_id, 3600000 * 24) // ttl 24 hours
      setItem(INITIAL_STORAGE.tableId, table_id, 3600000 * 24) // ttl 24 hours
    }
    store.dispatch(setIsGetStore(true))
    store.dispatch(setTableCheck({
      store: {
        id: res.data.data.store.id,
        name: res.data.data.store.name,
        url_id: res.data.data.store.url_id,
        logo: res.data.data.store.logo,
        logo_xs: res.data.data.store.logo_xs,
        tax_name: res.data.data.store.tax_name,
        tax_rate: res.data.data.store.tax_rate,
        is_tax_for_shipping: res.data.data.store.is_tax_for_shipping,
        is_item_inc_tax: res.data.data.store.is_item_inc_tax,
        is_tax_opt_for_pos: res.data.data.store.is_tax_opt_for_pos,
        is_service_charge_optional: res.data.data.store.is_service_charge_optional,
        service_charge_rate: res.data.data.store.service_charge_rate,
        service_charge_rate_percentage: res.data.data.store.service_charge_rate_percentage,
        is_transac_percentage: res.data.data.store.is_transac_percentage,
        transac_charge_rate: res.data.data.store.transac_charge_rate,
        transac_charge_rate_percentage: res.data.data.store.transac_charge_rate_percentage,
        dec_digit: res.data.data.store.dec_digit,
        dec_point: res.data.data.store.dec_point,
        thousands_sep: res.data.data.store.thousands_sep,
        currency_id: res.data.data.store.currency_id,
        currency_symbol: res.data.data.store.currency_symbol,
        currency_name: res.data.data.store.currency_name
      },
      table: {
        id: res.data.data.table.id,
        name: res.data.data.table.name,
        resto_layout_id: res.data.data.table.resto_layout_id,
        resto_layout_name: res.data.data.table.resto_layout_name
      }
    }))
    setItem(INITIAL_STORAGE.url_domain, res.data.data.store.url_id)
    store.dispatch(setLoadingTableCheck(false))
    return Promise.resolve(res)
  } catch (error:any) {
    if (import.meta.env.MODE === 'production') {
      OlToast.error({ description: error.message })
      window.location.href = '/scan-qr'
      clearAllStorage()
    }
    return Promise.reject(error)
  }
}

export default fetchInitialStore
