import React from 'react'
import { HStack, Input, InputGroup, InputLeftElement, InputProps, InputRightElement, Text } from '@chakra-ui/react'

interface StandAloneInputSearchProps extends InputProps {
  onClear?: () => void
  clearable?: boolean,
}
const StandAloneInputSearch:React.FC<StandAloneInputSearchProps> = ({ onClear, clearable = true, ...others }) => {
  return (
    <HStack width="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none" fontSize="2xl">
          <i className="bx bx-search"></i>
        </InputLeftElement>
        <Input type="text" placeholder="Cari" borderRadius="full" {...others}/>
        {
          clearable ? <InputRightElement onClick={onClear}>
            <Text as="i" fontSize="3xl" className="bx bx-x" color="#767676" cursor="pointer"></Text>
          </InputRightElement> : null
        }
      </InputGroup>
    </HStack>

  )
}

export default StandAloneInputSearch
