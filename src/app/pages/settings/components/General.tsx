/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {SettingsName} from './SettingsName'
import {Field, ErrorMessage, useFormik} from 'formik'
import clsx from 'clsx'
import {Button} from './Button'
import axios, {AxiosResponse} from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import * as Yup from 'yup'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'

const General: FC = () => {
  const [values, setValue] = useState<any>()
  const [name,setname]=useState<any>()
  const navigate=useNavigate()
  useEffect(() => {
    getInfo()
  }, [])
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
    const {data}=await axios.get(`${API_URL}/option/quizophy_icons_container`)
    console.log(data)
    setname(data?.name)
       setValue(data?.value)     
  }

  const onSubmit = async (e: any) => {
    e?.preventDefault()
     
    if(!values?.quizophy_light_logo){
      errrorMessage("Quizophy Light Logo is required")
   }
   else if(!values?.quizophy_dark_logo){
     errrorMessage("Quizophy dark Logo is required")
  }
  else if(!values?.quizophy_favicon){
   errrorMessage("Quizophy Favicon is required")
}
else if(!values?.facebook_icon){
 errrorMessage("Facebook Icon is required")
}
else if(!values?.instagram_icon){
errrorMessage("Instagram Icon is required")
}
else if(!values?.linkedin_icon){
errrorMessage("Linkedin Icon is required")
}
else if(!values?.twitter_icon){
errrorMessage("Twitter Icon is required")
}
else if(!values?.payment_success_img){
errrorMessage("Payment Success Image is required")
}
else if(!values?.payment_failed_img){
errrorMessage("Payment Failed Image is required")
}
else if(!values?.thank_you_img){
  errrorMessage("Thank You Image is required")
  }
  else if(!values?.play_store_icon){
  errrorMessage("Play Store Icon is required")
  }
  else{
    const {data}=await axios.put(`${API_URL}/option`,{name,value:values})
    if(data?.success){
     getInfo()
     successMessage("General Settings Updated Successfully")
    }else{
     errrorMessage(data?.message)
    }
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
        const {data}=await axios.post(`${API_URL}/option/upload`,fd)
        if(data?.success){
          return data?.image
          // newArrValue[index].value=""
          // setValue(newArrValue)
          // setValue({...va,profile_image:data?.image})
        }
      }
  }



  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'general'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form className='form row gy-5' onSubmit={onSubmit}>             

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Quizophy Dark Logo</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.quizophy_dark_logo ? values?.quizophy_dark_logo :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Quizophy dark Logo'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,quizophy_dark_logo:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.quizophy_dark_logo!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,quizophy_dark_logo:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Quizophy Light Logo</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.quizophy_light_logo ? values?.quizophy_light_logo :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='quizophy light logo'
                      className='bg-dark image-input-wrapper w-125px h-125px'
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
                      name='quizophy logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,quizophy_light_logo:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.quizophy_light_logo!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,quizophy_light_logo:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>


              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Quizophy Favicon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.quizophy_favicon ? values?.quizophy_favicon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='quizophy favicon'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,quizophy_favicon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.quizophy_favicon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,quizophy_favicon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Facebook Icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.facebook_icon ? values?.facebook_icon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Facebook icon'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,facebook_icon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.facebook_icon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,facebook_icon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Instagram Icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.instagram_icon ? values?.instagram_icon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Instagram Icon'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,instagram_icon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.instagram_icon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,instagram_icon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>


              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Twitter Icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.twitter_icon ? values?.twitter_icon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Twitter Icon'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,twitter_icon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.twitter_icon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,twitter_icon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>LinkedIn Icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.linkedin_icon ? values?.linkedin_icon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Twitter Icon'
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
                      name='LinkedIn Icon'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,linkedin_icon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.linkedin_icon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,linkedin_icon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Payment Success Image</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.payment_success_img ? values?.payment_success_img :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Twitter Icon'
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
                      name='Payment Success image'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,payment_success_img:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.payment_success_img!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,payment_success_img:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>


              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Payment Failed Image</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.payment_failed_img ? values?.payment_failed_img :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Payment failed Image'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,payment_failed_img:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.payment_failed_img!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,payment_failed_img:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Thank You Image</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.thank_you_img ? values?.thank_you_img :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Tnank You Image'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,thank_you_img:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.thank_you_img!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,thank_you_img:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>

              <div  className='col-4 my-6'>
                <label className='d-block form-label'>Play Store Icon</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={ values?.play_store_icon ? values?.play_store_icon :toAbsoluteUrl('/media/svg/avatars/blank.svg')}
                      alt='Play Store Icon'
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
                      name='dark_logo'
                      accept='.png, .jpg, .jpeg'
                      onChange={async (e: any) => {
                       let image=await uploadImage(e?.target?.files)
                       setValue({...values,play_store_icon:image})
                      }}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                   {
                    values?.play_store_icon!=="" &&    <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    type='button'
                    onClick={()=>{
                      setValue({...values,play_store_icon:""})
                    }}
                  >
                    <i className='bi bi-x fs-2'></i>
                  </button>
                   }
                  
                  
                </div>
              </div>
           {permissionList?.can_edit && <Button />}
          </form>
        </div>
      </div>
    </div>
  )
}

export {General}
