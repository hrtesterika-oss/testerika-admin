import {FC, useEffect, useRef, useState} from 'react'
import * as Yup from 'yup'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {isNotEmpty, KTSVG} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createQuizSetting, createUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {StepperComponent} from '../../../../../_metronic/assets/ts/components'
import {Step1} from '../steps/Step1'
import {Step2} from '../steps/Step2'
import { useAuth } from '../../../../modules/auth'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
type Props = {
  isUserLoading: boolean
  role: any
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const {currentUser}=useAuth()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<any>({
    id:role?.id?role.id:undefined,
    message: role?.message?role?.message:"",
    notification_subject: role?.notification_subject ? role?.notification_subject:"",
    notification_type: role?.notification_type?role?.notification_type:"",
    status: role.status?role?.status:1,
    staff_id: role?.staff_id?role?.staff?.id:currentUser?.id,
  })
  const modules = {
    toolbar: [
        [{header:[1,2,3,4,5,6,false]     
        }],
        [{ 'color': [] }, { 'background': [] }], 
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link','image', 'video'],
      [{ 'align': [] }],
      ['clean']
    ],
}
  const [selectedLang, setSelectedLang] = useState<any>(null)

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  

  const submitStep = async (e:any) => {
        e?.preventDefault()
  }

  return (
    <>
      <div
        className='stepper stepper-links d-flex flex-column'
        id='kt_create_account_stepper'
      >    
                  <form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form' onSubmit={(e)=>{
                    submitStep(e)
                  }}>
              <div className='current d-flex flex-column' data-kt-stepper-element='content'>
                    <div className='fv-row w-100 flex-md-root'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Subject</span>
                      </label>
                    <input  name='notification_subject' value={roleForEdit?.notification_subject} className='form-control mb-2' placeholder='Enter Notification Subject' onChange={(e:any)=>{
                        setRoleForEdit({...roleForEdit,notification_subject:e?.target?.value})
                      }} />
                 </div>

                 <div className='fv-row w-100 flex-md-root my-4'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Select Push Notification Type</span>
                      </label>
                      <select className="form-control p-2" value={roleForEdit?.notification_type} onChange={(e:any)=>{
                        setRoleForEdit({...roleForEdit,notification_type:e?.target?.value})
                      }}>
                         <option value="">
                            Select Notification Type
                         </option>
                         <option value="Default">
                            Default
                         </option>
                         <option value="Attempt Quiz">
                            Attempt Quiz
                         </option>
                         <option value="Missing Quiz">
                            Missing Quiz
                         </option>
                         <option value="Result">
                            Result
                         </option>
                         <option value="Winning Amount">
                            Winning Amount
                         </option>
                         <option value="Withdrawal">
                            Withdrawal
                         </option>
                         <option value="Book Update">
                            Book Update
                         </option>
                      </select>
                 </div>
                 <div className='fv-row w-100 flex-md-root'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Message</span>
                      </label>
                      <ReactQuill theme="snow" modules={modules} value={roleForEdit?.message || ""} onChange={(e)=>{
                         setRoleForEdit({
                          ...roleForEdit,message:e
                         })
                      }} />
                 </div>
                
              </div>
              <div className='d-flex flex-stack pt-15'>
                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      Submit
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-3 ms-2 me-0'
                      />
                    </span>
                  </button>
                </div>
              </div>
            </form>
      </div>
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
