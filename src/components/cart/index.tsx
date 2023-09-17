import React from 'react'
import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import FloatingBottomContainer from '../floatingBottomContainer'
import { formatCurrency } from 'src/utils/formatNumber'
import MainContainer from '../container'

interface CartProps {
  totalItem?: number | string,
  totalOrder?: number | string,
  onCheckout?: () => void
}
const Cart:React.FC<CartProps> = ({ totalItem, totalOrder, onCheckout }) => {
  return (
    <FloatingBottomContainer
      as={motion.div}
      position="fixed"
      backgroundColor="white"
      width="100%"
      bottom={0}
      left={0}
      boxShadow="invertLg"
      py="2"
      initial={{ y: 100 }}
      animate={{ y: 0, transition: { type: 'spring' }}}
      exit={{ y: 100 }}
    >
      <MainContainer>
        <HStack justifyContent="space-between" className="container-with-px">
          <Stack spacing="0">
            <Text color="gray" fontSize="xs">{totalItem || '0'} item</Text>
            <Text fontWeight="medium">{formatCurrency(totalOrder || 0)}</Text>
          </Stack>
          <Button
            colorScheme="ol_green"
            rightIcon={
              <Text fontSize="2xl" display="inline-flex">
                <i className="bx bx-right-arrow-alt"></i>
              </Text>
            }
            onClick={onCheckout}
          >
          Checkout
          </Button>
        </HStack>
      </MainContainer>
    </FloatingBottomContainer>
  )
}

export default Cart
