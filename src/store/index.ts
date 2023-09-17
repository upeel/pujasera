import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu/menuSlice'
import cartReducer from './cart/cartSlice'
import appReducer from './app/appSlice'
import authReducer from './auth/authSlice'
import categoryReducer from './category/categorySlice'
import searchProductReducer from './searchProduct/searchProductSlice'
import paymentReducer from './payment/paymentSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    app: appReducer,
    auth: authReducer,
    category: categoryReducer,
    searchProduct: searchProductReducer,
    payment: paymentReducer
  },
  devTools: import.meta.env.MODE !== 'production'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
