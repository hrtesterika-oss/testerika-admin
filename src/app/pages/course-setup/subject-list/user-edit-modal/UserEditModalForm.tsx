import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, getUserById} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {useCommonData} from '../../commonData/CommonDataProvider'
import Select from 'react-select'

type Props = {
  isUserLoading: boolean
  role: User
}

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {allCourses} = useCommonData()
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [selectedCourses, setSelectedCourses] = useState<any>(null)

  const [roleForEdit, setRoleForEdit] = useState<User>({
    ...role,
    id: role.id || initialUser.id,
    courses: role.courses || initialUser.courses,
    subject_name: role.subject_name || initialUser.subject_name,
  })

  useEffect(() => {
    // if (roleForEdit.id) {
    //   console.log(allCourses)
    //   console.log(roleForEdit.id)
    //   // const selected = allCourses.filter((x: any) =>
        
    //   // )
    //   // setSelectedCourses(selected)
    // }
    if(itemIdForUpdate){
      getUserById(itemIdForUpdate).then((result:any)=>{
        let ids=JSON.parse(result.course_ids)
        let courses=allCourses.filter((item:any)=>ids.includes(item.id))
        setSelectedCourses(courses)
        setRoleForEdit({
           ...roleForEdit,
           id:result.id,
           subject_name:result.subject_name
        })
      })
    }
  }, [itemIdForUpdate])

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
        text: `Subject Updated!`,
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
              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Select Course</label>
                <Select
                  isMulti
                  name='courses'
                  options={allCourses}
                  className='basic-multi-select'
                  classNamePrefix='select'
                  value={selectedCourses}
                  onChange={(e, i) => {
                    setFieldValue('courses', e)
                    setSelectedCourses(e)
                  }}
                  getOptionLabel={(option: any) => option.course_name}
                  getOptionValue={(option: any) => option.id}
                  // formatOptionLabel={(data: any) => {
                  //   return (
                  //     <div style={{display: 'flex'}}>
                  //       {/* <div>{data.courses.course_name}</div>
                  //       <div style={{}}> - {data.course_category}</div> */}
                  //     </div>
                  //   )
                  // }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='courses' />
                </div>
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='d-flex align-items-center form-label'>
                  <span className='required'>Subject Name</span>
                </label>

                <Field
                  name='subject_name'
                  className='form-control mb-2'
                  placeholder={'Enter Subject Name'}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='subject_name' />
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
