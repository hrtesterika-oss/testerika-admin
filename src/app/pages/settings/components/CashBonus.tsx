/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const CashBonus: FC = () => {
  const [values, setValue] = useState<any>({
    cash_bonus: 0,
    referral: 0,
    max_usable_cash_bonus: 0,
  })

  const [errors, setErrors] = useState<any>({
    cash_bonus: '',
    referral: '',
    max_usable_cash_bonus: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/cash-bonus`)
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
    if (values.cash_bonus == 0) {
      setErrors({...errors, cash_bonus: 'New User Cash Bonus Amount is required'})
      return
    }
    if (values.referral == 0) {
      setErrors({...errors, referral: 'Referral Bonus on New User is required'})
      return
    }

    if (values.max_usable_cash_bonus == 0) {
      setErrors({...errors, max_usable_cash_bonus: 'Maximum Usable Cash Bonus is required'})
      return
    }

    const payload = {
      name: 'cash-bonus',
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
      <SettingsName active={'cash-bonus'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>New User Cash Bonus Amount</label>
              <input
                // {...formik.getFieldProps('name')}
                name='cash_bonus'
                onChange={onChange}
                value={values.cash_bonus}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.cash_bonus != ''}
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
                    {errors.cash_bonus}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Referral Bonus on New User</label>
              <input
                // {...formik.getFieldProps('name')}
                name='referral'
                onChange={onChange}
                value={values.referral}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.referral != ''}
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
                    {errors.referral}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Maximum Usable Cash Bonus</label>
              <input
                // {...formik.getFieldProps('name')}
                name='max_usable_cash_bonus'
                onChange={onChange}
                value={values.max_usable_cash_bonus}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.max_usable_cash_bonus != ''}
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
                    {errors.max_usable_cash_bonus}
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

export {CashBonus}
