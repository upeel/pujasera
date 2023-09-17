import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormatManualGrouping } from 'src/api/index.type'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { getStoreState, getTableState } from 'src/store/app/appSlice'
import { getCartState, getSumPriceState, setSelectedCartItem, updateCartById } from 'src/store/cart/cartSlice'
import { Cart } from 'src/store/cart/cartSlice.type'
import { getOpenDetailMenuState, setOpenDetailMenu } from 'src/store/menu/menuSlice'
import { orderBy } from 'lodash'

const CheckoutModel = () => {
  const navigate = useNavigate()
  const dataStore = useAppSelector((state) => getStoreState(state.app))
  const dataTable = useAppSelector((state) => getTableState(state.app))
  const getCart = useAppSelector(state => getCartState(state.cart))
  const dispatch = useAppDispatch()
  const openDetailMenu = useAppSelector((state) => getOpenDetailMenuState(state.menu))
  const abortController = new AbortController()
  const sumPrice = useAppSelector(state => getSumPriceState(state))

  useEffect(() => {
    () => abortController.abort()
  }, [])

  const groupingCart = React.useMemo(() => {
    const group:FormatManualGrouping<Cart[]>[] = []
    const orderCart = orderBy(getCart, 'cart_id', 'desc')
    orderCart.map(obj => {
      const index = group.findIndex(val => val.group_id === obj.tenant_id)
      if (index === -1) {
        if (obj.tenant_id) {
          group.push({
            group_id: obj.tenant_id,
            group_name: obj.tenant_name,
            photo: obj.tenant_photo,
            children: getCart.filter((val) => val.tenant_id === obj.tenant_id)
          })
        }
      }
    })
    return group
  }, [getCart])

  const handleOpenUpdateMenu = (params: { isUpdate: boolean, type: string, id: string }, data:Cart) => {
    dispatch(setSelectedCartItem(data))
    dispatch(setOpenDetailMenu({
      isOpen: true,
      isUpdate: params.isUpdate,
      type: params.type,
      id: params.id
    }))
  }
  const handlCloseUpdateMenu = () => {
    dispatch(setSelectedCartItem(null))
    dispatch(setOpenDetailMenu({
      isOpen: false,
      isUpdate: false,
      type: '',
      id: ''
    }))
  }

  const handleUpdateRemark = (id: number, value: boolean) => {
    dispatch(updateCartById({
      cart_id: id,
      remark: Boolean(value)
    }))
  }

  // const sumPrice = ():SumPrice => {
  //   const sub_total = getSubtotal
  //   const admin_fee = dataStore.is_service_charge_optional ? Number(dataStore.service_charge_rate) * sub_total : 0
  //   let tax = 0
  //   let total = sub_total + admin_fee + tax
  //   for (let i = 0; i < getCart.length; i++) {
  //     /**
  //     * - (store) is_item_inc_tax = 1 dan (product) non_taxable =  1, maka harga produk udh include pajak
  //     * - (store) is_item_inc_tax = 0 dan (product) non_taxable =  0, maka product kenak pajak
  //     * - (store) is_item_inc_tax = 1 dan (product) non_taxable = 0, maka harga produk udah include pajak
  //     * - (store) is_item_inc_tax = 0 dan (product) non_taxable =  1, gak kenak pajak
  //     */
  //     if (dataStore.is_item_inc_tax === 0 && getCart[i].non_taxable === 0) {
  //       tax += Number(dataStore.tax_rate) * getCart[i].totalPrice
  //     }
  //   }
  //   total += tax
  //   const payment_charge = dataStore.is_transac_percentage ? Number(dataStore.transac_charge_rate) * total : Number(dataStore.transac_charge_rate)
  //   const totalFinal = total + payment_charge
  //   dispatch(setTotalAmount(totalFinal))
  //   return {
  //     sub_total,
  //     admin_fee,
  //     tax,
  //     payment_charge,
  //     total: totalFinal
  //   }
  // }

  const handleCheckout = () => {
    navigate('/checkout/select-payment')
  }

  return {
    navigate,
    dataStore,
    dataTable,
    getCart,
    groupingCart,
    handleOpenUpdateMenu,
    handlCloseUpdateMenu,
    openDetailMenu,
    handleUpdateRemark,
    sumPrice,
    handleCheckout
  }
}

export default CheckoutModel
