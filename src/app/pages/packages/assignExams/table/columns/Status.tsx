import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {assignExamToSubPackages, updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { useCommonData } from '../../components/CommonDataProviderAssignExam'
import { useParams } from 'react-router-dom'
import { successMessage } from '../../../../../modules/auth/components/ToastComp'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<any> = ({status, id}:any) => {
  const [stat, setStatus] = useState<any>(status)
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const {assignExams,setAssignExams}=useCommonData()
  const params=useParams()
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem,assignExams])
  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={assignExams?.find((item:any)=>item?.examid==id)?.id?true:false}
            onChange={async (e) => {
              e?.preventDefault()
              const {data}=await assignExamToSubPackages({subpackage_id:params?.id,exam_id:id})
              if(data?.success){
                  setAssignExams(data?.data)
                  successMessage(data?.message)
              }
            }}
          />
          <a href="#" style={{marginLeft:"4px",color:`${assignExams?.find((item:any)=>item?.examid==id)?.id?"green":"red"}`}} >
            {
            assignExams?.find((item:any)=>item?.examid==id)?.id?"Remove Exam":"Assigned Exam"}</a>
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
