import React, { useLayoutEffect, useRef } from 'react'
import useNetworkStatus from 'src/hooks/useNetworkStatus'
import { OlToast, ToastFire } from 'src/helpers/toast'

export const CheckNetwork = () => {
  const { isNetworkOnline } = useNetworkStatus()
  const idToastNetwork = useRef<any>(null)

  useLayoutEffect(() => {
    if (!isNetworkOnline) {
      idToastNetwork.current = OlToast.loading({ description: 'Upps.., tidak ada jaringan.', duration: null })
    } else {
      ToastFire.update(idToastNetwork.current, {
        status: 'success',
        description: 'Anda kembali terhubung.',
        variant: 'ol_toast',
        duration: 1000
      })
    }
  }, [isNetworkOnline])

  return <></>
}
