import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListInvoiceResponse, MetaResponse } from 'src/api/index.type'
import { getListInvoice } from 'src/api/sales.api'
import { INITIAL_STORAGE } from 'src/constant'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import Storage from 'src/utils/storage'
const { getItem } = Storage({})

const OrderListModel = () => {
  const [listInvoice, setListInvoice] = useState<ListInvoiceResponse[] | []>([])
  const [meta, setMeta] = useState<MetaResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const getTable = getItem(INITIAL_STORAGE.tableId, '')

  const handleInfiniteScroll = () => {
    if (meta) {
      if (page < meta.last_page) {
        setPage((old) => old + 1)
      }
    }
  }
  const [refLastInvoice] = useInfiniteScroll(isLoading, handleInfiniteScroll, { threshold: 0 })
  const navigate = useNavigate()

  const fetchListInvoice = async() => {
    try {
      setIsLoading(true)
      const res = await getListInvoice({}, {
        page: page,
        table_id: getTable as number
      })
      if (listInvoice.length > 0) {
        setListInvoice([...listInvoice, ...res.data.data])
      } else {
        setListInvoice(res.data.data)
      }
      setMeta(res.data.meta)
    } catch (error) {
      // console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigateToPayment = (selfSalesOrderId:string) => {
    navigate(`/order-list/${selfSalesOrderId}`)
  }

  useEffect(() => {
    fetchListInvoice()
  }, [page])

  const handleBack = () => {
    navigate('/menu')
  }

  return {
    refLastInvoice,
    listInvoice,
    isLoading,
    handleNavigateToPayment,
    handleBack
  }
}

export default OrderListModel
