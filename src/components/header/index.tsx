import React from 'react'
import classNames from 'classnames/bind'
import styles from './header.module.scss'
import { Box, Heading, IconButton, Skeleton } from '@chakra-ui/react'
import TableNumber from 'src/components/tableNumber'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface HeaderProps {
  storeName?: string | null,
  numberDesk?: number | string | null,
  isLoading?: boolean,
  openSidebarCategory?: () => void,
  onClickBill?: () => void,
  pathHome?: string
}
const Header:React.FC<HeaderProps> = ({ storeName = 'Olsera FoodMarket', numberDesk = 0, onClickBill, isLoading, openSidebarCategory, pathHome }) => {
  return (
    <>
      <Box className={cx('header-container')}>
        <div className={cx('header-left')}>
          <div className={cx('header-left__icon')}>
            <IconButton
              variant="solid"
              backgroundColor="transparent"
              fontSize="2xl"
              icon={<i className="bx bx-menu"></i>}
              aria-label="category"
              onClick={openSidebarCategory}
            />
          </div>
          <div className={cx('header-left__title')}>
            {
              isLoading
                ? <Skeleton width="100px" height="20px" noOfLines={1} />
                : <Heading as={Link} to={pathHome || '#'} reloadDocument fontSize="xl" noOfLines={1}>{storeName}</Heading>
            }
          </div>
        </div>
        <div className={cx('header-right')}>
          <div className={cx('header-right__noDesk')}>
            <TableNumber isLoading={isLoading} number={numberDesk}/>
          </div>
          <div className={cx('header-right__bill')}>
            <IconButton
              variant="solid"
              backgroundColor="transparent"
              fontSize="2xl"
              icon={<i className="bx bx-receipt"></i>}
              aria-label="bill"
              onClick={onClickBill}
              disabled={isLoading}
            />
          </div>
        </div>
      </Box>
    </>
  )
}

export default Header
