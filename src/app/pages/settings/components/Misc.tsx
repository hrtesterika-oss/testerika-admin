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

const Misc: FC = () => {
  const [values, setValue] = useState<any>({
    scroll_responsive: '',
    save_last: '',
    export_button: '',
    pagination_limit: 0,
  })

  const [errors, setErrors] = useState<any>({
    scroll_responsive: '',
    save_last: '',
    export_button: '',
    pagination_limit: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/misc`)
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
    if (values.scroll_responsive == '') {
      setErrors({...errors, scroll_responsive: 'Activate scroll responsive is required'})
      return
    }
    if (values.save_last == '') {
      setErrors({...errors, save_last: 'Save last order is required'})
      return
    }

    if (values.export_button == 0) {
      setErrors({...errors, export_button: 'Show export button is required'})
      return
    }

    if (values.pagination_limit == 0) {
      setErrors({...errors, pagination_limit: 'Table pagination limit is required'})
      return
    }

    const payload = {
      name: 'misc',
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
      <SettingsName active={'misc'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <h4>Tables</h4>
          <div className='separator separator-dashed my-5'></div>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>
                Activate Scroll Responsive Tables
              </label>
              <div className='form-check form-check-custom form-check-solid gap-3'>
                <input
                  name='scroll_responsive'
                  onChange={onChange}
                  checked={values.scroll_responsive == '0'}
                  type={'radio'}
                  value='0'
                  id='yes'
                  className={clsx(
                    'form-check-input mb-3 mb-lg-0'
                    // {'is-invalid': formik.touched.name && formik.errors.name},
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='yes'>
                  <div className='fw-bolder text-gray-800'>Yes</div>
                </label>
                <input
                  // {...formik.getFieldProps('name')}
                  name='scroll_responsive'
                  onChange={onChange}
                  checked={values.scroll_responsive == '1'}
                  type={'radio'}
                  value='1'
                  id='no'
                  className={clsx(
                    'form-check-input mb-3 mb-lg-0'
                    // {'is-invalid': formik.touched.name && formik.errors.name},
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='no'>
                  <div className='fw-bolder text-gray-800'>No</div>
                </label>
                {/* {formik.touched.name && formik.errors.name && ( */}
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.scroll_responsive}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Save last order for tables</label>
              <div className='form-check form-check-custom form-check-solid gap-3'>
                <input
                  // {...formik.getFieldProps('name')}
                  name='save_last'
                  onChange={onChange}
                  checked={values.save_last == '0'}
                  type={'radio'}
                  value='0'
                  id='last_yes'
                  className={clsx(
                    'form-check-input mb-3 mb-lg-0'
                    // {'is-invalid': formik.touched.name && formik.errors.name},
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='last_yes'>
                  <div className='fw-bolder text-gray-800'>Yes</div>
                </label>
                <input
                  // {...formik.getFieldProps('name')}
                  name='save_last'
                  onChange={onChange}
                  checked={values.save_last == '1'}
                  type={'radio'}
                  value='1'
                  id='last_no'
                  className={clsx(
                    'form-check-input mb-3 mb-lg-0'
                    // {'is-invalid': formik.touched.name && formik.errors.name},
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='last_no'>
                  <div className='fw-bolder text-gray-800'>No</div>
                </label>
                {/* {formik.touched.name && formik.errors.name && ( */}
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.save_last}
                  </span>
                </div>
              </div>
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-5'>Show table export button</label>

              <div className='d-flex fv-row'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name='export_button'
                    onChange={onChange}
                    checked={values.export_button == '0'}
                    type='radio'
                    value='0'
                    id='kt_modal_update_role_option_0'
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>To all staff members</div>
                  </label>
                </div>
              </div>
              <div className='d-flex fv-row my-2'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name='export_button'
                    onChange={onChange}
                    checked={values.export_button == '1'}
                    type='radio'
                    value='1'
                    id='kt_modal_update_role_option_1'
                  />

                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_1'>
                    <div className='fw-bolder text-gray-800'>Only to administrators</div>
                  </label>
                </div>
              </div>

              <div className='d-flex fv-row'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name='export_button'
                    onChange={onChange}
                    checked={values.export_button == '2'}
                    type='radio'
                    value='2'
                    id='kt_modal_update_role_option_2'
                  />

                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_2'>
                    <div className='fw-bolder text-gray-800'>
                      Hide export button for all staff members
                    </div>
                  </label>
                </div>
              </div>
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>
                    {errors.export_button}
                  </span>
                </div>
              </div>
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Tables Pagination Limit</label>
              <input
                // {...formik.getFieldProps('name')}
                name='pagination_limit'
                onChange={onChange}
                value={values.pagination_limit}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.pagination_limit != ''}
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
                    {errors.pagination_limit}
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

export {Misc}
