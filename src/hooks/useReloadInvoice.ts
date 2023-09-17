import axios from 'axios'
import { useEffect, useState } from 'react'
import { detailInvoiceApi } from 'src/api/sales.api'
import { INITIAL_STORAGE } from 'src/constant'
import { OlToast } from 'src/helpers/toast'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { setInvoice, setIsGenInCheckout } from 'src/store/payment/paymentSlice'
import Storage from 'src/utils/storage'
const { setItem } = Storage({})

const useReloadInvoice = (selfOrderId:string, isInterval = false) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const isGenInCheckout = useAppSelector(state => state.payment.isGenInCheckout)
  const salesOrderStatus = useAppSelector(state => state.payment.invoice?.order_datail?.sales_order_status)
  const invoice = useAppSelector(state => state.payment.invoice)

  useEffect(() => {
    if (!isInterval) {
      if (!isGenInCheckout) {
        handleReloadInvoice()
      } else {
        setIsLoading(false)
      }
      return () => {
        dispatch(setIsGenInCheckout(false))
      }
    }
  }, [])

  useEffect(() => {
    if (isInterval) {
      if (invoice?.order_datail.sales_order_status === 'A') {
        const intervalInvoice = setInterval(() => {
          handleReloadInvoice()
        }, 60000 * 0.3)
        return () => {
          clearInterval(intervalInvoice)
        }
      }
    }
  }, [isInterval, invoice])

  const handleReloadInvoice = async() => {
    try {
      const res = await detailInvoiceApi({}, selfOrderId)
      dispatch(setInvoice(res.data.data))
      const expTime = res.data.data.qr_expired_time * 1000
      setItem(INITIAL_STORAGE.ttl_gen_qrcode, expTime)
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

  return {
    isLoading,
    salesOrderStatus
  }
}

export default useReloadInvoice
