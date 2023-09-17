import { useDisclosure } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { detailInvoiceVaApi } from 'src/api/payment'
import { cancelInvoiceApi } from 'src/api/sales.api'
import { INITIAL_STORAGE } from 'src/constant'
import { OlToast } from 'src/helpers/toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { clearCart } from 'src/store/cart/cartSlice'
import { getGroupOrderItems, removeInvoice, removeSelfOrderId, setInvoice } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
const { getItem, removeItem } = Storage({})

const PendingPaymentVirtualAccountModel = () => {
  const navigate = useNavigate()
  const { isOpen: isOpenDtm, onClose: onCloseDtm, onOpen: onOpenDtm } = useDisclosure()
  const { isOpen: isOpenGuide, onClose: onCloseGuide, onOpen: onOpenGuide } = useDisclosure()
  const { isOpen: isOpenCancelOrder, onClose: onCloseCancelOrder, onOpen: onOpenCancelOrder } = useDisclosure()
  const invoice = useAppSelector(state => state.payment.invoice)
  const ttlGenQrCode = getItem(INITIAL_STORAGE.ttl_gen_qrcode, '')
  const groupOrderItems = useAppSelector(state => getGroupOrderItems(state.payment))
  const getStore = useAppSelector(state => state.app.store)
  const dispatch = useAppDispatch()
  const [isLodingCancelPayment, setIsLoadingCancelPayment] = useState<boolean>(false)
  const getSelfOrderId = useAppSelector(state => state.payment.selfOrderId)
  const [isLoadingUpdatePayment, setIsLoadingUpdatePayment] = useState<boolean>(false)
  const [isQrCodeExp, setIsQrCodeExp] = useState<boolean>(false)

  const handleOnCopyVirtualAccount = () => {
    OlToast.success({ description: 'Nomor berhasil disalin' })
  }

  useEffect(() => {
    if (Date.now() >= ttlGenQrCode) {
      setIsQrCodeExp(true)
    } else {
      setIsQrCodeExp(false)
    }
  }, [])

  const getStatusInvoice = async() => {
    try {
      setIsLoadingUpdatePayment(true)
      const res = await detailInvoiceVaApi({}, getSelfOrderId)
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

  const clearInvoice = () => {
    dispatch(removeSelfOrderId())
    dispatch(removeInvoice())
    dispatch(clearCart())
    removeItem(INITIAL_STORAGE.ttl_gen_qrcode)
    removeItem(INITIAL_STORAGE.payload_checkout)
  }

  const handleErrorApi = (error: AxiosError) => {
    if (error.response?.status === 404) {
      OlToast.error({ description: error.message })
    }
  }

  const handleBack = () => {
    navigate('/menu')
  }

  const handleSetIsQrCodeExp = () => {
    setIsQrCodeExp(true)
  }

  return {
    handleBack,
    isOpenDtm,
    onCloseDtm,
    onOpenDtm,
    isOpenGuide,
    onCloseGuide,
    onOpenGuide,
    handleOnCopyVirtualAccount,
    invoice,
    ttlGenQrCode,
    groupOrderItems,
    getStore,
    isLodingCancelPayment,
    handleCancelPayment,
    isOpenCancelOrder,
    onCloseCancelOrder,
    onOpenCancelOrder,
    navigate,
    isLoadingUpdatePayment,
    getStatusInvoice,
    isQrCodeExp,
    handleSetIsQrCodeExp
  }
}

export default PendingPaymentVirtualAccountModel
