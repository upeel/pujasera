import React from 'react'
import { Badge, Box, HStack, Switch, Text, VStack } from '@chakra-ui/react'

interface ListItemOrderProps {
  id?: number,
  isProcessCheckout?: boolean,
  name: string,
  price: string | number,
  additional?: string,
  notes?: string,
  isTakeAway?: boolean,
  totalItem: string | number,
  onUpdate?: () => void,
  onUpdateRemark?: (id: number, value: boolean) => void,
  remark?: boolean,
}

const ListItemOrder:React.FC<ListItemOrderProps> = ({
  id = 0,
  isProcessCheckout,
  name,
  price,
  additional,
  notes,
  isTakeAway,
  totalItem,
  onUpdate,
  remark,
  onUpdateRemark
}) => {
  return (
    <HStack borderBottom="1px solid #cecece" paddingY="3" alignItems="flex-start">
      <Text color="ol_blue.500" fontWeight="medium">{totalItem}x</Text>
      <Box flex="1">
        <Text>{name}</Text>
        <Text fontWeight="bold" marginTop="2">{price}</Text>
        {
          additional && <Text marginTop="3" fontSize="sm" color="ol_green.500">{additional}</Text>
        }
        <HStack marginTop="2" color="#767676">
          <Text fontSize="xl" display="inline-flex"><i className="bx bx-note"></i></Text>
          <Text fontSize="sm">{notes || 'Tidak ada catatan'}</Text>
        </HStack>
        {
          isProcessCheckout && (
            <Box marginTop="4">
              <button
                className="ol-btn-link"
                onClick={onUpdate}
              >
              Ubah
              </button>
            </Box>
          )
        }
      </Box>
      <VStack alignItems="center">
        {
          isProcessCheckout && (
            <>
              <Switch defaultValue={Number(remark)} onChange={(e) => {
                if (onUpdateRemark) {
                  onUpdateRemark(id, e.target.checked)
                }
              }} isChecked={remark} colorScheme="ol_blue" size="md"/>
              <Text fontSize="sm">Take away</Text>
            </>
          )
        }
        {
          !isProcessCheckout && isTakeAway && (
            <Badge textTransform="initial">Take away</Badge>
          )
        }
      </VStack>
    </HStack>
  )
}

export default React.memo(ListItemOrder)
