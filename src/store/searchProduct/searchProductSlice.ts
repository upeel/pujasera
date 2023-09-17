import { createSelector, createSlice } from '@reduxjs/toolkit'
import { GetProductByKeywordApi } from 'src/api/searchProduct.api'

export type SearchProductList = GetProductByKeywordApi | null
interface InitialState {
  searchProductList: SearchProductList,
  loadingSearchProduct: boolean
}

export const initSearchProductList:GetProductByKeywordApi = {
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
  searchProductList: null,
  loadingSearchProduct: false
}

const searchProductSlice = createSlice({
  name: 'searchProduct',
  initialState,
  reducers: {
    setSearchProductList: (state, actions:{payload: SearchProductList, type:string}) => {
      state.searchProductList = actions.payload
    },
    setLoadingSearchProduct: (state, actions: { payload: boolean, type: string }) => {
      state.loadingSearchProduct = actions.payload
    },
    resetStateSearchProduct: (state) => {
      state.searchProductList = null
      state.loadingSearchProduct = false
    }
  }
})

export const getSearchProductListState = createSelector(
  (state:InitialState) => state.searchProductList,
  (searchProductList) => {
    return searchProductList
  }
)

export const getLoadingSearchProductState = createSelector(
  (state:InitialState) => state.loadingSearchProduct,
  (loadingSearchProduct) => {
    return loadingSearchProduct
  }
)

// Action creators are generated for each case reducer function
export const { setSearchProductList, setLoadingSearchProduct, resetStateSearchProduct } = searchProductSlice.actions

export default searchProductSlice.reducer
