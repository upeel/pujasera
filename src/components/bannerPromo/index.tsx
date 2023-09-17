import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './BannerSlider.module.scss'
import classNames from 'classnames/bind'
import { Image } from '@chakra-ui/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

const cx = classNames.bind(styles)

const BannerPromo = () => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={12}
      lazy={true}
      className={cx('banner-promo')}
    >
      <SwiperSlide className={cx('banner-promo__slide')}>
        <Image src="/images/bg_order_process.jpg" />
      </SwiperSlide>
      <SwiperSlide className={cx('banner-promo__slide')}>
        <Image src="/images/bg_order_success.jpg" />
      </SwiperSlide>
      <SwiperSlide className={cx('banner-promo__slide')}>
        <Image src="/images/banner_placeholder.png" />
      </SwiperSlide>
    </Swiper>
  )
}

export default BannerPromo
