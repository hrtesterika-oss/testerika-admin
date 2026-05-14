/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../commonData/CommonDataProvider'

type Props = {
  subject_id: any
}

const SubjectCell: FC<Props> = ({subject_id}) => {
  const {allSubjects} = useCommonData()
  let item = allSubjects?.find((x: any) => x.id == subject_id)

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{item?.subject_name}</div>
    </div>
  )
}

export {SubjectCell}
