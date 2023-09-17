import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import useScroll from 'src/hooks/useScroll'
import {
  getLoadingTableCheckState,
  getStoreState, getTableState,
  setHeightHeader,
  setOpenSidebarCategory
} from 'src/store/app/appSlice'
import { getTotalItemInCartState, getTotalOrderState } from 'src/store/cart/cartSlice'
import { getSelectedTenantState } from 'src/store/menu/menuSlice'

function MenuLayoutModel() {
  const { scrollY } = useScroll()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dataStore = useAppSelector(state => getStoreState(state.app))
  const dataTable = useAppSelector(state => getTableState(state.app))
  const loadingTableCheck = useAppSelector(state => getLoadingTableCheckState(state.app))
  const selectedTenant = useAppSelector(state => getSelectedTenantState(state.menu))
  const headerRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const totalItemInCart = useAppSelector((state) => getTotalItemInCartState(state.cart))
  const totalOrder = useAppSelector((state) => getTotalOrderState(state.cart))
  const abort = new AbortController()

  useLayoutEffect(() => {
    if (headerRef.current) {
      dispatch(setHeightHeader(headerRef.current.clientHeight))
    }
    dispatch
  }, [headerRef])

  const sizeEqualAsHeightSliderResto = () => {
    return scrollY >= 10
  }

  const onCheckout = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    return () => {
      abort.abort()
    }
  }, [])

  const onOpenSidebarCategory = useCallback(() => {
    if (location.pathname === '/menu') {
      dispatch(setOpenSidebarCategory(true))
    }
  }, [dispatch, location])

  const openBill = async() => {
    navigate('/order-list')
  }

  return {
    scrollY,
    sizeEqualAsHeightSliderResto,
    searchParams,
    setSearchParams,
    location,
    navigate,
    onCheckout,
    dataStore,
    dataTable,
    selectedTenant,
    headerRef,
    loadingTableCheck,
    onOpenSidebarCategory,
    totalItemInCart,
    totalOrder,
    openBill
  }
}

export default MenuLayoutModel
