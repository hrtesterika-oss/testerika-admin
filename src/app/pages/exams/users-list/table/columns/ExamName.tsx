/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import { useNavigate } from 'react-router-dom'

type Props = {
  coupon_title: User
}

const ExamName: FC<any> = ({coupon_title,id}:any) => {
    const navigate=useNavigate()
  return (
    <div className='d-flex align-items-center'>
      <a target="_blank" href={`/exams/edit/${id}`} className='d-flex flex-column coupon_title text-primary' style={{cursor:"pointer"}}>{coupon_title}</a>
    </div>
  )
}

export {ExamName}
