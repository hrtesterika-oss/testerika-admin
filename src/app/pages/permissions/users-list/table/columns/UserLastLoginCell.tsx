import {FC} from 'react'

type Props = {
  short_name?: string
}

const UserLastLoginCell: FC<Props> = ({short_name}) => (
  <div className='badge badge-light fw-bolder'>{short_name}</div>
)

export {UserLastLoginCell}
