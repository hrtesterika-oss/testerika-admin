/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'
import validator from 'validator'
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
const Email: FC = () => {
  const [apiKey,setApiKey]=useState<any>()
  const [data,setData]=useState<any>()
  const [values, setValue] = useState<any>()

  const [tab, setTab] = useState('email_smtp')
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
  }, [tab])

  const getInfo = async () => {
const {data}=await axios.get(`${API_URL}/option/email_details`)
console.log(data)
   setData(data)
      setValue(data?.value)
  }

  const onChange = (e: any) => {
     
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
      if(!validator.isEmail(values.Email)){
        errrorMessage("Email is not valid")
      }
      else if(!values?.SMTP_Username){
         errrorMessage("SMTP Username is required")
      }
      else if(!values?.SMTP_Password){
        errrorMessage("SMTP Password is required")
     }
     else if(!values?.Email_Charset){
      errrorMessage("Email charset is required")
   }
   else if(!values?.BCC_All_Emails_To){
    errrorMessage("BCC All Emails To is required")
 }
 else if(!values?.Email_Signature){
  errrorMessage("Email Signature is required")
}
else if(!values?.Email_Encryption){
  errrorMessage("Email Encryption is required")
}
else if(!values?.SMTP_Username){
  errrorMessage("SMTP Username is required")
}
else if(!values?.SMTP_Host){
  errrorMessage("SMTP Host is required")
}
else if(!values?.SMTP_Port){
  errrorMessage("SMTP Port is required")
}
else{
  // setData({...data,value:values})
 const data2= await axios.put(`${API_URL}/option`, {name:data?.name,value:values})
 console.log(data2?.data)
   if(data2?.data?.success){
    getInfo()
    successMessage("Email details Updated Successfully")
   }
}
      
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'email'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder'>
            <li className='nav-item mt-2'>
              <a
                style={{cursor: 'pointer'}}
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${
                  tab == 'email_smtp' ? 'active' : ''
                }`}
                onClick={() => setTab('email_smtp')}
              >
                SMTP
              </a>
            </li>
            {/* <li className='nav-item mt-2'>
              <a
                style={{cursor: 'pointer'}}
                className={`nav-link text-active-primary ms-0 me-10 py-5 ${
                  tab == 'email_sendinblue' ? 'active' : ''
                }`}
                onClick={() => setTab('email_sendinblue')}
              >
                Send In Blue
              </a>
            </li> */}
          </ul>
          <div className='separator separator-dashed my-5 '></div>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='d-flex flex-wrap gap-5'>
              {tab == 'email_smtp' ? (
                <>
                  {' '}
                  <h4>SMTP Settings</h4>
                  <span className='text-muted'>Setup main email</span>{' '}
                </>
              ) : (
                <>
                  {/* <h4>Send In Blue Settings</h4>
                  <span className='text-muted'>Setup Send in blue email</span> */}
                </>
              )}
            </div>

            <div className='separator separator-dashed my-5'></div>
            {tab == 'email_smtp' ? (
              <>
                <div className='d-flex flex-wrap gap-5 mb-10'>
                  {/* <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Mail Engine</label>
                    <div className='form-check form-check-custom form-check-solid gap-3'>
                      <input
                        name='mail_engine'
                        type={'radio'}
                        value='0'
                        onChange={onChange}
                        checked={values.mail_engine == '0'}
                        id='PHPMailer'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='PHPMailer'>
                        <div className='fw-bolder text-gray-800'>PHPMailer</div>
                      </label>
                      <input
                        name='mail_engine'
                        type={'radio'}
                        value='1'
                        onChange={onChange}
                        checked={values.mail_engine == '1'}
                        id='CodeIgniter'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='CodeIgniter'>
                        <div className='fw-bolder text-gray-800'>CodeIgniter</div>
                      </label>
                    </div>
                    <div className='fv-plugins-message-container pt-2'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.mail_engine}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email Protocol</label>
                    <div className='form-check form-check-custom form-check-solid gap-3'>
                      <input
                        type={'radio'}
                        name="SMTP"
                        checked={values?.SMTP?true:false}
                        id='SMTP'
                        onChange={()=>{}}
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      />
                      <label className='form-check-label' htmlFor='SMTP'>
                        <div className='fw-bolder text-gray-800'>SMTP</div>
                      </label>
                      {/* <input
                        name='protocol'
                        type={'radio'}
                        value='1'
                        onChange={onChange}
                        checked={values.protocol == '1'}
                        id='Sendmail'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      /> */}
                      {/* <label className='form-check-label' htmlFor='Sendmail'>
                        <div className='fw-bolder text-gray-800'>Sendmail</div>
                      </label>
                      <input
                        name='protocol'
                        type={'radio'}
                        value='2'
                        onChange={onChange}
                        checked={values.protocol == '2'}
                        id='Mail'
                        className={clsx('form-check-input mb-3 mb-lg-0')}
                        autoComplete='off'
                      /> */}
                      {/* <label className='form-check-label' htmlFor='Mail'>
                        <div className='fw-bolder text-gray-800'>Mail</div>
                      </label> */}
                    </div>
                  </div>
                </div>

                <div className='row gy-5 mb-10'>

                       <div className='col-md-6'>
                         <label className='required fw-bold fs-6 mb-2'>Email</label>
                         <input
                           placeholder={`Enter Email`}
                           type={'email'}
                           name={`Email`}
                           onChange={(e:any)=>{
                              setValue({...values,[e?.target?.name]:e?.target?.value})
                           }}
                           value={values?.Email|| ""}
                           className={clsx('form-control mb-3 mb-lg-0')}
                           autoComplete='off'
                         />
                       </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>SMTP Username</label>
                    <input
                      placeholder='Enter SMTP Username'
                      type="text"
                      name={`SMTP_Username`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.SMTP_Username|| ""}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                   
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>SMTP Password</label>
                    <input
                      placeholder='Enter SMTP Password'
                      type={'text'}
                      name={`SMTP_Password`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.SMTP_Password|| ""}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>Email Charset</label>
                    <input
                      placeholder='Enter a charset'
                      type="text"
                      name={`Email_Charset`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Email_Charset|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                   
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>BCC All Emails To</label>
                    <input
                      placeholder='Enter BCC All Emails To'
                      type="text"
                      name={`BCC_All_Emails_To`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.BCC_All_Emails_To|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>Email Signature</label>
                    <input
                      placeholder='Enter Email Signature'
                      type="text"
                      name={`Email_Signature`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Email_Signature|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                    
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>Email Encryption</label>
                    <input
                      placeholder='Enter Email Encryption'
                      type="text"
                      name={`Email_Encryption`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.Email_Encryption|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>SMTP Host</label>
                    <input
                      placeholder='Enter Email SMTP Host'
                      type="text"
                      name={`SMTP_Host`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.SMTP_Host|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                   
                  </div>
                  <div className=' col-md-6'>
                    <label className='required fw-bold fs-6 mb-2'>SMTP Port</label>
                    <input
                      placeholder='Enter Email SMTP Port'
                      type="number"
                      name={`SMTP_Port`}
                      onChange={(e:any)=>{
                         setValue({...values,[e?.target?.name]:e?.target?.value})
                      }}
                      value={values?.SMTP_Port|| ""}
                      
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                   
                  </div>
                </div>

                {/* <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>BCC All Emails To</label>
                    <input
                      placeholder='Enter BCC emails'
                      name='bcc_all'
                      onChange={onChange}
                      value={values.bcc_all}
                      className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.bcc_all})}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.bcc_all}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='required fw-bold fs-6 mb-2'>Email Signature</label>
                    <input
                      placeholder='Enter a email signature'
                      name='signature'
                      onChange={onChange}
                      value={values.signature}
                      className={clsx('form-control mb-3 mb-lg-0', {
                        'is-invalid': errors.signature,
                      })}
                      autoComplete='off'
                    />
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {errors.signature}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap gap-5 mb-10'>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='fw-bold fs-6 mb-2'>Predefined Header</label>
                    <textarea
                      placeholder='Enter predefined header'
                      rows={6}
                      name='header'
                      onChange={onChange}
                      value={values.header}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                  <div className='fv-row w-100 flex-md-root'>
                    <label className='fw-bold fs-6 mb-2'>Predefined Footer</label>
                    <textarea
                      placeholder='Enter predefined footer'
                      rows={6}
                      name='footer'
                      onChange={onChange}
                      value={values.footer}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                  </div>
                </div> */}
                <div className='fv-row w-100 flex-md-root'>
                  <label className='fw-bold fs-6 mb-2'>Send Test Email</label>
                  <div className='text-muted mb-3'>
                    Send test email to make sure that your SMTP settings is set correctly.
                  </div>
                  <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
                    <input
                      placeholder='Enter test email'
                      name='test_email'
                      onChange={onChange}
                      className={clsx('form-control mb-3 mb-lg-0')}
                      autoComplete='off'
                    />
                    <button type='button' className='btn btn-lg btn-light-primary w-20 fs-15'>
                      Test
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className='fv-row w-100 mb-10'>
                {/* <label className='required fw-bold fs-6 mb-2'>Api key</label>
                <input
                  placeholder='Enter a email api-key'
                  name='apikey'
                  onChange={onChange}
                  value={apikey}
                  className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.apikey})}
                  autoComplete='off'
                /> */}
              </div>
            )}
           {permissionList?.can_edit && <Button />}
          </form>
        </div>
      </div>
    </div>
  )
}

export {Email}
