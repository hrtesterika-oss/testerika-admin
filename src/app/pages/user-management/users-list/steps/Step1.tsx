import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage, Formik} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import PasswordStrengthBar from 'react-password-strength-bar'
import axios, {AxiosResponse} from 'axios'
import { API_URL } from '../../../settings/components/ApiUrl'
import {USER_URL} from "../core/_requests"
// import {checkEmail} from '../core/_requests'

const Step1= ({roleForEdit,setRoleForEdit}:any) => {
  // console.log(touched, 'touched', errors, values)
  // const validateEmail = async (value: string) => {
  //   let error
  //   var re = /\S+@\S+\.\S+/
  //   let correct = re.test(value)
  //   if (value != '' && correct && !values.id) {
  //     await checkEmail(value)
  //       .then((data: any) => {
  //         if (data.data == 'Email already exists') {
  //           error = data.data
  //           // setFieldError('email', data.data)
  //         } else {
  //           error = null
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  //   return error
  // }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${USER_URL}/upload-image`, fd)
      .then((data: AxiosResponse<any>) => {
        // setFieldValue('profile_image', data.data)
        setRoleForEdit({...roleForEdit,profile_image:data?.data?.image})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const [showPassword, setPasswordShow] = useState(false)
  return (
    // <div className='w-100'>
    //   <div className='fv-row mb-7'>
    //     <label className='d-block form-label'>Profile Image</label>
    //     <div className='image-input image-input-outline' data-kt-image-input='true'>
    //       <div className=''>
    //         <img
    //           src={
    //             values?.profile_image != null
    //               ? values?.profile_image
    //               : toAbsoluteUrl('/media/svg/avatars/blank.svg')
    //           }
    //           alt='avatar'
    //           className='image-input-wrapper w-125px h-125px'
    //         />
    //       </div>
    //       <label
    //         className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
    //         data-kt-image-input-action='change'
    //         data-bs-toggle='tooltip'
    //         title='Change avatar'
    //       >
    //         <i className='bi bi-pencil-fill fs-7'></i>
    //         <input
    //           type='file'
    //           name='profile_image'
    //           accept='.png, .jpg, .jpeg'
    //           onChange={uploadImage}
    //         />
    //         <input type='hidden' name='avatar_remove' />
    //       </label>
    //       {values.profile_image !== null && (
    //         <button
    //           className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
    //           data-kt-image-input-action='remove'
    //           data-bs-toggle='tooltip'
    //           title='Remove avatar'
    //           type='button'
    //           onClick={() => setFieldValue('profile_image', null)}
    //         >
    //           <i className='bi bi-x fs-2'></i>
    //         </button>
    //       )}
    //     </div>
    //     <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='form-label required'>First Name</label>

    //       <Field name='firstname' className='form-control mb-2' placeholder={'Enter First Name'} />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='firstname' />
    //       </div>
    //     </div>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>Last Name</span>
    //       </label>

    //       <Field name='lastname' className='form-control mb-2' placeholder={'Enter Last Name'} />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='lastname' />
    //       </div>
    //     </div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='fs-6 fw-bold form-label required'>Email</label>

    //       <Field
    //         name='email'
    //         className='form-control mb-2'
    //         placeholder={'Enter Valid Email'}
    //         // validate={validateEmail}
    //       />
    //         <div className='text-danger mt-2'>
    //           <ErrorMessage name='email' />
    //         </div>
    //     </div>

    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>Phone Number</span>
    //       </label>

    //       <Field
    //         name='phone'
    //         type={'number'}
    //         className='form-control mb-2'
    //         placeholder={'Enter Valid Phone Number'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='phone' />
    //       </div>
    //     </div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='fs-6 fw-bold form-label required'>DOB</label>
    //       <Field
    //         type={'date'}
    //         name='dob'
    //         className='form-control mb-2'
    //         placeholder={'Enter Valid DOB'}
    //       />
    //         <div className='text-danger mt-2'>
    //           <ErrorMessage name='dob' />
    //         </div>
    //     </div>

    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>City</span>
    //       </label>

    //       <Field
    //         name='address.city'
    //         className='form-control mb-2'
    //         placeholder={'Enter Valid City'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='address.city' />
    //       </div>
    //     </div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='fs-6 fw-bold form-label required'>District</label>

    //       <Field
    //         name='address.district'
    //         className='form-control mb-2'
    //         placeholder={'Enter Correct State'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='address.district' />
    //       </div>
    //     </div>

    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>State</span>
    //       </label>

    //       <Field
    //         name='address.state'
    //         className='form-control mb-2'
    //         placeholder={'Enter Correct State'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='address.state' />
    //       </div>
    //     </div>
    //   </div>

    //   {values?.id && (
    //     <div className='d-flex flex-wrap gap-5 mb-10'>
    //       <div className='fv-row w-100 flex-md-root'>
    //         <label className='fs-6 fw-bold form-label required'>My Referral Code</label>
    //         <Field
    //           name='referral.referral_code'
    //           className='form-control mb-2'
    //           placeholder={'Enter Referral Code'}
    //           disabled={true}
    //         />
    //         <div className='text-danger mt-2'>
    //           <ErrorMessage name='referral.referral_code' />
    //         </div>
    //       </div>

    //       <div className='fv-row w-100 flex-md-root'>
    //         <label className='d-flex align-items-center form-label'>
    //           <span className='required'>Referred By</span>
    //         </label>

    //         <Field
    //           name='referral.refered_by'
    //           className='form-control mb-2'
    //           placeholder={'Enter Referred By'}
    //           disabled={true}
    //         />
    //         <div className='text-danger mt-2'>
    //           <ErrorMessage name='referral.refered_by' />
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='fs-6 fw-bold form-label required'>Device Id</label>

    //       <Field
    //         name='device[0].device_id'
    //         className='form-control mb-2'
    //         placeholder={'Enter Correct DeviceId'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='device[0].device_id' />
    //       </div>
    //     </div>

    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>Device Token</span>
    //       </label>

    //       <Field
    //         name='device[0].device_token'
    //         className='form-control mb-2'
    //         placeholder={'Enter Correct Device Token'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='device[0].device_token' />
    //       </div>
    //     </div>
    //   </div>

    //   <div className='fv-row mb-10'>
    //     <label className='d-flex align-items-center form-label'>
    //       <span className='required'>Fingure Print Enable/Disable</span>
    //     </label>
    //     <Field
    //       as='select'
    //       name='touchId_enable'
    //       className='form-select mb-2'
    //       data-control='select2'
    //       data-hide-search='true'
    //       placeholder='Select an option'
    //     >
    //       <option></option>
    //       <option value={1}>Enable</option>
    //       <option value={0}>Disable</option>
    //     </Field>
    //     <div className='text-danger'>
    //       <ErrorMessage name='touchId_enable' />
    //     </div>
    //   </div>

    //   <div className='fv-row mb-10'>
    //     <label className='d-flex align-items-center form-label'>
    //       <span className='required'>Password</span>
    //     </label>
    //     <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
    //       <div className='position-relative w-100'>
    //         <Field
    //           name='password'
    //           type={!showPassword ? 'password' : 'text'}
    //           className='form-control mb-2'
    //           placeholder={'Enter Strong Password Or Generate'}
    //         />
    //         <button
    //           type='button'
    //           onClick={() => setPasswordShow(!showPassword)}
    //           className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
    //           data-kt-password-meter-control='visibility'
    //         >
    //           {!showPassword ? (
    //             <i className='bi bi-eye-slash fs-2'></i>
    //           ) : (
    //             <i className='bi bi-eye fs-2'></i>
    //           )}
    //         </button>
    //       </div>
    //       <button
    //         type='button'
    //         className='btn btn-lg btn-light-primary w-50 p-0 fs-15'
    //         onClick={() => {
    //           setFieldValue(
    //             'password',
    //             Math.random()
    //               .toString(36)
    //               .slice(2)
    //           )
    //         }}
    //       >
    //         Generate Password
    //       </button>
    //     </div>
    //     <PasswordStrengthBar password={values?.password} />
    //     <div className='text-danger'>
    //       <ErrorMessage name='password' />
    //     </div>
    //   </div>
    // </div>
    <>
    <div className='w-100'>
      <div className='fv-row mb-7'>
        <label className='d-block form-label'>Profile Image</label>
        <div className='image-input image-input-outline' data-kt-image-input='true'>
          <div className=''>
            <img
              src={
               toAbsoluteUrl(roleForEdit?.profile_image?roleForEdit?.profile_image:'/media/svg/avatars/blank.svg')
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
              onChange={uploadImage}
            />
            <input type='hidden' name='avatar_remove' />
          </label>
          
            <button
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              type='button'
              // onClick={() => setFieldValue('profile_image', null)}
            >
              <i className='bi bi-x fs-2'></i>
            </button>
          
        </div>
        <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>First Name</label>
          <input name='firstname' required type="text" value={roleForEdit?.firstname || ""} onChange={(e:any)=>{
               setRoleForEdit({...roleForEdit,firstname:e?.target?.value})
          }} className='form-control mb-2' placeholder={'Enter First Name'} />
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Last Name</label>
          <input name='lastname' required type="text" value={roleForEdit?.lastname || ""} className='form-control mb-2' onChange={(e:any)=>{
                setRoleForEdit({...roleForEdit,lastname:e?.target?.value})
          }}  placeholder={'Enter Last Name'} />
        </div>
      </div>


      <div className='d-flex flex-wrap gap-5 mb-10'>

      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Email</label>
          <input name='email' required type="email"  value={roleForEdit?.email || ""} className='form-control mb-2' onChange={(e:any)=>{
                  setRoleForEdit({...roleForEdit,email:e?.target?.value})
          }}  placeholder={'Enter Email'} />
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Phone Number</label>
          <input name='phone' type="text"  value={roleForEdit?.phone || ""} className='form-control mb-2' onChange={(e:any)=>{
                              setRoleForEdit({...roleForEdit,phone:e?.target?.value})
          }}  placeholder={'Enter Phone Number'} />
        </div>
      </div>

        
      <div className='d-flex flex-wrap gap-5 mb-10'>

      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>City</label>
          <input name='city' type="text"  value={roleForEdit?.city || ""} className='form-control mb-2' onChange={(e:any)=>{
                              setRoleForEdit({...roleForEdit,city:e?.target?.value})

          }}  placeholder={'Enter City'} />
        </div>
        {/* <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>District</label>
          <input name='district' type="text"  value={roleForEdit?.district || ""} className='form-control mb-2' onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,district:e?.target?.value})

          }}  placeholder={'Enter District'} />
        </div> */}
         <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>State</label>
          <input name='state' type="text"  value={roleForEdit?.state || ""} className='form-control mb-2' onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,state:e?.target?.value})

          }}  placeholder={'Enter State'} />
        </div>
      </div>


        
      {/* <div className='d-flex flex-wrap gap-5 mb-10'>

     
        <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Date of Birth (DOB)</label>
          <input name='dob' type="date"   value={roleForEdit?.dob || ""} className='form-control mb-2' onChange={(e:any)=>{
               setRoleForEdit({...roleForEdit,dob:e?.target?.value})
          }}  placeholder={'Enter DOB'} />
        </div>
      </div> */}


      <div className='d-flex flex-wrap gap-5 mb-10'>

<div className='fv-row w-100 flex-md-root'>
    <label className='form-label required'>Country</label>
    <input name='country' type="text" className='form-control mb-2'  value={roleForEdit?.country || ""} onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,country:e?.target?.value})

          }}  placeholder={'Enter Country'} />
  </div>
  <div className='fv-row w-100 flex-md-root'>
    <label className='form-label required'>Pincode</label>
    <input name='pincode' type="text" className='form-control mb-2'  value={roleForEdit?.pincode || ""} onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,pincode:e?.target?.value})

          }}  placeholder={'Enter Pincode'} />
  </div>
</div>


{/* <div className='d-flex flex-wrap gap-5 mb-10'>

<div className='fv-row w-100 flex-md-root'>
    <label className='form-label'>Referral Code</label>
    <input name='referral_code' type="text" className='form-control mb-2'  value={referral?.referral_code || ""} onChange={(e:any)=>{
               setReferral({...referral,referral_code:e?.target?.value})
          }}  placeholder={'Enter Referal Code'} />
  </div>
  <div className='fv-row w-100 flex-md-root'>
    <label className='form-label'>Refered By</label>
    <input name='refered_by' type="text" className='form-control mb-2'  value={referral?.refered_by || ""} onChange={(e:any)=>{
                                            setReferral({...referral,refered_by:e?.target?.value})

          }}  placeholder={'Refered By'} />
  </div>
</div> */}


{/* <div className='d-flex flex-wrap gap-5 mb-10'>

<div className='fv-row w-100 flex-md-root'>
    <label className='form-label '>Device ID</label>
    <input name='device_id' type="text" className='form-control mb-2'  value={device?.device_id || ""} onChange={(e:any)=>{
                                             setDevice({...device,device_id:e?.target?.value})

          }}  placeholder={'Enter Device ID'} />
  </div>
  <div className='fv-row w-100 flex-md-root'>
    <label className='form-label '>Device Token</label>
    <input name='device_token' type="text" className='form-control mb-2'  value={device?.device_token || ""} onChange={(e:any)=>{
                                             setDevice({...device,device_token:e?.target?.value})

          }}  placeholder={'Enter Device Token'} />
  </div>
</div> */}

{/* <div className='d-flex flex-wrap gap-5 mb-10'>

<div className='fv-row w-100 flex-md-root'>
    <label className='form-label '>Device Name</label>
    <input name='device_name' type="text" className='form-control mb-2'  value={device?.device_name || ""} onChange={(e:any)=>{
                                             setDevice({...device,device_name:e?.target?.value})

          }}  placeholder={'Enter Device Name'} />
  </div>

  <div className='fv-row w-100 flex-md-root'>
    <label className='form-label '>Enable FingerPrint</label>
    <select name="touchId_enable" className='form-control form-select required'   value={roleForEdit?.touchId_enable || 0} onChange={(e:any)=>{
                 setRoleForEdit({...roleForEdit,touchId_enable:e?.target?.value==="Disabled"?0:1})

          }} >
               <option>Enabled</option>
               <option>Disabled</option>
            </select>  </div>
</div> */}





        
      <div className='d-flex flex-wrap gap-5 mb-10'>

      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Gender</label>
          <select name="gender" className='form-control form-select required'   value={roleForEdit?.gender || ""} onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,gender:e?.target?.value})

          }} >
               <option>Male</option>
               <option>Female</option>
               <option>Others</option>
            </select>
        </div>
        {/* <div className='fv-row w-100 flex-md-root'>
          <label className='form-label '>Father's Name</label>
          <input name='fathername' type="text" className='form-control mb-2'  value={roleForEdit?.fathername || ""} placeholder={'Enter Father Number'} onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,fathername:e?.target?.value})

          }}  />
        </div> */}

<div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>User Type</label>
          <select className='form-control react-select form-select p-2' value={roleForEdit?.userType} onChange={(e:any)=>{
             setRoleForEdit({...roleForEdit,userType:e?.target?.value})
          }}>
             <option value="student">Student</option>
             <option value="reseller">Reseller</option>
          </select>
          {/* <input name='userType' required type="text" value={roleForEdit?.firstname || ""} onChange={(e:any)=>{
               setRoleForEdit({...roleForEdit,firstname:e?.target?.value})
          }} className='form-control mb-2' placeholder={'Enter First Name'} /> */}
        </div>
      </div>




      {/* <div className='d-flex flex-wrap gap-5 mb-10'>

      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Password</label>
          <div className="d-flex justify-content-between align-items-center">
          <input name='password' type="password" className='form-control mb-2 w-50'  value={roleForEdit?.password || ""} onChange={(e:any)=>{
                                             setRoleForEdit({...roleForEdit,password:e?.target?.value})

          }}  placeholder={'Enter Password'} />
         <button className="btn btn-primary" onClick={(e:any)=>{
                 e?.preventDefault()
                setRoleForEdit({...roleForEdit,password:Math.random().toString(36).slice(2)})
         }}>Generate password</button>
          </div>
          
        </div>
       
      </div> */}
      </div>


      
      

      

      {/* <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Email</label>

          <Field
            name='email'
            className='form-control mb-2'
            placeholder={'Enter Valid Email'}
            // validate={validateEmail}
          />
            <div className='text-danger mt-2'>
              <ErrorMessage name='email' />
            </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Phone Number</span>
          </label>

          <Field
            name='phone'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter Valid Phone Number'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='phone' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>DOB</label>
          <Field
            type={'date'}
            name='dob'
            className='form-control mb-2'
            placeholder={'Enter Valid DOB'}
          />
            <div className='text-danger mt-2'>
              <ErrorMessage name='dob' />
            </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>City</span>
          </label>

          <Field
            name='address.city'
            className='form-control mb-2'
            placeholder={'Enter Valid City'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.city' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>District</label>

          <Field
            name='address.district'
            className='form-control mb-2'
            placeholder={'Enter Correct State'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.district' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>State</span>
          </label>

          <Field
            name='address.state'
            className='form-control mb-2'
            placeholder={'Enter Correct State'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='address.state' />
          </div>
        </div>
      </div>

      {values?.id && (
        <div className='d-flex flex-wrap gap-5 mb-10'>
          <div className='fv-row w-100 flex-md-root'>
            <label className='fs-6 fw-bold form-label required'>My Referral Code</label>
            <Field
              name='referral.referral_code'
              className='form-control mb-2'
              placeholder={'Enter Referral Code'}
              disabled={true}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='referral.referral_code' />
            </div>
          </div>

          <div className='fv-row w-100 flex-md-root'>
            <label className='d-flex align-items-center form-label'>
              <span className='required'>Referred By</span>
            </label>

            <Field
              name='referral.refered_by'
              className='form-control mb-2'
              placeholder={'Enter Referred By'}
              disabled={true}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='referral.refered_by' />
            </div>
          </div>
        </div>
      )}

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Device Id</label>

          <Field
            name='device[0].device_id'
            className='form-control mb-2'
            placeholder={'Enter Correct DeviceId'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='device[0].device_id' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Device Token</span>
          </label>

          <Field
            name='device[0].device_token'
            className='form-control mb-2'
            placeholder={'Enter Correct Device Token'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='device[0].device_token' />
          </div>
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Fingure Print Enable/Disable</span>
        </label>
        <Field
          as='select'
          name='touchId_enable'
          className='form-select mb-2'
          data-control='select2'
          data-hide-search='true'
          placeholder='Select an option'
        >
          <option></option>
          <option value={1}>Enable</option>
          <option value={0}>Disable</option>
        </Field>
        <div className='text-danger'>
          <ErrorMessage name='touchId_enable' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Password</span>
        </label>
        <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
          <div className='position-relative w-100'>
            <Field
              name='password'
              type={!showPassword ? 'password' : 'text'}
              className='form-control mb-2'
              placeholder={'Enter Strong Password Or Generate'}
            />
            <button
              type='button'
              onClick={() => setPasswordShow(!showPassword)}
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
              setFieldValue(
                'password',
                Math.random()
                  .toString(36)
                  .slice(2)
              )
            }}
          >
            Generate Password
          </button>
        </div>
        <PasswordStrengthBar password={values?.password} />
        <div className='text-danger'>
          <ErrorMessage name='password' />
        </div>
      </div> */}
    {/* </div> */}
    </>
  )
}

export {Step1}
