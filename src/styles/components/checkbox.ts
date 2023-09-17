import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const CheckboxCustomStyleConfig :ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    control: {
      borderRadius: 5,
      _checked: {
        bg: props.theme.colors.white,
        color: props.theme.colors[props.colorScheme][500],
        fontSize: 'xs',
        _hover: {
          bg: props.theme.colors.white,
          color: props.theme.colors[props.colorScheme][600]
        }
      }
    }
  }),
  sizes: {
    xl: {
      control: {
        w: 6,
        h: 6
      }
    },
    '2xl': {
      control: {
        w: 7,
        h: 7
      }
    }
  },
  defaultProps: {
    colorScheme: 'ol_blue'
  }
}
export default CheckboxCustomStyleConfig
