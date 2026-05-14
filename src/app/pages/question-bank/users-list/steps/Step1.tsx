import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage, Formik} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import PasswordStrengthBar from 'react-password-strength-bar'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import Select from 'react-select'
import {useCommonData} from '../commonData/CommonDataProvider'
// import {checkEmail} from '../core/_requests'

type Props = {
  setFieldValue: any
  values: any
  touched: any
  setFieldError: any
  errors: any
}

const Step1: FC<Props> = ({setFieldValue, values, touched, setFieldError, errors}) => {
  console.log(errors, 'errors')
  const {allCourses, allSubjects} = useCommonData()
  const [courses, setCourses] = useState(allCourses)
  const [subjects, setSubjects] = useState(values.id ? allSubjects : [])
  const [selectedCourses, setSelectedCourses] = useState<any>(null)

  {
    console.log(allSubjects)
  }
  useEffect(() => {
    if (values.id && courses.length > 0) {
      const selected = courses.filter((x: any) =>
        values?.courses.some((y: any) => y.course_id === x.id)
      )
      setSelectedCourses(selected)
      const ids = values.courses.flatMap((x: any) => [x.course_id])
      getSubject(ids)
      setFieldValue('courses', selected)
    }
  }, [courses])

  const getSubject = async (ids: any) => {
    // let items = allSubjects?.filter((x: any) => ids.some((y: any) => y == x.subject_id))
    let items = allSubjects?.filter((x: any) =>{
      return  x.courses.map((item:any)=>{
          if(ids.includes(item.course_category_id)){
             return x
          }
       })
  })
    console.log(items)
    setSubjects(items)
  }

  return (
    <div className='w-100'>
      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Question Type</span>
          </label>
          <Field
            as='select'
            name='question_type'
            className='form-select mb-2'
            data-control='select2'
            data-hide-search='true'
            placeholder='Select an option'
          >
            <option></option>
            <option>Single</option>
            <option>MCQ</option>
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='question_type' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Question Level</span>
          </label>
          <Field
            as='select'
            name='level'
            className='form-select mb-2'
            data-control='select2'
            data-hide-search='true'
            placeholder='Select an option'
          >
            <option></option>
            <option>Easy</option>
            <option>Moderate</option>
            <option>Difficult</option>
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='level' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Courses</span>
          </label>
          <Select
            isMulti
            name='courses'
            options={courses}
            className='basic-multi-select'
            classNamePrefix='select'
            value={selectedCourses}
            onChange={(e, i) => {
              // const ids = e.flatMap((item, i) => [item.id])
              const ids = e.flatMap((item:any, i:number) => {
                return item.course_category.flatMap((item2:any)=>[item2.id])
            })
              getSubject(ids)
              setFieldValue('courses', e)
              setSelectedCourses(e)
            }}
            getOptionLabel={(option: any) => option.course_name}
            getOptionValue={(option: any) => option.id}
          />

          <div className='text-danger mt-2'>{errors.courses}</div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Subject</span>
          </label>
          <Field
            as='select'
            name='subject_id'
            className='form-select mb-2'
            data-control='select2'
            data-hide-search='true'
            placeholder='Select an option'
          >
            <option></option>
            {subjects?.map((item: any, i: any) => (
              <option key={i} value={item.id}>
                {item.subject_name}
              </option>
            ))}
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='subject_id' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>Marks</label>

          <Field
            name='marks.marks'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='marks.marks' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Negitive Marks</span>
          </label>

          <Field
            name='marks.negitive_mark'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter negitive mark'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='marks.negitive_mark' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step1}
