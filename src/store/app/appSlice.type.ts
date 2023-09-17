import { TableCheckStoreResponse, TableCheckTableResponse } from 'src/api/index.type'

export interface InitialState {
  isGetStore: boolean,
  store: TableCheckStoreResponse,
  table: TableCheckTableResponse,
  heightHeader: number,
  menuView: null | string,
  loadingTableCheck: boolean,
  isOpenSidebarCategory: boolean,
}

export interface ActionSetIsGetStore {
  payload: boolean,
  type: string
}

export interface ActionSetTableCheck {
  payload: {
    store: TableCheckStoreResponse,
    table: TableCheckTableResponse,
  }
  type: string
}
