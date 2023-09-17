import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../../menu.module.scss'
import classNames from 'classnames/bind'
import { ScrollHorizontal } from 'src/components/slider'
import CardResto, { CardRestoSkeleton } from 'src/components/cardResto'
import ResizablePanel from 'src/components/resizablePanel'
import CardRestoNameCompact, { CardRestoNameCompactSkeleton } from 'src/components/cardRestoNameCompact'
import { Box, Heading, SkeletonText } from '@chakra-ui/react'
import GridCardProduct, { GridCardProductSkeleton } from 'src/components/gridCardProduct'
import BottomSheet from 'src/components/bottomSheet'
import { paddingContainerChakra } from 'src/styles/theme.config'
import ListCardProduct, { ListCardProductSkeleton } from 'src/components/listCardProduct'
import { Element } from 'react-scroll'
import MenuModel from './menu.model'
import { constantViewListsMenu } from 'src/constant'
import ItemNotFound from 'src/components/itemNotFound'
import HorizontalFoodFilter from 'src/components/horizontalFoodFilter'
import FilterToolbar from 'src/components/filterToolbar'
import Modal from 'src/components/modal'
import NavigationPane from 'src/components/navigationPane'
const CategoryView = React.lazy(() => import('src/views/category'))
import SidebarCategory from 'src/views/category/sidebar'
import LoadingScreen from 'src/components/loadingScreen'
import MainContainer from 'src/components/container'
import { comboIsOutStock, productIsOutStock } from 'src/helpers/isOutStock'
// import BannerPromo from 'src/components/bannerPromo'
const DetailMenuView = React.lazy(() => import('src/views/detailMenu'))

const cx = classNames.bind(styles)

const index = () => {
  const {
    sizeEqualAsHeightSliderResto,
    isOpenBtsResto,
    onCloseBtsResto,
    tenantList,
    loadingTenant,
    isSelectedTenant,
    selectedTenant,
    handleSelectedTenant,
    CardRestoComp,
    onOpenBtsResto,
    getHeightHeader,
    products,
    getMenuView,
    loadingProducts,
    combos,
    loadingCombos,
    refLastCardTenant,
    refLastCombo,
    refLastProducts,
    loadingIntersectingCombo,
    comboModeInfiniteScroll,
    loadingIntersectingProducts,
    productsModeInfiniteScroll,
    isOpenModalCategory,
    onCloseModalCategory,
    onCloseSidebarCategory,
    isOpenSidebarCategory,
    handleOpenDetailMenu,
    openDetailMenu,
    handlCloseDetailMenu,
    tenantCountMenuInCart,
    menuCountInCart,
    tenantModeInfiniteScroll
  } = MenuModel()

  return (
    <>
      <Box top={`${getHeightHeader}px`} position="sticky" backgroundColor="white" zIndex="97" paddingBottom={4}>
        {/* Filter toolbar */}
        <AnimatePresence>
          <section className={cx('container-with-px')}>
            {
              React.useMemo(() => {
                return (
                  <FilterToolbar
                    nameSelectedTenant={selectedTenant?.name}
                    compact={sizeEqualAsHeightSliderResto}
                    onOpenBtsResto={onOpenBtsResto}
                    tenantPhoto={selectedTenant?.logo_xs}
                  />
                )
              }, [sizeEqualAsHeightSliderResto, selectedTenant])
            }
          </section>
        </AnimatePresence>
        {/* End Filter toolbar */}

        {
          React.useMemo(() => (
            <ResizablePanel>
              {/* Food Filter */}
              {
                sizeEqualAsHeightSliderResto &&
                  <motion.section
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0, transition: { ease: 'easeInOut' }}}
                    exit={{ opacity: 0, y: 10 }}
                    className={cx('section-wrap')}
                  >
                    <HorizontalFoodFilter selectedTenant={selectedTenant} />
                  </motion.section>
              }
            </ResizablePanel>
          ), [sizeEqualAsHeightSliderResto, selectedTenant])
        }
        {/* End Food Filter */}
      </Box>

      {/* Disable Banner for next development */}
      {/* <ResizablePanel>
        <motion.section
          style={{
            overflow: 'hidden'
          }}
          animate={{
            height: sizeEqualAsHeightSliderResto ? '0' : 'auto'
          }}
          className={cx('container-with-px')}
        >
          <BannerPromo/>
        </motion.section>
      </ResizablePanel> */}

      {/* Cart Tenant Name */}
      <motion.section
        className={cx('section-wrap')}
        animate={{
          opacity: sizeEqualAsHeightSliderResto ? 0 : 1,
          visibility: sizeEqualAsHeightSliderResto ? 'hidden' : 'visible',
          transition: { ease: 'easeInOut' }
        }}
      >
        <ScrollHorizontal>
          {
            React.useMemo(() => (
              tenantList.data.length > 0 && tenantList?.data.map((tenant, i) => {
                if (tenantList.data.length === i + 1) {
                  return (
                    <CardResto
                      ref={(el) => {
                        CardRestoComp.current[i] = el
                        refLastCardTenant(el)
                      }}
                      img={tenant.logo_md}
                      selected={isSelectedTenant(tenant.id)}
                      name={tenant.alias_name}
                      key={i}
                      badge={tenantCountMenuInCart(tenant.id)}
                      onClick={() => {
                        handleSelectedTenant(tenant)
                      }}
                    />
                  )
                }

                return (
                  <CardResto
                    ref={(el) => {
                      CardRestoComp.current[i] = el
                    }}
                    img={tenant.logo_md}
                    selected={isSelectedTenant(tenant.id)}
                    name={tenant?.name}
                    key={i}
                    badge={tenantCountMenuInCart(tenant.id)}
                    onClick={() => {
                      handleSelectedTenant(tenant)
                    }}
                  />
                )
              })
            ), [tenantList, isSelectedTenant, tenantCountMenuInCart])
          }
          {
            loadingTenant &&
              new Array(3).fill(undefined).map((_, i) => {
                return <CardRestoSkeleton key={i.toString()}/>
              })
          }
        </ScrollHorizontal>
      </motion.section>
      {/* End Cart Tenant Name */}
      <ResizablePanel>
        {
          React.useMemo(() => (
            sizeEqualAsHeightSliderResto && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' }}}
              exit={{ opacity: 0 }}
              className={cx('section-wrap')}
            >
              {
                loadingTenant && !tenantModeInfiniteScroll
                  ? <CardRestoNameCompactSkeleton/>
                  : <CardRestoNameCompact name={selectedTenant?.name} badge={tenantCountMenuInCart(selectedTenant?.id || 0)} img={selectedTenant?.logo_md}/>
              }
            </motion.div>
          ), [sizeEqualAsHeightSliderResto, loadingTenant, tenantCountMenuInCart, selectedTenant, tenantModeInfiniteScroll])

        }
      </ResizablePanel>

      <div className={cx('section-wrap')}>
        {
          React.useMemo(() => (
            !loadingTenant && tenantList.data.length < 1 &&
          <Box className={cx('packet-group', 'container-with-px')} mt="4">
            <ItemNotFound
              title="Maaf, tidak ada tenant yang tersedia. :("
              description="Coba pilih kategori lainnya."
            />
          </Box>
          ), [loadingTenant, tenantList])
        }
        {
          React.useMemo(() => (
            tenantList.data.length > 0 && (!loadingProducts || !loadingCombos) && (products.data.length < 1 && combos.data.length < 1) &&
            (
              <Box className={cx('packet-group', 'container-with-px')} mt="4">
                <ItemNotFound
                  title="Maaf, belum ada menu yang tersedia :("
                  description="Coba pilih tenant lainnya."
                />
              </Box>
            )
          ), [tenantList, loadingProducts, loadingCombos, products, combos])
        }
      </div>

      {/* Paket Tenant */}
      <div className={cx('section-wrap')}>
        {/* Menu berhasil dimuat dan menu tersedia */}
        {/* Combos */}
        {/*
          Menu Product Loading
          hanya ditampilkan saat pertama kali diload saja
        */}
        {
          React.useMemo(() => (
            loadingCombos && !comboModeInfiniteScroll &&
            (
              <Box className={cx('packet-group', 'container-with-px')} mt="4">
                {
                  getMenuView !== constantViewListsMenu.GRID &&
                  <Box
                    marginTop="2"
                    display="grid"
                    gridTemplateColumns="1fr"
                    gap="0"
                    className={cx('remove-spaceX-4')}
                  >
                    {
                      new Array(1).fill(undefined).map((_, i) => {
                        return <ListCardProductSkeleton key={i.toString()}/>
                      })
                    }
                  </Box>
                }
                {
                  getMenuView === constantViewListsMenu.GRID &&
                  <Box
                    marginTop="2"
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap="4"
                  >
                    {
                      new Array(1).fill(undefined).map((_, i) => {
                        return <GridCardProductSkeleton key={i.toString()}/>
                      })
                    }
                  </Box>
                }
              </Box>
            )
          ), [loadingCombos, getMenuView, comboModeInfiniteScroll])
        } {/* End Menu Product Loading */}
        {
          React.useMemo(() => (
            combos.data.length > 0 &&
              <Box className={cx('packet-group', 'container-with-px')}>
                {
                  getMenuView === constantViewListsMenu.GRID &&
                    <Box
                      marginTop="2"
                      display="grid"
                      gridTemplateColumns="1fr 1fr"
                      gap="4"
                    >
                      {
                        combos.data.map((menu, i) => {
                          console.log(menu)
                          if (combos.data.length === i + 1) {
                            return (
                              <GridCardProduct
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
                                key={i.toString()}
                                qtyInCart={menuCountInCart(menu.id)}
                                isOutStock={comboIsOutStock(menu.is_out_stock, menu.stock_qty)}
                              />
                            )
                          }
                          return (
                            <GridCardProduct
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
                              key={i.toString()}
                              qtyInCart={menuCountInCart(menu.id)}
                              isOutStock={comboIsOutStock(menu.is_out_stock, menu.stock_qty)}
                            />
                          )
                        })
                      }
                      {
                        loadingIntersectingCombo &&
                          new Array(2).fill(undefined).map((_, i) => {
                            return <GridCardProductSkeleton key={i.toString()}/>
                          })
                      }
                    </Box>
                }
                {
                  getMenuView !== constantViewListsMenu.GRID &&
                    <Box
                      marginTop="2"
                      display="grid"
                      gridTemplateColumns="1fr"
                      gap="0"
                      className={cx('remove-spaceX-4')}
                    >
                      {
                        combos.data.map((menu, i) => {
                          if (combos.data.length === i + 1) {
                            return (
                              <ListCardProduct
                                ref={refLastCombo}
                                openMenu={() => {
                                  handleOpenDetailMenu({
                                    isUpdate: false,
                                    type: menu.type_code,
                                    id: menu.id.toString()
                                  })
                                }}
                                name={menu.name}
                                price={menu.fsell_price_pos}
                                img={menu.photo}
                                key={i.toString()}
                                qtyInCart={menuCountInCart(menu.id)}
                                isOutStock={comboIsOutStock(menu.is_out_stock, menu.stock_qty)}
                              />
                            )
                          }
                          return (
                            <ListCardProduct
                              name={menu.name}
                              openMenu={() => {
                                handleOpenDetailMenu({
                                  isUpdate: false,
                                  type: menu.type_code,
                                  id: menu.id.toString()
                                })
                              }}
                              price={menu.fsell_price_pos}
                              img={menu.photo}
                              key={i.toString()}
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
                    </Box>
                }
              </Box>
          ), [combos, getMenuView, loadingIntersectingCombo, menuCountInCart, comboIsOutStock])
        }
        {/* End Combos */}

        {/* Product */}
        {/* Menu Product Loading */}
        {
          React.useMemo(() => (
            loadingProducts && !productsModeInfiniteScroll &&
            (
              <Box className={cx('packet-group', 'container-with-px')} mt="4">
                <SkeletonText noOfLines={1} width="30%"/>
                {
                  getMenuView !== constantViewListsMenu.GRID &&
                  <Box
                    marginTop="2"
                    display="grid"
                    gridTemplateColumns="1fr"
                    gap="0"
                    className={cx('remove-spaceX-4')}
                  >
                    {
                      new Array(1).fill(undefined).map((_, i) => {
                        return <ListCardProductSkeleton key={i.toString()}/>
                      })
                    }
                  </Box>
                }
                {
                  getMenuView === constantViewListsMenu.GRID &&
                  <Box
                    marginTop="2"
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap="4"
                  >
                    {
                      new Array(1).fill(undefined).map((_, i) => {
                        return <GridCardProductSkeleton key={i.toString()}/>
                      })
                    }
                  </Box>
                }
              </Box>
            )
          ), [loadingProducts, getMenuView, productsModeInfiniteScroll])
        } {/* End Menu Product Loading */}
        {
          React.useMemo(() => (
            products.data.length > 0 && products.data.map((menuGroup) => {
              return (
                <Element className={cx('packet-group', 'container-with-px')} key={menuGroup.group_id} name={`${menuGroup.group_name}`}>
                  <Heading size="md">{menuGroup.group_name}</Heading>
                  {
                    getMenuView === constantViewListsMenu.GRID &&
                    <Box
                      marginTop="2"
                      display="grid"
                      gridTemplateColumns="1fr 1fr"
                      gap="4"
                    >
                      {
                        menuGroup.children.map((menu, i) => {
                          if (menuGroup.children.length === i + 1) {
                            return (
                              <GridCardProduct
                                ref={refLastProducts}
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
                                key={i.toString()}
                                qtyInCart={menuCountInCart(menu.id)}
                                isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                              />
                            )
                          }
                          return (
                            <GridCardProduct
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
                              key={i.toString()}
                              qtyInCart={menuCountInCart(menu.id)}
                              isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                            />
                          )
                        })
                      }
                      {
                        loadingIntersectingProducts &&
                        new Array(2).fill(undefined).map((_, i) => {
                          return <GridCardProductSkeleton key={i.toString()}/>
                        })
                      }
                    </Box>
                  }
                  {
                    getMenuView !== constantViewListsMenu.GRID &&
                    <Box
                      marginTop="2"
                      display="grid"
                      gridTemplateColumns="1fr"
                      gap="0"
                      className={cx('remove-spaceX-4')}
                    >
                      {
                        menuGroup.children.map((menu, i) => {
                          if (menuGroup.children.length === i + 1) {
                            return (
                              <ListCardProduct
                                ref={refLastProducts}
                                openMenu={() => {
                                  handleOpenDetailMenu({
                                    isUpdate: false,
                                    type: menu.type_code,
                                    id: menu.id.toString()
                                  })
                                }}
                                name={menu.name}
                                price={menu.fsell_price_pos}
                                img={menu.photo}
                                key={i.toString()}
                                qtyInCart={menuCountInCart(menu.id)}
                                isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                              />
                            )
                          }
                          return (
                            <ListCardProduct
                              name={menu.name}
                              openMenu={() => {
                                handleOpenDetailMenu({
                                  isUpdate: false,
                                  type: menu.type_code,
                                  id: menu.id.toString()
                                })
                              }}
                              price={menu.fsell_price_pos}
                              img={menu.photo}
                              key={i.toString()}
                              qtyInCart={menuCountInCart(menu.id)}
                              isOutStock={productIsOutStock(menu.track_inventory, menu.is_out_stock, menu.stock_qty)}
                            />
                          )
                        })
                      }
                      {
                        loadingIntersectingProducts &&
                        new Array(2).fill(undefined).map((_, i) => {
                          return <ListCardProductSkeleton key={i.toString()}/>
                        })
                      }
                    </Box>
                  }
                </Element>
              )
            })
          ), [products, getMenuView, loadingIntersectingProducts, menuCountInCart, productIsOutStock])
        }
        {/* End Product */}

        {/* Menu berhasil dimuat but menu tidak ada */}
      </div>
      {/* End Paket Tenant */}

      {/* Padding Bottom */}
      <Box marginTop="100px"></Box>
      {/* End Padding Bottom */}

      {/* Bottom Sheet Resto */}
      {
        React.useMemo(() => (
          <BottomSheet snapPoint="middle" isOpen={isOpenBtsResto} onClose={onCloseBtsResto}>
            <MainContainer py="4">
              <Heading size="md" marginBottom="4" marginX={paddingContainerChakra}>Kategori Resto</Heading>
              {
                tenantList.data.length > 0 && tenantList?.data.map((tenant, i) => {
                  if (tenantList.data.length === i + 1) {
                    return (
                      <CardRestoNameCompact
                        ref={refLastCardTenant}
                        name={tenant.alias_name}
                        imageProps={{
                          src: tenant.logo_xs,
                          style: { width: '40px', height: '40px' }
                        }}
                        nameProps={{
                          fontSize: 'sm'
                        }}
                        key={i.toString()}
                        styleContainer={{ paddingY: '2', backgroundColor: 'white' }}
                        badge={tenantCountMenuInCart(tenant.id)}
                        onClick={() => {
                          handleSelectedTenant(tenant)
                          onCloseBtsResto()
                        }}
                      />
                    )
                  }
                  return (
                    <CardRestoNameCompact
                      name={tenant.alias_name}
                      key={i.toString()}
                      imageProps={{
                        src: tenant.logo_xs,
                        style: { width: '40px', height: '40px' }
                      }}
                      nameProps={{
                        fontSize: 'sm'
                      }}
                      styleContainer={{ paddingY: '2', backgroundColor: 'white' }}
                      badge={tenantCountMenuInCart(tenant.id)}
                      onClick={() => {
                        handleSelectedTenant(tenant)
                        onCloseBtsResto()
                      }}
                    />
                  )
                })
              }
              {
                loadingTenant && new Array(5).fill(undefined).map((_, i) => {
                  return <CardRestoNameCompactSkeleton key={i.toString()} />
                })
              }
            </MainContainer>
          </BottomSheet>
        ), [isOpenBtsResto, tenantCountMenuInCart, tenantList, loadingTenant])
      }
      {/* Bottom Sheet Resto */}

      {
        React.useMemo(() => (
          location.pathname === '/menu' &&
          <SidebarCategory onClose={onCloseSidebarCategory} isOpen={isOpenSidebarCategory} />
        ), [isOpenSidebarCategory, location])
      }{/* End Sidebar */}

      {/* Modal Cat */}
      {
        location.pathname === '/menu' &&
          <Modal
            isOpen={isOpenModalCategory}
            onClose={onCloseModalCategory}
            size="full"
            withHeader={false}
            showCloseButton={false}
            blockScrollOnMount={false}
            customElementHeader={() => (
              <MainContainer>
                <NavigationPane title="Kategori Resto" type="LEFT" onClick={onCloseModalCategory} />
              </MainContainer>
            )}
          >
            <MainContainer>
              {
                React.useMemo(() => (
                  <React.Suspense fallback={<LoadingScreen />}>
                    <CategoryView onSelectedTenant={handleSelectedTenant} />
                  </React.Suspense>
                ), [])
              }
            </MainContainer>
          </Modal>
      }{/* End Modal Cat */}

      {/* Modal Detail Menu */}
      {
        location.pathname === '/menu' &&
        <Modal
          isOpen={openDetailMenu.isOpen}
          onClose={onCloseModalCategory}
          size="full"
          withHeader={false}
          showCloseButton={false}
          withModalBody={false}
          customElementHeader={() => (
            <MainContainer>
              <NavigationPane title="Tambah menu" type="RIGHT" onClick={handlCloseDetailMenu}/>
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
      }
      {/* End Modal Detail Menu */}
    </>
  )
}

export default index
