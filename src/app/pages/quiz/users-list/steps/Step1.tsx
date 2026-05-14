import React, {FC, useEffect, useState} from 'react'
import {Field, ErrorMessage, Formik} from 'formik'
import Select from 'react-select'
import {getQuizTypes} from '../core/_requests'
import {useCommonData} from '../../commonData/CommonDataProvider'
// import {checkEmail} from '../core/_requests'

type Props = {
  setFieldValue: any
  values: any
  touched: any
  setFieldError: any
  errors: any
}

const Step1: FC<Props> = ({setFieldValue, values, touched, setFieldError, errors}) => {
  const {allCourses, allSubjects} = useCommonData()
  const [courses, setCourses] = useState(allCourses)
  const [subjects, setSubjects] = useState(values.id ? allSubjects : [])
  const [selectedCourses, setSelectedCourses] = useState<any>(null)
  const [quizType, setQuizType] = useState<any>([])
  const [selectedLang, setSelectedLang] = useState<any>([])

  const options = [
    {label: 'Hindi', value: 'Hindi'},
    {label: 'English', value: 'English'},
  ]

  useEffect(() => {
    if (values.language) {
    }
  }, [values])

  useEffect(() => {
    quizTypes()
  }, [])

  useEffect(() => {
    if (values.id && courses.length > 0) {
      const selected = courses.filter((x: any) =>
        values?.courses.some((y: any) => y.course_id === x.id)
      )
      setSelectedCourses(selected)
      const ids = values.courses?.flatMap((x: any) => [x.course_id])
      getSubject(ids)
      setFieldValue('courses', selected)
      let splited = values.language.split(',')
      setSelectedLang(options.filter((x: any) => splited.some((y: any) => y === x.label)))
    }
  }, [courses])

  const quizTypes = async () => {
    await getQuizTypes()
      .then((data:any) => {
        console.log(data)
        setQuizType(data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const getSubject = async (ids: any) => {
    let items = allSubjects?.filter((x: any) =>{
        return  x.courses.map((item:any)=>{
            if(ids.includes(item.course_category_id)){
               return x
            }
         })
    })
    setSubjects(items)
  }

  // const getSubject = (ids: any) => {
  //   let items = allSubjects?.filter((x: any) => ids.some((y: any) => y == x.id))
  //   setSubjects(items)
  // }

  return (
    <div className='w-100'>
      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Quiz Name</span>
          </label>
          <Field name='name' className='form-control mb-2' placeholder='Enter quiz name' />
          <div className='text-danger'>
            <ErrorMessage name='name' />
          </div>
        </div>
        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Quiz Type</span>
          </label>
          <Field
            name='quiz_type_id'
            as='select'
            className='form-select mb-2'
            data-control='select2'
            data-hide-search='true'
            placeholder='Select an option'
          >
            <option></option>
            {quizType?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.quiz_type}
              </option>
            ))}
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='quiz_type_id' />
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
          <div className='text-danger'>
            <ErrorMessage name='courses' />
          </div>
        </div>
        {
          selectedCourses?.length>0 &&
        
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
            {subjects.map((item: any, i: any) => (
              <option key={i} value={item.id}>
                {item.subject_name}
              </option>
            ))}
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='subject_id' />
          </div>
        </div>
        }
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>
            Quiz Duration (should be in minutes)
          </label>

          <Field
            name='duration'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='duration' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Quiz Language</span>
          </label>

          <Select
            isMulti
            name='language'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
            value={selectedLang}
            onChange={(e: any, i: any) => {
              setSelectedLang(e)
              setFieldValue('language', e.map((item: any) => item.value).join(','))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='language' />
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap gap-5 mb-10'>
        <div className='fv-row w-100 flex-md-root'>
          <label className='fs-6 fw-bold form-label required'>No. Of Questions</label>

          <Field
            name='total_questions'
            type='number'
            className='form-control mb-2'
            placeholder={'Enter Question Marks'}
            // validate={validateEmail}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='total_questions' />
          </div>
        </div>

        <div className='fv-row w-100 flex-md-root'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Total Marks</span>
          </label>

          <Field
            name='marks'
            type={'number'}
            className='form-control mb-2'
            placeholder={'Enter negitive mark'}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='marks' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step1}
