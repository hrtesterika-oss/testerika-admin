/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Localization: FC = () => {
  const [values, setValue] = useState<any>()
  const [name,setName]=useState<any>()
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
    const {data}=await axios.get(`${API_URL}/option/company_localization`)
     setName(data?.name)
      setValue(data?.value)
    
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()   

     const {data}=await axios.put(`${API_URL}/option`,{name,value:values})
     if(data?.success){
      getInfo()
      successMessage("Company Localization Updated Successfully")
     }else{
      errrorMessage(data?.message)
     }
  
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'localization'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form row' onSubmit={onSubmit}>
            <div  className='col-6 mb-5'>
                <label className='required fw-bold fs-6 mb-2'>Date Format</label>
                <select
                  placeholder='Select Date Format'
                  name={`Date_Format`}
                  onChange={(e:any)=>{
                     setValue({...values,[e?.target?.name]:e?.target?.value})
                  }}
                  value={values?.Date_Format}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
               
                  <option>yyyy-mm-dd</option>
                  <option>yyyy/mm/dd</option>
                  <option>yyyy.mm.dd</option>
                  <option>dd-mm-yyyy</option>
                  <option>dd/mm/yyyy</option>
                  <option>dd.mm.yyyy</option>
                  <option>mm-dd-yyyy</option>
                  <option>mm.dd.yyyy</option>
                  <option>mm/dd/yyyy</option>
                  </select>
          </div>
          <div  className='col-6 mb-5'>
                <label className='required fw-bold fs-6 mb-2'>Deafult Timezone</label>
                <select
                  placeholder='Select TimeZone'
                  name={`Default_Timezone`}
                  onChange={(e:any)=>{
                     setValue({...values,[e?.target?.name]:e?.target?.value})
                  }}
                  value={values?.Default_Timezone}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
               
                  <option>yyyy-mm-dd</option>
                  <option>yyyy/mm/dd</option>
                  <option>yyyy.mm.dd</option>
                  <option>dd-mm-yyyy</option>
                  <option>dd/mm/yyyy</option>
                  <option>dd.mm.yyyy</option>
                  <option>mm-dd-yyyy</option>
                  <option>mm.dd.yyyy</option>
                  <option>mm/dd/yyyy</option>
                  </select>
          </div>
          <div  className='col-6 mb-5'>
                <label className='required fw-bold fs-6 mb-2'>Time Format</label>
                <select
                 name={`Time_Format`}
                 onChange={(e:any)=>{
                    setValue({...values,[e?.target?.name]:e?.target?.value})
                 }}
                 value={values?.Time_Format}
                  placeholder='Select Time Format'
                 
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
               
                  <option>24 hours</option>
                  <option>12 hours</option>
                  </select>
          </div>
          <div  className='col-6 mb-5'>
                <label className='required fw-bold fs-6 mb-2'>Default Language</label>
                <select
                  name={`Default_Language`}
                  onChange={(e:any)=>{
                    setValue({...values,[e?.target?.name]:e?.target?.value})
                  }}
                  value={values?.Default_Language}  
                placeholder='Select Laguage'
                
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                >
               
                  <option>English</option>
                  <option>Hindi</option>
                  </select>
          </div>
            

           {permissionList?.can_edit && <Button />}
          </form>
        </div>
      </div>
    </div>
  )
}

export {Localization}
