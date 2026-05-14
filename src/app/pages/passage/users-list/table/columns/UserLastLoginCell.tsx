import {FC} from 'react'

type Props = {
  createdAt?: any
}

const UserLastLoginCell: FC<Props> = ({createdAt}) => (
  <div className='badge badge-light fw-bolder'>{new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')}</div>
)

export {UserLastLoginCell}
