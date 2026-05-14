/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { successMessage } from '../../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
import ToastComp from '../../../ToastComp'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import axios from 'axios'
import { APIURLAUTH, APIURLQUIZ } from '../../../../APIURL'
import { Switch } from '@mui/material'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

type Props = {
  id: any
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const navigate=useNavigate()
  const [validNumber,setValidNumber]=useState<any>(false)
  const [open,setOpen]=useState<boolean>(false)
  const [editUser,setEditUser]=useState<any>({})
  const queryClient = useQueryClient()
  const params=useParams()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  const onOpenModal = (row:any) => {
    setEditUser({...row})
    setOpen(true)
  };
  const onCloseModal = () => {
    // findAllUser()
    setOpen(false)
  };
  const checkValidation=async()=>{
    if(editUser?.first_name.trim().length<3){
      ToastComp({message:"First name cannot be less than 3 characters",type:"Error"})
      return false
    } 
    else if(editUser?.last_name.trim().length<3){
      ToastComp({message:"Last name cannot be less than 3 characters",type:"Error"})
      return false
    }  

    else if(!isValidPhoneNumber(editUser?.phone_number)){
      ToastComp({message:"Invalid mobile number",type:"Error"})
      return; 
     }
     else if (!validator.isEmail(editUser?.email)) {
      ToastComp({message:"Invalid Email",type:"Error"})

      return; 
        }

      else{
          const {data}=await axios.put(`${APIURLAUTH}/admin/${editUser?.id}`,{data:editUser})
          if(data?.success){
            ToastComp({message:"User Updated Successfully",type:"Success"})
            queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
              onCloseModal()
          }
      }

  }

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id?.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      successMessage("User Deleted Successfully")
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-three-dots-vertical fs-5'></i>
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
         {permissionList?.can_edit && <a className='menu-link px-3' onClick={()=>{
          // navigate(`/conference-quiz/quizzes/${params?.id}/${id?.key}`)
          onOpenModal(id)
         }}>
            Edit
          </a>}
        </div>
        
        {/* <div className='menu-item px-3'>
         { <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>}
        </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
         {permissionList?.can_delete && <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>}
        </div> */}

        <div className='menu-item px-3'>
        { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/quizzes/list/${id?.id}`)
            }}
          >
            View Quizzes
          </a>}
        </div>
        <div className='menu-item px-3'>
        { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/polls/${id?.id}`)
            }}
          >
            View Polls
          </a>}
        </div>
        <div className='menu-item px-3'>
        { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/transaction-history`,{state:{email:id?.email,id:id?.id}})

            }}
          >
            View Transactions
          </a>}
        </div>

        <div className='menu-item px-3'>
        { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/company-user/${id?.id}`)
            }}
          >
            Company User
          </a>}
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
      {
        open &&  <Modal open={open} onClose={onCloseModal} center>
          <h2 className="my-5 text-center">Update User</h2>
                          <form className="my-5">
          <div className="row">
          <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">First Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editUser?.first_name}  onChange={(e:any)=>{
                                   setEditUser({...editUser,first_name:e?.target?.value})
                                }} placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Last Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.last_name} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,last_name:e?.target?.value})
                                }}  placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Email</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.email} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                  setEditUser({...editUser,email:e?.target?.value})
                                }}  placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Phone Number</label>
                             
                                {/* <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.phone_number} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,phone_number:e?.target?.value})
                                }}  placeholder="" name="first-name"/> */}

      <PhoneInput
      className="form_style form-control form-control-solid fw-bolder" 
        style={{border:"none",outline:"none",background:"#f2f2f2"}}
        countryCallingCodeEditable={true}
        initialValueFormat="national"
        value={editUser?.phone_number}
        defaultCountry={editUser?.countryCode}
            placeholder="Enter phone number"
            onChange={(e:any)=>{             
              setEditUser({...editUser,phone_number:e}) 
              setValidNumber(e && e?.length>0 && isValidPhoneNumber(e))
            }}
            error={editUser?.phone_number ? (isValidPhoneNumber(editUser?.phone_number) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

            <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                <label className="fs-6 fw-semibold mb-1">Custom URL</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.customUrl} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                  setEditUser({...editUser,customUrl:e?.target?.value})
                                }}  placeholder="Enter Custom URL" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                        <label className="required fs-6 fw-semibold mb-1 mx-auto p-5">Update Active Status</label>
                                        <Switch {...label} checked={editUser?.status==1 ? true : false} onChange={(e:any)=>{
                                            setEditUser({...editUser,status:editUser?.status===1?0:1})
                                          }}/>
                                       
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
           
            <div className="col-12 d-flex flex-column">
           {permissionList?.can_edit && <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                 e?.preventDefault()
                 checkValidation()
            }}>Update User</button>}
            </div>
           
          </div>
          
        </form>
                        </Modal>
        }

    </>
  )
}

export {UserActionsCell}
