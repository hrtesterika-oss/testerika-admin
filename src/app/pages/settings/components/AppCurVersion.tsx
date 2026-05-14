/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../../staff-management/users-list/core/_requests'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const AppCurVersion: FC = () => {
  const [values, setValue] = useState<any>({
    current_version: '',
  })

  const [errors, setErrors] = useState<any>({
    current_version: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/app-current-version`)
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
    if (values.current_version == '') {
      setErrors({...errors, current_version: 'App Current Version is required'})
      return
    }

    const payload = {
      name: 'app-current-version',
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
      <SettingsName active={'app-current-version'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-5'>
              <label className='required fw-bold fs-6 mb-2'>App Current Version</label>
              <input
                // {...formik.getFieldProps('name')}
                name='current_version'
                onChange={onChange}
                value={values.current_version}
                className={clsx('form-control mb-3 mb-lg-0', {
                  'is-invalid': errors.current_version != '',
                })}
                autoComplete='off'
                // disabled={formik.isSubmitting || isUserLoading}
              />
              {/* {formik.touched.name && formik.errors.name && ( */}
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.current_version}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <Button />
          </form>
        </div>
      </div>
    </div>
  )
}

export {AppCurVersion}
