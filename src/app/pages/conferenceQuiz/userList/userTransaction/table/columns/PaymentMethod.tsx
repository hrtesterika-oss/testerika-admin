/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  name?: any
}

const PaymentMethod: FC<Props> = ({name}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{name?.payment_method}</div>
    </div>
  )
}

export {PaymentMethod}
