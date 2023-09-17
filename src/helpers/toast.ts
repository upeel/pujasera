import { UseToastOptions, createStandaloneToast } from '@chakra-ui/react'
const { ToastContainer: ToastContainerChakra, toast: ToastChakra } = createStandaloneToast()
export const ToastContainer = ToastContainerChakra
export const ToastFire = ToastChakra

const ToastFireFactory = (options?:UseToastOptions) => {
  return ToastFire({
    position: 'top',
    duration: 1500,
    isClosable: true,
    variant: 'ol_toast',
    ...options
  })
}

const ToastFireInfo = (options:UseToastOptions) => {
  return ToastFireFactory({
    status: 'info',
    ...options
  })
}

const ToastFireSuccess = (options:UseToastOptions) => {
  return ToastFireFactory({
    status: 'success',
    ...options
  })
}

const ToastFireWarning = (options:UseToastOptions) => {
  return ToastFireFactory({
    status: 'warning',
    ...options
  })
}

const ToastFireLoading = (options:UseToastOptions) => {
  return ToastFireFactory({
    status: 'loading',
    ...options
  })
}

export const ToastFireError = (options:UseToastOptions) => {
  return ToastFireFactory({
    title: 'opps! something went wrong.',
    status: 'error',
    duration: 5000,
    ...options
  })
}

export const OlToast = {
  info: ToastFireInfo,
  success: ToastFireSuccess,
  warning: ToastFireWarning,
  loading: ToastFireLoading,
  error: ToastFireError
}
