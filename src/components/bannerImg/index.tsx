import React from 'react'
import styles from './bannerImg.module.scss'
import classNames from 'classnames/bind'
import { Box, Image, Skeleton } from '@chakra-ui/react'

const cx = classNames.bind(styles)

interface BannerImgProps {
  heightImg?: string | number,
  classNameImg?: string
  placeholderImg?: string,
  img?: string,
  isLoading?:boolean,
  filterGray?: boolean
}

const BannerImg:React.FC<BannerImgProps> = ({
  heightImg,
  classNameImg,
  img,
  placeholderImg,
  isLoading,
  filterGray
}) => {
  if (isLoading) {
    return <BannerImgSkeleton height={heightImg}/>
  }
  return (
    <Box className={cx('banner-wrapper')}>
      <Image
        height={heightImg || '360px'}
        src={img || placeholderImg}
        fallbackSrc={placeholderImg}
        alt="banner-img"
        className={cx('banner-img', classNameImg || '', { filterGray: filterGray })}
      />
    </Box>
  )
}

interface BannerImgSkeletonProps {
  height?: string | number
}
export const BannerImgSkeleton:React.FC<BannerImgSkeletonProps> = ({ height }) => {
  return (
    <Box className={cx('banner-wrapper')}>
      <Skeleton width="full" height={ height || '360px'}/>
    </Box>
  )
}

export default BannerImg
