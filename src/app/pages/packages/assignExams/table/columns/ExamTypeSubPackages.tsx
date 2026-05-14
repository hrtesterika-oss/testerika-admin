import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {assignExamPremiumToSubPackagesStatus, assignExamToSubPackages, updateStatus} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { useCommonData } from '../../components/CommonDataProviderAssignExam'
import { useParams } from 'react-router-dom'
import { successMessage } from '../../../../../modules/auth/components/ToastComp'

type Props = {
  status?: boolean
  id?: ID
}

const ExamTypeSubPackages: FC<any> = ({status, id}:any) => {
  const [stat, setStatus] = useState<any>(status)
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const {assignExams,setAssignExams}=useCommonData()
  const params=useParams()

  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={assignExams?.find((item:any)=>item?.examid==id)?.type=="Premium"?true:false}
            onChange={async (e) => {
              e?.preventDefault()
              const {data}=await assignExamPremiumToSubPackagesStatus({subpackage_id:params?.id,exam_id:id,type:assignExams?.find((item:any)=>item?.examid==id)?.type=="Premium"?"Free":"Premium"})
              if(data?.success){
                  setAssignExams(data?.data)
                  successMessage(data?.message)
              }
            }}
          />
          <a href="#" style={{marginLeft:"4px",color:`${assignExams?.find((item:any)=>item?.examid==id)?.type=="Premium"?"green":"red"}`}}>Premium</a>
        </label>
      }
    </>
  )
}

export {ExamTypeSubPackages}
