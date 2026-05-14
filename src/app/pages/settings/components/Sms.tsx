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

const Sms: FC = () => {
  const [values, setValue] = useState<any>({
    sender_id: '',
    key: '',
    active: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const [errors, setErrors] = useState<any>({
    sender_id: '',
    key: '',
    active: '',
  })

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/sms`)
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

    if (values.sender_id == '') {
      setErrors({...errors, sender_id: 'Sender Id is required'})
      return
    }
    if (values.key == '') {
      setErrors({...errors, key: 'Key is required'})
      return
    }

    if (values.active == '') {
      setErrors({...errors, active: 'Active is required'})
      return
    }

    const payload = {
      name: 'sms',
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
      <SettingsName active={'SMS'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <h4>MSG91</h4>
          <span className='text-muted'>
            MSG91 SMS integration is one way messaging, means that your customers won't be able to
            reply to the SMS.
          </span>
          <div className='separator separator-dashed my-5'></div>
          {/* </div> */}
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Sender ID</label>
              <input
                name='sender_id'
                onChange={onChange}
                value={values.sender_id}
                className={clsx('form-control mb-3 mb-lg-0', {
                  'is-invalid': errors.sender_id != '',
                })}
                autoComplete='off'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.sender_id}
                  </span>
                </div>
              </div>
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Key</label>
              <input
                placeholder='Enter a key'
                name='key'
                onChange={onChange}
                value={values.key}
                className={clsx('form-control mb-3 mb-lg-0', {'is-invalid': errors.key != ''})}
                autoComplete='off'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.key}
                  </span>
                </div>
              </div>
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Active</label>
              <div className='form-check form-check-custom form-check-solid gap-3'>
                <input
                  name='active'
                  onChange={onChange}
                  checked={values.active == '0'}
                  type={'radio'}
                  value='0'
                  id='active_yes'
                  className={clsx('form-check-input mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                <label className='form-check-label' htmlFor='active_yes'>
                  <div className='fw-bolder text-gray-800'>Yes</div>
                </label>
                <input
                  name='active'
                  type={'radio'}
                  onChange={onChange}
                  checked={values.active == '1'}
                  value='1'
                  id='active_no'
                  className={clsx('form-check-input mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                <label className='form-check-label' htmlFor='active_no'>
                  <div className='fw-bolder text-gray-800'>No</div>
                </label>
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>{errors.active}</span>
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

export {Sms}
