import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import styles from './category.module.scss'
import classNames from 'classnames/bind'
import GridCardResto, { GridCardRestoSkeleton } from 'src/components/gridCardResto'
import GridCardCategory, { GridCardCategorySkeleton } from 'src/components/gridCardCategory'
import Modal from 'src/components/modal'
import CategoryModel from './category.model'
import ItemNotFound from 'src/components/itemNotFound'
import { SelectedTenant } from 'src/store/menu/menuSlice.types'
import StandAloneInputSearch from 'src/components/standAloneInputSearch'
import { Controller } from 'react-hook-form'
import MainContainer from 'src/components/container'

const cx = classNames.bind(styles)

interface CategoryViewProps {
  onSelectedTenant: (tenant: SelectedTenant) => void
}
const CategoryView:React.FC<CategoryViewProps> = ({ onSelectedTenant }) => {
  const {
    isOpenModalCtg,
    onCloseModalCtg,
    onOpenModalCtg,
    categoryList,
    loadingCategory,
    selectedCategory,
    handleSelectedCategory,
    tenantList,
    loadingTenant,
    onCloseModalCategory,
    refTenant,
    refLastCat,
    tenantModeInfiniteScroll,
    handleSearchTenant,
    control,
    handleSubmit,
    searchParams,
    clearSearchField
  } = CategoryModel()

  return (
    <>
      <Box pb="4">
        <Box className={cx('section-wrap')}>
          <Button
            variant="solid"
            backgroundColor="transparent"
            boxShadow="md"
            rightIcon={<i className="bx bx-caret-down" ></i>}
            onClick={onOpenModalCtg}
            width="full"
          >
            <Text noOfLines={1}>{ loadingCategory ? '...' : selectedCategory?.name }</Text>
          </Button>
        </Box>

        <Box className={cx('section-wrap')}>
          <form onSubmit={handleSubmit(handleSearchTenant)}>
            <Controller
              control={control}
              name="tenant"
              render={({ field: { onChange, onBlur, name, value }}) => {
                return <StandAloneInputSearch
                  onChange={onChange}
                  value={value}
                  name={name}
                  onBlur={onBlur}
                  onClear={clearSearchField}
                  autoComplete="off"
                />
              }}
            />
          </form>
          {
            searchParams.get('keyword')
              ? <Text my="4" fontSize="sm">Hasil pencarian <Text as="span" fontWeight="semibold">{`"${searchParams.get('keyword') || ''}"`}</Text></Text>
              : null
          }
        </Box>

        <Box className={cx('section-wrap', 'list-resto_wrap')}>
          {
            !loadingTenant &&
          tenantList.data.length < 1 &&
          <Box className={cx('packet-group', 'container-with-px')} mt="4">
            <ItemNotFound
              title="Maaf, tidak ada tenant yang tersedia. :("
              description="Coba pilih kategori lainnya."
            />
          </Box>
          }
          <Box
            marginTop="2"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="4"
          >
            {
              loadingTenant && !tenantModeInfiniteScroll &&
            new Array(5).fill(undefined).map((_, j) => {
              return <GridCardRestoSkeleton key={j}/>
            })
            }
            {
              React.useMemo(() => (
                tenantList.data.length > 0 &&
              tenantList.data.map((tenant, i) => {
                if (tenantList.data.length === i + 1) {
                  return (
                    <GridCardResto
                      name={tenant.name}
                      img={tenant.logo_md}
                      ref={refTenant}
                      key={i}
                      onClick={() => {
                        onSelectedTenant(tenant)
                        onCloseModalCategory()
                      }}
                    />
                  )
                }
                return (
                  <GridCardResto
                    name={tenant.name}
                    img={tenant.logo_md}
                    key={i}
                    onClick={() => {
                      onSelectedTenant(tenant)
                      onCloseModalCategory()
                    }}
                  />
                )
              })
              ), [tenantList, searchParams])
            }
            {
              React.useMemo(() => (
                loadingTenant && tenantModeInfiniteScroll &&
              new Array(5).fill(undefined).map((_, j) => {
                return <GridCardRestoSkeleton key={j}/>
              })
              ), [loadingTenant])
            }
          </Box>
        </Box>
      </Box>
      {/* Modal Category */}
      <Modal
        title="Pilih kategori"
        isOpen={isOpenModalCtg}
        size="full"
        onClose={onCloseModalCtg}
        motionPreset={'none'}
      >
        <MainContainer height="full">
          <Box
            marginTop="2"
            marginBottom="8"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="4"
          >
            {
              React.useMemo(() => (
                categoryList.data.length > 0 && categoryList.data.map((cat, i) => {
                  if (categoryList.data.length === i + 1) {
                    return (
                      <GridCardCategory
                        name={cat.name}
                        key={i}
                        img={cat.logo_md}
                        ref={refLastCat}
                        onClick={() => {
                          handleSelectedCategory(cat)
                          onCloseModalCtg()
                        }}
                      />
                    )
                  }
                  return (
                    <GridCardCategory
                      name={cat.name}
                      key={i}
                      img={cat.logo_md}
                      onClick={() => {
                        handleSelectedCategory(cat)
                        onCloseModalCtg()
                      }}
                    />
                  )
                })
              ), [categoryList, searchParams])
            }
            {
              React.useMemo(() => (
                loadingCategory &&
                new Array(20).fill(undefined).map((_, j) => {
                  return <GridCardCategorySkeleton key={j}/>
                })
              ), [loadingCategory])
            }
          </Box>
        </MainContainer>
      </Modal>
    </>
  )
}

export default CategoryView
