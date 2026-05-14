import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'

type Props = {
  id?: ID
  status: any
}

const UserTwoStepsCell: FC<Props> = ({id, status}) => {
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
        <select
          className='form-select'
          onChange={async (e) => {
           permissionList?.can_edit && setStatus(e.target.value)
           permissionList?.can_edit && await updateStatus({withdraw_status: e.target.value}, id)
          }}
          value={stat}
        >
          <option>Initiate</option>
          <option>Process</option>
          <option>Success</option>
          <option>Failed</option>
        </select>
      }
    </>
  )
}

export {UserTwoStepsCell}
