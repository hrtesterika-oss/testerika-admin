/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  user: any
}

const QuestionMarks: FC<any> = ({question_marks}) => {
  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      {/* <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <a onClick={openEditModal} style={{cursor: 'pointer'}}>
          {user.profile_image ? (
            <div className='symbol-label'>
              <img src={user.profile_image} alt={user.firstname} className='w-100' />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-3', `bg-light-warning`, `text-warning`)}>
              {user.firstname?.charAt(0)}
            </div>
          )}
        </a>
      </div> */}
      <div className='d-flex flex-column'>
        <span>{question_marks}</span>
      </div>
    </div>
  )
}

export {QuestionMarks}
