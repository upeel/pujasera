import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import { InvoiceBody, InvoiceBodyItem, PaymentCode, PaymentMethodListDetailResponse, PaymentMethodListsResponse } from 'src/api/index.type'
import { createInvoiceEwalletApi, createInvoiceQrisApi, createInvoiceVaApi } from 'src/api/payment'
import { getPaymentMethodList } from 'src/api/sales.api'
import { APP_BASE_URL, INITIAL_STORAGE } from 'src/constant'
import { OlToast } from 'src/helpers/toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { getCartState } from 'src/store/cart/cartSlice'
import { setInvoice, setIsGenInCheckout, setSelfOrderId } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
const { setItem } = Storage({})

export type HandleCheckoutEwallet = (ewallet_code: string, phone?: string) => void

const SelectPaymentModel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentList, setPaymentList] = useState<PaymentMethodListsResponse[]>([])
  const { isOpen: isOpenEWallet, onOpen: onOpenEWallet, onClose: onCloseEWallet } = useDisclosure()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const getTable = useAppSelector(state => state.app.table)
  const getCart = useAppSelector(state => getCartState(state.cart))
  const [isLoadingCreateInvoice, setIsLoadingCreateInvoice] = useState<boolean>(false)
  const [selectEwallet, setSelectEwallet] = useState<PaymentMethodListDetailResponse>({
    name: '',
    image: '',
    code: '',
    enabled: 0,
    payment_id: 0,
    required_phone: false
  })

  const handleSelectPayment = (paymentCode:PaymentCode | null, item:PaymentMethodListDetailResponse) => {
    switch (paymentCode) {
      case 'CC':
        OlToast.info({ description: 'Jenis pembayaran belum tersedia' })
        break
      case 'BT':
        handleCheckoutVa(item.code)
        break
      case 'OQ': // Qris
        handleCheckoutQris()
        break
      case 'EW':
        if (item.required_phone) {
          onOpenFormNumberPhone(item)
        } else {
          handleCheckoutEwallet(item.code)
        }
        break
      default:
        OlToast.error({ description: 'Jenis pembayaran tidak ditemukan' })
    }
  }

  const onOpenFormNumberPhone = (item:PaymentMethodListDetailResponse) => {
    onOpenEWallet()
    setSelectEwallet(item)
  }

  const onCloseFormNumberPhone = () => {
    onCloseEWallet()
    setSelectEwallet({
      name: '',
      image: '',
      code: '',
      enabled: 0,
      payment_id: 0,
      required_phone: false
    })
  }

  const fetchPaymentMethodList = async() => {
    try {
      setIsLoading(true)
      const res = await getPaymentMethodList({})
      setPaymentList(res.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            OlToast.error({ description: error.message })
          }
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPaymentMethodList()
  }, [])

  const invoiceBody = (data?:any):InvoiceBody => {
    const result:InvoiceBody = {
      self_order_id: 0,
      remark: 'OL-DINE-IN',
      currency_id: 'IDR',
      table_id: getTable.id,
      item: []
    }

    const item:InvoiceBodyItem[] = getCart.flatMap(val => {
      const tmpObjP:Record<string, any> = {
        id: val.id,
        qty: val.qty
      }
      if (val.type_code === 'P') {
        tmpObjP['type'] = 'P'
        tmpObjP['variant_id'] = val.variants.length > 0 ? val.variants[0].id : 0
        if (val.remark) {
          tmpObjP['note'] = val.note ? `TAKE AWAY, ${val.note}` : 'TAKE AWAY'
        } else {
          if (val.note) {
            tmpObjP['note'] = val.note
          }
        }

        if (val.addons.length > 0) {
          tmpObjP['addons'] = []
          val.addons.flatMap(val => {
            tmpObjP['addons'].push({
              product_addon_id: val.id,
              product_addon_name: val.name
            })
          })
        }
        return tmpObjP
      }
      if (val.type_code === 'C') {
        tmpObjP['type'] = 'C'
        tmpObjP['variant_id'] = 0
        if (val.remark) {
          tmpObjP['note'] = val.note ? `TAKE AWAY, ${val.note}` : 'TAKE AWAY'
        } else {
          if (val.note) {
            tmpObjP['note'] = val.note
          }
        }
        if (val.addons.length > 0) {
          tmpObjP['addons'] = []
          val.addons.flatMap(val => {
            tmpObjP['addons'].push({
              product_addon_id: val.id,
              product_addon_name: val.name
            })
          })
        }
        return tmpObjP
      }
    })
    result.item = item
    if (data) {
      return { ...data, ...result }
    }
    return result
  }

  const handleCheckoutVa = async(code:string) => {
    try {
      setIsLoadingCreateInvoice(true)
      const data = invoiceBody({ bank_code: code })
      const res = await createInvoiceVaApi({
        silent: true
      }, data)
      const expTime = res.data.data.qr_expired_time * 1000
      setItem(INITIAL_STORAGE.ttl_gen_qrcode, expTime)
      dispatch(setInvoice(res.data.data))
      dispatch(setSelfOrderId(res.data.data.payment_reference_id))
      dispatch(setIsGenInCheckout(true))
      navigate('/payment/virtual-account')
    } catch (error) {
      handleCheckoutError(error)
    } finally {
      setIsLoadingCreateInvoice(false)
    }
  }

  const handleCheckoutQris = async() => {
    try {
      setIsLoadingCreateInvoice(true)
      const data = invoiceBody()
      const res = await createInvoiceQrisApi({
        silent: true
      }, data)
      const expTime = res.data.data.qr_expired_time * 1000
      setItem(INITIAL_STORAGE.ttl_gen_qrcode, expTime)
      dispatch(setInvoice(res.data.data))
      dispatch(setSelfOrderId(res.data.data.payment_reference_id))
      dispatch(setIsGenInCheckout(true))
      data.self_order_id = res.data.data.payment_reference_id
      navigate('/payment/qris')
    } catch (error) {
      handleCheckoutError(error)
    } finally {
      setIsLoadingCreateInvoice(false)
    }
  }

  const handleCheckoutEwallet:HandleCheckoutEwallet = async(ewallet_code: string, phone?: string) => {
    try {
      setIsLoadingCreateInvoice(true)
      const data = invoiceBody({
        ewallet_code: `ID_${ewallet_code}`,
        redirect_url: `${APP_BASE_URL}/payment/ewallet`,
        failure_redirect_url: `${APP_BASE_URL}/payment/ewallet`,
        phone: phone || ''
      })
      const res = await createInvoiceEwalletApi({
        silent: true
      }, data)
      const actionUrl = res.data.data.action_url
      const expTime = res.data.data.qr_expired_time * 1000
      setItem(INITIAL_STORAGE.ttl_gen_qrcode, expTime)
      dispatch(setInvoice(res.data.data))
      dispatch(setSelfOrderId(res.data.data.payment_reference_id))
      dispatch(setIsGenInCheckout(true))
      if (actionUrl) {
        if (isMobile) {
          window.location.href = res.data.data.action_url.mobile_web_checkout_url
        } else {
          window.location.href = res.data.data.action_url.desktop_web_checkout_url
        }
      } else {
        navigate('/payment/ewallet')
      }
    } catch (error) {
      handleCheckoutError(error)
    } finally {
      setIsLoadingCreateInvoice(false)
    }
  }

  const handleCheckoutError = (error:unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        OlToast.error({
          description: error.message
        })
      }
    }
  }

  return {
    isLoading,
    paymentList,
    isOpenEWallet,
    onOpenFormNumberPhone,
    onCloseFormNumberPhone,
    handleSelectPayment,
    isLoadingCreateInvoice,
    selectEwallet,
    setSelectEwallet,
    handleCheckoutEwallet
  }
}

export default SelectPaymentModel
