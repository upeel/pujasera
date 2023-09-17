import React from 'react'
import Header from 'src/components/header'
import classNames from 'classnames/bind'
import styles from './menu.module.scss'
import { Box } from '@chakra-ui/react'
import MenuLayoutModel from './menuLayout.model'
import { Outlet } from 'react-router-dom'
import Cart from 'src/components/cart'

const cx = classNames.bind(styles)

const MenuLayout = () => {
  const {
    location,
    onCheckout,
    dataStore,
    dataTable,
    headerRef,
    loadingTableCheck,
    onOpenSidebarCategory,
    totalItemInCart,
    totalOrder,
    openBill
  } = MenuLayoutModel()

  return (
    <>
      {/* Header */}
      {
        location.pathname === '/menu' &&
        <Box className={cx('menu-header')} ref={headerRef}>
          <Header
            storeName={dataStore.name}
            isLoading={loadingTableCheck}
            numberDesk={dataTable.name}
            onClickBill={openBill}
            pathHome="/menu"
            openSidebarCategory={onOpenSidebarCategory}
          />
        </Box>
      }
      {/* End Header */}

      {/* render children */}
      {
        React.useMemo(() => (
          <Outlet/>
        ), [location])
      }{/* End render children */}

      {/* Checkout */}
      {
        React.useMemo(() => (
          totalItemInCart > 0 &&
          <Cart totalItem={totalItemInCart} totalOrder={totalOrder} onCheckout={onCheckout}/>
        ), [totalItemInCart])
      } {/* End Checkout */}
    </>
  )
}

export default MenuLayout
