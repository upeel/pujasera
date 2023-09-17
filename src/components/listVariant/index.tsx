import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'
import styles from './listVariant.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ListVariantProps {
  img?: string,
  productName: string,
  isOutStock?: boolean
}

const ListVariant:React.FC<ListVariantProps> = ({ img, productName, isOutStock }) => {
  return (
    <label className={cx('ol-radio-menu', { isOutStock })}>
      <HStack className={cx('ol-radio-menu__left')}>
        <Image className={cx('ol-radio-menu__img')} src={img} fallbackSrc={'/images/menu_placeholder.png'}/>
        <Text noOfLines={2} className={cx('ol-radio-menu__product')}>{productName}</Text>
      </HStack>
      {
        isOutStock ? <Text fontSize="sm" color="ol_red.500">Stok habis</Text> : null
      }
    </label>
  )
}

export default ListVariant
