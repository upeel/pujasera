import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingScreen from 'src/components/loadingScreen'
import { INITIAL_STORAGE } from 'src/constant'
import { clearAllStorage } from 'src/helpers/clearStorage'
import { useAppDispatch } from 'src/hooks/useActionStore'
import fetchInitialStore from 'src/service/fetchTableCheck'
import { setStatusAuth } from 'src/store/auth/authSlice'
import Storage from 'src/utils/storage'
const cookies = new Cookies()
const { getItem } = Storage({})

const AuthRoute = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const accessToken = cookies.get(INITIAL_STORAGE.accessToken)
  const getStoreId = getItem(INITIAL_STORAGE.storeId, '')
  const getTableId = getItem(INITIAL_STORAGE.tableId, '')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!getStoreId && !getStoreId) {
      clearAllStorage()
      navigate('/scan-qr')
    }
    if (!accessToken) {
      navigate('/')
    }
    handleFetchInitStore()
  }, [])

  const handleFetchInitStore = async() => {
    try {
      await fetchInitialStore({
        store_id: getStoreId,
        table_id: getTableId,
        isScanQr: false,
        config: {
          raw: false,
          silent: true
        }
      })
      dispatch(setStatusAuth('signin'))
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

  if (isLoading) return <LoadingScreen/>

  return <Outlet />
}

export default AuthRoute
