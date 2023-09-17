import React from 'react'
import { HStack, Stack, Text } from '@chakra-ui/react'
import styles from './paymentDetails.module.scss'
import classNames from 'classnames/bind'
import { formatCurrency } from 'src/utils/formatNumber'
import { SumPrice } from 'src/store/cart/cartSlice.type'

const cx = classNames.bind(styles)
interface PaymentDetailsProps {
  SumPrice:SumPrice,
  admin_fee_percentage: number,
  tax_name: string,
  paymentMethod?: string
}

const PaymentDetails:React.FC<PaymentDetailsProps> = ({ SumPrice, admin_fee_percentage, tax_name, paymentMethod }) => {
  return (
    <>
      <Text className={cx('pd-title')}>Harga</Text>
      <Stack spacing="4" marginTop="4">
        <HStack className={cx('pd-items')}>
          <Text className={cx('pd-item_label')}>Subtotal</Text>
          <Text className={cx('pd-item_value')}>{formatCurrency(SumPrice.sub_total, false)}</Text>
        </HStack>
        <HStack className={cx('pd-items')}>
          <Text className={cx('pd-item_label')}>Admin fee ({admin_fee_percentage}%)</Text>
          <Text className={cx('pd-item_value')}>{formatCurrency(SumPrice.admin_fee, false)}</Text>
        </HStack>
        <HStack className={cx('pd-items')}>
          <Text className={cx('pd-item_label')}>{tax_name}</Text>
          <Text className={cx('pd-item_value')}>{formatCurrency(SumPrice.tax, false)}</Text>
        </HStack>
        <HStack className={cx('pd-items')}>
          <Text className={cx('pd-item_label')}>Biaya transaksi</Text>
          <Text className={cx('pd-item_value')}>{formatCurrency(SumPrice.payment_charge, false)}</Text>
        </HStack>
        <hr className="ol-divider ol-divider_dashed"/>
        <HStack className={cx('pd-items')}>
          <Text className={cx('pd-item_label')}>Total</Text>
          <Text className={cx('pd-item_value')}>{formatCurrency(SumPrice.total)}</Text>
        </HStack>
        {
          paymentMethod
            ? <HStack className={cx('pd-items')}>
              <Text className={cx('pd-item_label')}>Metode Pembayaran</Text>
              <Text className={cx('pd-item_value')}>{paymentMethod}</Text>
            </HStack>
            : null
        }

      </Stack>
    </>
  )
}

export default PaymentDetails
