import React from 'react'
import classNames from 'classnames/bind'
import styles from './navigationPane.module.scss'
import { Box, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

interface NavigationPaneProps {
  iconLeft?: JSX.Element
  title?: string,
  type?: 'LEFT' | 'RIGHT',
  iconRight?: JSX.Element,
  onClick?: () => void,
  justTitle?: boolean
}

const NavigationPane:React.FC<NavigationPaneProps> = ({ iconLeft, title, type = 'LEFT', iconRight, onClick, justTitle = false }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Box className={cx('nvp-container')}>
      {
        justTitle && (
          <Box className={cx('nvp-el_left')}>
            <Text className={cx('nvp-el_left__text')}>
              { title || 'Title'}
            </Text>
          </Box>
        )
      }
      {
        type === 'LEFT' && !justTitle && (
          <Box className={cx('nvp-el_left')}>
            <Box className={cx('nvp-el_left__icon')} onClick={onClick || handleGoBack}>
              {iconLeft || <Text as="i" className="bx bx-arrow-back"></Text>}
            </Box>
            <Text className={cx('nvp-el_left__text')}>
              { title || 'Title'}
            </Text>
          </Box>
        )
      }
      {
        type === 'RIGHT' && !justTitle && (
          <Box className={cx('nvp-el_right')}>
            <Text className={cx('nvp-el_right__text')}>
              { title }
            </Text>

            <Box className={cx('nvp-el_right__icon')} onClick={onClick || handleGoBack}>
              {iconRight || <Text as="i" display="block" fontSize="2xl" className="bx bx-x"></Text>}
            </Box>
          </Box>
        )
      }
    </Box>
  )
}

export default NavigationPane
