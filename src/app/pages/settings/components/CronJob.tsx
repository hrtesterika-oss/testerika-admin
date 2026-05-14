/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../_metronic/partials'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const Cronjob: FC = () => {
  const [values, setValue] = useState<any>({
    hour: 0,
    send_reminder: 0,
    resend_reminder: 0,
    recurring_invoice: '',
    create_new_invoice: '',
  })

  const [errors, setErrors] = useState<any>({
    hour: '',
    send_reminder: '',
    resend_reminder: '',
    recurring_invoice: '',
    create_new_invoice: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/cron-jobs`)
      .then((data: AxiosResponse<any>) => {
        if (data.data != null) {
          const newvalues = JSON.parse(data.data.value)
          setValue(newvalues)
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const onChange = (e: any) => {
    const {name, value} = e.target
    setValue({...values, [name]: value})
    setErrors({...errors, [name]: ''})
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (values.hour == 0) {
      setErrors({...errors, hour: 'Hour of day is required'})
      return
    }
    if (values.send_reminder == 0) {
      setErrors({...errors, send_reminder: 'Auto send reminder is required'})
      return
    }

    if (values.resend_reminder == 0) {
      setErrors({...errors, resend_reminder: 'Auto re-send reminder is required'})
      return
    }

    if (values.recurring_invoice == '') {
      setErrors({...errors, recurring_invoice: 'Recurring invoice is required'})
      return
    }

    if (values.create_new_invoice == '') {
      setErrors({...errors, create_new_invoice: 'Create new invoice is required'})
      return
    }

    const payload = {
      name: 'cron-jobs',
      value: JSON.stringify(values),
      auto_load: 0,
    }
    await axios
      .post(API_URL, payload)
      .then((data: AxiosResponse<any>) => {
        getInfo()
        Swal.fire({
          title: 'Success!',
          text: `Settings Updated!`,
          icon: 'success',
          confirmButtonText: 'Okay',
        })
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'cron-jobs'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>
                Hour of day to perform automatic operations
              </label>
              <input
                // {...formik.getFieldProps('name')}
                name='hour'
                onChange={onChange}
                value={values.hour}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.hour != ''}
                  // {
                  //   'is-valid': formik.touched.name && !formik.errors.name,
                  // }
                )}
                autoComplete='off'
                // disabled={formik.isSubmitting || isUserLoading}
              />
              {/* {formik.touched.name && formik.errors.name && ( */}
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.hour}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Auto send reminder after</label>
              <input
                // {...formik.getFieldProps('name')}
                name='send_reminder'
                onChange={onChange}
                value={values.send_reminder}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.send_reminder != ''}
                  // {
                  //   'is-valid': formik.touched.name && !formik.errors.name,
                  // }
                )}
                autoComplete='off'
                // disabled={formik.isSubmitting || isUserLoading}
              />
              {/* {formik.touched.name && formik.errors.name && ( */}
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.send_reminder}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>
                Auto re-send reminder after (days)
              </label>
              <input
                // {...formik.getFieldProps('name')}
                name='resend_reminder'
                type={'number'}
                onChange={onChange}
                value={values.resend_reminder}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.resend_reminder != ''}
                  // {
                  //   'is-valid': formik.touched.name && !formik.errors.name,
                  // }
                )}
                autoComplete='off'
                // disabled={formik.isSubmitting || isUserLoading}
              />
              {/* {formik.touched.name && formik.errors.name && ( */}
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.resend_reminder}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-5'>Recurring Invoices</label>

              <div className='d-flex fv-row'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name='recurring_invoice'
                    type='radio'
                    value='0'
                    onChange={onChange}
                    checked={values.recurring_invoice == '0'}
                    id='kt_modal_update_role_option_0'
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>
                      Generate and autosend the renewed invoice to the customer
                    </div>
                  </label>
                </div>
              </div>
              <div className='d-flex fv-row my-2'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    type='radio'
                    value='1'
                    name='recurring_invoice'
                    onChange={onChange}
                    checked={values.recurring_invoice == '1'}
                    id='kt_modal_update_role_option_1'
                  />

                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_1'>
                    <div className='fw-bolder text-gray-800'>Generate a Unpaid Invoice</div>
                  </label>
                </div>
              </div>

              <div className='d-flex fv-row'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name='recurring_invoice'
                    onChange={onChange}
                    checked={values.recurring_invoice == '2'}
                    type='radio'
                    value='2'
                    id='kt_modal_update_role_option_2'
                  />

                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_2'>
                    <div className='fw-bolder text-gray-800'>Generate a Draft Invoice</div>
                  </label>
                </div>
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.recurring_invoice}
                  </span>
                </div>
              </div>
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>
                Create new invoice from recurring invoice only if the invoice is with status paid?
              </label>
              <div className='form-check form-check-custom form-check-solid gap-3'>
                <input
                  // {...formik.getFieldProps('name')}
                  name='create_new_invoice'
                  onChange={onChange}
                  checked={values.create_new_invoice == '0'}
                  type={'radio'}
                  value='0'
                  id='yes'
                  className={clsx('form-check-input mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                <label className='form-check-label' htmlFor='yes'>
                  <div className='fw-bolder text-gray-800'>Yes</div>
                </label>
                <input
                  name='create_new_invoice'
                  onChange={onChange}
                  checked={values.create_new_invoice == '1'}
                  type={'radio'}
                  value='1'
                  id='no'
                  className={clsx('form-check-input mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                <label className='form-check-label' htmlFor='no'>
                  <div className='fw-bolder text-gray-800'>No</div>
                </label>
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.create_new_invoice}
                  </span>
                </div>
              </div>
            </div>

            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {Cronjob}
