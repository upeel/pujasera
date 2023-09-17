import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GetProductApi, getProductApi } from 'src/api/product.api'
import { FormatManualGrouping, ProductAddons, ProductVariants } from 'src/api/index.type'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { deleteCartById, getCartState, getSelectedCartItemState, setCart, setSelectedCartItem, updateCartById } from 'src/store/cart/cartSlice'
import { getOpenDetailMenuState, setOpenDetailMenu } from 'src/store/menu/menuSlice'
import axios from 'axios'
import { OlToast } from 'src/helpers/toast'

const initialProductState:GetProductApi = {
  data: {
    id: 0,
    type: '',
    type_code: 'P',
    name: '',
    sku: '',
    track_inventory: 0,
    is_out_stock: 0,
    stock_qty: 0,
    description: '',
    sell_price_pos: '',
    fsell_price_pos: '',
    photo: '',
    has_variant: false,
    variants: [],
    has_addon: false,
    addons: [],
    tenant_id: 0,
    tenant_name: '',
    tenant_photo: '',
    variant_label: null,
    non_taxable: 0
  }
}

interface FormOrder {
  note: string,
  qty: number,
  addons: string[],
  variant: string[]
}

function DetailMenuModel() {
  const getOpenDetailMenu = useAppSelector((state) => getOpenDetailMenuState(state.menu))
  const getSelectedCart = useAppSelector((state) => getSelectedCartItemState(state.cart))
  const getSelectedVariant = getSelectedCart?.variants.map((val) => val.unique_id)
  const { handleSubmit, control, reset, watch, formState, register, setValue } = useForm<FormOrder>({
    defaultValues: {
      note: getOpenDetailMenu.isUpdate ? getSelectedCart?.note || '' : '',
      qty: getOpenDetailMenu.isUpdate ? getSelectedCart?.qty || 0 : 0,
      addons: getOpenDetailMenu.isUpdate ? getSelectedCart?.addons.map((val) => val.id.toString()) || [] : [],
      variant: getOpenDetailMenu.isUpdate ? getSelectedCart?.type_code === 'P' ? getSelectedVariant || [] : [] : []
    }
  })
  const [product, setProduct] = useState<GetProductApi>(initialProductState)
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false)
  const sellPrice = useRef<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [dataVariants, setDataVariants] = useState<FormatManualGrouping<ProductVariants[]>[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const getCart = useAppSelector((state) => getCartState(state.cart))
  const [isRemoveItem, setIsRemoveItem] = useState<boolean>(false)
  const [qtyValue] = watch(['qty'])
  const hasStock = useRef<boolean>(false)
  const [stockQtyValue, setStockQtyValue] = useState<number>(0)
  const [isUnlimited, setIsUnlimited] = useState<boolean>(false)
  const variantValue = watch('variant')

  const fetchGetProduct = async(id:string, type:string) => {
    try {
      setLoadingProduct(true)
      const res = await getProductApi(id, type, {})
      const result = res.data
      setProduct(result)
      if (result.data.type_code === 'C') {
        setDataVariants(groupVariant(result.data.variants))
      }
      if (getOpenDetailMenu.isUpdate && getSelectedVariant) {
        handleStockQtyValue(getSelectedVariant[0], res.data)
      } else {
        handleStockQtyValue(undefined, result)
      }
      hasStock.current = checkHasStock(result)
      sellPrice.current = Number(result.data.sell_price_pos)
      setTotalPrice(getOpenDetailMenu.isUpdate && getSelectedCart ? getSelectedCart?.totalPrice : Number(result.data.sell_price_pos))
    } catch (error:any) {
      if (axios.isAxiosError(error)) {
        return OlToast.error({
          description: error.message
        })
      }
    } finally {
      setLoadingProduct(false)
    }
  }
  const groupVariant = (data:ProductVariants[]) => {
    const group:FormatManualGrouping<typeof data>[] = []
    data.map(obj => {
      const index = group.findIndex(val => val.group_id === obj.id)
      if (index === -1) {
        if (obj.id) {
          group.push({
            group_id: obj.id,
            group_name: obj.name_product,
            children: data.filter((val) => val.id === obj.id)
          })
        }
      }
    })
    return group
  }

  useEffect(() => {
    fetchGetProduct(getOpenDetailMenu.id, getOpenDetailMenu.type)
  }, [])

  useEffect(() => {
    const subscription = watch((value) => {
      let priceVariant = 0
      let priceAddons = 0
      let totalTmp = 0

      // Variant Price
      if (value.variant) {
        const getVariantPrice = product?.data.variants.filter(val => {
          return value.variant?.includes(val.unique_id)
        })
        if (getVariantPrice) {
          priceVariant = getVariantPrice.map(val => Number(val.diff_price_variant)).reduce((prev, next) => prev + next, 0)
        }
      }

      // Addons Price
      if (value.addons) {
        const getPriceAddons = product?.data.addons.filter(val => {
          return value.addons?.includes(val.id.toString())
        })
        if (getPriceAddons) {
          priceAddons = getPriceAddons.map(val => Number(val.price)).reduce((prev, next) => prev + next, 0)
        }
      }

      if (value.qty) {
        totalTmp = (sellPrice.current + priceAddons + priceVariant) * value.qty
      }
      setTotalPrice(totalTmp)
    })
    return () => subscription.unsubscribe()
  }, [watch, product])

  useEffect(() => {
    if (getOpenDetailMenu.isUpdate) {
      if (qtyValue && qtyValue < 1) {
        handleOpenAlertRemove()
      }
    }
  }, [qtyValue])

  const handleOpenAlertRemove = () => {
    setIsRemoveItem(true)
  }

  const formValidate = () => {
    if (!formState.isValid) {
      OlToast.warning({ description: 'Lengkapi pilihan yang wajib diisi.' })
    }
  }

  const handlCloseDetailMenu = () => {
    dispatch(setOpenDetailMenu({
      isOpen: false,
      isUpdate: false,
      type: '',
      id: ''
    }))
  }

  const closeConfirmRemoveItem = () => {
    setIsRemoveItem(false)
  }

  const confirmRemoveItem = () => {
    if (!getSelectedCart) return
    dispatch(deleteCartById(getSelectedCart?.cart_id))
    dispatch(setSelectedCartItem(null))
    handlCloseDetailMenu()
  }

  /**
   * Beberapa varian apakah masih ada
   * @param product
   * @returns
   */
  const areSomeVariantsAvailable = (product: GetProductApi): boolean => {
    return product.data.variants.some(
      value => Number(value.is_out_stock) === 0 && Number(value.stock_qty) > 0
    )
  }

  /**
   * Apakah semua varian masih ada
   * @param product
   * @returns
   */
  const allVariantsAvailable = (product: GetProductApi): boolean => {
    return product.data.variants.every(
      value => Number(value.is_out_stock) === 0 && Number(value.stock_qty) > 0
    )
  }

  /**
   * Apakah track_inventory active
   * @param product
   * @returns
   */
  const isTrackInventoryActive = (product: GetProductApi): boolean => {
    if (product.data.type_code === 'P') {
      return Number(product.data.track_inventory) === 1
    } else if (product.data.type_code === 'C') {
      // Jika combo maka di cek semua variantnya
      return product.data.variants.every(value => Number(value.track_inventory) === 1)
    } else {
      return false
    }
  }

  // const areSomeVariantsTrackInventoryActive = (product: GetProductApi): boolean => {
  //   return product.data.variants.some(value => Number(value.track_inventory) === 1)
  // }

  /**
   * Berfungsi untuk mengecek apakah stock masih ada atau tidak
   * @param product
   * @returns
   */
  const checkHasStock = (product:GetProductApi):boolean => {
    const _isTrackInventoryActive = isTrackInventoryActive(product)
    // Product
    if (product.data.type_code === 'P') {
      if (_isTrackInventoryActive) {
        setIsUnlimited(false)
        // Product has variant
        if (hasVariants(product)) {
          // Apakah beberapa varian masih ada?
          if (areSomeVariantsAvailable(product)) {
            return true
          } else {
            return false
          }
        } else {
          if (Number(product.data.is_out_stock) === 1 || Number(product.data.stock_qty) < 1) {
            return false
          } else {
            return true
          }
        }
      } else {
        // track inventory tidak aktif, stok tidak perlu dicek
        // stok dianggap unlimited
        setIsUnlimited(true)
        return true
      }
    }

    // Combo
    if (product.data.type_code === 'C') {
      const _allVariantsAvailable = allVariantsAvailable(product)
      /**
       * Penambahan cek is_out_stock pada parent
       */
      if (Number(product.data.is_out_stock) === 1) {
        return false
      }
      if (_isTrackInventoryActive) {
        setIsUnlimited(false)
        if (_allVariantsAvailable) {
          return true
        } else {
          return false
        }
      } else {
        setIsUnlimited(true)
        return true
      }
    }

    return false
  }

  const handleStockQtyValue = (variantId?: string, data?: GetProductApi) => {
    const xData = data || product
    if (xData.data.type_code === 'C') {
      if (!getOpenDetailMenu.isUpdate) {
        setValue('qty', 1)
      }
      const inStockVariants = xData.data.variants.filter(variant => Number(variant.stock_qty) > 0 && Number(variant.is_out_stock === 0))
      const minimalStock = inStockVariants.reduce((min, variant) => {
        if (Number(variant.stock_qty) < Number(min)) {
          return variant.stock_qty
        }
        return Number(min)
      }, Number.MAX_SAFE_INTEGER)
      setStockQtyValue(minimalStock)
    }

    if (xData.data.type_code === 'P') {
      if (hasVariants(xData)) {
        if (variantId) {
          if (qtyValue < 1) {
            setValue('qty', 1)
          }
          const stockQty = xData.data.variants.filter(val => val.unique_id === variantId).map(val => val.stock_qty)
          if (qtyValue > stockQty[0] && xData.data.track_inventory) {
            setValue('qty', stockQty[0])
          }
          setStockQtyValue(stockQty[0])
        } else {
          setStockQtyValue(0)
        }
      } else {
        if (!getOpenDetailMenu.isUpdate) {
          setValue('qty', 1)
        }
        setStockQtyValue(xData.data.stock_qty)
      }
    }
  }

  const hasVariants = (product:GetProductApi):boolean => {
    if (product.data.type_code === 'P' || product.data.type_code === 'C') {
      return product.data.has_variant && product.data.variants.length > 0
    } else {
      return false
    }
  }

  const handleCustomChangeVariant = (variantId:string) => {
    handleStockQtyValue(variantId)
  }

  const handleListVariantNotAvailable = (track_inventory:number, is_out_stock:number, stock_qty:number) => {
    return Number(track_inventory) === 1 ? Number(is_out_stock) === 1 || Number(stock_qty) < 1 : false
  }

  const canStillBeOrdered = () => {
    const { type_code, has_variant, variants, id } = product.data
    /**
     * TODO
     * 1. Jika product biasa maka bandingkan qty yang available dengan qty yang ada di cart.
     * 2. Jika product variant maka bandingkan qty yang ada divariant dengan qty
     * 3. Jika Combo maka cek qty mulai dari yang kecil aja
     */

    // Product
    if (type_code === 'P') {
      // Tanpa variant
      if (!has_variant && variants.length < 1) {
        let diff = 0
        let getQty = 0
        getCart.forEach(cart => {
          if (cart.id === id) {
            getQty += cart.qty
          }
        })
        if (getOpenDetailMenu.isUpdate && getSelectedCart) {
          diff = (stockQtyValue - getQty) - (Number(qtyValue) - getSelectedCart.qty)
        } else {
          diff = (stockQtyValue - getQty) - Number(qtyValue)
        }
        // console.log({ stockQtyValue, getQty, qtyValue, diff })
        if (diff >= 0) {
          return true
        } else {
          return false
        }
      } else {
        // Dengan Variant
        let diff = 0
        let getQty = 0
        getCart.forEach(cart => {
          if (cart.id === id) {
            if (cart.variants[0].unique_id === variantValue[0]) {
              getQty += cart.qty
            }
          }
        })
        if (getOpenDetailMenu.isUpdate && getSelectedCart) {
          if (variantValue[0] === getSelectedCart.variants[0].unique_id) {
            diff = (stockQtyValue - getQty) - (Number(qtyValue) - getSelectedCart.qty)
          } else {
            diff = (stockQtyValue - getQty) - Number(qtyValue)
          }
        } else {
          diff = (stockQtyValue - getQty) - Number(qtyValue)
        }
        // console.log({ stockQtyValue, getQty, qtyValue, diff })
        if (diff >= 0) {
          return true
        } else {
          return false
        }
      }
    }

    // Combo
    if (type_code === 'C') {
      let diff = 0
      let getQty = 0
      getCart.forEach(cart => {
        if (cart.id === id) {
          getQty += cart.qty
        }
      })
      if (getOpenDetailMenu.isUpdate && getSelectedCart) {
        diff = (stockQtyValue - getQty) - (Number(qtyValue) - getSelectedCart.qty)
      } else {
        diff = (stockQtyValue - getQty) - Number(qtyValue)
      }
      // console.log({ stockQtyValue, getQty, qtyValue, diff })
      if (diff >= 0) {
        return true
      } else {
        return false
      }
    }
  }

  const onSubmit:SubmitHandler<FormOrder> = async(data) => {
    if (!isUnlimited) {
      const _canStillBeOrdered = canStillBeOrdered()
      if (!_canStillBeOrdered) {
        OlToast.warning({
          description: 'Stok tidak mencukupi'
        })
        return
      }
    }

    // Variant
    let variants:Array<ProductVariants> = []
    if (data.variant) {
      variants = data.variant.flatMap(valTmp => {
        return product.data.variants.filter(val => valTmp === val.unique_id)
      })
    }
    // Addons
    let addons:Array<ProductAddons> = []
    if (data.addons) {
      addons = data.addons.flatMap(valTmp => {
        return product.data.addons.filter(val => valTmp === val.id.toString())
      })
    }

    if (getOpenDetailMenu.isUpdate && getSelectedCart) {
      dispatch(updateCartById({
        cart_id: getSelectedCart.cart_id,
        totalPrice,
        tenant_id: product.data.tenant_id,
        tenant_name: product.data.tenant_name,
        tenant_photo: product.data.tenant_photo,
        variants: product.data.type_code === 'P' ? variants : product.data.variants,
        addons: addons,
        note: data.note,
        qty: Number(data.qty),
        name_product: product.data.name,
        id: product.data.id,
        type_code: product.data.type_code,
        non_taxable: product.data.non_taxable
      }))
      OlToast.success({ description: 'Berhasil mengubah menu.' })
    } else {
      dispatch(setCart({
        cart_id: getCart.length > 0 ? getCart[getCart.length - 1].cart_id + 1 : 1,
        totalPrice,
        tenant_id: product.data.tenant_id,
        tenant_name: product.data.tenant_name,
        tenant_photo: product.data.tenant_photo,
        variants: product.data.type_code === 'P' ? variants : product.data.variants,
        addons: addons,
        note: data.note,
        remark: false,
        qty: Number(data.qty),
        name_product: product.data.name,
        id: product.data.id,
        type_code: product.data.type_code,
        non_taxable: product.data.non_taxable
      }))
      OlToast.success({ description: 'Berhasil menambahkan ke keranjang.' })
    }

    handlCloseDetailMenu()
  }

  return {
    handleSubmit,
    control,
    reset,
    onSubmit,
    loadingProduct,
    product,
    formState,
    register,
    formValidate,
    totalPrice,
    dataVariants,
    navigate,
    handlCloseDetailMenu,
    getSelectedCart,
    getOpenDetailMenu,
    closeConfirmRemoveItem,
    isRemoveItem,
    confirmRemoveItem,
    handleOpenAlertRemove,
    qtyValue,
    hasStock: hasStock.current,
    stockQtyValue,
    handleCustomChangeVariant,
    isUnlimited,
    handleListVariantNotAvailable
  }
}

export default DetailMenuModel
