import { ComponentStyleConfig } from '@chakra-ui/react'

const ModalCustomStyleConfig :ComponentStyleConfig = {
  baseStyle: {
    dialogContainer: {
      '@supports(height: -webkit-fill-available)': {},
      height: '100%'
    }
  }
}

export default ModalCustomStyleConfig
