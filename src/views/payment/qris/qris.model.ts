import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import useReloadInvoice from 'src/hooks/useReloadInvoice'
import { clearCart } from 'src/store/cart/cartSlice'

const QrisModel = () => {
  const getSelfOrderId = useAppSelector(state => state.payment.selfOrderId)
  const { isLoading, salesOrderStatus } = useReloadInvoice(getSelfOrderId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [])

  return {
    isLoading,
    salesOrderStatus
  }
}

export default QrisModel
