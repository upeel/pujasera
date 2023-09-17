import React from 'react'
import classNames from 'classnames/bind'
import styles from './horizontalFoodFilter.module.scss'
import { Link } from 'react-scroll'
import { SelectedTenant } from 'src/store/menu/menuSlice.types'

const cx = classNames.bind(styles)

interface HorizontalFoodFilterProps {
  selectedTenant: SelectedTenant
}
const HorizontalFoodFilter:React.FC<HorizontalFoodFilterProps> = ({ selectedTenant }) => {
  return (
    <div className={cx('x-food-filter__container', 'hidden-scrollbar')}>
      {
        selectedTenant?.menu_group && selectedTenant?.menu_group.map((tenant, i) => {
          return (
            <div key={i} className={cx('x-food-filter__item')}>
              <Link
                to={`${tenant.group_name}`}
                activeClass={cx('active')}
                spy={true}
                smooth={true}
                offset={-230}
                duration={200}
                className={cx('x-food-filter__link')}
              >
                {tenant.group_name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default HorizontalFoodFilter
