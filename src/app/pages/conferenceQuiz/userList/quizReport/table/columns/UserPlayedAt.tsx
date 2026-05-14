import {FC} from 'react'

type Props = {
  name?: any
}

const UserPlayedAt: FC<Props> = ({name}) => <div className='fw-bolder'>{
  String(new Date(name?.createdAt).getDate()+"-"+new Date(name?.createdAt).toLocaleString('default', { month: 'long' }).slice(0,3)+"-"+new Date(name?.createdAt).getFullYear())
}</div>

export {UserPlayedAt}
