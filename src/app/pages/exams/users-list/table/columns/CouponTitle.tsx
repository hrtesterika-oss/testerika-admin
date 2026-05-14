/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  coupon_title: User
}

const CouponTitle: FC<any> = ({coupon_title}:any) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column coupon_title'>{coupon_title}</div>
    </div>
  )
}

export {CouponTitle}
