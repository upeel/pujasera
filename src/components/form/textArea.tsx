import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Textarea,
  TextareaProps,
  BoxProps,
  FormControlProps,
  FormErrorMessageProps
} from '@chakra-ui/react'

interface TextAreaProps extends TextareaProps {
  isError?: boolean,
  errorMessage?: string,
  formHelperTextOption?: BoxProps,
  helperText?: string,
  labelText?: string,
  labelOption?: FormLabelProps,
  formControlOption?: FormControlProps,
  formErrorMessageOption?: FormErrorMessageProps,
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  isError,
  errorMessage,
  formHelperTextOption,
  helperText,
  labelText,
  labelOption,
  formControlOption,
  formErrorMessageOption,
  ...others
}, ref) => {
  return (
    <>
      <FormControl isInvalid={isError} {...formControlOption}>
        {
          labelText && <FormLabel {...labelOption}>{labelText}</FormLabel>
        }
        <Textarea {...others} ref={ref}/>
        {
          !isError && helperText && (
            <FormHelperText {...formHelperTextOption}>{helperText}</FormHelperText>
          )
        }
        {isError && (
          <FormErrorMessage {...formErrorMessageOption}>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    </>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
