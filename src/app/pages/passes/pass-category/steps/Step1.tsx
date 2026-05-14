import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
import {Field, ErrorMessage, Formik} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import PasswordStrengthBar from 'react-password-strength-bar'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import Select from 'react-select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

type Props = {
  setFieldValue: any
  values: any
}

const Step1: FC<Props> = ({setFieldValue, values}) => {
  console.log(values)
  const availForPurchase = [
    {id: 1, value: 'All', label: 'All'},
    {id: 2, value: '1st', label: '1st'},
    {id: 3, value: '2nd', label: '2nd'},
    {id: 4, value: '3rd', label: '3rd'},
    {id: 5, value: '4th', label: '4th'},
    {id: 6, value: '5th', label: '5th'},
    {id: 7, value: '6th', label: '6th'},
  ]
  const [selectedPurchase, setSelectedPurchase] = useState<any>([])
  const [description, setDescription] = useState<any>(values?.description)

  const questionRef: any = useRef(null)

  useEffect(() => {
    if (description != undefined || description != null) {
      setFieldValue('description', description)
    }
  }, [description])

  useEffect(() => {
    if (values?.avail_on_purchase != '') {
      let splited = values.avail_on_purchase.split(',')
      setSelectedPurchase(
        availForPurchase.filter((x: any) => splited.some((y: any) => y === x.label))
      )
    }
  }, [])

  const imageHandler = (e: any) => {
    const input: any = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      var file: any = input?.files[0]
      var formData = new FormData()
      formData.append('image', file)
      await axios
        .post(`${API_URL}/upload`, formData)
        .then((data: AxiosResponse<any>) => {
          var range = questionRef.current.getEditor().getSelection()
          questionRef.current.getEditor().insertEmbed(range?.index, 'image', data.data)
        })
        .catch((err) => {
          console.log(err, 'err')
        })
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  )

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  return (
    <div className='w-100'>
      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Coupon Title</span>
          </label>
          <Field
            name='coupon_title'
            className='form-control mb-2'
            placeholder='Enter coupon title'
          ></Field>
          <div className='text-danger'>
            <ErrorMessage name='coupon_title' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Percentage/Amount</span>
          </label>
          <Field
            type='number'
            name='percentage'
            className='form-control mb-2'
            placeholder='Enter a percentage'
          ></Field>
          <div className='text-danger'>
            <ErrorMessage name='percentage' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Minimum Order Amount</span>
          </label>
          <Field
            type='number'
            name='minimum_order_price'
            className='form-control mb-2'
            placeholder='Enter a Minimum amount'
          ></Field>
          <div className='text-danger'>
            <ErrorMessage name='minimum_order_price' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className=''>Coupon can apply for purchase</span>
          </label>
          <Select
            isMulti
            name='avail_on_purchase'
            options={availForPurchase}
            className='basic-multi-select'
            classNamePrefix='select'
            value={selectedPurchase}
            onChange={(e, i) => {
              setSelectedPurchase(e)
              setFieldValue('avail_on_purchase', e.map((item: any) => item.value).join(','))
            }}
          />
          <div className='text-danger'>
            <ErrorMessage name='avail_on_purchase' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label'>Coupon Visible on Student Portal</label>

          <Field name='visible_on_app' as='select' className='form-select mb-2' placeholder={''}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Field>
          <div className='text-danger mt-2'>
            <ErrorMessage name='visible_on_app' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Coupon Code</span>
          </label>
          <div style={{flexDirection: 'row', display: 'flex'}} className='mb-2 gap-5'>
            <Field
              name='coupon_code'
              className='form-control mb-2'
              placeholder={'Enter Coupon Code'}
            />
            <button
              type='button'
              className='btn btn-lg btn-light-primary w-50 p-0 fs-15'
              onClick={() => {
                setFieldValue(
                  'coupon_code',
                  Math.random()
                    .toString(36)
                    .slice(2)
                )
              }}
            >
              Generate Coupon
            </button>
          </div>
          <div className='text-danger'>
            <ErrorMessage name='coupon_code' />
          </div>
        </div>
      </div>
      <div className='fv-row w-100 mb-10'>
        <label className='form-label'>Description</label>
        <ReactQuill
          onChange={(content, delta, source, editor) => {
            setDescription(content)
          }}
          id='description'
          value={description}
          formats={formats}
          modules={modules}
          ref={questionRef}
        />
      </div>
    </div>
  )
}

export {Step1}
