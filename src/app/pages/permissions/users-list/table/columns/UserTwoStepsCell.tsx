import {FC} from 'react'

type Props = {
  core_permission?: boolean
}

const UserTwoStepsCell: FC<Props> = ({core_permission}) => (
  <> {core_permission ? <div className='badge badge-light-success fw-bolder'>Yes</div>
: <div className='badge badge-light-danger fw-bolder'>No</div>
}</>
)

export {UserTwoStepsCell}
