import {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {ID} from '../../../../../../_metronic/helpers'
import {addQuestion, deleteUser, getQuizQuestions} from '../../core/_requests'
import {useParams} from 'react-router-dom'
import { successMessage, warningMessage } from '../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'

type Props = {
  id?: any
}

const UserTwoStepsCell: FC<Props> = ({id}) => {
  const params = useParams()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const [status, setStatus] = useState<any>(false)

  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
    
  useEffect(() => {
    getQuizQuestions(id,Number(params.id))
      .then((data) => {
        setStatus(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <>
      {' '}
      {
        <label className='form-check form-check-custom form-check-solid form-switch mb-5'>
          <input
            className='form-check-input me-3'
            data-switch='true'
            data-on-color='#D8322D'
            type='checkbox'
            name='status'
            data-off-color='warning'
            checked={status}
            onChange={async (e) => {
              if (e.currentTarget.checked) {
                if(permissionList?.can_create){
                  const {data}=await addQuestion({quiz_id: params.id, question_bank_id: id})
                  if(!data.success){
                    warningMessage("Quiz limit exceeded for adding questions.")
                  }else{
                    setStatus(!status)
                    successMessage("Question Added Successfully")
                  }
                }else{
                  warningMessage("You are not authorized to access")
                }              
              } else {
                if(permissionList?.can_delete){
                  successMessage("Question Removed Successfully")
                  await deleteUser(id,params.id)
                  setStatus(!status)
                }
                else{
                  warningMessage("You are not authorized to access")
                }
                
              }
            }}
          />
          <span className="cursor-pointer" style={{color: status == false ? '#44A8C1' : '#D8322D'}}>
            {status == true ? 'Remove from Quiz' : 'Add to Quiz'}
          </span>
        </label>
      }
    </>
  )
}

export {UserTwoStepsCell}
