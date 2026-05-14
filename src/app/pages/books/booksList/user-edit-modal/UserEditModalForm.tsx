import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {useCommonData} from '../../commonData/CommonDataProvider'
import ReactSelect from 'react-select'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {allCourses} = useCommonData()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [selectedCourses, setSelectedCourses] = useState<any>(null)
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    name: role.name || initialUser.name,
    description: role.description || initialUser.description,
    image: role.image || initialUser.image,
    book_pdf: role.book_pdf || initialUser.book_pdf,
    new_release: role.new_release || initialUser.new_release,
    courses: role.courses || initialUser.courses,
    type: role.type || initialUser.type,
    amount: role.amount || initialUser.amount,
  })
  const questionRef: any = useRef(null)

  useEffect(() => {
    if (roleForEdit.id && allCourses.length > 0) {
      const selected = allCourses.filter((x: any) =>
        roleForEdit?.courses.some((y: any) => y.course_id == x.id)
      )
      setSelectedCourses(selected)
    }
  }, [allCourses])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    try {
      values.description = roleForEdit.description
      await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Book Updated!`,
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
      .post(`${API_URL}/upload`, fd)
      .then((data: AxiosResponse<any>) => {
        setRoleForEdit({...roleForEdit, image: data.data})
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

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <Formik
          validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {({setFieldValue}) => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='fv-row mb-7'>
                <label className='d-block form-label'>Book Thumbnail</label>
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
                  {roleForEdit.image !== '' && (
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
                  <label className='form-label required'>Select Courses</label>
                  <ReactSelect
                    isMulti
                    name='courses'
                    options={allCourses}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={selectedCourses}
                    onChange={(e: any) => {
                      setFieldValue('courses', e)
                      setSelectedCourses(e)
                    }}
                    getOptionLabel={(option: any) => option.course_name}
                    getOptionValue={(option: any) => option.id}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='courses' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Book Name</span>
                  </label>

                  <Field
                    name='name'
                    className='form-control mb-2'
                    placeholder={'Enter Book Name'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='name' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label'>Book Price</label>

                  <Field
                    name='amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Book Price'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='amount' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Book Type</span>
                  </label>

                  <Field
                    name='type'
                    as='select'
                    className='form-select mb-2'
                    placeholder={'select book type '}
                  >
                    <option>FREE</option>
                    <option>PAID</option>
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='type' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                    <Field className='form-check-input' type='checkbox' name='new_release' />
                    <span className='form-check-label fs-15 fw-bold'>
                      Show in New Release Section
                    </span>
                  </label>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Book PDF URL</span>
                  </label>

                  <Field
                    name='book_pdf'
                    className='form-control mb-2'
                    placeholder={'Enter pdf url'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='book_pdf' />
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
