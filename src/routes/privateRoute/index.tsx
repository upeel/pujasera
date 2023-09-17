import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import fetchInitialStore from 'src/service/fetchTableCheck'
import Storage from 'src/utils/storage'
import { INITIAL_STORAGE } from 'src/constant'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { clearAllStorage } from 'src/helpers/clearStorage'
import { setStatusAuth } from 'src/store/auth/authSlice'
import LoadingScreen from 'src/components/loadingScreen'
import { useAppDispatch } from 'src/hooks/useActionStore'
const { getItem } = Storage({})
const cookies = new Cookies()

const PrivateRoute = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const getStoreId = getItem(INITIAL_STORAGE.storeId, '')
  const getTableId = getItem(INITIAL_STORAGE.tableId, '')
  const accessToken = cookies.get(INITIAL_STORAGE.accessToken)
  const [successGetStore, setSuccessGetStore] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isScanQr, setIsScanQr] = useState<boolean>(true)

  useEffect(() => {
    handleFetchInitStore()
  }, [])

  const handleFetchInitStore = async() => {
    if (!getStoreId && !getStoreId) {
      clearAllStorage()
      setIsScanQr(false)
      return
    }
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
      setSuccessGetStore(true)
      if (accessToken) {
        setIsLoggedIn(true)
        dispatch(setStatusAuth('signin'))
      }
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

  if (!isScanQr) {
    return <Navigate to="/scan-qr" state={{ notFound: false }}/>
  }

  if (successGetStore && isScanQr) {
    if (isLoggedIn) {
      return <Navigate to="/menu" />
    }
    return <Outlet/>
  }
  return <></>
}

export default PrivateRoute
