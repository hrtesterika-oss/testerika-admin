import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

type Props = {
  phone_number?: any
}

const PhoneNumber: FC<Props> = ({phone_number}) => (
  <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
          {phone_number}
      </div>
    </div>
)

export {PhoneNumber}
