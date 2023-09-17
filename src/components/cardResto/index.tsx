import React from 'react'
import classNames from 'classnames/bind'
import styles from './cardResto.module.scss'
import { Image, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface CardRestoProps {
  name?: string,
  img?: string,
  selected: boolean
  onClick?: () => void,
  badge?: number
}
const CardResto = React.forwardRef<HTMLDivElement, CardRestoProps>(({ name, img, selected, onClick = () => console.log('click'), badge }, ref) => {
  return (
    <div ref={ref} className={cx('card-container', { focus: selected })} onClick={() => {
      if (!selected) {
        if (onClick) {
          onClick()
        }
      }
    }}>
      {
        (badge && badge > 0) ? <div className={cx('badge-notif', 'card-notif')}>{badge}</div> : ''
      }
      <div className={cx('card-header')}>
        <Image className={cx('card-header__img')} src={img} fallbackSrc="/images/resto_placeholder.png"/>
      </div>
      <div className={cx('card-body')}>
        <Text noOfLines={2} className={cx('card-body__name')}>{name || 'Tenant Foodcourt'}</Text>
      </div>
    </div>
  )
})

export const CardRestoSkeleton = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Stack className={cx('card-container')} ref={ref} spacing="4" alignItems="center">
      <SkeletonCircle size={'70'} />
      <SkeletonText noOfLines={2} spacing="1" width="full" />
    </Stack>
  )
})
CardRestoSkeleton.displayName = 'CardRestoSkeleton'

CardResto.displayName = 'CardResto'
export default React.memo(CardResto)

