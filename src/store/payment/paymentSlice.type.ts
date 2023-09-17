import { InvoiceResponse, OrderStatus } from 'src/api/index.type'

export interface InitialState {
  invoice: null | InvoiceResponse,
  isHavePayment: boolean,
  selfOrderId: string,
  ttlQrCode: number,
  isGenInCheckout: boolean,
  selfSalesStatus: OrderStatus,
  salesOrderStatus: OrderStatus
}
