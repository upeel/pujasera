import { createSelector, createSlice } from '@reduxjs/toolkit'
import { InitialState, OpenDetailMenu, SelectedTenant, TenantList } from './menuSlice.types'

export const initTenantList:TenantList = {
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
  isOpenBtsResto: false,
  tenantList: initTenantList,
  loadingTenant: false,
  selectedTenant: null,
  pageTenantList: 1,
  tenantModeInfiniteScroll: false,
  openDetailMenu: {
    isOpen: false,
    isUpdate: false,
    type: '',
    id: ''
  }
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    onOpenBtsResto: (state) => {
      state.isOpenBtsResto = true
    },
    onCloseBtsResto: (state) => {
      state.isOpenBtsResto = false
    },
    setTenantList: (state, actions:{payload: TenantList, type:string}) => {
      state.tenantList = {
        data: actions.payload.data,
        meta: actions.payload?.meta
      }
    },
    setLoadingTenant: (state, actions: { payload: boolean, type: string }) => {
      state.loadingTenant = actions.payload
    },
    setSelectedTenant: (state, actions:{payload: SelectedTenant, type:string}) => {
      state.selectedTenant = actions.payload
    },
    setPageTenantList: (state, actions:{payload: number, type:string}) => {
      state.pageTenantList = actions.payload
    },
    setTenantModeInfiniteScroll: (state, actions:{payload: boolean, type:string}) => {
      state.tenantModeInfiniteScroll = actions.payload
    },
    setOpenDetailMenu: (state, actions: { payload: OpenDetailMenu, type:string }) => {
      state.openDetailMenu = actions.payload
    },
    resetStateMenu: (state) => {
      state.isOpenBtsResto = false
      state.tenantList = initTenantList
      state.loadingTenant = false
      state.selectedTenant = null
      state.pageTenantList = 1
      state.tenantModeInfiniteScroll = false
      state.openDetailMenu = {
        isOpen: false,
        isUpdate: false,
        type: '',
        id: ''
      }
    }
  }
})

export const getIsOpenBtsRestoState = createSelector(
  (state:InitialState) => state.isOpenBtsResto,
  (isOpenBtsResto) => {
    return isOpenBtsResto
  }
)

export const getTenantListState = createSelector(
  (state:InitialState) => state.tenantList,
  (tenantList) => {
    return tenantList
  }
)

export const getSelectedTenantState = createSelector(
  (state:InitialState) => state.selectedTenant,
  (selectedTenant) => {
    return selectedTenant
  }
)

export const getLoadingTenantState = createSelector(
  (state:InitialState) => state.loadingTenant,
  (loadingTenant) => {
    return loadingTenant
  }
)

export const getPageTenantListState = createSelector(
  (state:InitialState) => state.pageTenantList,
  (pageTenantList) => {
    return pageTenantList
  }
)

export const getTenantModeInfiniteScrollState = createSelector(
  (state:InitialState) => state.tenantModeInfiniteScroll,
  (tenantModeInfiniteScroll) => {
    return tenantModeInfiniteScroll
  }
)

export const getOpenDetailMenuState = createSelector(
  (state:InitialState) => state.openDetailMenu,
  (openDetailMenu) => {
    return openDetailMenu
  }
)

// Action creators are generated for each case reducer function
export const {
  onOpenBtsResto,
  onCloseBtsResto,
  setTenantList,
  setSelectedTenant,
  setLoadingTenant,
  resetStateMenu,
  setPageTenantList,
  setTenantModeInfiniteScroll,
  setOpenDetailMenu
} = menuSlice.actions

export default menuSlice.reducer
