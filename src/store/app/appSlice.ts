import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { InitialState, ActionSetTableCheck, ActionSetIsGetStore } from './appSlice.type'
import Storage from 'src/utils/storage'
import { INITIAL_STORAGE } from 'src/constant'

const { setItem, getItem } = Storage({})
const getMenuView = getItem(INITIAL_STORAGE.menuView, '')

export const initialDataStore = {
  store: {
    id: null,
    name: '',
    url_id: '',
    logo: '',
    logo_xs: '',
    tax_name: '',
    tax_rate: '',
    is_tax_for_shipping: 0,
    is_item_inc_tax: 0,
    is_tax_opt_for_pos: 0,
    is_service_charge_optional: 0,
    service_charge_rate: '',
    service_charge_rate_percentage: '',
    is_transac_percentage: 0,
    transac_charge_rate: '',
    transac_charge_rate_percentage: '',
    currency_id: '',
    currency_name: '',
    currency_symbol: '',
    dec_digit: 0,
    dec_point: '',
    thousands_sep: ''
  },
  table: {
    id: null,
    name: '',
    resto_layout_id: null,
    resto_layout_name: ''
  }
}

const initialState:InitialState = {
  isGetStore: false,
  store: initialDataStore.store,
  table: initialDataStore.table,
  loadingTableCheck: false,
  heightHeader: 0,
  menuView: getMenuView || null,
  isOpenSidebarCategory: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsGetStore: (state, action: ActionSetIsGetStore) => {
      state.isGetStore = action.payload
    },
    setTableCheck: (state, action:ActionSetTableCheck) => {
      state.store = action.payload.store
      state.table = action.payload.table
    },
    setHeightHeader: (state, action:{ payload: number, type: string }) => {
      state.heightHeader = action.payload
    },
    setMenuView: (state, action: { payload: string, type: string }) => {
      state.menuView = action.payload
      setItem(INITIAL_STORAGE.menuView, action.payload)
    },
    setLoadingTableCheck: (state, action: { payload: boolean, type: string }) => {
      state.loadingTableCheck = action.payload
    },
    setOpenSidebarCategory: (state, action: { payload: boolean, type: string }) => {
      state.isOpenSidebarCategory = action.payload
    }
  }
})

export const getSetIsGetStore = createDraftSafeSelector(
  (state:InitialState) => state.isGetStore,
  (isGetStore) => {
    return isGetStore
  }
)

export const getStoreState = createDraftSafeSelector(
  (state: InitialState) => state.store,
  (store) => {
    return store
  }
)

export const getTableState = createDraftSafeSelector(
  (state: InitialState) => state.table,
  (table) => {
    return table
  }
)

export const getHeightHeaderState = createDraftSafeSelector(
  (state: InitialState) => state.heightHeader,
  (heightHeader) => {
    return heightHeader
  }
)

export const getMenuViewState = createDraftSafeSelector(
  (state: InitialState) => state.menuView,
  (menuView) => menuView
)

export const getLoadingTableCheckState = createDraftSafeSelector(
  (state:InitialState) => state.loadingTableCheck,
  (loadingTableCheck) => loadingTableCheck
)

export const getOpenSidebarCategoryState = createDraftSafeSelector(
  (state:InitialState) => state.isOpenSidebarCategory,
  (isOpenSidebarCategory) => isOpenSidebarCategory
)

// Action creators are generated for each case reducer function
export const {
  setIsGetStore,
  setTableCheck,
  setHeightHeader,
  setMenuView,
  setLoadingTableCheck,
  setOpenSidebarCategory
} = appSlice.actions

export default appSlice.reducer
