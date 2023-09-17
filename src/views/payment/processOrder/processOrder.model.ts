
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import useReloadInvoice from 'src/hooks/useReloadInvoice'
import { getStoreState } from 'src/store/app/appSlice'
import { getGroupOrderItems, removeSelfOrderId } from 'src/store/payment/paymentSlice'

const ProcessOrderModel = () => {
  const groupOrderItems = useAppSelector(state => getGroupOrderItems(state.payment))
  const getStore = useAppSelector(state => getStoreState(state.app))
  const selfSalesStatus = useAppSelector(state => state.payment.invoice?.order_datail.self_sales_order_status)
  const salesOrderStatus = useAppSelector(state => state.payment.invoice?.order_datail.sales_order_status)
  const invoice = useAppSelector(state => state.payment.invoice)
  const navigate = useNavigate()
  const getSelfOrderId = useAppSelector(state => state.payment.selfOrderId)
  const dispatch = useAppDispatch()
  useReloadInvoice(getSelfOrderId, true)

  const backToMenu = () => {
    navigate('/menu')
  }

  useEffect(() => {
    if (invoice?.order_datail.sales_order_status === 'Z' || invoice?.order_datail.sales_order_status === 'X') {
      dispatch(removeSelfOrderId())
      return () => {
        dispatch(removeSelfOrderId())
      }
    }
  }, [])

  return {
    groupOrderItems,
    getStore,
    selfSalesStatus,
    salesOrderStatus,
    invoice,
    backToMenu
  }
}

export default ProcessOrderModel
