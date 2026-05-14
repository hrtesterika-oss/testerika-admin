import React,{FC, useEffect, useRef, useState} from 'react'
import * as Yup from 'yup'
import {Field, Form, Formik, FormikValues} from 'formik'
import {isNotEmpty, KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialRole, Role} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {checkEmail, createUser, updateUser,getUserById, API_URL, getPermissions, getRoles} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {StepperComponent} from '../../../../../_metronic/assets/ts/components'
import {Step1} from '../steps/Step1'
import {Step2} from '../steps/Step2'
import PasswordStrengthBar from 'react-password-strength-bar'
import { setAuth, useAuth } from '../../../../modules/auth'
import Select from "react-select"
import { errrorMessage, successMessage } from '../../../../modules/auth/components/ToastComp'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ["Staff Settings","Staff Permissions"];



type Props = {
  isUserLoading: boolean
  role: Role
}

const UserEditModalForm: FC<any> = () => {
  const {currentUser,saveAuth,setCurrentUser}=useAuth()
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()
  const navigate=useNavigate()
  const {refetch} = useQueryResponse()
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [editStaff,setEditStaff]=useState<any>({
    first_name:"",
    last_name:"",
    email:"",
    phone_number:"",
    profile_image:"",
    password:"",
    admin:false,
    permissions:[],
    role_id:undefined
  })
  const [showPassword,setShowPassword]=useState<boolean>(false)  
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [permissions, setPermissions] = useState<any[]>([])
  const [roleForEdit, setRoleForEdit] = useState<Role>()
  const [roles,setRoles]=useState<any[]>([])
  useEffect(() => {
    getPermissions()
      .then((data) => {
        let newData: any
        newData = data.data
        setPermissions(newData)
      })
      .catch((err) => {
        console.log(err, 'err')
      })

      getRoles()
      .then((data) => {
        let newData: any
        newData = data.data
        // let filtername=newData.map((item:any)=>item?.name)
        setRoles(newData)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }, [])

  

  const handleNext = (e:any) => {
    if(editStaff?.first_name?.trim()?.length<3){
      errrorMessage("First name cannot be less than 3 characters")
     }else  if(editStaff?.last_name?.trim()?.length<3){
      errrorMessage("Last name cannot be less than 3 characters")
     }
     else  if(editStaff?.phone_number?.trim()?.length<10 || editStaff?.phone_number?.trim()?.length>10){
      errrorMessage("Invalid phone number")
     }else if(!validator.isEmail(editStaff?.email)){
      errrorMessage("Invalid email")
     }else if(editStaff?.password?.trim()?.length<8){
      errrorMessage("Password cannot be less than 8 characters")
     }
     else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
     }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onCheckbox = (e: any, id: number) => {
    const {checked, name} = e.target
    let perm: any = editStaff.permissions
    const index = perm?.findIndex((x: any) => x.permission_id == id)
    if (index !== -1) {
      perm[index] = {...perm[index], [name]: checked}
    } else {
      perm?.push({
        permission_id: id,
        can_view: name == 'can_view' && checked ? true : false,
        can_view_own: name == 'can_view_own' && checked ? true : false,
        can_create: name == 'can_create' && checked ? true : false,
        can_edit: name == 'can_edit' && checked ? true : false,
        can_delete: name == 'can_delete' && checked ? true : false,
      })
    }
    setEditStaff({...editStaff, permissions: perm})
  }

  const findUserById=async ()=>{
    if(itemIdForUpdate!==undefined || itemIdForUpdate!==null){
      const {data}=await getUserById(itemIdForUpdate)
      setEditStaff(data?.data)
  }
  }
  
  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
      errrorMessage(`Image is of un-expected size (size must be less than 1MB)`)
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
      errrorMessage(`Only image supported`)
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        const {data}=await axios.post(`${API_URL}/staff/upload-image`,fd)
        if(data?.success){
          setEditStaff({...editStaff,profile_image:data?.image})
        }
      }
  }
  useEffect(()=>{
      findUserById()
  },[])
  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitRequest=async (e:any)=>{
    e?.preventDefault()
      if(itemIdForUpdate){
        const {data}=await updateUser(editStaff)
        if(data?.success){
           successMessage(data?.message)
           cancel()
            navigate("/dashboard")
        }else{
          errrorMessage(data?.message)
        }
      }else{

        if(editStaff?.password?.trim()?.length<8){
          errrorMessage("Password can't be less than 8 characters")
        }
        else if(!editStaff?.role_id){
          errrorMessage("Please select staff Roles")
        }
        else{
          const {data}=await createUser(editStaff)
          if(data?.success){
             successMessage(data?.message)
             cancel()
              navigate("/dashboard")
          }else{
            errrorMessage(data?.message)
          }
        }
      }

     
  }

  return (
    <>
      <div>
        <div className='stepper-nav mb-5'>
          <div className='stepper-item current' data-kt-stepper-element='nav'>
            {/* <h3 className='stepper-title text-center'>{activeStep===0 ?"Staff Info":"Staff  Permission"}</h3> */}
          </div>
          <div>
          </div>
        </div>






        <Box sx={{ width: '100%' }}>
      {activeStep === steps.length ? cancel() : (
        <React.Fragment>
          {
            activeStep===0 ? 
            <>
               <form>
        <div className='w-100'>
      <div className='fv-row my-7'>
        <label className='d-block form-label'>Avatar</label>
        <div className='image-input image-input-outline' data-kt-image-input='true'>
          <div className=''>
            <img
              src={editStaff?.profile_image
                ? editStaff?.profile_image:toAbsoluteUrl('/media/svg/avatars/blank.svg')
                }
              alt='avatar'
              className='image-input-wrapper w-125px h-125px'
            />
          </div>
          <label
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            title='Change avatar'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              type='file'
              name='profile_image'
              accept='.png, .jpg, .jpeg'
              onChange={(e: any) => {
                uploadImage(e?.target?.files)
              }}
            />
            <input type='hidden' name='avatar_remove' />
          </label>
          {editStaff?.profile_image && (
            <button
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              type='button'
              onClick={()=>{
                setEditStaff({...editStaff,profile_image:""})
              }}
            >
              <i className='bi bi-x fs-2'></i>
            </button>
          )}
        </div>
        <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>First Name</label>

          <input type="text" name='first_name' className='form-control mb-2' placeholder={'Enter First Name'} value={editStaff?.first_name} 
          onChange={(e:any)=>{
              setEditStaff({...editStaff,first_name:e?.target?.value})
          }}/>

        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Last Name</span>
          </label>

          <input type="text" name='last_name' className='form-control mb-2' placeholder={'Enter Last Name'} value={editStaff?.last_name} onChange={(e:any)=>{
              setEditStaff({...editStaff,last_name:e?.target?.value})
          }} />
          
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Email</label>

          <input type="email"
            name='email'
            className='form-control mb-2'
            placeholder={'Enter Valid Email'}
            value={editStaff?.email}
            onChange={(e:any)=>{
              setEditStaff({...editStaff,email:e?.target?.value})
          }}
          />
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Phone Number</span>
          </label>

          <input
            name='phone_number'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter Valid Phone Number'}
            value={editStaff?.phone_number}
            onChange={(e:any)=>{
              setEditStaff({...editStaff,phone_number:e?.target?.value})
          }}
          />
        </div>
      </div>     

      
       {
          !itemIdForUpdate &&   <div className='fv-row mb-10'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Password</span>
          </label>
          <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
            <div className='position-relative w-100'>
              <input
                name='password'
                type={!showPassword ? 'password' : 'text'}
                className='form-control mb-2'
                placeholder={'Enter Strong Password Or Generate'}
                value={editStaff?.password}
                onChange={(e:any)=>{
                     setEditStaff({...editStaff,password:e?.target?.value})
                }}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                data-kt-password-meter-control='visibility'
              >
                {!showPassword ? (
                  <i className='bi bi-eye-slash fs-2'></i>
                ) : (
                  <i className='bi bi-eye fs-2'></i>
                )}
              </button>
            </div>
            <button
              type='button'
              className='btn btn-lg btn-light-primary w-50 p-0 fs-15'
              onClick={() => {
                setEditStaff({...editStaff,password:Math.random().toString(36).slice(2)})}
                }
            >
              Generate Password
            </button>
          </div>
          <PasswordStrengthBar password={editStaff?.password} />
        </div>
       }
    
        </div>
               </form>
            </>:<>
            <form id='kt_modal_add_user_form' className='form'>
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_role_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_role_header'
          data-kt-scroll-wrappers='#kt_modal_add_role_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row'> 
          <label className="fs-4 fw-bolder">Select Staff Role</label>             
               {
                <select className="form-control my-5 w-50"  onChange={(e:any)=>{
                  if(e?.target?.value?.trim()?.toLowerCase()==="admin"){
                       setEditStaff({...editStaff,admin:true})
                  }else{
                    setEditStaff({...editStaff,admin:false})
                  }
                  let findRoleId=roles?.find((item:any,inedx:number)=>item?.name===e?.target?.value)
                  if(findRoleId){
                    setEditStaff({...editStaff,role_id:findRoleId?.id})
                  }
                }}>
                  {
                    roles?.map((item:any,index:any)=>{
                       return <option key={index}>{item?.name}</option>
                    })
                  }
                </select>
               }
               {
                editStaff?.role_id && <div className='table-responsive'>
                <table className='table align-middle table-row-dashed fs-6 gy-5'>
                  <tbody className='text-gray-600 fw-bold'>
                  <tr className="bg-primary text-white">
                        <td className='text-white ps-2'>Role Permissions</td>
                        <td style={{paddingLeft: 40}}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <span className='form-check-label'>View</span>
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <span className='form-check-label'>View(Own)</span>
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <span className='form-check-label'>Create</span>
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <span className='form-check-label'>Edit</span>
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <span className='form-check-label'>Delete</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    {permissions.map((item:any, i:number) => (
                      <tr key={i}>
                        <td className='text-gray ps-2'>{item.name}</td>
                        <td style={{paddingLeft: 40}}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_view
                                }
                                disabled={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_view_own == true
                                }
                                name='can_view'
                                onChange={(e) => onCheckbox(e, item.id)}
                              />
                              {/* <span className='form-check-label'>View</span> */}
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_view_own
                                }
                                name='can_view_own'
                                disabled={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_view == true
                                }
                                onChange={(e) => onCheckbox(e, item.id)}
                              />
                              {/* <span className='form-check-label'>View(Own)</span> */}
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_create
                                }
                                name='can_create'
                                onChange={(e) => onCheckbox(e, item.id)}
                              />
                              {/* <span className='form-check-label'>Create</span> */}
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_edit
                                }
                                name='can_edit'
                                onChange={(e) => onCheckbox(e, item.id)}
                              />
                              {/* <span className='form-check-label'>Edit</span> */}
                            </label>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                checked={
                                  editStaff.permissions?.find(
                                    (x: any) => x.permission_id == item.id
                                  )?.can_delete
                                }
                                name='can_delete'
                                onChange={(e) => onCheckbox(e, item.id)}
                              />
                              {/* <span className='form-check-label'>Delete</span> */}
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               }
            
               {/* } */}
           
          </div>
        </div>
        {/* end::Scroll */}
      </form>
            </>
          }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              className="bg-danger text-white p-2"
              style={{opacity:`${activeStep===0?"0.2":"1"}`}}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={activeStep===1 ?submitRequest:handleNext} className={activeStep === steps.length - 1?"bg-success text-white p-3 fw-bolder":"bg-primary text-white p-3 fw-bolder"}>
              {activeStep === steps.length - 1 ? 'Submit Info' : 'Continue'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
      </div>
    </>
  )
}

export {UserEditModalForm}
