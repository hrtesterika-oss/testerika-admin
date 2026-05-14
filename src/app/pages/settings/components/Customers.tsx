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

const Customers: FC = () => {
  const [values, setValue] = useState<any>({
    theme: '',
    country: '',
    register: '',
  })

  const [errors, setErrors] = useState<any>({
    theme: '',
    country: '',
    register: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/customers`)
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
    e.preventDefault()
    if (values.theme == '') {
      setErrors({...errors, theme: 'Theme is required'})
      return
    }
    if (values.country == '') {
      setErrors({...errors, country: 'Country is required'})
      return
    }
    if (values.register == '') {
      setErrors({...errors, register: 'Allow customers to register is required'})
      return
    }

    const payload = {
      name: 'customers',
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
      <SettingsName active={'customers'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Default customers theme</label>
                <select
                  name='theme'
                  onChange={onChange}
                  value={values.theme}
                  className={clsx('form-select mb-3 mb-lg-0', {'is-invalid': errors.theme != ''})}
                  autoComplete='off'
                >
                  <option></option>
                  <option>Datacube</option>
                  <option>Clc</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.theme}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Default Country</label>
                <select
                  name='country'
                  onChange={onChange}
                  value={values.country}
                  className={clsx('form-select mb-3 mb-lg-0', {'is-invalid': errors.country != ''})}
                  autoComplete='off'
                >
                  <option></option>
                  <option>India</option>
                  <option>America</option>
                </select>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='fv-row w-100 flex-md-root'>
              <label className='required fw-bold fs-6 mb-2'>Allow customers to register</label>
              <div className='form-check form-check-custom form-check-solid gap-3'>
                <input
                  name='register'
                  type={'radio'}
                  onChange={onChange}
                  checked={values.register == '0'}
                  value='0'
                  id='yes'
                  className={clsx('form-check-input mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                <label className='form-check-label' htmlFor='yes'>
                  <div className='fw-bolder text-gray-800'>Yes</div>
                </label>
                <input
                  name='register'
                  type={'radio'}
                  value='1'
                  onChange={onChange}
                  checked={values.register == '1'}
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
                    {errors.register}
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

export {Customers}
