/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../../quizResult/commonData/CommonDataProvider'

type Props = {
    start_date: any
}

const StartDate: FC<Props> = ({start_date}) => {
  return (
    <div className='badge badge-light'>
      {start_date}
    </div>
  )
}

export {StartDate}
