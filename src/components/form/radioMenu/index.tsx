import React from 'react'
import { HStack, Image, Radio, RadioProps, Text } from '@chakra-ui/react'
import styles from './radioMenu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface RadioMenuProps extends RadioProps {
  img?: string,
  productName: string,
  isOutOfStock?: boolean
}

const RadioMenu:React.FC<RadioMenuProps> = ({ img, productName, isOutOfStock, ...others }) => {
  return (
    <label className={cx('ol-radio-menu', { active: others.isChecked, outOfStock: isOutOfStock })}>
      <HStack className={cx('ol-radio-menu__left')}>
        <Image className={cx('ol-radio-menu__img')} src={img} fallbackSrc={'/images/menu_placeholder.png'}/>
        <Text noOfLines={2} className={cx('ol-radio-menu__product')}>{productName}</Text>
      </HStack>

      <HStack className={cx('ol-radio-menu__right')}>
        {
          isOutOfStock && <Text className={cx('ol-radio-menu__otfStock')}>Stock habis</Text>
        }
        <Radio isDisabled={isOutOfStock} size="xl" {...others}/>
      </HStack>
    </label>

  )
}

export default RadioMenu
