import React from 'react'
import { Alert, Text } from '@chakra-ui/react'
import Countdown, { CountdownProps } from 'react-countdown'

interface AlertCountdownPaymentProps {
  text?: string
  countdownConfig?: CountdownProps
}

const AlertCountdownPayment:React.FC<AlertCountdownPaymentProps> = ({
  text = 'Segera lakukan pembayaran agar pesanan Anda dapat diproses. Sisa waktu bayar: ',
  countdownConfig
}) => {
  return (
    <Alert bgColor="ol_orange.50" rounded="lg">
      <Text as="i" className="bx bx-error" color="ol_orange.500" mr="4" fontSize="2xl"></Text>
      <Text fontSize="sm">
        {text}
        <Text as="span" fontWeight="semibold">
          <Countdown
            renderer={({ formatted }) => (
              <span>{formatted.hours}:{formatted.minutes}:{formatted.seconds}</span>
            )}
            {...countdownConfig}
          />
        </Text>.
      </Text>
    </Alert>
  )
}

export default AlertCountdownPayment
