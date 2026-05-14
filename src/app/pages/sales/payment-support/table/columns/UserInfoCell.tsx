/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  user: any
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()
  const {users} = useCommonData()

  const item = users?.find((x: any) => x.id == user.user_id)

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='align-items-center'>
      {/* begin:: Avatar */}
      <div className='symbol symbol-circle symbol-30px overflow-hidden me-3'>
        <a onClick={openEditModal} style={{cursor: 'pointer'}}>
          {user?.profile_image ? (
            <div className='symbol-label'>
              <img src={item?.profile_image} alt={item.firstname} className='w-100' />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-3', `bg-light-warning`, `text-warning`)}>
              {item?.firstname?.charAt(0)}
            </div>
          )}
        </a>
      </div>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {item?.firstname} {item?.lastname}
        </a>

        {/* <span>{user.email}</span> */}
      </div>
    </div>
  )
}

export {UserInfoCell}
