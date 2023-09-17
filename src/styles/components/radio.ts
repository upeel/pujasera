import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const RadioCustomStyleConfig :ComponentStyleConfig = {
  parts: ['label', 'control'],
  baseStyle: (props: StyleFunctionProps) => ({
    control: {
      _checked: {
        transition: 'all .3s ease',
        _hover: {
          background: props.theme.colors.white,
          _before: {
            background: props.theme.colors[props.colorScheme][600]
          }
        },
        background: props.theme.colors.white,
        _before: {
          w: '80%',
          h: '80%',
          background: props.theme.colors[props.colorScheme][500]
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
export default RadioCustomStyleConfig
