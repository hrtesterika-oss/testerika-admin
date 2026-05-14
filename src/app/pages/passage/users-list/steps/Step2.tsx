import React, {FC, useEffect, useState, useMemo, useRef} from 'react'
import {Field, ErrorMessage} from 'formik'
import clsx from 'clsx'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'

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
  setSelectedLang,
  errors,
  roleForEdit,
}) => {
  console.log(values, 'values')

  const [options, setOptions] = useState<any>(null)
  const [hint, setHint] = useState<any>(null)
  const [question, setQuestion] = useState<any>(null)
  const [solution, setSolution] = useState<any>(null)
  const [verified, setVerified] = useState<any>(null)

  const questionRef: any = useRef(null)
  const solutionRef: any = useRef(null)
  const optionRef: any = useRef(null)

  useEffect(() => {
    setSelectedLang(0)
  }, [])

  useEffect(() => {
    if (selectedLang != null) {
      setOptions(values.questions[selectedLang]?.options || [{option: '', right_option: 0}])
      setQuestion(values.questions[selectedLang]?.question || '')
      setSolution(values.questions[selectedLang]?.solution || {solution: ''})
      setHint(values.questions[selectedLang]?.hint || {hint: ''})
      setFieldValue(`questions[${selectedLang}].verified`, {is_verified: null, verified_by: ''})
      setFieldValue(`questions[${selectedLang}].question_bank_id`, values.id)
      setFieldValue(`questions[${selectedLang}].language`, selectedLang == 0 ? 'HINDI' : 'ENGLISH')
    }
  }, [selectedLang])

  useEffect(() => {
    if (question != null && question != values?.questions[selectedLang]?.question) {
      setFieldValue(`questions[${selectedLang}].question`, question)
    }
  }, [question])

  useEffect(() => {
    if (
      solution != null &&
      solution.solution != values.questions[selectedLang]?.solution?.solution
    ) {
      setFieldValue(`questions[${selectedLang}].solution`, solution)
    }
  }, [solution])

  useEffect(() => {
    if (hint != null && hint.hint != values.questions[selectedLang]?.hint?.hint) {
      setFieldValue(`questions[${selectedLang}].hint`, hint)
    }
  }, [hint])

  useEffect(() => {
    if (options?.length > 0 && options != values.questions[selectedLang]?.options) {
      setFieldValue(`questions[${selectedLang}].options`, options)
    }
  }, [options])

  useEffect(() => {
    console.log(options, 'options')
  }, [options])

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
      <div className='fv-row mb-10'>
        <label className='form-label'>Select Language</label>

        <Field
          as='select'
          name={`questions[${selectedLang}].language`}
          className='form-select mb-2'
          data-control='select2'
          data-hide-search='true'
          data-placeholder='Select an option'
          onChange={(e: any) => {
            setSelectedLang(e.target.value)
          }}
          value={selectedLang}
        >
          {/* <option></option> */}
          <option value={0}>HINDI</option>
          <option value={1}>ENGLISH</option>
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='question.language' />
        </div>
      </div>

      {selectedLang != null && (
        <>
          <div className='fv-row w-100 mb-10'>
            <label className='form-label required'>Question</label>
            <ReactQuill
              onChange={(content, delta, source, editor) => {
                setQuestion(content)
              }}
              id='question'
              value={question}
              formats={formats}
              modules={modules}
              ref={questionRef}
            />
            {errors?.questions && (
              <div className='text-danger mt-2'>{errors?.questions[selectedLang]?.question}</div>
            )}
          </div>
          <div className='fv-row w-100 mb-10'>
            <label className='form-label required'>Solution</label>
            <ReactQuill
              value={solution?.solution}
              onChange={(content, delta, source, editor) => {
                setSolution({...solution, solution: content})
              }}
              id='solution'
              formats={formats}
              modules={modules}
              ref={questionRef}
            />
            {errors?.questions && (
              <div className='text-danger mt-2'>
                {errors?.questions[selectedLang]?.solution?.solution}
              </div>
            )}
          </div>
          <div className='fv-row w-100 mb-10'>
            <label className='form-label required'>Question Hint</label>
            <textarea
              rows={3}
              className='form-control mb-2'
              onChange={(e: any) => {
                setHint({...hint, hint: e.target.value})
              }}
              value={hint?.hint}
            />
            {errors?.questions && (
              <div className='text-danger mt-2'>{errors?.questions[selectedLang]?.hint?.hint}</div>
            )}
          </div>
          <div className='fv-row w-100 mb-10'>
            <div id='kt_ecommerce_add_category_conditions'>
              <div data-repeater-item='' className='form-group d-flex flex-wrap gap-5 mb-5'>
                <div className='w-100 mw-100 w-550px'>
                  <label className='form-label required'>Options</label>
                </div>
                <label className='form-label w-50px'>Right Option</label>
                <label className='form-label w-40px'>Remove</label>
              </div>

              {options?.map((item: any, i: any) => (
                <div className='form-group' key={i}>
                  <div
                    data-repeater-list='kt_ecommerce_add_category_conditions'
                    className='d-flex flex-column gap-3'
                  >
                    <div data-repeater-item='' className='form-group d-flex flex-wrap mb-5 gap-10'>
                      <div className='w-100 mw-100 w-550px'>
                        <ReactQuill
                          value={item.option}
                          onChange={(content, delta, source, editor) => {
                            if (source == 'user') {
                              const data = [...options]
                              data[i] = {...data[i], option: content}
                              setOptions(data)
                            }
                          }}
                          id={`option_${i}`}
                          formats={formats}
                          modules={modules}
                          ref={questionRef}
                        />
                      </div>
                      {values.question_type == 'MCQ' ? (
                        <Field
                          className='form-check-input'
                          type='checkbox'
                          checked={item.right_option == 1 ? true : false}
                          name='right_option'
                          onChange={(e: any) => {
                            const data = [...options]
                            data[i] = {...data[i], right_option: e.currentTarget.checked ? 1 : 0}
                            setOptions(data)
                          }}
                        />
                      ) : (
                        <input
                          name='right_option'
                          type={'radio'}
                          value={i}
                          onChange={async (e: any) => {
                            const data = [...options]
                            await data.map((x: any) => {
                              x.right_option = 0
                            })
                            data[i] = {...data[i], right_option: 1}
                            setOptions(data)
                          }}
                          checked={item.right_option == 1}
                          id={`right_option_${i}`}
                          className={clsx('form-check-input mb-3 mb-lg-0')}
                          autoComplete='off'
                        />
                      )}
                      <button
                        type='button'
                        onClick={() => {
                          const data = [...options]
                          data.splice(i, 1)
                          setOptions(data)
                        }}
                        data-repeater-delete=''
                        className='btn btn-sm btn-icon btn-light-danger'
                      >
                        <span className='svg-icon svg-icon-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.5'
                              x='7.05025'
                              y='15.5356'
                              width='12'
                              height='2'
                              rx='1'
                              transform='rotate(-45 7.05025 15.5356)'
                              fill='currentColor'
                            />
                            <rect
                              x='8.46447'
                              y='7.05029'
                              width='12'
                              height='2'
                              rx='1'
                              transform='rotate(45 8.46447 7.05029)'
                              fill='currentColor'
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className='form-group mt-5'>
                <button
                  type='button'
                  onClick={() => setOptions([...options, {option: '', right_option: 0}])}
                  data-repeater-create=''
                  className='btn btn-sm btn-light-primary'
                >
                  <span className='svg-icon svg-icon-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <rect
                        opacity='0.5'
                        x='11'
                        y='18'
                        width='12'
                        height='2'
                        rx='1'
                        transform='rotate(-90 11 18)'
                        fill='currentColor'
                      />
                      <rect x='6' y='11' width='12' height='2' rx='1' fill='currentColor' />
                    </svg>
                  </span>
                  Add another option
                </button>
              </div>
            </div>
          </div>{' '}
        </>
      )}
    </div>
  )
}

export {Step2}
