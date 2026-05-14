import {FC} from 'react'

type Props = {
  name?: any
}

const UserPlayedAt: FC<Props> = ({name}) => <div className='fw-bolder'>{
  String(new Date(name).getDate()+"-"+new Date(name).toLocaleString('default', { month: 'long' }).slice(0,3)+"-"+new Date(name).getFullYear())
}</div>

export {UserPlayedAt}
