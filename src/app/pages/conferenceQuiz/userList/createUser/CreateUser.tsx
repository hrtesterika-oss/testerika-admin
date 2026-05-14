import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import "./css/index.css"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import ReactCountryFlag from "react-country-flag"
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { createNewUser } from '../interface';
import { APIURLAUTH } from '../../APIURL';
import ToastComp from '../ToastComp';
import { useSelector } from 'react-redux';
const CreateUser = () => {
  const [validNumber,setValidNumber]=useState<any>(false)

  const [newUser,setNewUser]=useState<createNewUser>({
    first_name:"",
    last_name:"",
    email:"",
    phone_number:"",
    password:"",
  })
  const [show,setShow]=useState<boolean>(false)
  

  const navigate=useNavigate()
 
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    if(!result[0]?.can_create)
      navigate("/conference-quiz/user")
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])

  const checkValidation=async()=>{
    if(newUser?.first_name.trim().length<3){
      ToastComp({message:"First name cannot be less than 3 characters",type:"Error"})
      return false
    } 
    else if(newUser?.last_name.trim().length<3){
      ToastComp({message:"Last name cannot be less than 3 characters",type:"Error"})
      return false
    }  
    else if (!validator.isEmail(newUser?.email)) {
      ToastComp({message:"Invalid Email",type:"Error"})

        return; 
          }
          else if(newUser?.password?.length<8){
            ToastComp({message:"Password cannot be less than 8 characters",type:"Error"})
              return false
        }

    else if(!isValidPhoneNumber(newUser?.phone_number)){
      ToastComp({message:"Invalid Mobile Number",type:"Error"})

      return; 
     }
     else{
         const {data}=await axios.post(`${APIURLAUTH}/admin/create-new-user`,{data:newUser})
         if(data?.success){
          ToastComp({message:data?.message,type:"Success"})

                navigate("/conference-quiz/user")       
            }else{
              ToastComp({message:data?.message,type:"Error"})
            }
     }
    
  }

  return (
    <div className="container">
        <div className="row">
           <div className="col-12">
           <form className="my-5">
          <div className="row">
          <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">First Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={newUser?.first_name}  onChange={(e:any)=>{
                                   setNewUser({...newUser,first_name:e?.target?.value})
                                }} placeholder="Enter First Name" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Last Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={newUser?.last_name} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setNewUser({...newUser,last_name:e?.target?.value})
                                }}  placeholder="Enter Last Name" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Email</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={newUser?.email} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setNewUser({...newUser,email:e?.target?.value})
                                }}  placeholder="Enter Email" name="email"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3" style={{position:"relative"}}>
                                <label className="required fs-6 fw-semibold mb-1">Password</label>
                             
                                <input type={show?"text":"password"} className="form_style form-control form-control-solid fw-bolder" value={newUser?.password} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setNewUser({...newUser,password:e?.target?.value})
                                }}  placeholder="Enter Password" name="password"/>
                                
                                {
                                  newUser?.password?.length>0 &&  <div style={{position:"absolute",top:"25px",left:"90%"}}>
                                    {
                                       show ? <AiFillEyeInvisible style={{fontSize:"40px",color:"red",cursor:"pointer"}} onClick={()=>{
                                        setShow(!show)
                                       }}/>:<AiFillEye style={{fontSize:"40px",color:"green",cursor:"pointer"}} onClick={()=>{
                                        setShow(!show)
                                       }}/>
                                    }
                                </div>
                                }

            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Phone Number</label>
                             
                                {/* <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.phone_number} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,phone_number:e?.target?.value})
                                }}  placeholder="" name="first-name"/> */}

      <PhoneInput
      className="form_style form-control form-control-solid fw-bolder" 
        style={{border:"none",outline:"none",background:"#f2f2f2"}}
        countryCallingCodeEditable={true}
        initialValueFormat="national"
        value={newUser?.phone_number}
        defaultCountry="IN"
            placeholder="Enter phone number"
            onChange={(e:any)=>{             
              setValidNumber(e && e?.length>0 && isValidPhoneNumber(e))
              setNewUser({...newUser,phone_number:e})
            }}
            error={newUser?.phone_number ? (isValidPhoneNumber(newUser?.phone_number) ? undefined : 'Invalid phone number') : 'Phone number required'}
            />
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
           
            {/* <div className="col-md-4 fv-row fv-plugins-icon-container mt-3"> */}
                                {/* <label className="required fs-6 fw-semibold mb-1">Country Code</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" value={editUser?.countryCode} style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                   setEditUser({...editUser,countryCode:e?.target?.value})
                                }}  placeholder="" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> */}
            <div className="col-12 d-flex flex-column">
            <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                 e?.preventDefault()
                 checkValidation()
            }}>Create New User</button>
            </div>
           
          </div>
          
        </form>
           </div>

       
        
        </div>
    </div>
  )
}

export default CreateUser