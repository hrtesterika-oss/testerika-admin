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
import {useCommonData} from '../../commonData/CommonDataProvider'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const {allCourses} = useCommonData()
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    course_id: role.course_id || initialUser.course_id,
    course_category: role.course_category || initialUser.course_category,
    slug: role.slug || initialUser.slug,
    image: role.image || initialUser.image,
    position: role.position || initialUser.position,
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
      await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Course Categfory Updated Successfully`,
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
                <label className='d-block form-label'>Category Image</label>
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

              {/* <div className='fv-row w-100 mb-10'>
                <label className='d-flex align-items-center form-label'>
                  <span className='required'>Select Course</span>
                </label>

                <Field
                  as='select'
                  name='course_id'
                  className='form-select mb-2'
                  placeholder={'Select Course'}
                >
                  <option></option>
                  {allCourses?.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.course_name}
                    </option>
                  ))}
                </Field>
                <div className='text-danger mt-2'>
                  <ErrorMessage name='course_id' />
                </div>
              </div> */}

              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Course Category Name</label>
                <Field
                  name='course_category'
                  className='form-control mb-2'
                  onChange={(e: any) => {
                    setFieldValue('course_category', e.target.value)
                    setFieldValue('slug', e.target.value.replaceAll(' ', '-'))
                    setRoleForEdit({...roleForEdit, slug: e.target.value.replaceAll(' ', '-')})
                  }}
                  placeholder={'Enter Course Category Name'}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='course_category' />
                </div>
              </div>

              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Category Slug</label>

                <Field
                  name='category_slug'
                  className='form-control mb-2'
                  placeholder={'Enter Category Slug'}
                  value={roleForEdit.slug}
                  onChange={(e: any) => {
                    setFieldValue('slug', e.target.value.replaceAll(' ', '-'))
                    setRoleForEdit({...roleForEdit, slug: e.target.value.replaceAll(' ', '-')})
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='slug' />
                </div>
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='d-flex align-items-center form-label'>
                  <span className='required'>Position</span>
                </label>

                <Field
                  name='position'
                  type='number'
                  className='form-control mb-2'
                  placeholder={'Enter Category Position'}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='position' />
                </div>
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
