import {FC} from 'react'

type Props = {
  createdAt?: string
}

const UserLastLoginCell: FC<Props> = ({createdAt}) => (
  <div className='badge badge-light fw-bolder'>{createdAt}</div>
)

export {UserLastLoginCell}
