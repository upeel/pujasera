import {
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ModalChakraProps,
  ModalContentProps as ModalContentChakraProps,
  ModalFooter,
  ModalOverlayProps as ModalOverlayChakraProps,
  ModalFooterProps as ModalFooterChakraProps,
  ModalHeaderProps as ModalHeaderChakraProps,
  ModalBodyProps as ModalBodyChakraProps
} from '@chakra-ui/react'
import React from 'react'

interface ModalProps extends ModalChakraProps {
  modalContent?: ModalContentChakraProps,
  withFooter?: boolean,
  withOverlay?: boolean,
  footerChildren?: React.ReactNode,
  title?: string,
  withHeader?: boolean,
  modalOverlay?: ModalOverlayChakraProps,
  modalFooter?: ModalFooterChakraProps,
  modalHeader?: ModalHeaderChakraProps,
  children: React.ReactNode,
  modalBody?: ModalBodyChakraProps
  showCloseButton?: boolean,
  withModalBody?: boolean,
  customElementHeader?: () => React.ReactElement
}

const Modal:React.FC<ModalProps> = ({
  withFooter,
  withOverlay,
  footerChildren,
  withHeader = true,
  title,
  children,
  modalContent,
  modalOverlay,
  modalFooter,
  modalHeader,
  modalBody,
  showCloseButton = true,
  customElementHeader,
  withModalBody = true,
  ...modal
}) => {
  return (
    <ModalChakra autoFocus={false} returnFocusOnClose={false} {...modal}>
      {
        withOverlay && <ModalOverlay/>
      }
      <ModalOverlay {...modalOverlay}/>
      <ModalContent {...modalContent}>
        {
          customElementHeader && !withHeader && customElementHeader()
        }
        {
          withHeader && (
            <ModalHeader {...modalHeader}>{title}</ModalHeader>
          )
        }
        {
          showCloseButton && <ModalCloseButton />
        }
        {
          withModalBody
            ? <ModalBody {...modalBody}>
              {children}
            </ModalBody>
            : <>{ children }</>
        }
        {
          withFooter && (
            <ModalFooter {...modalFooter}>
              {footerChildren}
            </ModalFooter>
          )
        }
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
