import React from 'react'
import classNames from 'classnames/bind'
import styles from './listProduct.module.scss'
import { Box, forwardRef, Image, Skeleton, SkeletonText, Text } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface ListCardProductProps {
  name: string,
  img?: string,
  price?: string,
  qtyInCart?: number,
  isOutStock?: boolean,
  openMenu?: () => void
}
const ListCardProduct = forwardRef<ListCardProductProps, 'a'>(({ img, name, price, qtyInCart = 0, isOutStock = true, openMenu }, ref) => {
  return (
    <Box ref={ref} onClick={openMenu} className={cx('list-card__container', { outOfStock: isOutStock, qtyInCart: qtyInCart > 0 })}>
      <Box className={cx('list-card__inner')}>
        <div className={cx('list-card__show')}>
          <Image src={img} fallbackSrc={'/images/menu_placeholder.png'} className={cx('list-card__show-img')} alt={name} />
        </div>
        <div className={cx('list-card__body')}>
          <Text className={cx('list-card__body-name')} noOfLines={2}>
            { qtyInCart > 0 ? `${qtyInCart}x ${name}` : name }
          </Text>
          <Text className={cx('list-card__body-price')}>
            { isOutStock ? 'Stok habis' : price || 0}
          </Text>
        </div>
      </Box>
    </Box>
  )
})

export const ListCardProductSkeleton = () => {
  return (
    <Box className={cx('list-card__container')}>
      <Box className={cx('list-card__inner')}>
        <div className={cx('list-card__show')}>
          <Skeleton className={cx('list-card__show-img')} />
        </div>
        <div className={cx('list-card__body')}>
          <SkeletonText noOfLines={2} width="100%"/>
          <SkeletonText noOfLines={1} width="50px" marginTop="2"/>
        </div>
      </Box>
    </Box>
  )
}

export default ListCardProduct
