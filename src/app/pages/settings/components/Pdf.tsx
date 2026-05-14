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

const Pdf: FC = () => {
  const [values, setValue] = useState<any>({
    font: '',
    size: 0,
    heading_color: '',
    text_color: '',
    logo_url: '',
    logo_width: 0,
    show_invoice_status: '',
    show_invoice_link: '',
    show_invoice_payment: '',
    show_page_number: '',
  })

  const [errors, setErrors] = useState<any>({
    font: '',
    size: '',
    heading_color: '',
    text_color: '',
    logo_url: '',
    logo_width: '',
    show_invoice_status: '',
    show_invoice_link: '',
    show_invoice_payment: '',
    show_page_number: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/pdf`)
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
    if (values.font == '') {
      setErrors({...errors, font: 'Pdf font is required'})
      return
    }
    if (values.size == '') {
      setErrors({...errors, size: 'Font size is required'})
      return
    }
    if (values.heading_color == '') {
      setErrors({...errors, heading_color: 'Heading color is required'})
      return
    }

    if (values.text_color == '') {
      setErrors({...errors, text_color: 'Heading text color is required'})
      return
    }

    if (values.logo_url == '') {
      setErrors({...errors, logo_url: 'Company logo url is required'})
      return
    }
    if (values.logo_width == '') {
      setErrors({...errors, logo_width: 'Logo width is required'})
      return
    }

    if (values.show_invoice_status == '') {
      setErrors({...errors, show_invoice_status: 'Required'})
      return
    }

    if (values.show_invoice_link == '') {
      setErrors({...errors, show_invoice_link: 'Required'})
      return
    }

    if (values.show_invoice_payment == '') {
      setErrors({...errors, show_invoice_payment: 'Required'})
      return
    }
    if (values.show_page_number == '') {
      setErrors({...errors, signature: 'Required'})
      return
    }

    const payload = {
      name: 'pdf',
      value: JSON.stringify(values),
      auto_load: 0,
    }
    await axios
      .post(API_URL, payload)
      .then((data: AxiosResponse<any>) => {
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
      <SettingsName active={'PDF'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>PDF Font</label>
                <select
                  name='font'
                  onChange={onChange}
                  value={values.font}
                  className={clsx(
                    'form-select mb-3 mb-lg-0',
                    {'is-invalid': errors.font != ''}
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                  // disabled={formik.isSubmitting || isUserLoading}
                >
                  <option></option>
                  <option>freesans</option>
                  <option>symbol</option>
                </select>
                {/* {formik.touched.name && formik.errors.name && ( */}
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.font}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Default font size</label>
                <input
                  // {...formik.getFieldProps('name')}
                  name='size'
                  type={'number'}
                  onChange={onChange}
                  value={values.size}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                    {'is-invalid': errors.size}
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
                      {errors.size}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Items table heading color</label>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <input
                    name='heading_color'
                    onChange={onChange}
                    value={values.heading_color}
                    autoComplete='off'
                    className={clsx('form-control mb-3 mb-lg-0 w-100', {
                      'is-invalid': errors.heading_color != '',
                    })}
                  />
                  <input
                    name='heading_color'
                    type={'color'}
                    onChange={onChange}
                    value={values.heading_color}
                    style={{width: '10%'}}
                    autoComplete='off'
                  />
                </div>

                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.heading_color}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Items table heading text color</label>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <input
                    className={clsx('form-control mb-3 mb-lg-0 w-100', {
                      'is-invalid': errors.heading_color != '',
                    })}
                    name='text_color'
                    onChange={onChange}
                    value={values.text_color}
                    autoComplete='off'
                  />
                  <input
                    style={{width: '10%'}}
                    name='text_color'
                    onChange={onChange}
                    value={values.text_color}
                    type={'color'}
                    autoComplete='off'
                  />
                </div>
                {/* {formik.touched.name && formik.errors.name && ( */}
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.text_color}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Custom PDF Company Logo URL</label>
                <input
                  name='logo_url'
                  onChange={onChange}
                  value={values.logo_url}
                  className={clsx(
                    'form-control mb-3 mb-lg-0',
                    {'is-invalid': errors.logo_url != ''}
                    // {
                    //   'is-valid': formik.touched.name && !formik.errors.name,
                    // }
                  )}
                  autoComplete='off'
                />

                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.logo_url}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Logo Width (PX)</label>
                <input
                  name='logo_width'
                  onChange={onChange}
                  value={values.logo_width}
                  type={'number'}
                  className={clsx('form-control mb-3 mb-lg-0', {
                    'is-invalid': errors.logo_width != '',
                  })}
                  autoComplete='off'
                />
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.logo_width}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>
                  Show Invoice/Estimate/Credit Note status on PDF documents
                </label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='show_invoice_status'
                    type={'radio'}
                    onChange={onChange}
                    checked={values.show_invoice_status == '0'}
                    value='0'
                    id='yes'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='show_invoice_status'
                    type={'radio'}
                    value='1'
                    onChange={onChange}
                    checked={values.show_invoice_status == '1'}
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
                      {errors.show_invoice_status}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>
                  Show Pay Invoice link to PDF (Not applied if invoice status is Cancelled)
                </label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='show_invoice_link'
                    onChange={onChange}
                    checked={values.show_invoice_link == '0'}
                    type={'radio'}
                    value='0'
                    id='link_yes'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='link_yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='show_invoice_link'
                    onChange={onChange}
                    checked={values.show_invoice_link == '1'}
                    type={'radio'}
                    value='1'
                    id='link_no'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='link_no'>
                    <div className='fw-bolder text-gray-800'>No</div>
                  </label>
                </div>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.show_invoice_link}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap gap-5 mb-10'>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>
                  Show invoice payments (transactions) on PDF
                </label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='show_invoice_payment'
                    onChange={onChange}
                    checked={values.show_invoice_payment == '0'}
                    type={'radio'}
                    value='0'
                    id='payment_yes'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='payment_yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='show_invoice_payment'
                    onChange={onChange}
                    checked={values.show_invoice_payment == '1'}
                    type={'radio'}
                    value='1'
                    id='payment_no'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='payment_no'>
                    <div className='fw-bolder text-gray-800'>No</div>
                  </label>
                </div>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.show_invoice_payment}
                    </span>
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 flex-md-root'>
                <label className='required fw-bold fs-6 mb-2'>Show page number on PDF</label>
                <div className='form-check form-check-custom form-check-solid gap-3'>
                  <input
                    name='show_page_number'
                    onChange={onChange}
                    checked={values.show_page_number == '0'}
                    type={'radio'}
                    value='0'
                    id='page_yes'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='page_yes'>
                    <div className='fw-bolder text-gray-800'>Yes</div>
                  </label>
                  <input
                    name='show_page_number'
                    onChange={onChange}
                    checked={values.show_page_number == '1'}
                    type={'radio'}
                    value='1'
                    id='page_no'
                    className={clsx('form-check-input mb-3 mb-lg-0')}
                    autoComplete='off'
                  />
                  <label className='form-check-label' htmlFor='page_no'>
                    <div className='fw-bolder text-gray-800'>No</div>
                  </label>
                </div>
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {errors.show_page_number}
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

export {Pdf}
