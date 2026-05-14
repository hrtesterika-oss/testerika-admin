import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    name: role.name || initialUser.name,
    quiz_id: role.quiz_id || initialUser.quiz_id,
    image: role.image || initialUser.image,
    sponsors: role.sponsors || initialUser.sponsors,
    co_sponsors: role.co_sponsors || initialUser.co_sponsors,
    sponsor_fee: role.sponsor_fee || initialUser.sponsor_fee,
    co_sponsor_fee: role.co_sponsor_fee || initialUser.co_sponsor_fee,
    description: role.description || initialUser.description,
  })

  const questionRef: any = useRef(null)

  useEffect(() => {
  }, [roleForEdit])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    try {
      values.image = roleForEdit.image
      values.description = roleForEdit.description
      await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Sponsorship Program Updated!`,
        icon: 'success',
        confirmButtonText: 'Okay',
      })
    } catch (ex) {
      console.error(ex)
    } finally {
    }
  }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/staff/upload-image`, fd)
      .then((data: AxiosResponse<any>) => {
        setRoleForEdit({...roleForEdit, image: data.data.image})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

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

  const quiz = [
    {name: 'Prime Time', value: 1},
    {name: 'India GK', value: 2},
    {name: 'Milkha Singh Weekly Quiz', value: 3},
    {name: 'Bollywood Quiz', value: 4},
    {name: 'Mega Quiz', value: 5},
  ]

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <Formik
          validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {({setFieldValue, values, touched, setFieldError, errors}) => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='fv-row mb-7'>
                <label className='d-block form-label'>Sponsorship Program Package Image</label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        roleForEdit?.image == null || roleForEdit?.image == ''
                          ? toAbsoluteUrl('/media/svg/avatars/blank.svg')
                          : roleForEdit?.image
                      }
                      alt='avatar'
                      className='image-input-wrapper w-125px h-125px'
                    />
                  </div>
                  <label
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    title='Change avatar'
                  >
                    <i className='bi bi-pencil-fill fs-7'></i>
                    <input
                      type='file'
                      name='profile_image'
                      accept='.png, .jpg, .jpeg'
                      onChange={uploadImage}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                  {roleForEdit.image !== null && (
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                      onClick={() => setRoleForEdit({...roleForEdit, image: ''})}
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  )}
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Sponsorship Program Name</label>

                  <Field
                    name='name'
                    className='form-control mb-2'
                    placeholder={'Enter Program Name'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='name' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Select Quiz</span>
                  </label>

                  <Field
                    as='select'
                    name='quiz_id'
                    className='form-select mb-2'
                    placeholder={'Select Quiz'}
                  >
                    <option></option>
                    {quiz.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='quiz_id' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Number of sponsors</label>

                  <Field
                    name='sponsors'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter no. of sponsors'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='sponsors' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Number of co-sponsors</span>
                  </label>

                  <Field
                    name='co_sponsors'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter no. of co-sponsors'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='co_sponsors' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Sponsors Fee</label>

                  <Field
                    name='sponsor_fee'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter sponsor fee'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='sponsor_fee' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Cosponsors Fee</span>
                  </label>

                  <Field
                    name='co_sponsor_fee'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter co-sponsor fee'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='co_sponsor_fee' />
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='form-label'>Description</label>
                <ReactQuill
                  onChange={(content, delta, source, editor) => {
                    setRoleForEdit({...roleForEdit, description: content})
                  }}
                  id='description'
                  value={roleForEdit.description}
                  formats={formats}
                  modules={modules}
                  ref={questionRef}
                />
              </div>

              <div className='d-flex flex-stack pt-15'>
                <div className='mr-2'></div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>{'Submit'}</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
