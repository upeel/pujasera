import { useDisclosure } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { detailInvoiceApi } from 'src/api/sales.api'
import { INITIAL_STORAGE } from 'src/constant'
import { OlToast } from 'src/helpers/toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { getGroupOrderItems, setInvoice } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
const { getItem } = Storage({})

const PendingPaymentEwalletModel = () => {
  const navigate = useNavigate()
  const { isOpen: isOpenDtm, onClose: onCloseDtm, onOpen: onOpenDtm } = useDisclosure()
  const invoice = useAppSelector(state => state.payment.invoice)
  const ttlGenQrCode = getItem(INITIAL_STORAGE.ttl_gen_qrcode, '')
  const groupOrderItems = useAppSelector(state => getGroupOrderItems(state.payment))
  const getStore = useAppSelector(state => state.app.store)
  const dispatch = useAppDispatch()
  const [isQrCodeExp, setIsQrCodeExp] = useState<boolean>(false)
  const getSelfOrderId = useAppSelector(state => state.payment.selfOrderId)
  const [isLoadingUpdatePayment, setIsLoadingUpdatePayment] = useState<boolean>(false)

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
    invoice,
    ttlGenQrCode,
    groupOrderItems,
    getStore,
    navigate,
    isLoadingUpdatePayment,
    getStatusInvoice,
    isQrCodeExp,
    handleSetIsQrCodeExp
  }
}

export default PendingPaymentEwalletModel
