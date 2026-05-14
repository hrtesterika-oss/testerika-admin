import {FC} from 'react'

type Props = {
  email?: any
}

const Email: FC<Props> = ({email}) => (
  <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
          {email}
      </div>
    </div>
)

export {Email}

