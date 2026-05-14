/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
// import {useCommonData} from '../../../commonData/CommonDataProvider'

type Props = {
  image: any
}

const CourseImageCell: FC<Props> = ({image}) => {
  return (
    <div className='d-flex align-items-center'>
      <img
        className='d-flex flex-column'
        src={image}
        style={{height: 30, width: 30, borderRadius: 60}}
      ></img>
    </div>
  )
}

export {CourseImageCell}
