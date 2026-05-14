/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Field, ErrorMessage, useFormik, Formik, Form} from 'formik'
import clsx from 'clsx'
import axios, {AxiosResponse} from 'axios'
import Swal from 'sweetalert2'
// import {API_URL} from './ApiUrl'
import Dropzone from 'react-dropzone'
import {API_URL} from '../../settings/components/ApiUrl'
import {getUserById, updateQuiz} from '../quizList/core/_requests'
import {SaveModal} from '../SaveModal'

const Edit: FC = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const question = {
    question_type: 'Quiz',
    time_limit: '20 seconds',
    points: 'Standard',
    option_type: 'Single',
    question: '',
    options: [
      {options: '', right_option: false},
      {options: '', right_option: false},
      {options: '', right_option: false},
      {options: '', right_option: false},
    ],
    image: '',
  }
  const [questions, setQuestions] = useState<Array<any>>([])
  const [quiz, setQuiz] = useState<any>()
  const [selected, setSelected] = useState<any>(0)
  const [showMoreOption, setMoreOption] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    getUserById(id)
      .then((data: any) => {
        setQuiz(data)
        setQuestions(data.questions)
        setName(data.name)
        setDescription(data.description)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }, [])

  useEffect(() => {
  }, [questions])

  const uploadImage = async (file: any) => {
    const fd = new FormData()
    fd.append('image', file[0])
    await axios
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        let ques = [...questions]
        ques[selected] = {...ques[selected], image: data.data}
        setQuestions(ques)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const payload = {
      id: quiz.id,
      questions,
      name,
      description,
    }
    updateQuiz(payload)
      .then((data: any) => {
        navigate('/conference-quiz/list')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addQuestion = () => {
    setQuestions([...questions, question])
    setSelected(questions.length)
  }

  const duplicateQuestion = () => {
    setQuestions([...questions, questions[selected]])
    setSelected(questions.length)
  }

  const deleteQuestion = () => {
    if (questions.length > 1) {
      let ques = [...questions]
      ques.splice(selected, 1)
      setQuestions(ques)
      if (selected == 0) {
        setSelected(0)
      } else {
        setSelected(selected - 1)
      }
    }
  }

  const onClose = () => {
    setModalOpen(false)
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-lg-row-fluid'>
        <Formik
          // validationSchema={currentSchema}
          initialValues={question}
          onSubmit={onSubmit}
          // validateOnChange={false}
        >
          {({setFieldValue}) => (
            <Form>
              <div className='card-body d-flex justify-content-end'>
                <button
                  type='button'
                  onClick={() => setModalOpen(true)}
                  className='btn btn-sm btn-primary me-3'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => {
                    navigate('/conference-quiz/list')
                  }}
                  className='btn btn-sm btn-secondary me-3'
                >
                  Exit
                </button>
              </div>
              <div className='row'>
                <div className='col-md-2'>
                  {questions?.map((item: any, i: any) => (
                    <div
                      key={i}
                      className='mt-2'
                      style={{
                        backgroundColor: selected == i ? '#EAF4FC' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelected(i)}
                    >
                      <h6 className='text-justify'>
                        {i + 1} {item?.question_type}
                      </h6>
                      <h6 className='text-center'>{item?.question}</h6>
                      <div className='p-5 border'></div>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={addQuestion}
                    className='btn btn-sm btn-primary me-3 mt-5'
                  >
                    Add Question
                  </button>
                  <button className='btn btn-sm btn-secondary me-3 mt-2'>Add Slide</button>
                </div>
                <div className='col-md-7 bg-light text-center'>
                  <Field
                    name='question'
                    className='form-control text-center mt-10 shadow'
                    placeholder='Type your question here'
                    onChange={(e: any) => {
                      let ques = [...questions]
                      ques[selected] = {...ques[selected], question: e.target.value}
                      setQuestions(ques)
                    }}
                    value={questions[selected]?.question}
                  />
                  <div
                    className='mt-5 bg-white mx-auto shadow'
                    style={{
                      height: questions[selected]?.question_type == 'True or false' ? 300 : 220,
                      width: 320,
                    }}
                  >
                    {questions[selected]?.image ? (
                      <>
                        <img src={questions[selected]?.image} style={{height: 200, width: 300}} />
                        <button
                          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                          data-kt-image-input-action='remove'
                          data-bs-toggle='tooltip'
                          title='Remove avatar'
                          type='button'
                          onClick={() => {
                            let ques = [...questions]
                            ques[selected] = {...ques[selected], image: ''}
                            setQuestions(ques)
                          }}
                        >
                          <i className='bi bi-x fs-2'></i>
                        </button>
                      </>
                    ) : (
                      <Dropzone onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                          <section>
                            <div {...getRootProps()}>
                              <i className='fas fa-plus-square fa-3x mt-20 text-primary'></i>
                              <div className='mt-3' style={{fontSize: 16}}>
                                Find and insert media
                              </div>
                              <input {...getInputProps()} />
                              <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    )}
                  </div>
                  {questions[selected]?.question_type == 'Type answer' && (
                    <div className='mt-5'>
                      <input
                        className='mx-auto shadow p-5'
                        style={{
                          height: 50,
                          width: 310,
                          backgroundColor: '#D13138',
                          borderRadius: 5,
                          border: '0px',
                          color: '#fff',
                        }}
                        value={questions[selected].options[0]?.options || ''}
                        onChange={(e) => {
                          let ques = [...questions]
                          ques[selected].options[0]['options'] = e.target.value
                          setQuestions(ques)
                        }}
                      />
                      <h4 className='mt-5'>Other accepted answers</h4>
                      <div className='row mt-5'>
                        {[...Array(3)].map((_: any, i: any) => (
                          <input
                            key={i}
                            className='mx-auto shadow'
                            style={{
                              height: 50,
                              width: 200,
                              backgroundColor: i == 0 ? '#1260BE' : i == 1 ? '#C79335' : '#387F1C',
                              borderRadius: 5,
                              border: '0px',
                              color: '#fff',
                            }}
                            value={questions[selected].options[i + 1]?.options || ''}
                            onChange={(e) => {
                              let ques = [...questions]
                              ques[selected].options[i + 1]['options'] = e.target.value
                              setQuestions(ques)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {questions[selected]?.question_type == 'True or false' && (
                    <div className='row mt-5 mx-auto'>
                      {[...Array(2)].map((_: any, i: any) => (
                        <div
                          key={i}
                          className='row mx-auto shadow'
                          style={{
                            height: 90,
                            width: '49%',
                            backgroundColor: i == 0 ? '#1260BE' : '#D13138',
                          }}
                        >
                          <div className='col-md-10 pt-10'>
                            <h2 style={{height: 90, width: '100%', color: '#fff'}}>
                              {i == 0 ? 'True' : 'False'}
                            </h2>
                          </div>
                          <div className='col-md-2'>
                            <input
                              name='right_option'
                              type={'radio'}
                              // value={0}
                              checked={questions[selected].options[i].right_option == true}
                              onChange={async (e: any) => {
                                const data = [...questions]
                                data[selected].options.map((x: any, i: any) => {
                                  data[selected].options[i].right_option = false
                                })
                                data[selected].options[i].right_option = e.currentTarget.checked
                                setQuestions(data)
                              }}
                              id={`right_option${i}`}
                              className={clsx('form-check-input mt-10')}
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {questions[selected]?.question_type == 'Quiz' && (
                    <>
                      <div className='row mt-5 mx-auto'>
                        {[...Array(2)].map((_: any, i: any) => (
                          <div
                            key={i}
                            className='bg-white mx-auto row shadow'
                            style={{height: 90, width: '49%'}}
                          >
                            <div className='col-md-10'>
                              <input
                                style={{height: 90, width: '100%', borderWidth: 0}}
                                value={questions[selected].options[i]?.options || ''}
                                onChange={(e) => {
                                  let ques = [...questions]
                                  ques[selected].options[i].options = e.target.value
                                  setQuestions(ques)
                                }}
                              />
                            </div>
                            <div className='col-md-2'>
                              <input
                                name='right_option'
                                type={'radio'}
                                // value={0}
                                checked={questions[selected].options[i].right_option == true}
                                onChange={async (e: any) => {
                                  const data = [...questions]
                                  data[selected].options.map((x: any, i: any) => {
                                    data[selected].options[i].right_option = false
                                  })
                                  data[selected].options[i].right_option = e.currentTarget.checked
                                  setQuestions(data)
                                }}
                                id={`right_option${i}`}
                                className={clsx('form-check-input mt-10')}
                                autoComplete='off'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='row mt-2 mx-auto'>
                        {[...Array(2)].map((_: any, i: any) => (
                          <div
                            key={i}
                            className='bg-white mx-auto row shadow'
                            style={{height: 90, width: '49%'}}
                          >
                            <div className='col-md-10'>
                              <input
                                style={{height: 90, width: '100%', borderWidth: 0}}
                                value={questions[selected].options[i + 2].options || ''}
                                onChange={(e) => {
                                  let ques = [...questions]
                                  ques[selected].options[i + 2].options = e.target.value
                                  setQuestions(ques)
                                }}
                              />
                            </div>
                            <div className='col-md-2'>
                              <input
                                name='right_option'
                                type={'radio'}
                                // value={1}
                                checked={questions[selected].options[i + 2].right_option == true}
                                onChange={async (e: any) => {
                                  const data = [...questions]
                                  data[selected].options.map((x: any, i: any) => {
                                    data[selected].options[i].right_option = false
                                  })
                                  data[selected].options[i + 2].right_option =
                                    e.currentTarget.checked
                                  setQuestions(data)
                                }}
                                id={`right_option${i + 2}`}
                                className={clsx('form-check-input mt-10')}
                                autoComplete='off'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      {showMoreOption && (
                        <div className='row mt-2 mx-auto'>
                          {[...Array(2)].map((_: any, i: any) => (
                            <div
                              key={i}
                              className='bg-white mx-auto row shadow'
                              style={{height: 90, width: '49%'}}
                            >
                              <div className='col-md-10'>
                                <input
                                  style={{height: 90, width: '100%', borderWidth: 0}}
                                  value={questions[selected].options[i + 4].options || ''}
                                  onChange={(e) => {
                                    let ques = [...questions]
                                    ques[selected].options[i + 4].options = e.target.value
                                    setQuestions(ques)
                                  }}
                                />
                              </div>
                              <div className='col-md-2'>
                                <input
                                  name='right_option'
                                  type={'radio'}
                                  // value={1}
                                  checked={questions[selected].options[i + 4].right_option == true}
                                  onChange={async (e: any) => {
                                    const data = [...questions]
                                    data[selected].options.map((x: any, i: any) => {
                                      data[selected].options[i].right_option = false
                                    })
                                    data[selected].options[i + 4].right_option =
                                      e.currentTarget.checked
                                    setQuestions(data)
                                  }}
                                  id={`right_option${i + 4}`}
                                  className={clsx('form-check-input mt-10')}
                                  autoComplete='off'
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <h6
                        className='mt-5'
                        style={{textDecoration: 'underline', cursor: 'pointer'}}
                        onClick={() => {
                          let ques = [...questions]
                          if (showMoreOption) {
                            ques[selected].options.splice(4, 2)
                          } else {
                            questions[selected].options.push({options: '', right_option: false})
                            questions[selected].options.push({options: '', right_option: false})
                          }
                          setQuestions(ques)
                          setMoreOption(!showMoreOption)
                        }}
                      >
                        {showMoreOption ? 'Remove' : 'Add'} more answers
                      </h6>
                    </>
                  )}
                </div>
                <div className='col-md-3 p-5'>
                  <h5>Question Type</h5>
                  <Field
                    name={`questions[${selected}].question_type`}
                    as='select'
                    onChange={(e: any) => {
                      let ques = [...questions]
                      if (e.target.value == 'True or false') {
                        ques[selected].options.splice(2, 2)
                        ques[selected].options = ques[selected].options.flatMap(
                          (x: any, i: any) => [
                            {
                              options: i == 0 ? 'True' : 'False',
                              right_option: false,
                            },
                          ]
                        )
                      } else {
                        if (ques[selected].options.length == 2) {
                          ques[selected].options = ques[selected].options.flatMap(
                            (x: any, i: any) => [
                              {
                                options: '',
                                right_option: false,
                              },
                            ]
                          )
                          ques[selected].options.push({options: '', right_option: false})
                          ques[selected].options.push({options: '', right_option: false})
                        }
                      }
                      ques[selected] = {...ques[selected], question_type: e.target.value}
                      setQuestions(ques)
                    }}
                    className='form-select mb-2'
                    value={questions[selected]?.question_type}
                  >
                    <option>Quiz</option>
                    <option>True or false</option>
                    <option>Type answer</option>
                    <option>Slider</option>
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='questions[selected]?.question_type' />
                  </div>
                  <hr className='mt-10 mb-10' />
                  <h5 className='mt-5'>Time Limit</h5>
                  <Field
                    name={`questions[${selected}].time_limit`}
                    as='select'
                    className='form-select mb-2'
                    onChange={(e: any) => {
                      let ques = [...questions]
                      ques[selected] = {...ques[selected], time_limit: e.target.value}
                      setQuestions(ques)
                    }}
                    value={questions[selected]?.time_limit}
                  >
                    <option>10 seconds</option>
                    <option>20 seconds</option>
                    <option>30 seconds</option>
                    <option>60 seconds</option>
                    <option>90 seconds</option>
                    <option>120 seconds</option>

                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='type' />
                  </div>
                  <h5 className='mt-5'>Points</h5>
                  <Field
                    name={`questions[${selected}].points`}
                    as='select'
                    className='form-select mb-2'
                    onChange={(e: any) => {
                      let ques = [...questions]
                      ques[selected] = {...ques[selected], points: e.target.value}
                      setQuestions(ques)
                    }}
                    value={questions[selected]?.points}
                  >
                    <option>Standard Points</option>
                    <option>Duplicate Points</option>
                    <option>No Points</option>
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='type' />
                  </div>
                  {questions[selected]?.question_type == 'Quiz' && (
                    <>
                      <h5 className='mt-5'>Answer Options</h5>
                      <Field
                        name={`questions[${selected}].option_type`}
                        as='select'
                        className='form-select mb-2'
                        onChange={(e: any) => {
                          let ques = [...questions]
                          ques[selected] = {...ques[selected], option_type: e.target.value}
                          setQuestions(ques)
                        }}
                        value={questions[selected].option_type}
                      >
                        <option>Single</option>
                        <option>Multiple</option>
                      </Field>
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='type' />
                      </div>
                    </>
                  )}
                  <div className='card-footer'>
                    <button type='button' onClick={deleteQuestion} className='btn'>
                      Delete
                    </button>
                    <button type='button' onClick={duplicateQuestion} className='btn btn-secondary'>
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
              {modalOpen && (
                <SaveModal
                  onClose={onClose}
                  onSubmit={onSubmit}
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              )}
            </Form>
          )}
        </Formik>
        {/* ms-lg-5 ms-xl-10 */}
      </div>
    </div>
  )
}

export {Edit}
