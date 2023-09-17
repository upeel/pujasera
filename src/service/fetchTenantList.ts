import { getTenantApi } from 'src/api/tenant.api'
import { store } from 'src/store'
import { setLoadingTenant, setTenantList } from 'src/store/menu/menuSlice'

const fetchTenantList = async(paramsCatId:string, paramsKeywordByTenantName:string) => {
  const dispatch = store.dispatch
  const { tenantList, tenantModeInfiniteScroll, pageTenantList } = store.getState().menu
  try {
    dispatch(setLoadingTenant(true))
    const res = await getTenantApi({}, {
      page: pageTenantList,
      category_id: paramsCatId || '',
      keyword: paramsKeywordByTenantName || ''
    })
    dispatch(setTenantList({
      data: tenantModeInfiniteScroll ? [...tenantList.data, ...res.data.data] : res.data.data,
      meta: {
        current_page: res.data.meta.current_page,
        from: res.data.meta.from,
        to: res.data.meta.to,
        last_page: res.data.meta.last_page,
        per_page: res.data.meta.per_page,
        total: res.data.meta.total
      }
    }))
    return res
  } catch (error) {
    return error
  } finally {
    dispatch(setLoadingTenant(false))
  }
}

export default fetchTenantList
