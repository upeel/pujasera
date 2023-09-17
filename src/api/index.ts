import { INITIAL_STORAGE } from 'src/constant'
import { store } from 'src/store'
import Storage from 'src/utils/storage'
const { getItem } = Storage({})

export const API_DOMAIN = store.getState().app.store.url_id || getItem(INITIAL_STORAGE.url_domain, '')
