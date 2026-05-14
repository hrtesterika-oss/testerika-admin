/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {User} from '../../core/_models'

type Props = {
  courses: any
}

const QuizCell: FC<Props> = ({courses}) => {
  const {allCourses} = useCommonData()

  const selected = allCourses?.filter((x: any) => courses?.some((y: any) => y.course_id == x.id))

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{selected?.map((x: any) => x.course_name).join(', ')}</div>
    </div>
  )
}

export {QuizCell}
