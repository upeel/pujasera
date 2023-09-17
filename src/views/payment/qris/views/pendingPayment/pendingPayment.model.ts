import { useDisclosure } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INITIAL_STORAGE } from 'src/constant'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { OlToast } from 'src/helpers/toast'
import { clearCart } from 'src/store/cart/cartSlice'
import { getGroupOrderItems, removeInvoice, removeSelfOrderId, setInvoice } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
import saveFile from 'src/utils/saveFile'
import { createInvoiceQrisApi } from 'src/api/payment'
import { cancelInvoiceApi, detailInvoiceApi } from 'src/api/sales.api'
import craftPayloadItemInvoice from 'src/helpers/craftPayloadItemInvoice'
import { InvoiceBody } from 'src/api/index.type'
const { getItem, setItem, removeItem } = Storage({})

const PendingPaymentQrisModel = () => {
  const { isOpen: isOpenDtm, onClose: onCloseDtm, onOpen: onOpenDtm } = useDisclosure()
  const { isOpen: isOpenCancelOrder, onClose: onCloseCancelOrder, onOpen: onOpenCancelOrder } = useDisclosure()
  const navigate = useNavigate()
  const invoice = useAppSelector(state => state.payment.invoice)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const ttlGenQrCode = getItem(INITIAL_STORAGE.ttl_gen_qrcode, '')
  const [isQrCodeExp, setIsQrCodeExp] = useState<boolean>(false)
  const [isLoadingUpdatePayment, setIsLoadingUpdatePayment] = useState<boolean>(false)
  const getSelfOrderId = useAppSelector(state => state.payment.selfOrderId)
  const [isLodingCancelPayment, setIsLoadingCancelPayment] = useState<boolean>(false)
  const { isOpen: isOpenAlertCancel, onClose: onCloseAlertCancel, onOpen: onOpenAlertCancel } = useDisclosure()
  const getStore = useAppSelector(state => state.app.store)
  const groupOrderItems = useAppSelector(state => getGroupOrderItems(state.payment))
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false)

  const handleSetIsQrCodeExp = () => {
    setIsQrCodeExp(true)
  }

  const handleRefreshQrCode = async() => {
    setIsLoading(true)
    await hadleCreateInvoice()
    setIsLoading(false)
  }

  const handleErrorApi = (error: AxiosError) => {
    if (error.response?.status === 404) {
      OlToast.error({ description: error.message })
    }
  }

  const getInvoiceBody = ():InvoiceBody => {
    const result:InvoiceBody = {
      self_order_id: invoice?.payment_reference_id || '',
      remark: 'OL-DINE-IN',
      currency_id: 'IDR',
      table_id: invoice?.order_datail.table_no || '',
      item: []
    }
    const item = craftPayloadItemInvoice(invoice)
    result.item = item
    return result
  }

  const hadleCreateInvoice = async() => {
    try {
      const payload = getInvoiceBody()
      const res = await createInvoiceQrisApi({}, payload)
      dispatch(setInvoice(res.data.data))
      const expPayment = res.data.data.qr_expired_time * 1000
      setItem(INITIAL_STORAGE.ttl_gen_qrcode, expPayment)
      setIsQrCodeExp(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleErrorApi(error)
      }
    }
  }

  const handleUpdateStatusPayment = () => {
    getStatusInvoice()
  }

  const getStatusInvoice = async() => {
    try {
      setIsLoadingUpdatePayment(true)
      const res = await detailInvoiceApi({}, getSelfOrderId)
      dispatch(setInvoice(res.data.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleErrorApi(error)
      }
    } finally {
      setIsLoadingUpdatePayment(false)
    }
  }

  const handleCancelPayment = async() => {
    try {
      setIsLoadingCancelPayment(true)
      const res = await cancelInvoiceApi({}, {
        self_order_id: getSelfOrderId
      })
      OlToast.success({ description: res.data.data.message })
      clearInvoice()
      navigate('/menu')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleErrorApi(error)
      }
    } finally {
      setIsLoadingCancelPayment(false)
    }
  }

  useEffect(() => {
    if (Date.now() >= ttlGenQrCode) {
      setIsQrCodeExp(true)
    } else {
      setIsQrCodeExp(false)
    }
  }, [])

  const clearInvoice = () => {
    dispatch(removeSelfOrderId())
    dispatch(removeInvoice())
    dispatch(clearCart())
    removeItem(INITIAL_STORAGE.ttl_gen_qrcode)
    removeItem(INITIAL_STORAGE.payload_checkout)
  }

  const handleNotContinueInvoice = () => {
    handleCancelPayment()
  }

  const handleDownloadFile = async(base64:string) => {
    try {
      setIsDownloadLoading(true)
      const fetchBase64 = await fetch(base64)
      const blob = await fetchBase64.blob()
      await saveFile(blob, `qris_${invoice?.order_number}`)
    } catch (error) {
      OlToast.error({ description: 'Gagal mengunduh gambar' })
    } finally {
      setIsDownloadLoading(false)
    }
  }

  return {
    isOpenDtm: isOpenDtm,
    onCloseDtm: onCloseDtm,
    onOpenDtm: onOpenDtm,
    isOpenCancelOrder: isOpenCancelOrder,
    onCloseCancelOrder: onCloseCancelOrder,
    onOpenCancelOrder: onOpenCancelOrder,
    navigate,
    invoice,
    isLoading,
    ttlGenQrCode,
    isQrCodeExp,
    handleSetIsQrCodeExp,
    handleRefreshQrCode,
    handleNotContinueInvoice,
    handleUpdateStatusPayment,
    isLoadingUpdatePayment,
    handleCancelPayment,
    isLodingCancelPayment,
    groupOrderItems,
    isOpenAlertCancel,
    onOpenAlertCancel,
    onCloseAlertCancel,
    getStore,
    handleDownloadFile,
    isDownloadLoading
  }
}

export default PendingPaymentQrisModel
