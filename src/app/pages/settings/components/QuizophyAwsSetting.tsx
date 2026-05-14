import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const QuizophyAwsSetting: FC = () => {
  const [values, setValue] = useState<any>()
  const [name,setName]=useState<any>()
  useEffect(() => {
    getInfo()
  }, [])

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

  const getInfo = async () => {
    const {data}=await axios.get(`${API_URL}/option/quizophy_AWS_settings`)
    setName(data?.name)
       setValue(data?.value)
     
  }

  const onSubmit = async (e: any) => {
    e?.preventDefault()
    if(!values.quizophy_aws_s3_bucket_name){
      errrorMessage("AWS Bucket Name is required")
    }
    else if(!values?.quizophy_aws_s3_access_key){
       errrorMessage("AWS Access Key is required")
    }
    else if(!values?.quizophy_aws_s3_access_secret_key){
      errrorMessage("AWS access secret key is required")
   }
   else if(!values?.open_AI_API_key){
    errrorMessage("AI API Key  is required")
 }
 else if(!values?.pusher_key){
  errrorMessage("Pusher key is required")
}
else if(!values?.pusher_cluster_name){
errrorMessage("Pusher Cluster name is required")
}
else if(!values?.pusher_API_ID){
errrorMessage("Pusher API ID is required")
}
else if(!values?.pusher_API_secret_key){
errrorMessage("Pusher API Secret key is required")
}else{
  const {data}=await axios.put(`${API_URL}/option`,{name,value:values})
       if(data?.success){
        getInfo()
        successMessage("AWS Settings updated successfully")
       }else{
        errrorMessage(data?.message)
       }
}
    
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active='quizophy-AWS-settings' />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <span className='text-muted mb-10'>
            These information will be displayed on invoices/estimates/payments and other PDF
            documents where company info is required
          </span>
          <form className='form row' onSubmit={onSubmit} noValidate>
                <div className='row gy-5 mb-10'>

                        <div className='col-md-6'>
                          <label className='required fw-bold fs-6 mb-2'>Testerika AWS S3 Bucket Name</label>
                          <input
                            placeholder={`Enter Testerika AWS S3 Bucket Name`}
                            type={'text'}
                            name={`quizophy_aws_s3_bucket_name`}
                            onChange={(e:any)=>{
                              setValue({...values,[e?.target?.name]:e?.target?.value})
                            }}
                            value={values?.quizophy_aws_s3_bucket_name|| ""}
                            className={clsx('form-control mb-3 mb-lg-0')}
                            autoComplete='off'
                          />
                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Testerika AWS S3 Access Key</label>
                        <input
                        placeholder='Enter Testerika AWS s3 Access Key'
                        type="text"
                        name={`quizophy_aws_s3_access_key`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.quizophy_aws_s3_access_key|| ""}
                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />

                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Testerika AWS S3 Access Secret Key</label>
                        <input
                        placeholder='Enter Testerika AWS s3 Access Secret Key'
                        type={'text'}
                        name={`quizophy_aws_s3_access_secret_key`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.quizophy_aws_s3_access_secret_key|| ""}
                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />
                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Open AI API Key</label>
                        <input
                        placeholder='Enter Open AI API Key'
                        type="text"
                        name={`open_AI_API_key`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.open_AI_API_key|| ""}

                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />

                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Pusher Key</label>
                        <input
                        placeholder='Enter Pusher Key'
                        type="text"
                        name={`pusher_key`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.pusher_key|| ""}

                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />
                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Pusher Cluster Name</label>
                        <input
                        placeholder='Enter Pusher Cluster Name'
                        type="text"
                        name={`pusher_cluster_name`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.pusher_cluster_name|| ""}

                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />

                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Pusher API ID</label>
                        <input
                        placeholder='Enter Pusher API ID'
                        type="text"
                        name={`pusher_API_ID`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.pusher_API_ID|| ""}

                        className={clsx('form-control mb-3 mb-lg-0')}
                        autoComplete='off'
                        />
                        </div>
                        <div className=' col-md-6'>
                        <label className='required fw-bold fs-6 mb-2'>Pusher API Secret Key</label>
                        <input
                        placeholder='Enter Pusher API Secret Key'
                        type="text"
                        name={`pusher_API_secret_key`}
                        onChange={(e:any)=>{
                          setValue({...values,[e?.target?.name]:e?.target?.value})
                        }}
                        value={values?.pusher_API_secret_key|| ""}

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

export default QuizophyAwsSetting
