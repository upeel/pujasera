import React from 'react'
import styles from './gridCardCategory.module.scss'
import classNames from 'classnames/bind'
import { AspectRatio, Skeleton, SkeletonText, Text, Image } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface CardCategoryProps {
  name?: string,
  onClick?: () => void,
  img?: string
}

const GridCardCategory = React.forwardRef<HTMLDivElement, CardCategoryProps>(({ name, onClick, img }, ref) => {
  return (
    <div ref={ref} className={cx('grid-card__container')} onClick={onClick}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={16 / 9}>
          <Image src={img} fallbackSrc={`/images/resto_placeholder.png`} className={cx('grid-card__show-img')} alt="Category" />
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <Text className={cx('grid-card__body-name')} noOfLines={2}>{name || 'Ayam & Bebek'}</Text>
      </div>
    </div>
  )
})

export const GridCardCategorySkeleton = () => {
  return (
    <div className={cx('grid-card__container')}>
      <div className={cx('grid-card__show')}>
        <AspectRatio ratio={16 / 9}>
          <Skeleton width="100%" height="80px" rounded="md"/>
        </AspectRatio>
      </div>
      <div className={cx('grid-card__body')}>
        <SkeletonText noOfLines={2}/>
      </div>
    </div>
  )
}

GridCardCategory.displayName = 'GridCardCategory'
export default GridCardCategory
