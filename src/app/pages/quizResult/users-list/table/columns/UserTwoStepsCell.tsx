import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID, QUERIES} from '../../../../../../_metronic/helpers'
import {getUserById, updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useQueryResponse } from '../../core/QueryResponseProvider'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<Props> = ({status, id}) => {
  const [stat, setStatus] = useState<any>(status)
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={stat===1 ? true : false}
            onChange={async (e) => {
              permissionList?.can_edit && setStatus(e.currentTarget.checked)
              permissionList?.can_edit && await updateStatus({status: e.currentTarget.checked ? 1 : 0}, id)
              permissionList?.can_edit && Swal.fire({
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
