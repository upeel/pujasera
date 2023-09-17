import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { Cart, InitialState, UpdateCart } from './cartSlice.type'
import Storage from 'src/utils/storage'
import { INITIAL_STORAGE } from 'src/constant'
import { RootState } from '..'
const { setItem, getItem, removeItem } = Storage({ storage: 'localStorage' })

const getLocalCart:Cart[] = getItem(INITIAL_STORAGE.cart, [])

const initialState:InitialState = {
  cart: getLocalCart,
  selectedCartItem: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, actions: { payload:Cart, type: string }) => {
      state.cart.push(actions.payload)
      setItem(INITIAL_STORAGE.cart, state.cart)
    },
    clearCart: (state) => {
      state.cart = []
      removeItem(INITIAL_STORAGE.cart)
    },
    setSelectedCartItem: (state, actions: { payload:Cart | null, type: string }) => {
      state.selectedCartItem = actions.payload
    },
    updateCartById: (state, actions: { payload: UpdateCart, type: string }) => {
      state.cart.filter(val => val.cart_id === actions.payload.cart_id).forEach((obj:any) => {
        const objKey:any = Object.keys(actions.payload)
        const payload = actions.payload as any
        for (let i = 0; i < objKey.length; i++) {
          obj[objKey[i]] = payload[objKey[i]]
        }
      })
      setItem(INITIAL_STORAGE.cart, state.cart)
    },
    deleteCartById: (state, action: { payload: number, type: string }) => {
      state.cart.splice(state.cart.findIndex((val) => val.cart_id === action.payload), 1)
      setItem(INITIAL_STORAGE.cart, state.cart)
    }
  }
})

export const getCartState = createDraftSafeSelector(
  (state:InitialState) => state.cart,
  (cart) => {
    return cart
  }
)

export const getTotalItemInCartState = createDraftSafeSelector(
  (state:InitialState) => state.cart,
  (cart) => {
    return cart.reduce((prev, next) => prev + next.qty, 0)
  }
)

export const getTotalOrderState = createDraftSafeSelector(
  (state:InitialState) => state.cart,
  (cart) => {
    return cart.reduce((prev, next) => prev + next.totalPrice, 0)
  }
)

export const getSelectedCartItemState = createDraftSafeSelector(
  (state:InitialState) => state.selectedCartItem,
  (selectedCartItem) => selectedCartItem
)

export const getSumPriceState = createDraftSafeSelector(
  (state:RootState) => state.cart.cart,
  (state:RootState) => state.app.store,
  (state:RootState) => getTotalOrderState(state.cart),
  (cart, store, sub_total) => {
    const admin_fee = store.is_service_charge_optional ? Number(store.service_charge_rate) * sub_total : 0
    let tax = 0
    let total = sub_total + admin_fee + tax
    for (let i = 0; i < cart.length; i++) {
    /**
    * - (store) is_item_inc_tax = 1 dan (product) non_taxable =  1, maka harga produk udh include pajak
    * - (store) is_item_inc_tax = 0 dan (product) non_taxable =  0, maka product kenak pajak
    * - (store) is_item_inc_tax = 1 dan (product) non_taxable = 0, maka harga produk udah include pajak
    * - (store) is_item_inc_tax = 0 dan (product) non_taxable =  1, gak kenak pajak
    */
      if (store.is_item_inc_tax === 0 && cart[i].non_taxable === 0) {
        tax += Number(store.tax_rate) * cart[i].totalPrice
      }
    }
    total += tax
    const payment_charge = store.is_transac_percentage ? Number(store.transac_charge_rate) * total : Number(store.transac_charge_rate)
    const totalFinal = total + payment_charge
    return {
      sub_total,
      admin_fee,
      tax,
      payment_charge,
      total: totalFinal
    }
  }
)

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {
  setCart,
  setSelectedCartItem,
  updateCartById,
  deleteCartById,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
