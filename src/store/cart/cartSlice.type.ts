import { ProductAddons, ProductVariants } from 'src/api/index.type'

export interface Cart {
  cart_id: number,
  totalPrice: number,
  tenant_id: number,
  tenant_name: string,
  tenant_photo: string,
  name_product: string,
  id: number,
  variants: ProductVariants[],
  addons: ProductAddons[],
  note: string,
  remark: boolean,
  qty: number,
  type_code: string,
  non_taxable: number,
}

export interface UpdateCart {
  cart_id?: number,
  totalPrice?: number,
  tenant_id?: number,
  tenant_name?: string,
  tenant_photo?: string,
  name_product?: string,
  id?: number,
  variants?: ProductVariants[],
  addons?: ProductAddons[],
  note?: string,
  remark?: boolean,
  qty?: number,
  type_code?: string,
  non_taxable?: number,
}

export interface CartVariants {
  id: string
}

export interface CartAddons {
  id: string
}

export interface InitialState {
  cart: Cart[],
  selectedCartItem: Cart | null
}

export interface SumPrice {
  sub_total: number,
  admin_fee: number,
  tax: number,
  payment_charge: number,
  total: number
}
