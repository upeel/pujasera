export const constantSearchParams = {
  VIEW: 'view'
}

export const constantViewListsMenu = {
  LIST: 'list',
  GRID: 'grid'
}

export const constantDefaultTransition = {
  type: 'spring',
  damping: 40,
  stiffness: 400
}

export const httpErrorCode = {
  ERR_FR_TOO_MANY_REDIRECTS: 'ERR_FR_TOO_MANY_REDIRECTS',
  ERR_BAD_OPTION_VALUE: 'ERR_BAD_OPTION_VALUE',
  ERR_BAD_OPTION: 'ERR_BAD_OPTION',
  ERR_NETWORK: 'ERR_NETWORK',
  ERR_DEPRECATED: 'ERR_DEPRECATED',
  ERR_BAD_RESPONSE: 'ERR_BAD_RESPONSE',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
  ERR_CANCELED: 'ERR_CANCELED',
  ECONNABORTED: 'ECONNABORTED',
  ETIMEDOUT: 'ETIMEDOUT'
}

export const STORAGE_PREFIX = import.meta.env.VITE_PREFIX_STORAGE || 'OL_'

export const INITIAL_STORAGE = {
  initToken: `${STORAGE_PREFIX}TOKEN`,
  accessToken: `${STORAGE_PREFIX}AC`,
  storeId: `${STORAGE_PREFIX}SID`,
  tableId: `${STORAGE_PREFIX}TID`,
  menuView: `${STORAGE_PREFIX}MENU_VIEW`,
  cart: `${STORAGE_PREFIX}CART`,
  url_domain: `${STORAGE_PREFIX}URL_DOMAIN`,
  self_order_id: `${STORAGE_PREFIX}SELF_ORDER_ID`,
  i18nextLng: `i18nextLng`,
  payload_checkout: `${STORAGE_PREFIX}PY_CH`,
  ttl_gen_qrcode: `${STORAGE_PREFIX}TTL_GEN_QRCODE`,
  invoice: `${STORAGE_PREFIX}INVOICE`
}

export const PAYMENT_PARENT_CODE = {
  qris: 'OQ',
  virtualAccount: 'VA',
  ewallet: 'EW',
  creditCard: 'CC'
}

export const reduceExpVirtualAccount = 60000 * 10 // 10 menit

export const APP_BASE_URL = document.location.origin
