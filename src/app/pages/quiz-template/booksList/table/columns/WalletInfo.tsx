/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const WalletInfo: FC<Props> = ({user}) => {
  const {setItemIdForUpdate} = useListView()
  // const item = users.find((x: any) => x.id == user.user_id)

  const openEditModal = () => {
    setItemIdForUpdate(user.id)
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <a
          onClick={openEditModal}
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {/* {item?.firstname} {item?.lastname} ({item?.phone}) */}
        </a>
      </div>
    </div>
  )
}

export {WalletInfo}
