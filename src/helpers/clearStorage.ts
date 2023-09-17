import Storage from 'src/utils/storage'
import { Cookies } from 'react-cookie'
import { INITIAL_STORAGE } from 'src/constant'
import { store } from 'src/store'
import { removeInvoice, removeSelfOrderId } from 'src/store/payment/paymentSlice'
import { clearCart } from 'src/store/cart/cartSlice'
const cookies = new Cookies()
const { removeItem } = Storage({})

export const clearAllStorage = () => {
  removeItem(INITIAL_STORAGE.initToken)
  removeItem(INITIAL_STORAGE.storeId)
  removeItem(INITIAL_STORAGE.tableId)
  removeItem(INITIAL_STORAGE.menuView)
  removeItem(INITIAL_STORAGE.url_domain)
  removeItem(INITIAL_STORAGE.i18nextLng)
  removeItem(INITIAL_STORAGE.cart)
  cookies.remove(INITIAL_STORAGE.accessToken, { path: '/' })
  clearInvoice()
}

export const clearInvoice = () => {
  store.dispatch(removeSelfOrderId())
  store.dispatch(removeInvoice())
  store.dispatch(clearCart())
  removeItem(INITIAL_STORAGE.ttl_gen_qrcode)
  removeItem(INITIAL_STORAGE.payload_checkout)
}
