import React from 'react'
import { HStack, IconButton, Text, useNumberInput } from '@chakra-ui/react'

interface CounterProps {
  max?:number,
  min?:number,
  value?:number,
  isDisabled?: boolean,
  onChange?: (e: string | number) => void
}
const Counter = React.forwardRef<HTMLDivElement, CounterProps>(({ max, min, value, isDisabled, onChange }, ref) => {
  const { getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } = useNumberInput({
    value,
    min: min || 0,
    max: max,
    onChange: onChange,
    isDisabled
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()

  return (
    <HStack spacing="4">
      <IconButton
        backgroundColor="white"
        boxShadow="md"
        fontSize="2xl"
        icon={<i className="bx bx-minus"></i>}
        aria-label="decrease"
        {...dec}
      />
      <Text>{valueAsNumber}</Text>
      <IconButton
        backgroundColor="white"
        boxShadow="md"
        fontSize="2xl"
        icon={<i className="bx bx-plus"></i>}
        aria-label="Increase"
        {...inc}
      />
    </HStack>
  )
})

Counter.displayName = 'Counter'

export default Counter
