import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layout Route
import Root from './Root'
import PrivateRoute from './routes/privateRoute'
import AuthRoute from './routes/authRoute'

// Splash screen
const SplashScreenView = React.lazy(() => import('./views/splashScreen'))

// Phone Number
const PhoneNumberInputView = React.lazy(() => import('./views/phoneNumber'))

// Privacy Policy
const PrivacyPolicy = React.lazy(() => import('./views/privacypolicy'))

// Menu
const MenuLayout = React.lazy(() => import('./views/menu/index.layout'))
const MenuView = React.lazy(() => import('./views/menu/views/menu'))
const MenuSearch = React.lazy(() => import('./views/menu/views/search/search.result'))

// Category
const NotFoundView = React.lazy(() => import('./views/error/404'))

// Checkout
const CheckoutView = React.lazy(() => import('./views/checkout'))

// Payment
const PaymentQrisView = React.lazy(() => import('./views/payment/qris'))
const SelectPaymentView = React.lazy(() => import('./views/payment/selectPayment'))
const PaymentVirtualAccountView = React.lazy(() => import('./views/payment/virtualAccount'))
const PaymentEwalletView = React.lazy(() => import('./views/payment/ewallet'))

// Order Details
// const OrderDetailsView = React.lazy(() => import('./views/orderDetails'))

// Scan Qr
const ScanQrView = React.lazy(() => import('./views/scanQr'))

// Order List
const OrderList = React.lazy(() => import('./views/orderList'))
const OrderDetailView = React.lazy(() => import('./views/orderDetail'))

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<Root />}>
          <Route path="/dine-check/:store_id/:table_id" element={<SplashScreenView/>}/>
          <Route path="/scan-qr" element={<ScanQrView/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<PhoneNumberInputView/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          </Route>
          <Route element={<AuthRoute/>}>
            <Route path="menu" element={<MenuLayout/>}>
              <Route index element={<MenuView />}/>
              <Route path="search" element={<MenuSearch/>}/>
            </Route>
            <Route path="/checkout" element={<CheckoutView/>}/>
            <Route path="/checkout/select-payment" element={<SelectPaymentView/>}/>
            <Route path="/payment/qris" element={<PaymentQrisView/>}/>
            <Route path="/payment/virtual-account" element={<PaymentVirtualAccountView />}/>
            <Route path="/payment/ewallet" element={<PaymentEwalletView/>}/>
            <Route path="/order-list" element={<OrderList/>}></Route>
            <Route path="/order-list/:id" element={<OrderDetailView/>}></Route>
          </Route>
          <Route path="*" element={<NotFoundView/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter
