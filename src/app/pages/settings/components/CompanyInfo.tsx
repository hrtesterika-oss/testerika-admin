/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CompanyInfo: FC = () => {
  const [name,setname]=useState<any>()
  const [values, setValue] = useState<any>()
  const navigate=useNavigate()
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
  useEffect(() => {
    getInfo()
  }, [])


  const getInfo = async () => {
    const {data}=await axios.get(`${API_URL}/option/company_information`)
      console.log(data)
      setname(data?.name)
       setValue(data?.value)     
  }

  const onSubmit = async (e: any) => {
    e?.preventDefault()
    if(!values.Name){
      errrorMessage("Company Name is required")
    }
    else if(!values?.Address){
       errrorMessage("Company Address is required")
    }
    else if(!values?.City){
      errrorMessage("City is required")
   }
   else if(!values?.State){
    errrorMessage("State is required")
 }
 else if(!String(values?.Phone_number) ){
  errrorMessage("Phone Number is required")
}
else if(!values?.Country_Code){
errrorMessage("Country Code is required")
}
else if(!values?.ZIP_Code){
errrorMessage("ZIP Code is required")
}
else if(!values?.Quizophy_Domain){
errrorMessage("Quizophy Domain is required")
}
else if(!values?.GST_Number){
errrorMessage("GST Number is required")
}
else if(!values?.File_Type){
errrorMessage("File type is required")
}else{
  const {data}=await axios.put(`${API_URL}/option`,{name,value:values})
  if(data?.success){
   getInfo()
   successMessage("Company Information Updated Successfully")
  }else{
   errrorMessage(data?.message)
  }
}
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active='company-information' />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <span className='text-muted mb-10'>
            These information will be displayed on invoices/estimates/payments and other PDF
            documents where company info is required
          </span>
          <form className='form row' onSubmit={onSubmit} noValidate>

                      <div className='row gy-5 mb-10'>

                      <div className='col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Company Name</label>
                        <input
                          placeholder={`Enter Company Name`}
                          type={'text'}
                          name={`Name`}
                          onChange={(e:any)=>{
                            setValue({...values,[e?.target?.name]:e?.target?.value})
                          }}
                          value={values?.Name|| ""}
                          className={clsx('form-control mb-3 mb-lg-0')}
                          autoComplete='off'
                        />
                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>Company Address</label>
                      <input
                      placeholder='Enter SMTP Username'
                      type="text"
                      name={`Address`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Address|| ""}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>City</label>
                      <input
                      placeholder='Enter City'
                      type={'text'}
                      name={`City`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.City|| ""}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />
                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>State</label>
                      <input
                      placeholder='Enter State'
                      type="text"
                      name={`State`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.State|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>Country Code</label>
                      <input
                      placeholder='Enter Country Code'
                      type="text"
                      name={`Country_Code`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Country_Code|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />
                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>ZIP Code</label>
                      <input
                      placeholder='Enter ZIP Code'
                      type="number"
                      name={`ZIP_Code`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.ZIP_Code|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>Phone Number</label>
                      <input
                      placeholder='Enter Phone Number'
                      type="number"
                      name={`Phone_Number`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Phone_Number|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />
                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>Quizophy Domain</label>
                      <input
                      placeholder='Enter Quizophy Domain'
                      type="text"
                      name={`Quizophy_Domain`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Quizophy_Domain|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>GST Number</label>
                      <input
                      placeholder='Enter GST Number'
                      type="text"
                      name={`GST_Number`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.GST_Number|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      <div className=' col-md-6'>
                      <label className='required fw-bold fs-6 mb-2'>File Type</label>
                      <input
                      placeholder='Enter File Type'
                      type="text"
                      name={`File_Type`}
                      onChange={(e:any)=>{
                        setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.File_Type|| ""}

                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                      />

                      </div>
                      </div>
            
           {permissionList?.can_edit && <Button />}
          </form>
        </div>
      </div>
    </div>
  )
}

export {CompanyInfo}
