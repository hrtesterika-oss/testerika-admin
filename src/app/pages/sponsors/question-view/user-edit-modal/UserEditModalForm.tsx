import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, getPrograms, getSponsors} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import {useCommonData} from '../core/CommonDataProvider'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const {sponsors, programs} = useCommonData()

  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    sponsor_program_id: role.sponsor_program_id || initialUser.sponsor_program_id,
    sponsor_id: role.sponsor_id || initialUser.sponsor_id,
    type: role.type || initialUser.type,
    amount: role.amount || initialUser.amount,
    discount: role.discount || initialUser.discount,
    net_amount: role.net_amount || initialUser.net_amount,
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
        text: `Sponsorship Subscription Updated!`,
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
          {({setFieldValue, values, touched, setFieldError, errors}) => (
            <Form className='mx-auto mw-700px w-100 pt-5 pb-10' id='kt_create_account_form'>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Select Sponsorship Program</label>

                  <Field
                    name='sponsor_program_id'
                    as='select'
                    className='form-select mb-2'
                    placeholder={'Enter Program Name'}
                  >
                    <option></option>
                    {programs?.map((item: any, i: any) => (
                      <option key={i} value={item.id}>
                        {item?.name}
                      </option>
                    ))}
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='sponsor_program_id' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Select Sponsors</span>
                  </label>

                  <Field
                    as='select'
                    name='sponsor_id'
                    className='form-select mb-2'
                    placeholder={'Select Quiz'}
                  >
                    <option></option>
                    {sponsors?.map((item: any, i: any) => (
                      <option key={i} value={item.id}>
                        {item?.name}
                      </option>
                    ))}
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='sponsor_id' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Select Type</label>

                  <Field
                    name='type'
                    as='select'
                    className='form-select mb-2'
                    placeholder={'Enter no. of sponsors'}
                  >
                    <option></option>
                    <option>Sponsor</option>
                    <option>Cosponsor</option>
                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='type' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Amount</span>
                  </label>

                  <Field
                    name='amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='amount' />
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap gap-5 mb-10'>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='form-label required'>Discount</label>

                  <Field
                    name='discount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Discount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='discount' />
                  </div>
                </div>
                <div className='fv-row w-100 flex-md-root'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Net Amount</span>
                  </label>

                  <Field
                    name='net_amount'
                    type='number'
                    className='form-control mb-2'
                    placeholder={'Enter Net amount'}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='net_amount' />
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
