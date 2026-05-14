import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import { updateUserStatus} from '../../core/_requests'
import { useQueryClient} from 'react-query'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { QUERIES} from '../../../../../../_metronic/helpers'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<any> = ({status, id}) => {
  const [stat, setStatus] = useState<any>(status)
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={status==1?true:false}
            value={status}
            onChange={async (e) => {
                const {data}=await updateUserStatus(id,status==1?0:1)
                if(data?.success){
                  Swal.fire({
                    title: 'Success!',
                    text: `Status updated successfully!`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                  })
                  queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
                }
            //  Swal.fire({
            //     title: 'Success!',
            //     text: `Status updated successfully!`,
            //     icon: 'success',
            //     confirmButtonText: 'Okay',
            //   })
              // await getUserById(id)
            }}
          />
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
