/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../commonData/CommonDataProvider'

type Props = {
  marks: any
}

const MarksCell: FC<Props> = ({marks}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{Number(marks)}</div>
    </div>
  )
}

export {MarksCell}
