import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'

type Props = {
  values: any
  setFieldValue: any
}

const Step4= ({pan,setPan}:any) => {


  return (
    // <div className='w-100'>
    //   <div className='fv-row mb-10'>
    //     <label className='form-label required'>Name</label>
    //     <Field name='pan.name' className='form-control mb-2' />
    //     <div className='text-danger mt-2'>
    //       <ErrorMessage name='pan.name' />
    //     </div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='form-label required'>Pan Number</label>

    //       <Field
    //         name='pan.pannumber'
    //         className='form-control mb-2'
    //         placeholder={'Enter Pan Number'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='pan.pannumber' />
    //       </div>
    //     </div>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>DOB</span>
    //       </label>

    //       <Field
    //         name='pan.dob'
    //         type={'date'}
    //         className='form-control mb-2'
    //         placeholder={'Enter DOB'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='pan.dob' />
    //       </div>
    //     </div>
    //   </div>

    //   {values?.pan?.id && (
    //     <>
    //       <div className='d-flex flex-wrap gap-5 mb-10'>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='form-label'>Verified At</label>

    //           <Field
    //             name='pan.verification.verified_at'
    //             type={'date'}
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified At'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='pan.verification.verified_at' />
    //           </div> */}
    //         </div>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='d-flex align-items-center form-label'>
    //             <span className='form-label'>Verified By</span>
    //           </label>

    //           <Field
    //             name='pan.verification.verified_by'
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified By'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='pan.verification.verified_by' />
    //           </div> */}
    //         </div>
    //       </div>

    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Status</label>

    //         <Field
    //           as='select'
    //           name='pan.pan_status'
    //           className='form-select mb-2'
    //           data-control='select2'
    //           data-hide-search='true'
    //           data-placeholder='Select an option'
    //         >
    //           {<option></option>}
    //           <option>Varified</option>
    //           <option>Review</option>
    //           <option>Pending</option>
    //           <option>Error</option>
    //         </Field>
    //         {/* <div className='text-danger mt-2'>
    //           <ErrorMessage name='pan.pan_status' />
    //         </div> */}
    //       </div>

    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Rejection Reason</label>
    //         <Field
    //           name='pan.reject_reason'
    //           as='textarea'
    //           rows={4}
    //           className='form-control mb-2'
    //           placeholder={'Enter Rejection Reason'}
    //         />
    //         {/* <div className='text-danger mt-2'>
    //           <ErrorMessage name='pan.reject_reason' />
    //         </div> */}
    //       </div>

    //       <label className='form-check form-check-sm form-check-custom me-5 me-lg-15'>
    //         <Field className='form-check-input' type='checkbox' name='pan.verification.verified' />
    //         <span className='form-check-label fw-bold'>Is PAN Card Verified </span>
    //       </label>
    //     </>
    //   )}
    // </div>
    <>
    <div className="w-100">
    <div className='fv-row w-100 flex-md-root'>
        <label className='form-label required'>Name</label>
        <input name='name' type="text" className='form-control mb-2' placeholder={'Enter Name'} value={pan?.name || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification},name:e?.target?.value})
        }} />
      </div>

      <div className='fv-row w-100 flex-md-root'>
        <label className='form-label required'>PAN Number</label>
        <input name='pannumber' type="text" className='form-control mb-2' placeholder={'Enter PAN Number'} value={pan?.pannumber || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification},pannumber:e?.target?.value})
        }}/>
      </div>
    <div className='fv-row w-100 flex-md-root'>
        <label className='form-label required'>DOB</label>
        <input name='dob' type="date" className='form-control mb-2' placeholder={'Enter Date of Birth'} value={pan?.dob || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification},dob:e?.target?.value})
        }}/>
      </div>

    <div className='fv-row mb-10'>
      <label className='form-label required'>Verified At</label>
      <input name='verified_at' className='form-control mb-2' type='date' placeholder="Enter Verified At" value={pan?.verification?.verified_at || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification,verified_at:e?.target?.value}})
        }}/>
     
    </div>

    <div className='fv-row mb-10'>
      <label className='form-label required'>Verified By</label>
      <input name='verified_by' className='form-control mb-2' type='text' placeholder="Enter Verified By" value={pan?.verification?.verified_by || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification,verified_by:e?.target?.value}})
        }}/>
     
    </div>

    <div className='fv-row mb-10'>
      <label className='form-label required'>PAN Status</label>
      <select name="pan_status" className='form-control form-select required' value={pan?.pan_status || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification},pan_status:e?.target?.value})
        }}>
           <option></option>
             <option>Verified</option>
             <option>Rejected</option>
             <option>Review</option>
             <option>Pending</option>
          </select>
     
    </div>

    <div className='fv-row mb-10'>
      <label className='form-label required'>Reason For Rejection</label>
      <textarea name='reject_reason' className='form-control mb-2' rows={3} placeholder="Enter Rejection Reason" value={pan?.reject_reason || ""} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification},reject_reason:e?.target?.value})
        }}/>
     
    </div>

    <div className='fv-row mb-10'>
    <input className="form-check-input" type="checkbox" checked={pan?.verification?.verified?true:false} onChange={(e:any)=>{
              setPan({...pan,verification:{...pan?.verification,verified:e?.target?.checked}})
        }}/>
      <label className="form-check-label mx-5">Is PAN Details Verified</label>
    </div>
    </div>
  </>
  )
}

export {Step4}
