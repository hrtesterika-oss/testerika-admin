import {FC, useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { addRemoveQuestionToExamSections, getAllQuestionsPresentInSection } from '../../core/_requests'
import { useParams } from 'react-router-dom'
import ToatComp from '../../../../conferenceQuiz/blog/ToatComp'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { useQueryClient } from 'react-query'
import { KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import { truncate } from 'fs'

type Props = {
  status?: boolean
  id?: ID
}

const UserTwoStepsCell: FC<any> = ({status, id}) => {
  const {staffPermission,navItem,examSectionQuestion}=useSelector((state:any)=>state.reducerData)

  const [stat, setStatus] = useState<any>(examSectionQuestion?.find((item:any)=>{
    if(item?.question_bank_id==status?.id){
     return true
    }else{
     return false
    }
 }))
  const params=useParams()
  const dispatch=useDispatch()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const [alreadyUsed,setAlreadyUsed]=useState<any[]>([])
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  const getAllQuestioPresentData=async (section_id:any)=>{
    const {data}=await getAllQuestionsPresentInSection(section_id)
    if(data?.success){
      // setAlreadyUsed(data?.alreadyUsedpayload)
     dispatch({type:"addExamSectionQuestions",payload:data?.questionPresent})
    }
 }
  useEffect(()=>{
    
    filterStaffPermission(navItem?.item)
    },[navItem])
    useEffect(()=>{

        if(examSectionQuestion?.find((item:any)=>{
          if(item?.question_bank_id==status?.id){
           return true
          }else{
           return false
          }
        })){
          setStatus(true)
        }else{
          setStatus(false)
        }
       
      
    },[useSelector,examSectionQuestion,params,setStatus,stat,status])
  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5 d-flex justify-content-evenly align-items-center'>
          
          <span className="cursor-pointer ms-2">
            
          {status?.present==1? "Used":"Not Used"}          </span>
          <input
            className='form-check-input'
            type='checkbox'
            name='status'
            checked={examSectionQuestion?.find((item:any)=>item?.question_bank_id==status?.id)?true:false}
            onChange={async (e) => {
              e?.preventDefault()
              const {data}=await addRemoveQuestionToExamSections({section_id:params?.section_id,question_bank_id:status?.id})
              if(data?.success){
                if(params?.section_id){
                  getAllQuestioPresentData(params?.section_id)
                }
                setStatus(!stat)
                ToatComp({message:data?.message,type:"Success"})
              }else{ 
                ToatComp({message:data?.message,type:"Error"})
              }
            }}
          />
          <span className="cursor-pointer ms-2" style={{color: examSectionQuestion?.find((item:any)=>item?.question_bank_id==status?.id)? '#D8322D' : '#44A8C1'}}>
            
            {examSectionQuestion?.find((item:any)=>item?.question_bank_id==status?.id) ? 'Remove from Section' : 'Add to Section'}
          </span>
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
