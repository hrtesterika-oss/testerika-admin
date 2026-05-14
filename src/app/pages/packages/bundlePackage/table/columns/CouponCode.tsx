/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  coupon: User
}

const UserInfoCell: FC<Props> = ({coupon}) => {
  const {setItemIdForUpdate} = useListView()

  const openEditModal = () => {
    setItemIdForUpdate(coupon.id)
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <a
          onClick={openEditModal}
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {coupon.coupon_code}
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
