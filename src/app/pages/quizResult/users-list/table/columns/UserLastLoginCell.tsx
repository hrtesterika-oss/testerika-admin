import {FC} from 'react'

type Props = {
  createdAt?: any
}

const UserLastLoginCell: FC<Props> = ({createdAt}) => (
  
  <div className='badge badge-light fw-bolder'>
    {createdAt.createdAt}</div>
)

export {UserLastLoginCell}
