import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {getUserById, updateStatus} from '../../core/_requests'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<Props> = ({status, id}) => {
  const [stat, setStatus] = useState<any>(status)
  console.log(stat, 'stat')
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
            onChange={async (e) => {
              setStatus(e.currentTarget.checked)
              await updateStatus({status: e.currentTarget.checked ? 1 : 0}, id)
              Swal.fire({
                title: 'Success!',
                text: `Status updated successfully!`,
                icon: 'success',
                confirmButtonText: 'Okay',
              })
              // await getUserById(id)
            }}
          />
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
