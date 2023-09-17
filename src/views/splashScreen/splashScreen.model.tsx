import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useActionStore'
import fetchInitialStore from 'src/service/fetchTableCheck'
import { getStoreState } from 'src/store/app/appSlice'
import { clearAllStorage } from 'src/helpers/clearStorage'

const SplashScreenModel = () => {
  const { store_id, table_id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const storeTableCheck = useAppSelector(state => getStoreState(state.app))
  const navigate = useNavigate()

  useEffect(() => {
    // Clear Storage
    clearAllStorage()
    // End ClearStorage
    getInitialStore()
  }, [])

  const getInitialStore = async() => {
    try {
      await fetchInitialStore({
        store_id: store_id as string,
        table_id: table_id as string,
        isScanQr: true,
        config: {
          raw: false,
          silent: true
        }
      })
      window.location.href = '/'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            navigate('/scan-qr', { state: { notFound: true }})
          }
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    storeTableCheck
  }
}

export default SplashScreenModel
