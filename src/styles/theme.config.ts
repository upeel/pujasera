import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import AlertCustomStyleConfig from './components/alert'
import CheckboxCustomStyleConfig from './components/checkbox'
import RadioCustomStyleConfig from './components/radio'

const styles = {
  global: {
    body: {
      fontFamily: `'Nunito', sans-serif`,
      color: '#272727'
    }
  }
}

const colors = {
  ol_green: {
    '50': '#E9FBE9',
    '100': '#C2F4C2',
    '200': '#9CED9C',
    '300': '#75E675',
    '400': '#4EDF4E',
    '500': '#1FAD1F',
    '600': '#178217',
    '700': '#105710',
    '800': '#082B08',
    '900': '#082B08'
  },
  ol_blue: {
    '50': '#E5F4FF',
    '100': '#B8E1FF',
    '200': '#8ACEFF',
    '300': '#5CBBFF',
    '400': '#2EA8FF',
    '500': '#0078CE',
    '600': '#006bb7',
    '700': '#005999',
    '800': '#003B66',
    '900': '#001E33'
  },
  ol_orange: {
    '50': '#FFF3E5',
    '100': '#FFDDB8',
    '200': '#FFC78A',
    '300': '#FFB15C',
    '400': '#FF9B2E',
    '500': '#FF931E',
    '600': '#CC6A00',
    '700': '#995000',
    '800': '#663500',
    '900': '#331B00'
  },
  ol_red: {
    '50': '#FEE8E7',
    '100': '#FBC0BB',
    '200': '#F99790',
    '300': '#F76E64',
    '400': '#F44639',
    '500': '#F44336',
    '600': '#C1170B',
    '700': '#911108',
    '800': '#610C05',
    '900': '#300603'
  }
}

const fonts = {
  body: `'Nunito',sans-serif`,
  heading: 'Nunito,sans-serif'
}

const config:ThemeConfig = {
  cssVarPrefix: 'olsera',
  initialColorMode: 'light',
  useSystemColorMode: false
}

const shadows = {
  invertLg: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)'
}

const components = {
  Radio: RadioCustomStyleConfig,
  Checkbox: CheckboxCustomStyleConfig,
  Alert: AlertCustomStyleConfig
}

export const paddingContainer = '1rem'
export const paddingContainerChakra = '4'

export const customTheme = extendTheme({
  config,
  components,
  styles,
  colors,
  shadows,
  fonts
})
