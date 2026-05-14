/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: any
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <a style={{cursor: 'pointer'}}>
          {user?.image ? (
            <div className='symbol-label'>
              <img src={user?.image} alt={user.name} className='w-100' />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-3', `bg-light-warning`, `text-warning`)}>
              {user.name?.charAt(0)}
            </div>
          )}
        </a>
      </div>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {user.name}
        </a>

        {/* <span>{user.email}</span> */}
      </div>
    </div>
  )
}

export {UserInfoCell}
