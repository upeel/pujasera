export interface TableCheckStoreResponse {
  id: number | null,
  name: string,
  url_id: string,
  logo: string,
  logo_xs: string,
  tax_name: string,
  tax_rate: string,
  is_tax_opt_for_pos: number,
  is_item_inc_tax: number,
  is_tax_for_shipping: number,
  is_service_charge_optional: number,
  service_charge_rate: string,
  service_charge_rate_percentage: string,
  is_transac_percentage: number,
  transac_charge_rate: string,
  transac_charge_rate_percentage: string,
  dec_digit: number,
  dec_point: string,
  thousands_sep: string,
  currency_id: string,
  currency_symbol: string,
  currency_name: string
}
export interface TableCheckTableResponse {
  id: number | null,
  name: string,
  resto_layout_id: number | null,
  resto_layout_name: string
}
export interface TableCheckResponse {
  data: {
    store: TableCheckStoreResponse,
    table: TableCheckTableResponse
  }
}

export interface ErrorResponseData {
  error: {
    error: string,
    message: string,
    status_code: number
  }
}

export interface LoginApiBody {
  phone: string,
  store_id?: string | number
}

export interface LoginResponse {
  token_type: string,
  expires_in: number,
  access_token: string,
  refresh_token: string,

}

export interface SuccessResponse<T> {
  data: T,
}

export interface SuccessResponseWithMeta<T, U> {
  data: T,
  meta: U
}

export interface MetaResponse {
  current_page: number,
  from: number,
  last_page: number,
  per_page: number,
  to: number,
  total: number
}

export interface CategoryResponse {
  id: number,
  name: string,
  logo_md: string,
  logo_xs: string,
  logo_width: number,
  logo_height: number
}

export interface TenantResponse<MenuGroup> {
  id: number,
  name: string,
  alias_name: string,
  photo: string,
  pos_hidden: number,
  logo_md: string,
  logo_xs: string,
  logo_width: string | null,
  logo_height: string | null,
  menu_group: MenuGroup
}

export interface MenuGroupResponse {
  group_id: number,
  group_name: string,
  group_pos_hidden: number
}

type TypeCode = 'P' | 'C' | 'V'

export interface Product {
  id: number,
  type: string,
  type_code: TypeCode,
  tenant_id: number,
  tenant_name: string,
  group_id: number,
  group_name: string,
  group_pos_hidden: number,
  name: string,
  sku: string,
  sell_price_pos: string,
  fsell_price_pos: string,
  photo: string,
  track_inventory: number,
  is_out_stock: number,
  stock_qty: number,
  badge: 0
}

export interface DetailProduct<Variants, Addons> {
  id: number,
  type: string,
  type_code: TypeCode,
  name: string,
  sku: string,
  track_inventory: number,
  is_out_stock: number,
  stock_qty: number,
  description: string,
  sell_price_pos: string,
  fsell_price_pos: string,
  photo: string,
  has_variant: boolean,
  variants: Variants,
  has_addon: boolean,
  addons: Addons,
  tenant_id: number,
  tenant_name: string,
  tenant_photo: string,
  variant_label: string | null,
  non_taxable: number
}

export interface ProductVariants {
  id: number,
  name_product: string,
  type: string,
  variant_id: string | null,
  unique_id: string,
  type_code: TypeCode,
  name: string,
  sell_price_pos: string,
  fsell_price_pos: string,
  sku: string | null,
  is_out_stock: number,
  stock_qty: number,
  photo: string,
  view_order: number,
  specification: [],
  diff_price_variant: number,
  fdiff_price_variant: string,
  track_inventory?: number
}

export interface ProductAddons {
  id: number,
  name: string,
  price: string,
  view_order: number,
  status: string,
  product_id: number,
  currency_id: string
}

export interface FormatManualGrouping<T> {
  group_id: string | number,
  group_name: string,
  photo?:string,
  children: T
}

export interface SearchResponse {
  id: number,
  name: string,
  type: string,
  type_code: TypeCode,
  tenant_id: number,
  tenant_name: string,
  tenant_photo: string,
  group_id: number,
  group_name: string,
  group_pos_hidden: number,
  sku: string,
  sell_price_pos: string,
  fsell_price_pos: string,
  photo: string,
  track_inventory: number,
  is_out_stock: number,
  stock_qty: number,
  badge: number
}

export interface InvoiceBody {
  self_order_id: number | string,
  remark: string,
  currency_id: string,
  item: InvoiceBodyItem[],
  [key: string]: any
}

export interface InvoiceBodyItem {
  type: string,
  id: number,
  variant_id: number,
  qty: number,
  [key: string]: any
}

export interface InvoiceResponse {
  action_url: ActionUrlInvoice,
  amount: string
  bank_code: string
  bank_logo: string
  bank_name: string
  cc_id: string
  channel_properties: ChannelPropertiesInvoice
  checkout_url: string
  ewallet_id: string
  ewallet_logo: string
  ewallet_name: string
  ewallet_phone_number: string
  famount: string
  foodcourt_logo: string
  foodcourt_nama: string
  logo_qris: string
  no_table: number
  order_datail: InvoiceOrderDetailResponse
  order_number: string
  payment_mode: PaymentCode
  payment_mode_id: number
  payment_reference_id: string
  payment_status: PaymentStatus
  payment_type: string
  qr_expired_datetime: string
  qr_expired_time: number
  qr_image: string
  transaction_req_id: string
  transaction_sn: string
  va_account_number: string
  va_id: string
  va_name: string
}

export interface ActionUrlInvoice {
  desktop_web_checkout_url: string,
  mobile_web_checkout_url: string,
  mobile_deeplink_checkout_url: string,
  qr_checkout_string: string
}

export interface ChannelPropertiesInvoice {
  mobile_number: string,
  success_redirect_url: string,
  failure_redirect_url: string
}

export type PaymentStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'FAILED'

export type OrderStatus = 'P' | 'A' | 'Z' | 'X'

export interface InvoiceOrderDetailResponse {
  currency_id: string
  customer_phone: string,
  forder_amount: string
  fpayment_charge: string
  fservice_charge_amount: string
  ftax_amount: string
  ftotal_amount: string
  id: string
  is_paid: number
  items: InvoiceItemsResponse[]
  notes: string
  order_amount: string
  order_no: string
  payment_charge: string
  sales_order_id: number
  sales_order_status: OrderStatus
  self_sales_order_id: string
  self_sales_order_status: OrderStatus
  service_charge_amount: string
  table_name: string
  table_no: string
  tax_amount: string
  total_amount: string
}

export interface InvoiceItemsResponse {
  addon_price: string
  addons: any[]
  amount: string
  completed_qty: number
  created_at: string
  deleted: number
  discount_amount: string
  discount_rate: string
  extra: string
  external_id: string,
  id: string
  item_name: string
  item_variant_name: string
  loyalty_points: string
  note: string
  original_price: string
  price: string
  product_combo_id: number
  product_combo_name: string
  product_combo_photo: string
  product_group_id: number
  product_id: number
  product_name: string
  product_photo: string
  product_variant_id: number
  product_variant_name: string
  product_variant_photo: string
  qty: number
  self_sales_order_id: string
  serial_no: string
  tenant_id: number
  tenant_name: string
  tenant_photo: string
  total_loyalty_points: string
  total_weight: string
  type: string
  type_name: string
  updated_at: string
  updated_from: string
  variants: any[]
  weight: string
}

export interface CurrencyIdResponse {
  currency_id: string,
  exchange_rate: string,
  fexchange_rate: string,
  symbol: string,
  name: string,
  dec_point: string,
  thousands_sep: string,
  dec_digit: number
}

export interface LatestInvoiceBody {
  invoice_id: string | number
}

export interface CancelInvoiceBody {
  invoice_id: string | number
}
export interface PaymentMethodListsResponse {
  payment_id: number | null;
  name: string;
  code: PaymentCode;
  enabled: number;
  detail: PaymentMethodListDetailResponse[];
}

export interface PaymentMethodListDetailResponse {
  payment_id: number
  name: string
  code: string
  image: string
  enabled: number
  required_phone: boolean
}

export interface ListInvoiceResponse {
  sales_order_id: number
  self_sales_order_id: string
  order_date: string
  forder_date: string
  order_no: string
  total_amount: string
  famount: string
  sales_order_status: OrderStatus
  self_sales_order_status: OrderStatus
  phone_number: string
  external_id: string
  payment_type: string
  payment_status: PaymentStatus
  payment_mode: PaymentCode
  payment_mode_id: number
  payment_status_id: string
  bank_code: string
  ewallet_code: string
}

export type PaymentCode = 'OQ' | 'BT' | 'EW' | 'CC'
