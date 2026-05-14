import React, {FC, useEffect, useState, useMemo, useRef} from 'react'
import {Field, ErrorMessage} from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  values: any
  setFieldValue: any
}

const Step2: FC<Props> = ({values, setFieldValue}) => {
  return (
    <div className='w-100'>
      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Max User(How many user can use)</span>
          </label>
          <Field
            name='coupon_uses.max_user'
            className='form-control mb-2'
            type='number'
            placeholder='Enter Max User'
          ></Field>
          <div className='text-danger'>
            <ErrorMessage name='coupon_uses.max_user' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Max Use By One User</span>
          </label>
          <Field
            type='number'
            name='coupon_uses.max_use_per_user'
            className='form-control mb-2'
            placeholder='Enter Max Use By One User'
          ></Field>
          <div className='text-danger'>
            <ErrorMessage name='coupon_uses.max_use_per_user' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Start Date</span>
          </label>
          <DatePicker
            className='form-control mb-2'
            selected={
              values?.coupon_dates?.start_date
                ? new Date(values?.coupon_dates?.start_date)
                : new Date()
            }
            onChange={(date: Date) => {
              setFieldValue('coupon_dates.start_date', date)
            }}
          />
          <div className='text-danger'>
            <ErrorMessage name='coupon_dates.start_date' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Expiry Date</span>
          </label>
          <DatePicker
            className='form-control mb-2'
            selected={
              values?.coupon_dates?.exp_date ? new Date(values?.coupon_dates?.exp_date) : new Date()
            }
            onChange={(date: Date) => {
              setFieldValue('coupon_dates.exp_date', date)
            }}
          />
          <div className='text-danger'>
            <ErrorMessage name='coupon_dates.exp_date' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
