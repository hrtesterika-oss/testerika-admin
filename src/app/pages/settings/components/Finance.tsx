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

const Finance: FC = () => {
  const [values, setValue] = useState<any>({
    decimal: '',
    thousand: '',
    currency_placement: '',
    tax: '',
    enable: '',
    number_words: '',
  })

  const [errors, setErrors] = useState<any>({
    decimal: '',
    thousand: '',
    currency_placement: '',
    enable: '',
    number_words: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/finance`)
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

  const onSubmit = async (e: any) => {
    e.preventDefault()
    e.preventDefault()
    if (values.decimal == '') {
      setErrors({...errors, decimal: 'Decimal seperator is required'})
      return
    }
    if (values.thousand == '') {
      setErrors({...errors, thousand: 'Thousand separator is required'})
      return
    }
    if (values.currency_placement == '') {
      setErrors({...errors, currency_placement: 'Currency placement is required'})
      return
    }

    if (values.enable == '') {
      setErrors({...errors, enable: 'Enable is required'})
      return
    }

    if (values.number_words == '') {
      setErrors({...errors, number_words: 'Number words is required'})
      return
    }

    const payload = {
      name: 'finance',
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

  const onChange = (e: any) => {
    const {name, value} = e.target
    setValue({...values, [name]: value})
    setErrors({...errors, [name]: ''})
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <SettingsName active={'finance'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Decimal Separator</label>
                <select
                  name='decimal'
                  onChange={onChange}
                  value={values.decimal}
                  className={clsx('form-select mb-3 mb-lg-0', {'is-invalid': errors.decimal != ''})}
                  autoComplete='off'
                >
                  <option></option>
                  <option>.</option>
                  <option>,</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.decimal}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Thousand Separator</label>
                <select
                  // {...formik.getFieldProps('name')}
                  name='thousand'
                  onChange={onChange}
                  value={values.thousand}
                  className={clsx('form-select mb-3 mb-lg-0', {
                    'is-invalid': errors.thousand != '',
                  })}
                  autoComplete='off'
                >
                  <option></option>
                  <option>,</option>
                  <option>.</option>
                  <option>'</option>
                  <option>none</option>
                  <option> space</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.thousand}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Currency Placement</label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='currency_placement'
                    onChange={onChange}
                    checked={values.currency_placement == '0'}
                    type={'radio'}
                    value='0'
                    id='before'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='before'>
                    <div className='fw-bolder text-gray-800'>Before Amount ( ₹25.00 )</div>
                  </label>
                  <input
                    name='currency_placement'
                    type={'radio'}
                    value='1'
                    onChange={onChange}
                    checked={values.currency_placement == '1'}
                    id='after'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='after'>
                    <div className='fw-bolder text-gray-800'>After Amount ( 25.00₹ )</div>
                  </label>
                </div>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.currency_placement}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='fw-bold fs-6 mb-2'>Default Tax</label>
                <select
                  name='tax'
                  onChange={onChange}
                  value={values.tax}
                  className={clsx('form-select mb-3 mb-lg-0')}
                  autoComplete='off'
                >
                  <option></option>
                  <option>No Tax</option>
                  <option>9.00% CGST|9.00</option>
                  <option>9.00% SGST|9.00</option>
                </select>
              </div>
            </div>
            <h4 className='mt-5'>Amount to words</h4>
            <div className='text-muted mb-3'>
              Output total amount to words in invoice/estimate/proposal
            </div>
            <div className='d-flex flex-wrap gap-5 mb-5 mt-5'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Enable</label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='enable'
                    type={'radio'}
                    value='0'
                    id='yes'
                    onChange={onChange}
                    checked={values.enable == '0'}
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='enable'
                    type={'radio'}
                    value='1'
                    onChange={onChange}
                    checked={values.enable == '1'}
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
                      {errors.enable}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Number words into lowercase</label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='number_words'
                    onChange={onChange}
                    checked={values.number_words == '0'}
                    type={'radio'}
                    value='0'
                    id='lowercase_yes'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='lowercase_yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='number_words'
                    type={'radio'}
                    value='1'
                    onChange={onChange}
                    checked={values.number_words == '1'}
                    id='lowercase_no'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='lowercase_no'>
                    <div className='fw-bolder text-gray-800'>No</div>
                  </label>
                </div>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.number_words}
                    </span>
                  </div>
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

export {Finance}
