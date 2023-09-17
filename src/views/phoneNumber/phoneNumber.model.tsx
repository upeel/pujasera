import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginApiBody } from 'src/api/index.type'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { getLoadingTableCheckState, getStoreState, getTableState } from 'src/store/app/appSlice'
import { loginAPI } from 'src/api/auth.api'
import Storage from 'src/utils/storage'
import { setStatusAuth } from 'src/store/auth/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Cookies } from 'react-cookie'
import { INITIAL_STORAGE } from 'src/constant'
import { OlToast } from 'src/helpers/toast'
const { setItem } = Storage({})
const cookie = new Cookies()

const schemaForm = yup.object().shape({
  phone: yup
    .string()
    .nullable()
    .required('Nomor hp wajib diisi!')
    .test('phone-number', 'Nomor hp anda tidak valid', (value) => value ? isValidPhoneNumber(value) : false)
})

const PhoneNumberModel = () => {
  const tableState = useAppSelector(state => getTableState(state.app))
  const storeState = useAppSelector(state => getStoreState(state.app))
  const { handleSubmit, formState, control } = useForm<LoginApiBody>({
    resolver: yupResolver(schemaForm)
  })
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const loadingTableCheck = useAppSelector((state) => getLoadingTableCheckState(state.app))

  const onSubmit:SubmitHandler<LoginApiBody> = async(data) => {
    if (!storeState.id) return
    try {
      setIsLoading(true)
      const res = await loginAPI({
        phone: data.phone,
        store_id: storeState.id
      })
      dispatch(setStatusAuth('signin'))
      setItem(INITIAL_STORAGE.initToken, {
        token_type: res.data.token_type,
        expires_in: res.data.expires_in,
        refresh_token: res.data.refresh_token
      })
      cookie.set(INITIAL_STORAGE.accessToken, res.data.access_token, { path: '/', maxAge: res.data.expires_in })
      navigate('/menu')
      OlToast.success({ description: 'Berhasil masuk.' })
    } catch (error) {
      // console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSubmit,
    formState,
    control,
    onSubmit,
    tableState,
    storeState,
    isLoading,
    loadingTableCheck
  }
}

export default PhoneNumberModel
