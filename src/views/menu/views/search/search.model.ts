import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { getProductSearchApi, getComboSearchApi, GetProductSearchApi } from 'src/api/searchProduct.api'
import { Product } from 'src/api/index.type'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import _ from 'lodash'
import { getCartState } from 'src/store/cart/cartSlice'
import { getOpenDetailMenuState, setOpenDetailMenu } from 'src/store/menu/menuSlice'
import { setOpenModalCategory } from 'src/store/category/categorySlice'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import { filterDuplicateByKey } from 'src/utils/filterDuplicateData'

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

const SearchModel = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const getCart = useAppSelector(state => getCartState(state.cart))

  const handleBack = () => {
    navigate('/menu')
  }

  const keyword = searchParams.get('search')?.toLowerCase()

  interface groupByTenant<tenantContents> {
    tenant_name: string,
    group: tenantContents
  }

  interface contents {
    type_code: string
    id: number,
    name: string,
    photo: string,
    fsell_price_pos: string,
    badge: number,
    track_inventory: number,
    is_out_stock: number,
    stock_qty: number
  }

  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
  const [loadingCombos, setLoadingCombos] = useState<boolean>(false)
  const [productInfiniteScroll, setProductInfiniteScroll] = useState<boolean>(false)
  const [loadingIntersectingProduct, setLoadingIntersectingProduct] = useState<boolean>(false)
  const [loadingIntersectingCombo, setLoadingIntersectingCombo] = useState<boolean>(false)
  const [combos, setCombos] = useState<GetProductSearchApi<Product[]>>(initProducts)
  const [products, setProducts] = useState<GetProductSearchApi<Product[]>>(initProducts)
  const [comboInfiniteScroll, setComboInfiniteScroll] = useState<boolean>(false)
  const [productPage, setProductPage] = useState<number>(1)
  const [comboPage, setComboPage] = useState<number>(1)
  const productGroup = _.groupBy(products?.data, (dm) => dm.tenant_name)
  const comboGroup = _.groupBy(combos?.data, (dm) => dm.tenant_name)

  const outputProduct: groupByTenant<contents[]>[] = Object.keys(productGroup).map((tenantName) => {
    const groupItems = productGroup[tenantName]
    return {
      tenant_name: tenantName,
      group: groupItems.map((dm) => _.pick(dm, 'name', 'photo', 'fsell_price_pos', 'id', 'badge', 'track_inventory', 'is_out_stock', 'stock_qty', 'type_code'))
    }
  })
  const handleSetPageProducts = () => {
    if (productPage < products.meta.last_page) {
      setProductInfiniteScroll(true)
      setLoadingIntersectingProduct(true)
      setProductPage(old => old + 1)
    }
  }
  const [refLastProduct] = useInfiniteScroll(loadingProducts, handleSetPageProducts, { threshold: 0 })

  const outputCombo: groupByTenant<contents[]>[] = Object.keys(comboGroup).map((tenantName) => {
    const groupItems = comboGroup[tenantName]
    return {
      tenant_name: tenantName,
      group: groupItems.map((dm) => _.pick(dm, 'name', 'photo', 'fsell_price_pos', 'id', 'badge', 'track_inventory', 'is_out_stock', 'stock_qty', 'type_code'))
    }
  })
  const handleSetPageCombos = () => {
    if (comboPage < combos.meta.last_page) {
      setComboInfiniteScroll(true)
      setLoadingIntersectingCombo(true)
      setComboPage(old => old + 1)
    }
  }
  const [refLastCombo] = useInfiniteScroll(loadingCombos, handleSetPageCombos, { threshold: 0 })
  const sumResult = combos.meta.total + products.meta.total

  const fetchSearchProductList = async(keywords: string) => {
    try {
      setLoadingProducts(true)
      const res = await getProductSearchApi(keywords, {}, productPage, 10)
      setProducts({
        data: productInfiniteScroll ? filterDuplicateByKey('id', [...products.data, ...res.data.data]) : filterDuplicateByKey('id', res.data.data),
        meta: {
          current_page: res.data.meta.current_page,
          from: res.data.meta.from,
          to: res.data.meta.to,
          last_page: res.data.meta.last_page,
          per_page: res.data.meta.per_page,
          total: res.data.meta.total
        }
      })
      setLoadingIntersectingProduct(false)
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

  const fetchSearchComboList = async(keywords: string) => {
    try {
      setLoadingCombos(true)
      const res = await getComboSearchApi(keywords, {}, comboPage, 10)
      setCombos({
        data: comboInfiniteScroll ? filterDuplicateByKey('id', [...combos.data, ...res.data.data]) : filterDuplicateByKey('id', res.data.data),
        meta: {
          current_page: res.data.meta.current_page,
          from: res.data.meta.from,
          to: res.data.meta.to,
          last_page: res.data.meta.last_page,
          per_page: res.data.meta.per_page,
          total: res.data.meta.total
        }
      })
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

  const handleSearch = (key: string) => {
    if (key !== undefined) {
      fetchSearchProductList(key)
      fetchSearchComboList(key)
    }
  }

  const onCloseModalCategory = useCallback(() => {
    dispatch(setOpenModalCategory(false))
  }, [dispatch])

  const openDetailMenu = useAppSelector((state) => getOpenDetailMenuState(state.menu))
  const handleOpenDetailMenu = (params: { isUpdate: false, type: string, id: string }) => {
    dispatch(setOpenDetailMenu({
      isOpen: true,
      isUpdate: params.isUpdate,
      type: params.type,
      id: params.id
    }))
  }
  const handleCloseDetailMenu = () => {
    dispatch(setOpenDetailMenu({
      isOpen: false,
      isUpdate: false,
      type: '',
      id: ''
    }))
  }

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

  useEffect(() => {
    if (keyword !== undefined) {
      fetchSearchProductList(keyword)
    }
  }, [keyword, productPage])

  useEffect(() => {
    if (keyword !== undefined) {
      fetchSearchComboList(keyword)
    }
  }, [keyword, comboPage])

  useEffect(() => {
    return () => {
      setProductPage(1)
      setComboPage(1)
      setProductInfiniteScroll(false)
      setComboInfiniteScroll(false)
      setProducts(initProducts)
      setCombos(initProducts)
    }
  }, [location.pathname])

  return {
    handleBack,
    searchParams,
    setSearchParams,
    products,
    loadingProducts,
    combos,
    loadingCombos,
    handleSearch,
    outputProduct,
    productInfiniteScroll,
    outputCombo,
    comboInfiniteScroll,
    loadingIntersectingCombo,
    loadingIntersectingProduct,
    refLastProduct,
    refLastCombo,
    openDetailMenu,
    handleOpenDetailMenu,
    handleCloseDetailMenu,
    onCloseModalCategory,
    menuCountInCart,
    sumResult
  }
}

export default SearchModel
