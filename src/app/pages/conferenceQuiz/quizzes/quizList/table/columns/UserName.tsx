import {FC} from 'react'
type Props = {
  user_name?: any
}

const UserName: FC<Props> = ({user_name}) => <div className='fw-bolder'>
    {
      `${user_name?.tblconference_user?.first_name}`+" "+ `${user_name?.tblconference_user?.last_name}`
    }
  </div>

export {UserName}
