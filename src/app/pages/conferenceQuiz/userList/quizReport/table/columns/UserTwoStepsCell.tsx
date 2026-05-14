import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID, QUERIES} from '../../../../../../../_metronic/helpers'
import {getUserById, updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { useNavigate } from 'react-router-dom'

type Props = {
  status?: any
  id?: ID
}

const UserTwoStepsCell: FC<Props> = ({status, id}) => {
  const [stat, setStatus] = useState<any>(status?.status)
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const navigate=useNavigate()
  // const [permissionList,setPermissionList]=useState<any>({})
  // const filterStaffPermission=async (title:string)=>{
  //   let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
  //   setPermissionList(result[0])
  // }
  // useEffect(()=>{
  //   filterStaffPermission(navItem?.item)
  //   },[navItem])
  return (
    <>
      {' '}
      {
        <div>
          <button className="btn btn-primary btn-sm" onClick={()=>{
            navigate(`/conference-quiz/report/summary/${id}`)
          }}>
             View Summary
          </button>
        </div>
      }
    </>
  )
}

export {UserTwoStepsCell}
