import { useCallback, useMemo } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import {
  getLoadingCategoryState,
  getSelectedCategoryState,
  getCategoryListState,
  SelectedCategory,
  setSelectedCategory,
  setOpenModalCategory,
  getOpenModalCategoryState,
  getCatModeInfinteScroll,
  getPageCategories,
  setCatModeInfinteScroll,
  setPageCategories
} from 'src/store/category/categorySlice'
import { getLoadingTenantState, getPageTenantListState, getTenantListState, getTenantModeInfiniteScrollState, initTenantList, setPageTenantList, setTenantList, setTenantModeInfiniteScroll } from 'src/store/menu/menuSlice'
import { setOpenSidebarCategory } from 'src/store/app/appSlice'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import paramsToObject from 'src/utils/paramsToObject'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormSearch {
  tenant: string
}

function CategoryModel() {
  const { id } = useParams()
  const { isOpen: isOpenModalCtg, onClose: onCloseModalCtg, onOpen: onOpenModalCtg } = useDisclosure()
  const dispatch = useAppDispatch()
  const loadingCategory = useAppSelector(state => getLoadingCategoryState(state.category))
  const categoryList = useAppSelector(state => getCategoryListState(state.category))
  const isOpenModalCategory = useAppSelector(state => getOpenModalCategoryState(state.category))
  const selectedCategory = useAppSelector(state => getSelectedCategoryState(state.category))
  const loadingTenant = useAppSelector(state => getLoadingTenantState(state.menu))
  const tenantList = useAppSelector(state => getTenantListState(state.menu))
  const tenantModeInfiniteScroll = useAppSelector(state => getTenantModeInfiniteScrollState(state.menu))
  const location = useLocation()
  const [searchParams, setSearhParams] = useSearchParams()
  const { control, handleSubmit, reset, setValue } = useForm<FormSearch>({
    defaultValues: {
      tenant: ''
    }
  })

  const handleSearchTenant:SubmitHandler<FormSearch> = (data) => {
    const getParamsKeywordByTenant = searchParams.get('keyword') || ''
    const params = paramsToObject(searchParams.entries())
    if (getParamsKeywordByTenant === data.tenant) {
      return
    }
    resetTenant()
    if (data.tenant) {
      setSearhParams({
        ...params,
        keyword: data.tenant
      })
    } else {
      searchParams.delete('keyword')
      setSearhParams(searchParams)
    }
  }

  const clearSearchField = () => {
    const getParamsKeywordByTenant = searchParams.get('keyword')
    // const params = paramsToObject(searchParams.entries())
    setValue('tenant', '')
    if (getParamsKeywordByTenant) {
      searchParams.delete('keyword')
      setSearhParams(searchParams)
      resetTenant()
    }
  }

  const resetTenant = () => {
    dispatch(setPageTenantList(1))
    dispatch(setTenantList(initTenantList))
    dispatch(setTenantModeInfiniteScroll(false))
  }

  // Tenant
  const pageTenantList = useAppSelector(state => getPageTenantListState(state.menu))
  const hanldeSetPageTenantList = () => {
    if (pageTenantList < tenantList.meta.last_page) {
      dispatch(setTenantModeInfiniteScroll(true))
      dispatch(setPageTenantList(pageTenantList + 1))
    }
  }
  const [refTenant] = useInfiniteScroll(loadingTenant, hanldeSetPageTenantList, { threshold: 0 })

  // Cateories
  const catModeInfiniteScroll = useAppSelector((state) => getCatModeInfinteScroll(state.category))
  const pageCategories = useAppSelector((state) => getPageCategories(state.category))
  const hanldeSetPageCategories = () => {
    if (pageCategories < categoryList.meta.last_page) {
      dispatch(setCatModeInfinteScroll(true))
      dispatch(setPageCategories(pageCategories + 1))
    }
  }
  const [refLastCat] = useInfiniteScroll(loadingCategory, hanldeSetPageCategories, { threshold: 0 })

  const onCloseSidebarCategory = useCallback(() => {
    if (location.pathname === '/menu') {
      dispatch(setOpenSidebarCategory(false))
    }
  }, [dispatch, location])

  const handleSelectedCategory = (data:SelectedCategory) => {
    if (data) {
      const params = paramsToObject(searchParams.entries())
      if (data.id !== Number(searchParams.get('category_id'))) {
        delete params.keyword
        reset()
      }
      dispatch(setSelectedCategory(data))
      setSearhParams({
        ...params,
        category_id: data.id.toString()
      })
      onCloseSidebarCategory()
      setTimeout(() => {
        onOpenModalCategory()
      }, 200)
    }
  }

  const onOpenModalCategory = useCallback(() => {
    dispatch(setOpenModalCategory(true))
  }, [dispatch])

  const onCloseModalCategory = useCallback(() => {
    dispatch(setOpenModalCategory(false))
  }, [dispatch])

  const categoryItemIsActive = useMemo(() =>
    (id:number) => {
      const getParamsCatId = searchParams.get('category_id')
      if (id) {
        if (getParamsCatId) {
          return Number(getParamsCatId) === id
        }
        return false
      }
      return false
    }, [searchParams])

  return {
    id,
    isOpenModalCtg,
    onCloseModalCtg,
    onOpenModalCtg,
    categoryList,
    loadingCategory,
    selectedCategory,
    handleSelectedCategory,
    tenantList,
    loadingTenant,
    searchParams,
    onOpenModalCategory,
    onCloseModalCategory,
    isOpenModalCategory,
    refLastCat,
    catModeInfiniteScroll,
    refTenant,
    tenantModeInfiniteScroll,
    handleSearchTenant,
    categoryItemIsActive,
    control,
    handleSubmit,
    clearSearchField
  }
}

export default CategoryModel
