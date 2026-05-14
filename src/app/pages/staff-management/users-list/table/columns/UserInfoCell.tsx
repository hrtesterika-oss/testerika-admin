/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Role} from '../../core/_models'
import {useListView} from '../../core/ListViewProvider'
import { errrorMessage, warningMessage } from '../../../../../modules/auth/components/ToastComp'
import { useAuth } from '../../../../../modules/auth'

type Props = {
  user: Role
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {currentUser}=useAuth()
  const {setItemIdForUpdate} = useListView()
  const openEditModal = () => {
      setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <a  style={{cursor: 'pointer'}}>
          {user?.profile_image ? (
            <div className='symbol-label'>
              <img src={user?.profile_image} alt={user?.first_name} className='w-100' />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-3', `bg-light-warning`, `text-warning`)}>
              {user?.first_name?.charAt(0)}
            </div>
          )}
        </a>
      </div>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {user.first_name} {user.last_name}
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
