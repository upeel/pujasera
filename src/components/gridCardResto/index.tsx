import React from 'react'
import styles from './gridCardResto.module.scss'
import classNames from 'classnames/bind'
import { AspectRatio, Image, Skeleton, SkeletonText, Text } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface GridCardRestoProps {
  name?: string,
  img?: string,
  onClick?: () => void
}
const GridCardResto = React.forwardRef<HTMLDivElement, GridCardRestoProps>(({ name, img, onClick }, ref) => {
  return (
    <div ref={ref} className={cx('grid-card__container')} onClick={onClick}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={1} w="100%" height="100%">
          <Image src={img} fallbackSrc={'/images/resto_placeholder.png'} className={cx('grid-card__show-img')} alt="resto" />
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <Text className={cx('grid-card__body-name')} noOfLines={2}>{name || 'Tenant Foodcourt'}</Text>
      </div>
    </div>
  )
})

export const GridCardRestoSkeleton = () => {
  return (
    <div className={cx('grid-card__container')}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={1}>
          <Skeleton width="100%" height="100%" rounded="md"/>
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <SkeletonText noOfLines={2} />
      </div>
    </div>
  )
}

GridCardResto.displayName = 'GridCardResto'
export default GridCardResto
