import { Stack } from 'react-bootstrap'
import Icon from '../Icon'

type PricingProps = {
  value: number
}

// Assume the value starts form 1 to 4

const Pricing = ({ value }: PricingProps) => {
  return (
    <Stack direction="horizontal" gap={1}>
      {Array.from({ length: value }, (_, index) => (
        <Icon key={index} type="currency-yen" />
      ))}
    </Stack>
  )
}

export default Pricing
