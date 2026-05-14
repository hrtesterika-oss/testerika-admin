import {FC} from 'react'

type Props = {
  currency?: any
}

const UserLastLoginCell: FC<Props> = ({currency}) => <div className='fw-bolder'>{currency?.currency}</div>

export {UserLastLoginCell}
