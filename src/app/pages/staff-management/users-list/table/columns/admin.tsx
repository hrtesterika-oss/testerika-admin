import {FC} from 'react'

type Props = {
  admin?: boolean
}

const Admin: FC<Props> = ({admin}) => (
  <> {admin ? <div className='badge badge-light-success fw-bolder'>true</div>: 
  <div className='badge badge-light-danger fw-bolder'>false</div>}</>
)

export {Admin}
