import React from 'react'
import styles from './gridCardProduct.module.scss'
import classNames from 'classnames/bind'
import { AspectRatio, Box, forwardRef, Image, Skeleton, SkeletonText, Text } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface GridCardProductProps {
  name: string,
  img?: string,
  price?: string,
  qtyInCart?: number,
  isOutStock?: boolean,
  openMenu?: () => void
}
const GridCardProduct = forwardRef<GridCardProductProps, 'a'>(({ name, img, price, qtyInCart = 0, isOutStock = true, openMenu }, ref) => {
  return (
    <Box ref={ref} onClick={openMenu} className={cx('grid-card__container', { outOfStock: isOutStock, qtyInCart: qtyInCart > 0 })}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={1}>
          <Image src={img} fallbackSrc={'/images/menu_placeholder.png'} className={cx('grid-card__show-img')} alt={name} />
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <Text className={cx('grid-card__body-name')} noOfLines={2}>
          { qtyInCart > 0 ? `${qtyInCart}x ${name}` : name }
        </Text>
        <Text className={cx('grid-card__body-price')}>
          { isOutStock ? 'Stok habis' : price || 0 }
        </Text>
      </div>
    </Box>
  )
})

GridCardProduct.displayName = 'GridCardProduct'

export const GridCardProductSkeleton = () => {
  return (
    <Box className={cx('grid-card__container')}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={1}>
          <Skeleton width="100%" height="100%" rounded="md"/>
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <SkeletonText noOfLines={2} />
        <Skeleton width="80%" height="3"/>
      </div>
    </Box>
  )
}

export default GridCardProduct
