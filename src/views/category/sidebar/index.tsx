import React from 'react'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, SkeletonText } from '@chakra-ui/react'
import CategoryModel from 'src/views/category/category.model'
import styles from './sidebarCategory.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface SidebarCategoryProps {
  isOpen?: boolean,
  onClose?: () => void
  data?: [],
}

const SidebarCategory:React.FC<SidebarCategoryProps> = ({ onClose = () => console.log(''), isOpen = false }) => {
  const {
    categoryList,
    loadingCategory,
    handleSelectedCategory,
    refLastCat,
    categoryItemIsActive
  } = CategoryModel()
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="lg">Kategori Resto</DrawerHeader>
          <DrawerBody paddingX="0">
            {
              categoryList?.data.map((cat, i) => {
                if (categoryList.data.length === i + 1) {
                  return (
                    <Box
                      ref={refLastCat}
                      key={i}
                      className={cx('sdb-cat-item', { active: categoryItemIsActive(cat.id) })}
                      onClick={() => {
                        handleSelectedCategory(cat)
                      }}
                    >
                      {cat.name}
                    </Box>
                  )
                }
                return (
                  <Box
                    key={i}
                    className={cx('sdb-cat-item', { active: categoryItemIsActive(cat.id) })}
                    onClick={() => {
                      handleSelectedCategory(cat)
                    }}
                  >
                    {cat.name}
                  </Box>
                )
              })
            }
            {
              loadingCategory &&
              new Array(5).fill(undefined).map((_, i) => {
                return (
                  <Box
                    display="block"
                    paddingY="4"
                    paddingX="6"
                    key={i}
                  >
                    <SkeletonText noOfLines={1} key={i} width="50%"/>
                  </Box>
                )
              })
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SidebarCategory
