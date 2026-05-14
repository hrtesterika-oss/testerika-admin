import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {getUserById, updateJobStatus, updateStatus} from '../../core/_requests'
import { toast } from 'react-toastify'

type Props = {
  status?: any
  id?: any
}

const UserTwoStepsCell: FC<Props> = ({status, id}) => {
  const [stat, setStatus] = useState<any>(status?.active)
  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={stat}
          />
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
