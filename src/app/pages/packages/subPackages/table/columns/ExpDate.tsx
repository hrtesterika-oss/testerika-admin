import {FC} from 'react'

type Props = {
  exp_date?: any
}

const ExpDate: FC<Props> = ({exp_date}) => (
  <div className='fw-bolder'>{exp_date?.split('T')[0]}</div>
)

export {ExpDate}
