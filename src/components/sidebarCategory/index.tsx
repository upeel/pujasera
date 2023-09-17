import React from 'react'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CategoryModel from 'src/views/category/category.model'

interface SidebarCategoryProps {
  isOpen?: boolean,
  onClose?: () => void
  data?: []
}

const SidebarCategory:React.FC<SidebarCategoryProps> = ({ onClose = () => console.log(''), isOpen = false }) => {
  const {
    categoryList,
    loadingCategory,
    handleSelectedCategory
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
              loadingCategory
              ? new Array(20).fill(undefined).map((_, i) => {
                return (
                  <Box
                    display="block"
                    paddingY="4"
                    paddingX="6"
                    as={Link}
                    to={`/category/${i}`}
                    key={i}
                    _hover={{
                      backgroundColor: 'rgba(0, 120, 206, 0.12)'
                    }}
                    fontSize="sm"
                  >
                    Kategori {i}
                  </Box>
                )
              })

              : categoryList?.data.map((cat, i) => {
                return (
                  <Box
                    display="block"
                    paddingY="4"
                    paddingX="6"
                    as={Link}
                    to={`/category/${cat.id}`}
                    key={i}
                    _hover={{
                      backgroundColor: 'rgba(0, 120, 206, 0.12)'
                    }}
                    fontSize="sm"
                    onClick={() => handleSelectedCategory(cat)}
                  >
                    {cat.name}
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
