/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  courses: any
}

const PackagesCourse: FC<Props> = ({courses}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>[{courses?.map((item:any)=>item?.courseid)?.join(",")}]</div>
    </div>
  )
}

export {PackagesCourse}
