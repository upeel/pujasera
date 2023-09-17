import { Box, Button, ButtonProps, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import Modal from 'src/components/modal'

interface ModalAlertProps {
  title?: string
  description?: string,
  showCancelButton?: boolean
  confirmButtonText?: string,
  cancelButtonText?: string,
  onConfirm?: () => void,
  onCancel?: () => void
  isOpen?: boolean,
  disabledBtnCancel?: boolean,
  disabledBtnConfirm?: boolean,
  loadingBtnCancel?: boolean,
  loadingBtnConfirm?: boolean,
  buttonCancelStyle?: ButtonProps,
  buttonConfirmStyle?: ButtonProps,
}
const ModalAlert:React.FC<ModalAlertProps> = ({
  description,
  confirmButtonText = 'Ya!',
  cancelButtonText = 'Keluar',
  onConfirm,
  onCancel = () => console.log(''),
  isOpen = false,
  showCancelButton = false,
  disabledBtnCancel = false,
  disabledBtnConfirm = false,
  loadingBtnCancel = false,
  loadingBtnConfirm = false,
  buttonCancelStyle,
  buttonConfirmStyle = {
    colorScheme: 'ol_red'
  },
  title
}) => {
  return (
    <Modal
      isOpen={isOpen}
      isCentered
      onClose={onCancel}
      showCloseButton={false}
      withHeader={false}
      modalContent={{ marginX: '4' }}
    >
      <Box py="6">
        {
          title ? <Text fontSize="lg" align="center" fontWeight="semibold">{title}</Text> : null
        }
        {
          description ? <Text align="center" marginTop="2">{description}</Text> : null
        }
      </Box>
      <HStack paddingBottom="2">
        {
          showCancelButton &&
          <Button
            width="full"
            {...buttonCancelStyle}
            backgroundColor="white"
            boxShadow="md"
            onClick={onCancel}
            disabled={disabledBtnCancel}
            isLoading={loadingBtnCancel}
            whiteSpace={'pre-wrap'}
            height="full"
            py="3"
          >
            {cancelButtonText}
          </Button>
        }
        <Button
          width="full"
          {...buttonConfirmStyle}
          onClick={onConfirm}
          disabled={disabledBtnConfirm}
          isLoading={loadingBtnConfirm}
          whiteSpace={'pre-wrap'}
          height="full"
          py="3"
        >
          {confirmButtonText}
        </Button>
      </HStack>
    </Modal>
  )
}

export default ModalAlert
