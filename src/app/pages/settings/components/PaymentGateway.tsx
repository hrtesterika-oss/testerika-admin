/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import "../css/paymentGateway.css"
import Switch from '@mui/material/Switch';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const PaymentGateway: FC = () => {
  const [activeGateway,setActiveGateway]=useState<any>("RazorPay")
  const [credentialMode,setCredentialMode]=useState<any>("Test")
  const [activeCredentialMode,setActiveCredentialMode]=useState<boolean>(false)
 const [paymentGatewayCredential,setpaymentGatewayCredential]=useState<any>()
  const [createPaymnetGatewayCredentials,setCreatePaymnetGatewayCredentials]=useState<any>({
    payment_gateway_name:activeGateway,
    credential_mode:credentialMode,
    public_key:"",
    secret_key:"",
    merchant_id:"",
    active_status:true
  })
const navigate= useNavigate()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
    if(!result[0]?.can_view){
       navigate("/dashboard")
    }
  }
  useEffect(()=>{
    filterStaffPermission(navItem.item)
    },[])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(paymentGatewayCredential?.id){
      setpaymentGatewayCredential({...paymentGatewayCredential,active_status:event?.target?.checked});
    }else{
      setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,active_status:event?.target?.checked});
    }

  };

  const getPaymnetGatewayCredentialsInfo=async ()=>{
    const {data}=await axios.get(`${APIURLQUIZ}/admin/getPaymnetGatewayCredential/${activeGateway}/${credentialMode}`)
     if(data?.success){
        setpaymentGatewayCredential(data?.data)
        setCreatePaymnetGatewayCredentials({payment_gateway_name:activeGateway,
        credential_mode:credentialMode,
        public_key:"",
        secret_key:"",
        merchant_id:"",
        active_status:true})
     }
  }

  const deleteCredential=async ()=>{
     const {data}=await axios.delete(`${APIURLQUIZ}/admin/deletePaymnetGatewayCredentialsUsingId/${paymentGatewayCredential?.id}`)
     if(data?.success){
    successMessage("Credential Deleted Successfully")
        getPaymnetGatewayCredentialsInfo()
     }
  }
  const updateCredential=async()=>{
      if(paymentGatewayCredential?.id){
        if(paymentGatewayCredential?.public_key?.trim()==""){
          errrorMessage("Public key should not be empty")
            return
        }
        else if(activeGateway!="PhonePe" && paymentGatewayCredential?.secret_key?.trim()==""){
          errrorMessage("Secret key should not be empty")
            return
        }
        else if((activeGateway=="Braintree" || activeGateway=="PhonePe") && !paymentGatewayCredential?.merchant_id?.trim()){
          errrorMessage("merchant ID should not be empty")
            return
        }
        else{
          const {data}=await axios.put(`${APIURLQUIZ}/admin/updatePaymnetGatewayCredential/${paymentGatewayCredential?.id}`,{data:paymentGatewayCredential})
          if(data?.success){
            successMessage("Credential Updated Successfully")
             getPaymnetGatewayCredentialsInfo()
          }
        }
        
      }else{
        if(createPaymnetGatewayCredentials?.public_key?.trim()==""){
          errrorMessage("Public key should not be empty")
            return
        }
        else if(activeGateway!="PhonePe" && createPaymnetGatewayCredentials?.secret_key?.trim()==""){
          errrorMessage("Secret key should not be empty")
            return
        }
        else if((activeGateway=="Braintree" || activeGateway=="PhonePe") && !createPaymnetGatewayCredentials?.merchant_id){
          errrorMessage("merchant ID should not be empty")
            return
        }
        else{  
        const {data}=await axios.post(`${APIURLQUIZ}/admin/createPaymnetGatewayCredential`,{data:createPaymnetGatewayCredentials})
        if(data?.success){
          successMessage("Credential Created Successfully")
           getPaymnetGatewayCredentialsInfo()
        }
      }
      }
      
    
     
  }
  useEffect(()=>{
       getPaymnetGatewayCredentialsInfo()
  },[activeGateway,setActiveGateway,credentialMode,setCredentialMode])

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'payment-gateways'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <div className='d-flex' style={{flexDirection:"row",justifyContent:"space-between"}}>
            <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("RazorPay")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"RazorPay",credential_mode:"Test"})
            }} className={activeGateway==="RazorPay"?"active_paymnet_gateway":""}>RazorPay</h4>
            <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("PayPal")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"PayPal",credential_mode:"Test"})

            }} className={activeGateway==="PayPal"?"active_paymnet_gateway":""}>PayPal</h4>
            <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("Stripe")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"Stripe",credential_mode:"Test"})

            }} className={activeGateway==="Stripe"?"active_paymnet_gateway":""}>Stripe</h4>
            <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("Braintree")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"Braintree",credential_mode:"Test"})

            }} className={activeGateway==="Braintree"?"active_paymnet_gateway":""}>Braintree</h4>
            <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("PayStack")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"PayStack",credential_mode:"Test"})

            }} className={activeGateway==="PayStack"?"active_paymnet_gateway":""}>PayStack</h4>
             <h4 style={{cursor:"pointer"}} onClick={()=>{
              setActiveGateway("PhonePe")
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,payment_gateway_name:"PhonePe",credential_mode:"Test"})

            }} className={activeGateway==="PhonePe"?"active_paymnet_gateway":""}>PhonePe</h4>
          </div>
          <div className='separator separator-dashed my-5'></div>

          <div className='d-flex' style={{flexDirection:"row",justifyContent:"space-around"}}>
             <h3 style={{cursor:"pointer",fontSize:"14px"}} onClick={()=>{
              setCredentialMode("Test")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,credential_mode:"Test"})

             }} className={credentialMode==="Test"?"credential_active_paymnet_gateway":""}>Test Credentials</h3>
             <h3 style={{cursor:"pointer",fontSize:"14px"}} onClick={()=>
              {setCredentialMode("Live")
              setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,credential_mode:"Live"})

             }} className={credentialMode==="Live"?"credential_active_paymnet_gateway":""}>Live Creadentials</h3>
          </div>
          <div className='separator separator-dashed my-5'></div>

          <div className='container'>
            {
              activeGateway==="RazorPay" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">RazorPay Api Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                           if(paymentGatewayCredential?.id){
                            setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                           }else{
                            setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                           }
                      }} placeholder="Enter RazorPay API Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">RazorPay Secret Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                          if(paymentGatewayCredential?.id){
                            setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                          }else{
                            setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                          }
                      }} placeholder="Enter RazorPay Secret Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">RazorPay Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                        if(paymentGatewayCredential?.id){
                          setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                        }else{
                          setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                        }
                      }} placeholder="Enter RazorPay Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange} value=""/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  { permissionList?.can_delete && <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()
                    }}>Delete Credentials</button>}
                   
                   {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }
             {
              activeGateway==="PayPal" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayPal Client Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                                 }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                                 }
                      }} placeholder="Enter PayPal Client Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayPal Secret Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                                  if(paymentGatewayCredential?.id){
                                    setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                                  }else{
                                    setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                                  }
                      }} placeholder="Enter PayPal Secret Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayPal Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                                   if(paymentGatewayCredential?.id){
                                    setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                                  }else{
                                    setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                                  }
                      }} placeholder="Enter PayPal Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange} value=""/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  {
                    permissionList?.can_delete &&
                    <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()

                    }}>Delete Credentials</button>}
                   {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }
             {
              activeGateway==="Stripe" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Stripe Public Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                              if(paymentGatewayCredential?.id){
                                setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                               }else{
                                setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                               }
                      }} placeholder="Enter Stripe Public Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Stripe Secret Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                                }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                                }
                      }} placeholder="Enter Stripe Secret Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Stripe Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                                   if(paymentGatewayCredential?.id){
                                    setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                                  }else{
                                    setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                                  }
                      }} placeholder="Enter Stripe Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange} value=""/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  {permissionList?.can_delete &&  <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()

                    }}>Delete Credentials</button>}
                    {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }
             {
              activeGateway==="PayStack" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayStack Client Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                                  if(paymentGatewayCredential?.id){
                                    setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                                   }else{
                                    setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                                   }
                      }} placeholder="Enter PayStack Client Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayStack Secret Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                                }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                                }
                      }} placeholder="Enter PayStack Secret Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PayStack Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                                }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                                }
                      }} placeholder="Enter PayStack Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange} value=""/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  {permissionList?.can_delete &&  <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()

                    }}>Delete Credentials</button>}
                  {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }
             {
              activeGateway==="Braintree" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Braintree Public Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                                  if(paymentGatewayCredential?.id){
                                    setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                                   }else{
                                    setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                                   }
                      }} placeholder="Enter Braintree Public Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Braintree Private Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                                }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                                }
                      }} placeholder="Enter Braintree Private Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">Braintree Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                                if(paymentGatewayCredential?.id){
                                  setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                                }else{
                                  setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                                }
                      }} placeholder="Enter Braintree Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange}/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  {permissionList?.can_delete &&  <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()

                    }}>Delete Credentials</button>}
                    {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }

           {
              activeGateway==="PhonePe" &&  <div className="row">
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PhonePe Salt Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.public_key ? paymentGatewayCredential?.public_key :createPaymnetGatewayCredentials?.public_key}  onChange={(e:any)=>{
                           if(paymentGatewayCredential?.id){
                            setpaymentGatewayCredential({...paymentGatewayCredential,public_key:e?.target?.value});
                           }else{
                            setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,public_key:e?.target?.value});
                           }
                      }} placeholder="Enter PhonePe Salt Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PhonePe Secret Key</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.secret_key ? paymentGatewayCredential?.secret_key :createPaymnetGatewayCredentials?.secret_key}  onChange={(e:any)=>{
                          if(paymentGatewayCredential?.id){
                            setpaymentGatewayCredential({...paymentGatewayCredential,secret_key:e?.target?.value});
                          }else{
                            setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,secret_key:e?.target?.value});
                          }
                      }} placeholder="Enter PhonePe Secret Key" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                      <label className="required fs-6 fw-semibold mb-1">PhonePe Merchant ID</label>
                   
                      <input type="text" className="form_style form-control form-control-solid fw-bolder " style={{background:"#eef3f5"}} value={paymentGatewayCredential?.merchant_id ? paymentGatewayCredential?.merchant_id :createPaymnetGatewayCredentials?.merchant_id}  onChange={(e:any)=>{
                        if(paymentGatewayCredential?.id){
                          setpaymentGatewayCredential({...paymentGatewayCredential,merchant_id:e?.target?.value});
                        }else{
                          setCreatePaymnetGatewayCredentials({...createPaymnetGatewayCredentials,merchant_id:e?.target?.value});
                        }
                      }} placeholder="Enter PhonePe Merchant ID" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-6">
                      <label className="required fs-6 fw-semibold mb-1">Activate Credentials</label>
                      <Switch {...label} checked={paymentGatewayCredential?.id ? paymentGatewayCredential?.active_status : createPaymnetGatewayCredentials?.active_status} onChange={permissionList?.can_edit && handleChange} value=""/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

              <div className="col-12 d-flex flex-row">
                  { permissionList?.can_delete && <button className="btn btn-danger mt-5 text-center mx-auto" disabled={paymentGatewayCredential?.id ? false : true} onClick={(e:any)=>{
                        e?.preventDefault()
                        deleteCredential()
                    }}>Delete Credentials</button>}
                   
                   {
                    ((paymentGatewayCredential?.id && permissionList?.can_edit) ||  (!paymentGatewayCredential?.id && permissionList?.can_create)) &&
                   
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                        e?.preventDefault()
                        updateCredential()
                    }}>{paymentGatewayCredential?.id ? "Update" : "Create"} Credentials</button>}
              </div>
              </div>
            }
         
          </div>
          
        </div>
      </div>
    </div>
    
  )
}

export {PaymentGateway}
