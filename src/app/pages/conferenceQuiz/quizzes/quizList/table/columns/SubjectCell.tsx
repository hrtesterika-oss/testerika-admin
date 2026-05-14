/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  name: any
}

const SubjectCell: FC<Props> = ({name}) => {

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{name?.length>18 ? `${name?.substring(0,18)}...`:name}</div>
    </div>
  )
}

export {SubjectCell}
