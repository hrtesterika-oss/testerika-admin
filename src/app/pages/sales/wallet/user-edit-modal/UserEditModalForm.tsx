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

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {users} = useCommonData()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    user_id: role.user_id || initialUser.user_id,
    transaction_id: role.transaction_id || initialUser.transaction_id,
    tds_amount: role.tds_amount || initialUser.tds_amount,
    gross_amount: role.gross_amount || initialUser.gross_amount,
    amount: role.amount || initialUser.amount,
    narration: role.narration || initialUser.narration,
    type: role.type || initialUser.type,
    transaction_type: role.transaction_type || initialUser.transaction_type,
    transaction_status: role.transaction_status || initialUser.transaction_status,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const submitStep = async (values: User, actions: FormikValues) => {
    try {
      debugger
      await createUser(values)
      actions.resetForm()
      cancel(true)
      Swal.fire({
        title: 'Success!',
        text: `Sponsor Updated!`,
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
          validationSchema={currentSchema}
          initialValues={roleForEdit}
          onSubmit={submitStep}
          validateOnChange={false}
        >
          {() => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Select User</label>

                  <Field
                    name='user_id'
                    as='select'
                    className='form-select mb-2'
                    placeholder={'Enter Full Name'}
                  >
                    <option></option>
                    {users?.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item?.firstname} {item?.lastname} - ({item?.phone})
                      </option>
                    ))}
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='user_id' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>TDS Amount</span>
                  </label>

                  <Field
                    name='tds_amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter TDS Amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tds_amount' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Gross Amount</label>

                  <Field
                    name='gross_amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Gross Amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='gross_amount' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Net Amount</span>
                  </label>

                  <Field
                    name='amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Net Amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='amount' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label'>Transaction Id</label>

                  <Field
                    name='transaction_id'
                    className='form-control mb-2'
                    placeholder={'Enter Transaction Id'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='transaction_id' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Naaration</span>
                  </label>

                  <Field
                    name='narration'
                    className='form-control mb-2'
                    placeholder={'Enter Narration Amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='narration' />
                  </div>
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
