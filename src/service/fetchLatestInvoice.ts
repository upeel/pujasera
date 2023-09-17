import axios from 'axios'
import { InvoiceBody, InvoiceBodyItem, InvoiceItemsResponse, InvoiceResponse } from 'src/api/index.type'
import { getLatestInvoiceApi } from 'src/api/sales.api'
import { INITIAL_STORAGE } from 'src/constant'
import { clearInvoice } from 'src/helpers/clearStorage'
import { store } from 'src/store'
import { setInvoice, setIsHavePayment, setSelfOrderId } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
const { dispatch } = store
const { setItem } = Storage({})

const fetchLatestInvoice = async() => {
  if (!store.getState().app.table.id) return
  try {
    const res = await getLatestInvoiceApi(
      {
        silent: true
      },
      1,
      store.getState().app.table.id
    )
    dispatch(setInvoice(res.data.data))
    dispatch(setIsHavePayment(true))
    dispatch(setSelfOrderId(res.data.data.payment_reference_id))
    setItem(INITIAL_STORAGE.self_order_id, res.data.data.payment_reference_id)
    if (res.data.data.payment_type === 'OQ') {
      const payloadInvoice = handleCreatePayloadInvoice(res.data.data)
      setItem(INITIAL_STORAGE.payload_checkout, payloadInvoice)
    }
    return Promise.resolve(res)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        dispatch(setIsHavePayment(false))
        clearInvoice()
      }
    }
    return Promise.reject(error)
  }
}

const handleCreatePayloadInvoice = (data:InvoiceResponse):InvoiceBody => {
  const result:InvoiceBody = {
    self_order_id: data.payment_reference_id,
    remark: 'OL-DINE-IN',
    currency_id: 'IDR',
    table_id: data.order_datail.table_no,
    item: []
  }
  const item:InvoiceBodyItem[] = data.order_datail.items.flatMap((val) => {
    const tmpObj:Record<string, any> = {
      qty: val.qty
    }
    if (val.type === 'P') {
      tmpObj['id'] = val.product_id
      tmpObj['type'] = 'P'
      tmpObj['variant_id'] = val.product_variant_id
      noteAddons(tmpObj, val)
      return tmpObj
    }
    if (val.type === 'C') {
      tmpObj['id'] = val.product_combo_id
      tmpObj['type'] = 'C'
      tmpObj['variant_id'] = 0
      noteAddons(tmpObj, val)
      return tmpObj
    }
    return tmpObj
  })
  result.item = item
  return result
}
const noteAddons = (tmpObj:Record<string, any>, val:InvoiceItemsResponse) => {
  if (val.note) {
    tmpObj['note'] = val.note
  }
  if (val.addons.length > 0) {
    tmpObj['addons'] = []
    val.addons.flatMap(val => {
      tmpObj['addons'].push({
        product_addon_id: val.product_addon_id,
        product_addon_name: val.name
      })
    })
  }
}

export default fetchLatestInvoice
