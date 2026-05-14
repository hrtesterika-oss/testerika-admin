/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Role} from '../../core/_models'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  user: Role
}

const UserInfoCell: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {user.name}
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
