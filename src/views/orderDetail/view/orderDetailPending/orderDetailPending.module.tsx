import { useDisclosure } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InvoiceBody } from 'src/api/index.type'
import { createInvoiceQrisApi } from 'src/api/payment'
import { cancelInvoiceApi, detailInvoiceApi } from 'src/api/sales.api'
import craftPayloadItemInvoice from 'src/helpers/craftPayloadItemInvoice'
import { OlToast } from 'src/helpers/toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import useReloadInvoice from 'src/hooks/useReloadInvoice'
import { getGroupOrderItems, setInvoice } from 'src/store/payment/paymentSlice'
import saveFile from 'src/utils/saveFile'

const OrderDetailPendingModel = () => {
  const invoice = useAppSelector(state => state.payment.invoice)
  const [isLoadingUpdatePayment, setIsLoadingUpdatePayment] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { id: getSelfOrderId } = useParams()
  const navigate = useNavigate()
  const globalAbort = new AbortController()
  const [isOpenQris, setIsOpenQris] = useState<boolean>(false)
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false)
  const groupOrderItems = useAppSelector(state => getGroupOrderItems(state.payment))
  const getStore = useAppSelector(state => state.app.store)
  const { isOpen: isOpenGuide, onClose: onCloseGuide, onOpen: onOpenGuide } = useDisclosure()
  const [isLodingCancelPayment, setIsLoadingCancelPayment] = useState<boolean>(false)
  const { isOpen: isOpenCancelOrder, onClose: onCloseCancelOrder, onOpen: onOpenCancelOrder } = useDisclosure()
  const ttlGenQrCode = useAppSelector(state => state.payment.invoice ? state.payment.invoice.qr_expired_time * 1000 : 0)
  const [isQrCodeExp, setIsQrCodeExp] = useState<boolean>(false)
  const [isLoadingCreateInvoice, setIsLoadingCreateInvoice] = useState<boolean>(false)
  const { isOpen: isOpenAlertCancel, onClose: onCloseAlertCancel, onOpen: onOpenAlertCancel } = useDisclosure()
  const salesOrderStatus = useAppSelector(state => state.payment.invoice?.order_datail.sales_order_status)
  useReloadInvoice(getSelfOrderId as string, true)

  const getStatusInvoice = async() => {
    try {
      setIsLoadingUpdatePayment(true)
      const res = await detailInvoiceApi({}, getSelfOrderId as string)
      dispatch(setInvoice(res.data.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleErrorApi(error)
      }
    } finally {
      setIsLoadingUpdatePayment(false)
    }
  }

  const onOpenQris = () => {
    setIsOpenQris(true)
  }

  const onCloseQris = () => {
    setIsOpenQris(false)
  }

  const handleBack = () => {
    navigate('/order-list')
  }

  const handleDownloadFile = async(base64:string) => {
    try {
      setIsDownloadLoading(true)
      const fetchBase64 = await fetch(base64)
      const blob = await fetchBase64.blob()
      await saveFile(blob, `qris_${invoice?.order_number}`)
      onCloseQris()
    } catch (error) {
      OlToast.error({ description: 'Gagal mengunduh gambar' })
    } finally {
      setIsDownloadLoading(false)
    }
  }

  const handleCancelPayment = async() => {
    try {
      setIsLoadingCancelPayment(true)
      const res = await cancelInvoiceApi({}, {
        self_order_id: getSelfOrderId as string
      })
      OlToast.success({ description: res.data.data.message })
      onCloseCancelOrder
      getStatusInvoice()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleErrorApi(error)
      }
    } finally {
      setIsLoadingCancelPayment(false)
    }
  }

  const handleOnCopyVirtualAccount = () => {
    OlToast.success({ description: 'Nomor berhasil disalin' })
  }

  const handleErrorApi = (error: AxiosError) => {
    if (error.response?.status === 404) {
      OlToast.error({ description: error.message })
    }
  }

  useEffect(() => {
    if (salesOrderStatus === 'P') {
      if (Date.now() >= ttlGenQrCode) {
        setIsQrCodeExp(true)
      } else {
        setIsQrCodeExp(false)
      }
    }
    () => {
      globalAbort.abort()
      setIsQrCodeExp(false)
    }
  }, [])

  const handleSetIsQrCodeExp = () => {
    setIsQrCodeExp(true)
  }

  const getInvoiceBody = (result:InvoiceBody):InvoiceBody => {
    const item = craftPayloadItemInvoice(invoice)
    result.item = item
    return result
  }

  const hadleCreateInvoiceQris = async() => {
    try {
      setIsLoadingCreateInvoice(true)
      const result = {
        self_order_id: invoice?.payment_reference_id || '',
        remark: 'OL-DINE-IN',
        currency_id: 'IDR',
        table_id: invoice?.order_datail.table_no || '',
        item: []
      }
      const payload = getInvoiceBody(result)
      const res = await createInvoiceQrisApi({}, payload)
      dispatch(setInvoice(res.data.data))
      setIsQrCodeExp(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          OlToast.error({
            description: error.message
          })
        }
      }
    } finally {
      setIsLoadingCreateInvoice(false)
    }
  }

  return {
    invoice,
    isLoadingUpdatePayment,
    getStatusInvoice,
    handleBack,
    isOpenQris,
    onOpenQris,
    onCloseQris,
    isDownloadLoading,
    handleDownloadFile,
    groupOrderItems,
    getStore,
    isOpenGuide,
    onCloseGuide,
    onOpenGuide,
    isOpenCancelOrder,
    onCloseCancelOrder,
    onOpenCancelOrder,
    handleCancelPayment,
    isLodingCancelPayment,
    handleOnCopyVirtualAccount,
    ttlGenQrCode,
    isQrCodeExp,
    handleSetIsQrCodeExp,
    hadleCreateInvoiceQris,
    isLoadingCreateInvoice,
    isOpenAlertCancel,
    onOpenAlertCancel,
    onCloseAlertCancel,
    salesOrderStatus
  }
}

export default OrderDetailPendingModel
