import { MenuGroupResponse, TenantResponse } from 'src/api/index.type'
import { GetTenantApi } from 'src/api/tenant.api'

export type TenantList = GetTenantApi
export type SelectedTenant = TenantResponse<MenuGroupResponse[]> | null

export interface OpenDetailMenu {
  isOpen: boolean,
  isUpdate: boolean,
  id: string,
  type: string,
}

export interface InitialState {
  isOpenBtsResto: boolean,
  tenantList: TenantList,
  loadingTenant: boolean,
  selectedTenant: SelectedTenant,
  pageTenantList: number,
  tenantModeInfiniteScroll: boolean,
  openDetailMenu: OpenDetailMenu
}
