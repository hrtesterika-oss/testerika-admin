import {FC} from 'react'

type Props = {
  date?: any
}

const Type: FC<Props> = ({date}) => <div className='fw-bolder'>{
  String(new Date(date).getDate()+"-"+new Date(date).toLocaleString('default', { month: 'long' })+"-"+new Date(date).getFullYear())
  }</div>

export {Type}
