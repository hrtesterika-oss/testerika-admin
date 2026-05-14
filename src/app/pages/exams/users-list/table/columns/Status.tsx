import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {getUserById, updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<any> = ({status, id}:any) => {
  const [stat, setStatus] = useState<any>(status)
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
            checked={status==0?true:false}
            onChange={async (e) => {
              e?.preventDefault()
            }}
          />
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
