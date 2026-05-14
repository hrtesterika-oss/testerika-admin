/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import { useCommonData } from '../../../../question-bank/users-list/commonData/CommonDataProvider'
// import { useCommonData } from '../../../question-bank/users-list/commonData/CommonDataProvider';

type Props = {
  courses: any
}

const PackagesCourse: FC<Props> = ({courses}) => {
  const {allCourses,allSubjects}=useCommonData() 
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>[{
         allCourses?.filter((item:any)=>courses?.map((item2:any)=>item2?.courseid)?.includes(item?.id))?.map((item3:any)=>item3?.course_name)?.join(",")
      }]</div>
    </div>
  )
}

export {PackagesCourse}


// {courses?.map((item:any)=>item?.courseid)?.join(",")}