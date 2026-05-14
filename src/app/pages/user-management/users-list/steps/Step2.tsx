import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {useListView} from '../core/ListViewProvider'

type Props = {
  values: any
  setFieldValue: any
}

const Step2 = ({bank,setBank}:any) => {
  return (
    // <div className='w-100'>
      // <div className='fv-row mb-10'>
      //   <label className='form-label required'>Account Number</label>
      //   <Field name='bank.account_number' className='form-control mb-2' type='number' />
      //   <div className='text-danger mt-2'>
      //     <ErrorMessage name='bank.account_number' />
      //   </div>
      // </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='form-label required'>IFSC Code</label>

    //       <Field
    //         name='bank.ifsc_code'
    //         className='form-control mb-2'
    //         placeholder={'Enter IFSC Code'}
    //       ></Field>
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='bank.ifsc_code' />
    //       </div>
    //     </div>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>Bank Name</span>
    //       </label>

    //       <Field
    //         name='bank.bank_name'
    //         className='form-control mb-2'
    //         placeholder={'Enter Bank Name'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='bank.bank_name' />
    //       </div>
    //     </div>
    //   </div>

    //   <div className='d-flex flex-wrap gap-5 mb-10'>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='form-label required'>Branch Name</label>

    //       <Field
    //         name='bank.branch_name'
    //         className='form-control mb-2'
    //         placeholder={'Enter Branch Name'}
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='bank.branch_name' />
    //       </div>
    //     </div>
    //     <div className='fv-row w-100 flex-md-root'>
    //       <label className='d-flex align-items-center form-label'>
    //         <span className='required'>State</span>
    //       </label>

    //       <Field name='bank.state' className='form-control mb-2' placeholder={'Enter State Name'} />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='bank.state' />
    //       </div>
    //     </div>
    //   </div>

    //   {values?.bank?.id && (
    //     <>
    //       <div className='d-flex flex-wrap gap-5 mb-10'>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='form-label'>Verified At</label>

    //           <Field
    //             name='bank.verification.verified_at'
    //             type={'date'}
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified At'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='bank.verification.verified_at' />
    //           </div> */}
    //         </div>
    //         <div className='fv-row w-100 flex-md-root'>
    //           <label className='d-flex align-items-center form-label'>
    //             <span className='form-label'>Verified By</span>
    //           </label>

    //           <Field
    //             name='bank.verification.verified_by'
    //             className='form-control mb-2'
    //             placeholder={'Enter Verified By'}
    //           />
    //           {/* <div className='text-danger mt-2'>
    //             <ErrorMessage name='bank.verification.verified_by' />
    //           </div> */}
    //         </div>
    //       </div>
    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Status</label>

    //         <Field
    //           as='select'
    //           name='bank.bank_status'
    //           className='form-select mb-2'
    //           data-control='select2'
    //           data-hide-search='true'
    //           data-placeholder='Select an option'
    //         >
    //           <option></option>
    //           <option>Varified</option>
    //           <option>Review</option>
    //           <option>Pending</option>
    //           <option>Error</option>
    //         </Field>
    //         {/* <div className='text-danger mt-2'>
    //           <ErrorMessage name='bank.bank_status' />
    //         </div> */}
    //       </div>
    //       <div className='fv-row mb-10'>
    //         <label className='form-label'>Rejection Reason</label>
    //         <Field
    //           name='bank.reject_reason'
    //           as='textarea'
    //           rows={4}
    //           className='form-control mb-2'
    //           placeholder={'Enter Rejection Reason'}
    //         />
    //         {/* <div className='text-danger mt-2'>
    //           <ErrorMessage name='bank.reject_reason' />
    //         </div> */}
    //       </div>
    //       <label className='form-check form-check-sm form-check-custom me-5 me-lg-15'>
    //         <Field className='form-check-input' type='checkbox' name='bank.verification.verified' />
    //         <span className='form-check-label fw-bold'>Is Verified Bank Account</span>
    //       </label>{' '}
    //     </>
    //   )}
    // </div>
    <div className='w-100'>
          <div className='fv-row mb-10'>
        <label className='form-label required'>Account Number</label>
        <input name='account_number' className='form-control mb-2'  placeholder='Enter Account Number' type='number' value={bank?.account_number || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},account_number:e?.target?.value})
        }}/>
       
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>IFSC Code</label>
        <input name='ifsc_code' className='form-control mb-2' placeholder='Enter IFSC Code' type='text'  value={bank?.ifsc_code || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},ifsc_code:e?.target?.value})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Branch Name</label>
        <input name='branch_name' className='form-control mb-2' placeholder='Enter Branch Name' type='text' value={bank?.branch_name || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},branch_name:e?.target?.value})
        }}/>
       
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>Bank Name</label>
        <input name='bank_name' className='form-control mb-2' placeholder='Enter Bank Name' type='text' value={bank?.bank_name || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},bank_name:e?.target?.value})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>State</label>
        <input name='state' className='form-control mb-2' type='text' placeholder="Enter State" value={bank?.state || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},state:e?.target?.value})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Verified At</label>
        <input name='verified_at' className='form-control mb-2' type='date' placeholder="Enter Verified At" value={bank?.verification?.verified_at || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification,verified_at:e?.target?.value}})
        }} />
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Verified By</label>
        <input name='verified_by' className='form-control mb-2' type='text' placeholder="Enter Verified By" value={bank?.verification?.verified_by || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification,verified_by:e?.target?.value}})
        }}/>
       
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Bank Status</label>
        <select name="bank_status" className='form-control form-select required' value={bank?.bank_status || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},bank_status:e?.target?.value})
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
        <textarea name='reject_reason' className='form-control mb-2' rows={3} placeholder="Enter Rejection Reason" value={bank?.reject_reason || ""}  onChange={(e:any)=>{
          e?.preventDefault()
          setBank({...bank,verification:{...bank?.verification},reject_reason:e?.target?.value})
        }} />
       
      </div>

      <div className='fv-row mb-10'>
      <input className="form-check-input" type="checkbox" checked={bank?.verification?.verified?true:false} onChange={(e:any)=>{
          setBank({...bank,verification:{...bank?.verification,verified:e?.target?.checked}})

      }}/>
        <label className="form-check-label mx-5">Is Verified bank Account</label>
      </div>
    </div>
  )
}

export {Step2}
