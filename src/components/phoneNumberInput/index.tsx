import React from 'react'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
import PhoneInput, { Props, DefaultInputComponentProps } from 'react-phone-number-input'
import classNames from 'classnames'

interface PhoneNumberInputProps extends Props<DefaultInputComponentProps> {
  isError?: boolean,
  errorMessage?: string,
  formHelperText?: string,
  label?: string
}

const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(({
  isError,
  errorMessage,
  formHelperText,
  label,
  ...other
}, ref) => {
  return (
    <>
      <FormControl isInvalid={isError}>
        {
          label && <FormLabel>{label}</FormLabel>
        }
        <PhoneInput
          international
          defaultCountry="ID"
          countryCallingCodeEditable={false}
          className={classNames('phone-input_container')}
          inputComponent={InputCustomForPhoneInput}
          {...other}
        />
        {
          !isError && formHelperText && (
            <FormHelperText>{formHelperText}</FormHelperText>
          )
        }
        {isError && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    </>
  )
})

PhoneNumberInput.displayName = 'PhoneNumberInput'

export default PhoneNumberInput

const InputCustomForPhoneInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input ref={ref} paddingInlineStart="16" {...props}/>
})
InputCustomForPhoneInput.displayName = 'InputCustomForPhoneInput'
