/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../../quizResult/commonData/CommonDataProvider'

type Props = {
    resultPublishdate: any
}

const ResultPublishDate: FC<Props> = ({resultPublishdate}) => {
  return (
    <div className='badge badge-light'>
      {(resultPublishdate)}
    </div>
  )
}

export {ResultPublishDate}
