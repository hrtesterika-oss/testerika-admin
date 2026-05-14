/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  wallet: any
}

const CommonCell: FC<Props> = ({wallet}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{wallet}</div>
    </div>
  )
}

export {CommonCell}
