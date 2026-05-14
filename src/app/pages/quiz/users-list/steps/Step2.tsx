import React, {FC, useEffect, useState, useMemo, useRef} from 'react'
import {Field, ErrorMessage} from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  values: any
  setFieldValue: any
  setSelectedLang: any
  selectedLang: any
  roleForEdit: any
  errors: any
}

const Step2: FC<Props> = ({
  values,
  setFieldValue,
  selectedLang,
  errors,
  setSelectedLang,
  roleForEdit,
}) => {
  console.log(values, 'values')
  return (
    <div className='w-100'>
      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>
            Question Time (should be in Second)
          </label>

          <Field
            name='dates.question_time'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='dates.question_time' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Quiz Start Date Time</span>
          </label>

          <DatePicker
            className='form-control mb-2'
            showTimeSelect
            selected={values?.dates?.start_date ? new Date(values?.dates?.start_date) : new Date()}
            onChange={(date: Date) => {
              setFieldValue('dates.start_date', date)
            }}
          />
          <div className='text-danger mt-2'>{errors?.dates?.start_date}</div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Registration Date Time</label>

          <DatePicker
            name='dates.reg_open_date'
            className='form-control mb-2'
            showTimeSelect
            selected={
              values?.dates?.reg_open_date ? new Date(values?.dates?.reg_open_date) : new Date()
            }
            onChange={(date: Date) => {
              setFieldValue('dates.reg_open_date', date)
            }}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>{errors?.dates?.reg_open_date}</div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Result Publish Date Time</span>
          </label>

          <DatePicker
            showTimeSelect
            name='dates.result_publish_date'
            className='form-control mb-2'
            selected={
              values?.dates?.result_publish_date
                ? new Date(values?.dates?.result_publish_date)
                : new Date()
            }
            onChange={(date: Date) => {
              setFieldValue('dates.result_publish_date', date)
            }}
          />
          <div className='text-danger mt-2'>{errors?.dates?.result_publish_date}</div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Total Spots</label>

          <Field
            name='prize.total_spots'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Prize Pool'}

            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.total_spots' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Entry Fee</span>
          </label>

          <Field
            name='prize.entry_fee'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter negitive mark'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.entry_fee' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Total Winner Percentage</label>

          <Field
            name='prize.total_winner_percentage'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.total_winner_percentage' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Prize Distribution Percentage</span>
          </label>

          <Field
            name='prize.prize_distribution_percentage'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter negitive mark'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.prize_distribution_percentage' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Prize Pool</label>

          <Field
            name='prize.prize_pool'
            type='number'
            readOnly
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.prize_pool' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>First Prize</span>
          </label>

          <Field
            name='prize.first_prize'
            type={'number'}
            readOnly
            className='form-control mb-2'
            placeholder={'Enter negitive mark'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='prize.first_prize' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step2}
