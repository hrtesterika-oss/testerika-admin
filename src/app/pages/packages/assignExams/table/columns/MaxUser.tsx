/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  coupon_uses: any
}

const MaxUser: FC<Props> = ({coupon_uses}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{coupon_uses?.max_user}</div>
    </div>
  )
}

export {MaxUser}
