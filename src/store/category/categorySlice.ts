import { createSelector, createSlice } from '@reduxjs/toolkit'
import { CategoryResponse } from 'src/api/index.type'
import { GetCategoryApi } from 'src/api/category.api'

export type CategoryList = GetCategoryApi
export type SelectedCategory = CategoryResponse | null
interface InitialState {
  categoryList: CategoryList,
  loadingCategory: boolean,
  selectedCategory: SelectedCategory,
  isOpenModalCategory: boolean,
  pageCategories: number,
  catModeInfiniteScroll: boolean
}

export const initCategoryList:CategoryList = {
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

const initialState:InitialState = {
  categoryList: initCategoryList,
  loadingCategory: false,
  selectedCategory: null,
  isOpenModalCategory: false,
  pageCategories: 1,
  catModeInfiniteScroll: false
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryList: (state, actions:{payload: CategoryList, type:string}) => {
      state.categoryList = actions.payload
    },
    setLoadingCategory: (state, actions: { payload: boolean, type: string }) => {
      state.loadingCategory = actions.payload
    },
    setSelectedCategory: (state, actions:{payload: SelectedCategory, type:string}) => {
      state.selectedCategory = actions.payload
    },
    setOpenModalCategory: (state, actions: { payload: boolean, type: string }) => {
      state.isOpenModalCategory = actions.payload
    },
    setPageCategories: (state, actions: { payload: number, type: string }) => {
      state.pageCategories = actions.payload
    },
    setCatModeInfinteScroll: (state, actions: { payload: boolean, type: string }) => {
      state.catModeInfiniteScroll = actions.payload
    },
    resetStateCategory: (state) => {
      state.categoryList = initCategoryList
      state.loadingCategory = false
      state.selectedCategory = null
      state.pageCategories = 1
      state.catModeInfiniteScroll = false
      state.isOpenModalCategory = false
    }
  }
})

export const getCategoryListState = createSelector(
  (state:InitialState) => state.categoryList,
  (categoryList) => {
    return categoryList
  }
)

export const getSelectedCategoryState = createSelector(
  (state:InitialState) => state.selectedCategory,
  (selectedCategory) => {
    return selectedCategory
  }
)

export const getLoadingCategoryState = createSelector(
  (state:InitialState) => state.loadingCategory,
  (loadingCategory) => {
    return loadingCategory
  }
)
export const getOpenModalCategoryState = createSelector(
  (state:InitialState) => state.isOpenModalCategory,
  (isOpenModalCategory) => isOpenModalCategory
)
export const getPageCategories = createSelector(
  (state:InitialState) => state.pageCategories,
  (pageCategories) => pageCategories
)
export const getCatModeInfinteScroll = createSelector(
  (state:InitialState) => state.catModeInfiniteScroll,
  (catModeInfiniteScroll) => catModeInfiniteScroll
)

// Action creators are generated for each case reducer function
export const {
  setCategoryList,
  setSelectedCategory,
  setLoadingCategory,
  setOpenModalCategory,
  setCatModeInfinteScroll,
  setPageCategories,
  resetStateCategory
} = categorySlice.actions

export default categorySlice.reducer
