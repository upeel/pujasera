import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const AlertCustomStyleConfig :ComponentStyleConfig = {
  variants: {
    ol_toast: (props: StyleFunctionProps) => {
      return {
        container: {
          color: () => {
            if (props.status === 'error') {
              return 'ol_red.500'
            }
            if (props.status === 'success') {
              return 'ol_green.500'
            }
            if (props.status === 'info') {
              return 'ol_blue.500'
            }
            if (props.status === 'warning') {
              return 'ol_orange.500'
            }
            if (props.status === 'loading') {
              return 'ol_blue.500'
            }
          },
          bg: () => {
            if (props.status === 'error') {
              return 'ol_red.50'
            }
            if (props.status === 'success') {
              return 'ol_green.50'
            }
            if (props.status === 'info') {
              return 'ol_blue.50'
            }
            if (props.status === 'warning') {
              return 'ol_orange.50'
            }
            if (props.status === 'loading') {
              return 'ol_blue.50'
            }
          }
        }
      }
    }
  }
}
export default AlertCustomStyleConfig
