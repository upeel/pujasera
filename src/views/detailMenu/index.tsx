import React from 'react'
import { Box, Heading, Stack, Text, Button, RadioGroup, HStack, Radio, Checkbox, SkeletonText, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import BannerImg, { BannerImgSkeleton } from 'src/components/bannerImg'
import Counter from 'src/components/form/counter'
import TextArea from 'src/components/form/textArea'
import styles from './detailMenu.module.scss'
import classNames from 'classnames/bind'
import DetailMenuModel from './detailMenu.model'
import { Controller } from 'react-hook-form'
import { formatCurrency } from 'src/utils/formatNumber'
import ModalAlert from 'src/components/modalAlert'
import ListVariant from 'src/components/listVariant'

const cx = classNames.bind(styles)

const DetailMenuView = () => {
  const {
    onSubmit,
    product,
    loadingProduct,
    control,
    handleSubmit,
    formState,
    register,
    formValidate,
    totalPrice,
    dataVariants,
    handlCloseDetailMenu,
    getOpenDetailMenu,
    isRemoveItem,
    closeConfirmRemoveItem,
    confirmRemoveItem,
    qtyValue,
    handleOpenAlertRemove,
    hasStock,
    stockQtyValue,
    handleCustomChangeVariant,
    isUnlimited,
    handleListVariantNotAvailable
  } = DetailMenuModel()

  if (loadingProduct) {
    return (
      <>
        <Box display="flex" flexDirection="column" minH="100vh" height="full">
          <BannerImgSkeleton />
          <Stack spacing="4" className="section-wrap container-with-px">
            <Skeleton width="24" height="5" />
            <SkeletonText noOfLines={2} />
            <Skeleton width="24" height="5" />
          </Stack>
          <Box flex="1">
            <Box className="container-with-px">
              <Stack className={cx('dtm-option_wrap')}>
                <Stack spacing="2">
                  <Skeleton width="20" height="4"/>
                  <Skeleton width="16" height="2"/>
                </Stack>
                <Stack>
                  <HStack className={cx('dtm-choose-item')}>
                    <Skeleton width="24" height="4"/>
                    <HStack display="flex" alignItems="center">
                      <Skeleton width="16" height="4"/>
                      <SkeletonCircle w="6" height="6"/>
                    </HStack>
                  </HStack>
                </Stack>
              </Stack>
              <Stack className={cx('dtm-option_wrap')}>
                <Stack spacing="2">
                  <Skeleton width="20" height="4"/>
                  <Skeleton width="16" height="2"/>
                </Stack>
                <Stack>
                  <HStack className={cx('dtm-choose-item')}>
                    <Skeleton width="24" height="4"/>
                    <HStack display="flex" alignItems="center">
                      <Skeleton width="16" height="4"/>
                      <Skeleton w="6" height="6"/>
                    </HStack>
                  </HStack>
                </Stack>
              </Stack>
            </Box>
            <Box className={cx('container-with-px', 'dtm-section')}>
              <Skeleton w="full" height="16"/>
            </Box>
            <Box className={cx('container-with-px', 'dtm-section', 'dtm-section-ctr')}>
              <Skeleton w="40%" height="8"/>
            </Box>
            <Box className={cx('container-with-px', 'dtm-section', 'dtm-section-actb')}>
              <Skeleton w="full" height="8"/>
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  const btnSubmit = () => {
    if (hasStock) {
      if (qtyValue < 1) {
        return (
          <Stack spacing="2">
            {btnBack()}
            {
              getOpenDetailMenu.isUpdate
                ? btnRemove()
                : null
            }
          </Stack>
        )
      } else {
        return (
          <Button
            type="submit"
            disabled={loadingProduct}
            width="full"
            colorScheme="ol_green"
          >
            <Text>{getOpenDetailMenu.isUpdate ? 'Simpan' : 'Tambah'} ({formatCurrency(totalPrice)})</Text>
          </Button>
        )
      }
    } else {
      return null
    }
  }

  const btnBack = () => {
    return <Button
      disabled={loadingProduct}
      backgroundColor="white"
      boxShadow="md"
      width="full"
      onClick={handlCloseDetailMenu}
    >
      <Text>Kembali</Text>
    </Button>
  }

  const btnRemove = () => {
    return <Button
      disabled={loadingProduct}
      width="full"
      onClick={handleOpenAlertRemove}
      colorScheme="ol_red"
    >
      <Text>Hapus</Text>
    </Button>
  }

  return (
    <>
      <Box display="flex" flexDirection="column" minH="100vh" height="full">
        <BannerImg
          img={product.data.photo}
          filterGray={!hasStock}
          placeholderImg={'/images/menu_placeholder.png'}
        />

        <Stack spacing="4" className="section-wrap container-with-px">
          <Heading fontSize="xl">{product?.data.name}</Heading>
          <Text fontSize="sm">{product?.data.description || 'tidak ada deskripsi'}</Text>
          {
            hasStock
              ? <Text fontSize="xl" fontWeight="bold">{product?.data.fsell_price_pos}</Text>
              : <Text fontSize="xl" fontWeight="bold" color="ol_red.500">Stok habis</Text>
          }
        </Stack>
        <Box as="form" flex="1" onSubmit={handleSubmit(onSubmit, formValidate)}>
          <Box className="container-with-px">
            {
              hasStock && product?.data.has_variant
                ? product.data.type_code === 'C'
                  ? dataVariants.map((variants, i) => {
                    return <Stack className={cx('dtm-option_wrap')} key={i}>
                      <Box>
                        <Text fontWeight="bold">{variants.group_name}</Text>
                      </Box>
                      <Box>
                        <Stack spacing="2">
                          {
                            variants.children.map((variant, j) => (
                              <ListVariant
                                img={variant.photo}
                                productName={variant.name}
                                key={j}
                                isOutStock={
                                  handleListVariantNotAvailable(
                                    variant.track_inventory as number,
                                    variant.is_out_stock,
                                    variant.stock_qty
                                  )
                                }
                              />
                            ))
                          }
                        </Stack>
                      </Box>
                    </Stack>
                  })
                  : hasStock && product.data.type_code === 'P' &&
                  <Stack className={cx('dtm-option_wrap')}>
                    <Box>
                      <Text fontWeight="bold">{product.data.variant_label}</Text>
                      <Text fontSize="xs" color={formState.errors.variant ? 'ol_red.500' : '#767676'}>Pilih satu</Text>
                    </Box>
                    <Box>
                      <Controller
                        name="variant.0"
                        control={control}
                        rules={{
                          required: true
                        }}
                        render={({ field }) => {
                          return (
                            <RadioGroup
                              {...field}
                              value={field.value}
                              onChange={(val) => {
                                field.onChange(val)
                                handleCustomChangeVariant(val)
                              }}
                            >
                              <Stack spacing="6">
                                {
                                  product.data.variants.map((variant, j) => (
                                    <HStack className={cx('dtm-choose-item')} key={j}>
                                      <Text fontSize="sm">{variant.name}</Text>
                                      <Box display="flex" alignItems="center">
                                        {
                                          handleListVariantNotAvailable(
                                            product.data.track_inventory,
                                            variant.is_out_stock,
                                            variant.stock_qty
                                          )
                                            ? <Text fontSize="sm" color="ol_red.500">Stok habis</Text>
                                            : <Text fontSize="sm">
                                              {
                                                variant.diff_price_variant !== 0 ? `+ ${variant.fdiff_price_variant}` : null
                                              }
                                            </Text>
                                        }
                                        <Radio
                                          value={variant.unique_id}
                                          isDisabled={
                                            handleListVariantNotAvailable(
                                              product.data.track_inventory,
                                              variant.is_out_stock,
                                              variant.stock_qty
                                            )
                                          }
                                          marginInlineStart="2"
                                          size="xl"
                                        />
                                      </Box>
                                    </HStack>
                                  ))
                                }
                              </Stack>
                            </RadioGroup>
                          )
                        }}
                      />
                    </Box>
                  </Stack>
                : null
            }
            {
              hasStock && product?.data.has_addon &&
              (
                <Stack className={cx('dtm-option_wrap')}>
                  <Box>
                    <Text fontWeight="bold">Tambahan</Text>
                    <Text fontSize="xs" color="#767676">Opsional</Text>
                  </Box>
                  <Stack>
                    <Stack spacing="6">
                      {
                        product.data.addons.map((addon, i) => (
                          <HStack className={cx('dtm-choose-item')} key={i}>
                            <Text fontSize="sm">{addon.name}</Text>
                            <Box display="flex" alignItems="center">
                              <Text fontSize="sm">{formatCurrency(addon.price)}</Text>
                              <Checkbox value={addon.id} {...register('addons')} marginInlineStart="2" size="xl"/>
                            </Box>
                          </HStack>
                        ))
                      }
                    </Stack>
                  </Stack>
                </Stack>
              )
            }
          </Box>
          <Box className={cx('container-with-px', 'dtm-section')}>
            {
              hasStock &&
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      labelOption={{ fontSize: 'xs' }}
                      labelText="Catatan"
                      placeholder="Tulis tambahan di sini"
                    />
                  )}
                />
            }
          </Box>
          <Box className={cx('container-with-px', 'dtm-section', 'dtm-section-ctr')}>
            {
              hasStock &&
                <Controller
                  name="qty"
                  rules={{
                    min: 0,
                    max: isUnlimited ? undefined : stockQtyValue
                  }}
                  control={control}
                  render={({ field: { ref, ...rest }}) => (
                    <Counter
                      min={getOpenDetailMenu.isUpdate ? 0 : 0}
                      max={isUnlimited ? undefined : stockQtyValue}
                      {...rest}
                      onChange={rest.onChange}
                    />
                  )}
                />
            }
          </Box>
          <Box className={cx('container-with-px', 'dtm-section', 'dtm-section-actb')}>
            {btnSubmit()}
          </Box>
        </Box>
        {
          !hasStock
            ? <Box className="container-with-px" pb="4">
              {btnBack()}
            </Box>
            : null
        }
        {
          !hasStock && getOpenDetailMenu.isUpdate
            ? <Box className="container-with-px" pb="4">
              {btnRemove()}
            </Box>
            : null
        }
      </Box>
      {
        getOpenDetailMenu.isUpdate ? <ModalAlert
          isOpen={isRemoveItem}
          title="Apakah Anda yakin ingin menghapus pesanan ini?"
          showCancelButton
          cancelButtonText="Tidak"
          confirmButtonText="Ya"
          onCancel={closeConfirmRemoveItem}
          onConfirm={confirmRemoveItem}
        /> : null
      }
    </>
  )
}

export default DetailMenuView
