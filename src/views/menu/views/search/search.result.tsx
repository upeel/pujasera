import React, { useState } from 'react'
import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import classNames from 'classnames/bind'
import styles from '../../menu.module.scss'
import ListCardProduct, { ListCardProductSkeleton } from 'src/components/listCardProduct'
import GroupItemTenant from 'src/components/GroupItemTenant'
import StandAloneInputSearch from 'src/components/standAloneInputSearch'
import SearchModel from './search.model'
import ItemNotFound from 'src/components/itemNotFound'
import Modal from 'src/components/modal'
import NavigationPane from 'src/components/navigationPane'
import LoadingScreen from 'src/components/loadingScreen'
import MainContainer from 'src/components/container'
import { comboIsOutStock, productIsOutStock } from 'src/helpers/isOutStock'
const DetailMenuView = React.lazy(() => import('src/views/detailMenu'))

const cx = classNames.bind(styles)

const SearchResult:React.FC = () => {
  const {
    handleBack,
    searchParams,
    setSearchParams,
    products,
    loadingProducts,
    combos,
    loadingCombos,
    handleSearch,
    outputProduct,
    outputCombo,
    productInfiniteScroll,
    comboInfiniteScroll,
    loadingIntersectingCombo,
    loadingIntersectingProduct,
    refLastCombo,
    refLastProduct,
    menuCountInCart,
    handleOpenDetailMenu,
    openDetailMenu,
    handleCloseDetailMenu,
    onCloseModalCategory,
    sumResult
  } = SearchModel()

  const initValue = searchParams.get('search') as string
  const [text, setText] = useState(initValue)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const resetInput = () => {
    setText('')
  }

  return (
    <>
      <Box position="sticky" backgroundColor="white" top={0} zIndex="97" paddingY="4">
        <div className="container-with-px">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch(text)
              setSearchParams({ search: text })
            }}
          >
            <HStack width="full">
              <IconButton
                fontSize="2xl"
                variant="solid"
                background="transparent"
                icon={<i className="bx bx-left-arrow-alt"></i>}
                aria-label="minimize search"
                onClick={handleBack}
              />
              <StandAloneInputSearch onChange={handleChange} value={text} onClear={resetInput} />
            </HStack>
          </form>
        </div>
      </Box>
      { !loadingProducts && !loadingCombos &&
        <Text fontWeight={600} margin={4}>
          { sumResult } hasil ditemukan
        </Text>
      }
      {
        React.useMemo(() => (
          !loadingProducts &&
          outputProduct.map((product, i) => {
            return (
              <GroupItemTenant name={product.tenant_name} total={product.group.length} key ={i}>
                <div className="container-with-px">
                  {
                    product.group.map((menu, j) => {
                      if (product.group.length === j + 1) {
                        return (
                          <ListCardProduct
                            ref={refLastProduct}
                            name={menu.name}
                            price={menu.fsell_price_pos}
                            img={menu.photo}
                            openMenu={() => {
                              handleOpenDetailMenu({
                                isUpdate: false,
                                type: menu.type_code,
                                id: menu.id.toString()
                              })
                            }}
                            key={j.toString()}
                            qtyInCart={menuCountInCart(menu.id)}
                            isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                          />
                        )
                      }
                      return (
                        <ListCardProduct
                          name={menu.name}
                          price={menu.fsell_price_pos}
                          img={menu.photo}
                          openMenu={() => {
                            handleOpenDetailMenu({
                              isUpdate: false,
                              type: menu.type_code,
                              id: menu.id.toString()
                            })
                          }}
                          key={j.toString()}
                          qtyInCart={menuCountInCart(menu.id)}
                          isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                        />
                      )
                    })
                  }
                  {
                    loadingIntersectingProduct &&
                      new Array(2).fill(undefined).map((_, i) => {
                        return <ListCardProductSkeleton key={i.toString()}/>
                      })
                  }
                </div>
              </GroupItemTenant>
            )
          })
        ), [loadingProducts, outputProduct, loadingIntersectingProduct, menuCountInCart])
      }
      {
        React.useMemo(() => (
          !loadingCombos &&
          outputCombo.map((combo, i) => {
            return (
              <GroupItemTenant name={combo.tenant_name} total={combo.group.length} key={i}>
                <div className="container-with-px">
                  {
                    combo.group.map((menu, j) => {
                      if (combo.group.length === j + 1) {
                        return (
                          <ListCardProduct
                            ref={refLastCombo}
                            name={menu.name}
                            price={menu.fsell_price_pos}
                            img={menu.photo}
                            openMenu={() => {
                              handleOpenDetailMenu({
                                isUpdate: false,
                                type: menu.type_code,
                                id: menu.id.toString()
                              })
                            }}
                            key={j.toString()}
                            qtyInCart={menuCountInCart(menu.id)}
                            isOutStock={comboIsOutStock(menu.is_out_stock, menu.stock_qty)}
                          />
                        )
                      }
                      return (
                        <ListCardProduct
                          name={menu.name}
                          price={menu.fsell_price_pos}
                          img={menu.photo}
                          openMenu={() => {
                            handleOpenDetailMenu({
                              isUpdate: false,
                              type: menu.type_code,
                              id: menu.id.toString()
                            })
                          }}
                          key={j.toString()}
                          qtyInCart={menuCountInCart(menu.id)}
                          isOutStock={comboIsOutStock(menu.is_out_stock, menu.stock_qty)}
                        />
                      )
                    })
                  }
                  {
                    loadingIntersectingCombo &&
                      new Array(2).fill(undefined).map((_, i) => {
                        return <ListCardProductSkeleton key={i.toString()}/>
                      })
                  }
                </div>
              </GroupItemTenant>
            )
          })
        ), [loadingCombos, outputCombo, loadingIntersectingCombo, menuCountInCart])
      }
      {
        React.useMemo(() => (
          loadingCombos && loadingProducts && !loadingIntersectingProduct && !loadingIntersectingCombo && productInfiniteScroll && comboInfiniteScroll &&
            <GroupItemTenant name="Tenant">
              <div className="container-with-px">
                {
                  new Array(5).fill(undefined).map((_, i) => {
                    return <ListCardProductSkeleton key={i.toString()}/>
                  })
                }
              </div>
            </GroupItemTenant>
        ), [loadingCombos, loadingProducts, loadingIntersectingProduct, loadingIntersectingCombo, productInfiniteScroll, comboInfiniteScroll])
      }
      {
        React.useMemo(() => (
          (!loadingProducts && !loadingCombos) && (products?.data.length === 0 && combos?.data.length === 0) &&
          <Box className={cx('packet-group', 'container-with-px')} margin="4">
            <ItemNotFound
              title="Maaf, menu belum tersedia :("
              description="Coba cari menu yang lain."
            />
          </Box>
        ), [loadingCombos, loadingProducts, products, combos])
      }
      {/* Modal Detail Menu */}
      <Modal
        isOpen={openDetailMenu.isOpen}
        onClose={onCloseModalCategory}
        size="full"
        withHeader={false}
        showCloseButton={false}
        withModalBody={false}
        customElementHeader={() => (
          <MainContainer>
            <NavigationPane title="Tambah menu" type="RIGHT" onClick={handleCloseDetailMenu}/>
          </MainContainer>
        )}
      >
        <MainContainer height="full">
          {
            React.useMemo(() => (
              <React.Suspense fallback={<LoadingScreen />}>
                <DetailMenuView />
              </React.Suspense>
            ), [])
          }
        </MainContainer>
      </Modal>
      {/* End Modal Detail Menu */}
    </>
  )
}

export default SearchResult
