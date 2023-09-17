import { useParams } from 'react-router-dom'
import useReloadInvoice from 'src/hooks/useReloadInvoice'

const OrderDetailModel = () => {
  const { id: getSelfOrderId } = useParams()
  const { isLoading, salesOrderStatus } = useReloadInvoice(getSelfOrderId as string)

  return {
    isLoading,
    salesOrderStatus
  }
}

export default OrderDetailModel
