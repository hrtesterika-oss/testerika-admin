/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  name: any
}

const PlayerCell: FC<Props> = ({name}) => {

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{name?.key?.substring(0,10)}...</div>
    </div>
  )
}

export {PlayerCell}
