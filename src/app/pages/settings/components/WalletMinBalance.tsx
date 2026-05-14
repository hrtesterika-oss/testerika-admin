/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {API_URL} from './ApiUrl'
import {Button} from './Button'
import {SettingsName} from './SettingsName'

const WalletMinBalance: FC = () => {
  const [values, setValue] = useState<any>({
    min_amount_wallet: 0,
    min_amount_withdrawal: 0,
  })

  const [errors, setErrors] = useState<any>({
    min_amount_wallet: '',
    min_amount_withdrawal: '',
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    await axios
      .get(`${API_URL}/wallet-minimum-balance`)
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
    if (values.min_amount_wallet == 0) {
      setErrors({...errors, min_amount_wallet: 'Minimum Amount Add to Wallet is required'})
      return
    }
    if (values.min_amount_withdrawal == 0) {
      setErrors({...errors, min_amount_withdrawal: 'Minimum Amount to Withdrawal is required'})
      return
    }

    const payload = {
      name: 'wallet-minimum-balance',
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
      <SettingsName active={'wallet-minimun-balance'} />
      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card p-10' id='kt_chat_messenger'>
          <form noValidate className='form' onSubmit={onSubmit}>
            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Minimum Amount Add to Wallet</label>
              <input
                // {...formik.getFieldProps('name')}
                name='min_amount_wallet'
                type={'number'}
                onChange={onChange}
                value={values.min_amount_wallet}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.min_amount_wallet != ''}
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
                    {errors.min_amount_wallet}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>

            <div className='fv-row w-100 mb-10'>
              <label className='required fw-bold fs-6 mb-2'>Minimum Amount to Withdrawal</label>
              <input
                // {...formik.getFieldProps('name')}
                name='min_amount_withdrawal'
                onChange={onChange}
                value={values.min_amount_withdrawal}
                type={'number'}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': errors.min_amount_withdrawal != ''}
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
                    {errors.min_amount_withdrawal}
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

export {WalletMinBalance}
