import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getCategoryApi } from 'src/api/category.api'
import { FormatManualGrouping, Product } from 'src/api/index.type'
import { getCombosApi, GetProductsApi, getProductsApi } from 'src/api/product.api'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import useScroll from 'src/hooks/useScroll'
import fetchTenantList from 'src/service/fetchTenantList'
import { getHeightHeaderState, getMenuViewState, getOpenSidebarCategoryState, setOpenSidebarCategory } from 'src/store/app/appSlice'
import { getCartState } from 'src/store/cart/cartSlice'
import { getCategoryListState, getCatModeInfinteScroll, getOpenModalCategoryState, getPageCategories, resetStateCategory, setCategoryList, setLoadingCategory, setOpenModalCategory } from 'src/store/category/categorySlice'
import { getIsOpenBtsRestoState, getLoadingTenantState, getOpenDetailMenuState, getPageTenantListState, getSelectedTenantState, getTenantListState, getTenantModeInfiniteScrollState, initTenantList, onCloseBtsResto, onOpenBtsResto, resetStateMenu, setLoadingTenant, setOpenDetailMenu, setPageTenantList, setSelectedTenant, setTenantList, setTenantModeInfiniteScroll } from 'src/store/menu/menuSlice'
import { SelectedTenant } from 'src/store/menu/menuSlice.types'

const initProducts = {
  data: [],
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0
  }
}

function MenuModel() {
  const { scrollY } = useScroll()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const isOpenBtsResto = useAppSelector(state => getIsOpenBtsRestoState(state.menu))
  const CardRestoComp = useRef<HTMLDivElement[] | null[]>([])
  const getHeightHeader = useAppSelector(state => getHeightHeaderState(state.app))
  const getMenuView = useAppSelector(state => getMenuViewState(state.app))
  const isOpenModalCategory = useAppSelector(state => getOpenModalCategoryState(state.category))
  const location = useLocation()
  const paramsCatId = searchParams.get('category_id') || ''
  const isOpenSidebarCategory = useAppSelector(state => getOpenSidebarCategoryState(state.app))
  const pageCategories = useAppSelector(state => getPageCategories(state.category))
  const categories = useAppSelector(state => getCategoryListState(state.category))
  const catModeInfiniteScroll = useAppSelector(state => getCatModeInfinteScroll(state.category))
  const getCart = useAppSelector(state => getCartState(state.cart))

  // Tenant
  const loadingTenant = useAppSelector(state => getLoadingTenantState(state.menu))
  const tenantList = useAppSelector(state => getTenantListState(state.menu))
  const selectedTenant = useAppSelector(state => getSelectedTenantState(state.menu))
  const tenantModeInfiniteScroll = useAppSelector(state => getTenantModeInfiniteScrollState(state.menu))
  const pageTenantList = useAppSelector(state => getPageTenantListState(state.menu))
  const hanldeSetPageTenantList = () => {
    if (pageTenantList < tenantList.meta.last_page) {
      dispatch(setTenantModeInfiniteScroll(true))
      dispatch(setPageTenantList(pageTenantList + 1))
    }
  }
  const [refLastCardTenant] = useInfiniteScroll(loadingTenant, hanldeSetPageTenantList, { threshold: 0 })
  const paramsKeywordByTenantName = searchParams.get('keyword') || ''

  // Combos
  const [loadingCombos, setLoadingCombos] = useState<boolean>(false)
  const [comboModeInfiniteScroll, setComboModeInfiniteScroll] = useState<boolean>(false)
  const [loadingIntersectingCombo, setLoadingIntersectingCombo] = useState<boolean>(false)
  const [combos, setCombos] = useState<GetProductsApi<Product[]>>(initProducts)
  const [pageCombo, setPageCombo] = useState<number>(1)
  const hanldeSetPageCombo = () => {
    if (pageCombo < combos.meta.last_page) {
      setComboModeInfiniteScroll(true)
      setPageCombo(old => old + 1)
      setLoadingIntersectingCombo(true)
    }
  }
  const [refLastCombo] = useInfiniteScroll(loadingCombos, hanldeSetPageCombo, { threshold: 0 })

  // Products
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
  const [productsModeInfiniteScroll, setProductsModeInfiniteScroll] = useState<boolean>(false)
  const [loadingIntersectingProducts, setLoadingIntersectingProducts] = useState<boolean>(false)
  const [products, setProducts] = useState<GetProductsApi<FormatManualGrouping<Product[]>[]>>(initProducts)
  const [pageProducts, setPageProducts] = useState<number>(1)
  const hanldeSetPageProducts = () => {
    if (pageProducts < products.meta.last_page) {
      setProductsModeInfiniteScroll(true)
      setPageProducts(old => old + 1)
      setLoadingIntersectingProducts(true)
    }
  }
  const [refLastProducts] = useInfiniteScroll(loadingProducts, hanldeSetPageProducts, { threshold: 0 })

  const openDetailMenu = useAppSelector((state) => getOpenDetailMenuState(state.menu))
  const handleOpenDetailMenu = (params: { isUpdate: boolean, type: string, id: string }) => {
    dispatch(setOpenDetailMenu({
      isOpen: true,
      isUpdate: params.isUpdate,
      type: params.type,
      id: params.id
    }))
  }
  const handlCloseDetailMenu = () => {
    dispatch(setOpenDetailMenu({
      isOpen: false,
      isUpdate: false,
      type: '',
      id: ''
    }))
  }

  useEffect(() => {
    _fetchTenantList()
  }, [pageTenantList, paramsCatId, paramsKeywordByTenantName])

  useEffect(() => {
    if (!tenantModeInfiniteScroll) {
      if (tenantList.data.length > 0) {
        dispatch(setSelectedTenant(tenantList.data[0]))
      }
    }
  }, [tenantList])

  useEffect(() => {
    if (selectedTenant) {
      fetchComboByTenant(selectedTenant.id)
    }
  }, [selectedTenant, pageCombo])

  useEffect(() => {
    if (selectedTenant) {
      fetchProductByTenant(selectedTenant.id)
    }
  }, [selectedTenant, pageProducts])

  useEffect(() => {
    return () => {
      dispatch(resetStateMenu())
      setCombos(initProducts)
      setProducts(initProducts)
      setPageCombo(1)
      setPageProducts(1)
      setComboModeInfiniteScroll(false)
      setProductsModeInfiniteScroll(false)
      dispatch(resetStateCategory())
    }
  }, [location.pathname])

  const _fetchTenantList = async() => {
    try {
      await fetchTenantList(paramsCatId, paramsKeywordByTenantName)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            dispatch(setTenantList(initTenantList))
            resetAfterChangeCat()
          }
        }
      }
    } finally {
      dispatch(setLoadingTenant(false))
    }
  }

  const tenantCountMenuInCart = React.useMemo(() =>
    (id:number):number => {
      let count = 0
      for (let j = 0; j < getCart.length; j++) {
        if (id === getCart[j].tenant_id) {
          count += getCart[j].qty
        }
      }
      return count
    }
  , [getCart])

  const menuCountInCart = React.useMemo(() =>
    (id:number):number => {
      let count = 0
      for (let j = 0; j < getCart.length; j++) {
        if (id === getCart[j].id) {
          count += getCart[j].qty
        }
      }
      return count
    }, [getCart])

  const fetchComboByTenant = async(id:number | string) => {
    try {
      setLoadingCombos(true)
      const res = await getCombosApi(id, {}, pageCombo)
      setCombos({
        data: comboModeInfiniteScroll ? [...combos.data, ...res.data.data] : res.data.data,
        meta: {
          current_page: res.data.meta.current_page,
          from: res.data.meta.from,
          to: res.data.meta.to,
          last_page: res.data.meta.last_page,
          per_page: res.data.meta.per_page,
          total: res.data.meta.total
        }
      })
      // setComboModeInfiniteScroll(false)
      setLoadingIntersectingCombo(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setCombos(initProducts)
          }
        }
      }
    } finally {
      setLoadingCombos(false)
    }
  }

  const fetchProductByTenant = async(id:number | string) => {
    try {
      setLoadingProducts(true)
      const res = await getProductsApi(id, {}, pageProducts)
      setProducts({
        data: productsModeInfiniteScroll ? groupProduct([...products.data.flatMap(val => val.children), ...res.data.data]) : groupProduct(res.data.data),
        meta: {
          current_page: res.data.meta.current_page,
          from: res.data.meta.from,
          to: res.data.meta.to,
          last_page: res.data.meta.last_page,
          per_page: res.data.meta.per_page,
          total: res.data.meta.total
        }
      })
      // setProductsModeInfiniteScroll(false)
      setLoadingIntersectingProducts(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            setProducts(initProducts)
          }
        }
      }
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchCategoryList = async() => {
    try {
      dispatch(setLoadingCategory(true))
      const res = await getCategoryApi({}, pageCategories)
      dispatch(setCategoryList({
        data: catModeInfiniteScroll ? [...categories.data, ...res.data.data] : res.data.data,
        meta: {
          current_page: res.data.meta.current_page,
          from: res.data.meta.from,
          to: res.data.meta.to,
          last_page: res.data.meta.last_page,
          per_page: res.data.meta.per_page,
          total: res.data.meta.total
        }
      }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            dispatch(setTenantList(initTenantList))
          }
        }
      }
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  useEffect(() => {
    if (paramsCatId) {
      resetAfterChangeCat()
    }
  }, [paramsCatId])

  useEffect(() => {
    fetchCategoryList()
  }, [pageCategories])

  const groupProduct = (data:Product[]) => {
    const group:FormatManualGrouping<typeof data>[] = []
    data.map(obj => {
      const index = group.findIndex(val => val.group_id === obj.group_id)
      if (index === -1) {
        if (obj.group_id) {
          group.push({
            group_id: obj.group_id,
            group_name: obj.group_name,
            children: data.filter((val) => val.group_id === obj.group_id)
          })
        }
      }
    })
    return group
  }

  const resetAfterChangeCat = () => {
    window.scrollTo(0, 0)
    setCombos(initProducts)
    setProducts(initProducts)
    dispatch(setTenantList(initTenantList))
    dispatch(setPageTenantList(1))
    setPageCombo(1)
    setPageProducts(1)
    setComboModeInfiniteScroll(false)
    setProductsModeInfiniteScroll(false)
    dispatch(setTenantModeInfiniteScroll(false))
  }

  const handleSelectedTenant = (tenant: SelectedTenant) => {
    if (tenant) {
      window.scrollTo(0, 0)
      setCombos(initProducts)
      setProducts(initProducts)
      setPageCombo(1)
      setPageProducts(1)
      setComboModeInfiniteScroll(false)
      setProductsModeInfiniteScroll(false)
      dispatch(setTenantModeInfiniteScroll(false))
      dispatch(setSelectedTenant({
        id: tenant.id,
        alias_name: tenant.alias_name,
        logo_md: tenant.logo_md,
        logo_xs: tenant.logo_xs,
        logo_height: tenant.logo_height,
        logo_width: tenant.logo_width,
        menu_group: tenant.menu_group,
        name: tenant.name,
        photo: tenant.photo,
        pos_hidden: tenant.pos_hidden
      }))
    }
  }

  useEffect(() => {
    if (!selectedTenant) return
    const getIndex = tenantList.data.findIndex(val => val.id === selectedTenant.id)
    if (getIndex !== 0) {
      CardRestoComp.current[getIndex]?.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [selectedTenant])

  const isSelectedTenant = React.useCallback((id:number) => {
    if (selectedTenant) {
      return selectedTenant.id === id
    }
    return false
  }, [selectedTenant])

  const sizeEqualAsHeightSliderResto = React.useMemo(() => {
    return scrollY >= 10
  }, [scrollY])

  const onCloseModalCategory = useCallback(() => {
    dispatch(setOpenModalCategory(false))
  }, [dispatch])

  const onCloseSidebarCategory = useCallback(() => {
    if (location.pathname === '/menu') {
      dispatch(setOpenSidebarCategory(false))
    }
  }, [dispatch, location])

  const onOpenSidebarCategory = useCallback(() => {
    if (location.pathname === '/menu') {
      dispatch(setOpenSidebarCategory(true))
    }
  }, [dispatch, location])

  return {
    searchParams,
    onCloseBtsResto: () => dispatch(onCloseBtsResto()),
    onOpenBtsResto: () => dispatch(onOpenBtsResto()),
    sizeEqualAsHeightSliderResto,
    fetchTenantList,
    isOpenBtsResto,
    tenantList,
    loadingTenant,
    selectedTenant,
    isSelectedTenant,
    handleSelectedTenant,
    CardRestoComp,
    getHeightHeader,
    getMenuView,
    loadingProducts,
    products,
    combos,
    loadingCombos,
    refLastCardTenant,
    refLastCombo,
    refLastProducts,
    loadingIntersectingCombo,
    comboModeInfiniteScroll,
    productsModeInfiniteScroll,
    loadingIntersectingProducts,
    onCloseModalCategory,
    isOpenModalCategory,
    resetAfterChangeCat,
    onCloseSidebarCategory,
    onOpenSidebarCategory,
    isOpenSidebarCategory,
    handleOpenDetailMenu,
    openDetailMenu,
    handlCloseDetailMenu,
    tenantCountMenuInCart,
    menuCountInCart,
    tenantModeInfiniteScroll
  }
}

export default MenuModel
