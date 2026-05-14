import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'

type Props = {
  values: any
  setFieldValue: any
}

const Step3= ({upi,setUpi}:any) => {
  return (
    // <div className='w-100'>
      // <div className='fv-row mb-10'>
      //   <label className='form-label required'>Upi Id</label>
      //   <Field name='upi.upi_id' className='form-control mb-2' />
      //   <div className='text-danger mt-2'>
      //     <ErrorMessage name='upi.upi_id' />
      //   </div>
      // </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='form-label required'>Name</label>

    //       <Field name='upi.name' className='form-control mb-2' placeholder={'Enter Full Name'} />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='upi.name' />
    //       </div>
    //     </div>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>Father's Name</span>
    //       </label>

    //       <Field
    //         name='upi.father_name'
    //         className='form-control mb-2'
    //         placeholder={'Enter Father Name'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='upi.father_name' />
    //       </div>
    //     </div>
    //   </div>

    //   {values?.upi?.id && (
    //     <>
    //       {' '}
    //       <div className='d-flex flex-wrap gap-5 mb-10'>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='form-label'>Verified At</label>

    //           <Field
    //             name='upi.verification.verified_at'
    //             type={'date'}
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified At'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='upi.verification.verified_at' />
    //           </div> */}
    //         </div>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='d-flex align-items-center form-label'>
    //             <span className=''>Verified By</span>
    //           </label>

    //           <Field
    //             name='upi.verification.verified_by'
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified By'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='upi.verification.verified_by' />
    //           </div> */}
    //         </div>
    //       </div>
    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Status</label>

    //         <Field
    //           as='select'
    //           name='upi.upi_status'
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
    //           <ErrorMessage name='upi.upi_status' />
    //         </div> */}
    //       </div>
    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Rejection Reason</label>
    //         <Field
    //           name='upi.reject_reason'
    //           as='textarea'
    //           rows={4}
    //           className='form-control mb-2'
    //           placeholder={'Enter Rejection Reason'}
    //         />
    //         {/* <div className='text-danger mt-2'>
    //           <ErrorMessage name='upi.reject_reason' />
    //         </div> */}
    //       </div>
    //       <label className='form-check form-check-sm form-check-custom me-5 me-lg-15'>
    //         <Field className='form-check-input' type='checkbox' name='upi.verification.verified' />
    //         <span className='form-check-label fw-bold'>Is Verified UPI-Id </span>
    //       </label>{' '}
    //     </>
    //   )}
    // </div>
    <>
      <div className="w-100">
      <div className='fv-row mb-10'>
        <label className='form-label required'>Upi Id</label>
        <input type="text" name='upi_id' className='form-control mb-2' placeholder='Enter UPI ID' value={upi?.upi_id || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification},upi_id:e?.target?.value})
        }} />
        
      </div>
      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Name</label>
          <input name='name' type="text" className='form-control mb-2' placeholder={'Enter Name'}  value={upi?.name || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification},name:e?.target?.value})
        }} />
        </div>
      <div className='fv-row w-100 flex-md-root'>
          <label className='form-label required'>Father's Name</label>
          <input name='father_name' type="text" className='form-control mb-2' placeholder={'Enter Father Number'} value={upi?.father_name || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification},father_name:e?.target?.value})
        }}/>
        </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Verified At</label>
        <input name='verified_at' className='form-control mb-2' type='date' placeholder="Enter Verified At" value={upi?.verification?.verified_at || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification,verified_at:e?.target?.value}})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Verified By</label>
        <input name='verified_by' className='form-control mb-2' type='text' placeholder="Enter Verified By" value={upi?.verification?.verified_by || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification,verified_by:e?.target?.value}})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>UPI Status</label>
        <select name="upi_status" className='form-control form-select required' value={upi?.upi_status || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification},upi_status:e?.target?.value})
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
        <textarea name='reject_reason' className='form-control mb-2' rows={3} placeholder="Enter Rejection Reason" value={upi?.reject_reason || ""} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification},reject_reason:e?.terget?.value})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
      <input className="form-check-input" type="checkbox" checked={upi?.verification?.verified?true:false} onChange={(e:any)=>{
              setUpi({...upi,verification:{...upi?.verification,verified:e?.target?.checked}})
        }}/>
        <label className="form-check-label mx-5">Is UPI Details Verified</label>
      </div>
      </div>
    </>
  )
}

export {Step3}
