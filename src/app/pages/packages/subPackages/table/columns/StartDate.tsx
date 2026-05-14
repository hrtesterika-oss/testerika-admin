import {FC} from 'react'

type Props = {
  start_date?: any
}

const StartDate: FC<Props> = ({start_date}) => (
  <div className='fw-bolder'>{start_date?.split('T')[0]}</div>
)

export {StartDate}
