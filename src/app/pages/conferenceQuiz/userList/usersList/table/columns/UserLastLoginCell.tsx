import {FC} from 'react'

type Props = {
  level?: string
}

const UserLastLoginCell: FC<Props> = ({level}) => <div className='fw-bolder'>{level}</div>

export {UserLastLoginCell}
