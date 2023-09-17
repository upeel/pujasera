import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { FormatManualGrouping, InvoiceItemsResponse, InvoiceResponse, OrderStatus } from 'src/api/index.type'
import { INITIAL_STORAGE } from 'src/constant'
import Storage from 'src/utils/storage'
import { InitialState } from './paymentSlice.type'
const { setItem, getItem, removeItem } = Storage({})

const getSelfOrderId = getItem(INITIAL_STORAGE.self_order_id, '')

// const getInvoice = getItem(INITIAL_STORAGE.invoice, '')

const initialState:InitialState = {
  invoice: null,
  isHavePayment: false,
  ttlQrCode: 60000 * 7, // 1 menit = 60.000 milidetik
  selfOrderId: getSelfOrderId || 0,
  isGenInCheckout: false,
  selfSalesStatus: 'P',
  salesOrderStatus: 'P'
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    setInvoice: (state, action: { payload: InvoiceResponse, type: string }) => {
      state.invoice = action.payload
      // setItem(INITIAL_STORAGE.invoice, action.payload)
    },
    setIsHavePayment: (state, action) => {
      state.isHavePayment = action.payload
    },
    setSelfOrderId: (state, action) => {
      state.selfOrderId = action.payload
      setItem(INITIAL_STORAGE.self_order_id, action.payload)
    },
    setIsGenInCheckout: (state, action: { payload: boolean, type: string }) => {
      state.isGenInCheckout = action.payload
    },
    setSelfSalesStatus: (state, action: { payload: OrderStatus, type: string }) => {
      state.selfSalesStatus = action.payload
    },
    setSalesOrderStatus: (state, action: { payload: OrderStatus, type: string }) => {
      state.salesOrderStatus = action.payload
    },
    removeSelfOrderId: (state) => {
      state.selfOrderId = ''
      removeItem(INITIAL_STORAGE.self_order_id)
    },
    removeInvoice: (state) => {
      state.invoice = null
      removeItem(INITIAL_STORAGE.invoice)
    }
  }
})

export const getGroupOrderItems = createDraftSafeSelector(
  (state:InitialState) => state.invoice,
  (invoice) => {
    const items = invoice?.order_datail.items as InvoiceItemsResponse[]
    const group:FormatManualGrouping<InvoiceItemsResponse[]>[] = []
    items?.map(obj => {
      const index = group.findIndex(val => val.group_id === obj.tenant_id)
      if (index === -1) {
        if (obj.tenant_id) {
          group.push({
            group_id: obj.tenant_id,
            group_name: obj.tenant_name,
            photo: obj.tenant_photo,
            children: items.filter((val) => val.tenant_id === obj.tenant_id)
          })
        }
      }
    })
    return group
  }
)
export const {
  setIsHavePayment,
  setSelfOrderId,
  setInvoice,
  setIsGenInCheckout,
  removeInvoice,
  removeSelfOrderId,
  setSalesOrderStatus,
  setSelfSalesStatus
} = paymentSlice.actions
export default paymentSlice.reducer
