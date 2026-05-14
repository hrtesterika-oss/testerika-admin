import {FC} from 'react'

type Props = {
  level?: any
}

const UserLastLoginCell: FC<Props> = ({level}) => <div className='fw-bolder'>
  {
    String(new Date(level?.createdAt).getDate()+"-"+new Date(level?.createdAt).toLocaleString('default', { month: 'long' }).slice(0,3)+"-"+new Date(level?.createdAt).getFullYear())
  }
   </div>

export {UserLastLoginCell}
