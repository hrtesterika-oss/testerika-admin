import {FC, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    user_id: role.user_id || initialUser.user_id,
    transaction_id: role.transaction_id || initialUser.transaction_id,
    screenshot: role.screenshot || initialUser.screenshot,
    comments: role.comments || initialUser.comments,
    payment_support_status: role.payment_support_status || initialUser.payment_support_status,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    try {
      await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Payment Support Updated!`,
        icon: 'success',
        confirmButtonText: 'Okay',
      })
    } catch (ex) {
      console.error(ex)
    } finally {
    }
  }

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <Formik
          // validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {({setFieldValue, values, touched, setFieldError, errors}) => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='fv-row mb-7'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        roleForEdit?.screenshot == null || roleForEdit?.screenshot == ''
                          ? toAbsoluteUrl('/media/svg/avatars/blank.svg')
                          : roleForEdit?.screenshot
                      }
                      alt='avatar'
                      className='image-input-wrapper w-500px h-500px'
                    />
                  </div>
                </div>
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='form-label'>Change Status</label>

                <Field
                  as='select'
                  name='payment_support_status'
                  className='form-select mb-2'
                  placeholder={'Enter Program Name'}
                >
                  <option>Open</option>
                  <option>Process</option>
                  <option>Declined</option>
                  <option>Success</option>
                </Field>
                <div className='text-danger mt-2'>
                  <ErrorMessage name='payment_support_status' />
                </div>
              </div>

              <div className='fv-row w-100'>
                <label className='form-label'>Reject Reason</label>

                <Field
                  name='comments'
                  className='form-control mb-2'
                  placeholder={'Enter Reject Reason'}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='comments' />
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
