import {FC, useEffect, useMemo, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialRole, Role} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser, getPermissions} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  role: Role
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [permissions, setPermissions] = useState<any[]>([])
  const [roleForEdit, setRoleForEdit] = useState<Role>({
    ...role,
    name: role.name || initialRole.name,
    permissions: role.permissions || initialRole.permissions,
  })

  useEffect(() => {
    getPermissions()
      .then((data) => {
        let newData: any
        newData = data.data
        setPermissions(newData)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }, [])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: roleForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const data=await updateUser(values)
          if(data){
            setSubmitting(true)
            cancel(true)
            Swal.fire({
              title: 'Success!',
              text: `Role ${values.id ? 'Updated' : 'Created'}!`,
              icon: 'success',
              confirmButtonText: 'Okay',
            })
          }
        } else {
          const data=await createUser(values)
          if(data){
            setSubmitting(true)
            cancel(true)
            Swal.fire({
              title: 'Success!',
              text: `Role ${values.id ? 'Updated' : 'Created'}!`,
              icon: 'success',
              confirmButtonText: 'Okay',
            })
          }
        }
      } catch (ex) {
        console.error(ex)
      } 
    },
  })

  const onCheckbox = (e: any, id: number) => {
    const {checked, name} = e.target
    let perm: any = roleForEdit.permissions
    const index = perm?.findIndex((x: any) => x.permission_id == id)
    if (index !== -1) {
      perm[index] = {...perm[index], [name]: checked}
    } else {
      perm?.push({
        permission_id: id,
        can_view: name == 'can_view' && checked ? true : false,
        can_view_own: name == 'can_view_own' && checked ? true : false,
        can_create: name == 'can_create' && checked ? true : false,
        can_edit: name == 'can_edit' && checked ? true : false,
        can_delete: name == 'can_delete' && checked ? true : false,
      })
    }
    setRoleForEdit({...roleForEdit, permissions: perm})
  }

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_role_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_role_header'
          data-kt-scroll-wrappers='#kt_modal_add_role_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Role Name</label>
            <input
              placeholder='Enter a role name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.name && formik.errors.name},
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row'>
            <div className='table-responsive'>
              <table className='table align-middle table-row-dashed fs-6 gy-5'>
                <tbody className='text-gray-600 fw-bold'>
                <tr className="bg-primary text-white">
                      <td className='text-white ps-2'>Role Permissions</td>
                      <td style={{paddingLeft: 40}}>
                        <div className='d-flex justify-content-between align-items-center'>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <span className='form-check-label'>View</span>
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <span className='form-check-label'>View(Own)</span>
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <span className='form-check-label'>Create</span>
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <span className='form-check-label'>Edit</span>
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <span className='form-check-label'>Delete</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  {permissions.map((item, i) => (
                    <tr key={i}>
                      <td className='text-gray ps-2'>{item.name}</td>
                      <td style={{paddingLeft: 40}}>
                        <div className='d-flex justify-content-between align-items-center'>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <input
                              {...formik.getFieldProps('permissions.can_view')}
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_view
                              }
                              disabled={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_view_own == true
                              }
                              name='can_view'
                              onChange={(e) => onCheckbox(e, item.id)}
                            />
                            {/* <span className='form-check-label'>View</span> */}
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <input
                              {...formik.getFieldProps('permissions.can_view_own')}
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_view_own
                              }
                              name='can_view_own'
                              disabled={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_view == true
                              }
                              onChange={(e) => onCheckbox(e, item.id)}
                            />
                            {/* <span className='form-check-label'>View(Own)</span> */}
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <input
                              {...formik.getFieldProps('permissions.can_create')}
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_create
                              }
                              name='can_create'
                              onChange={(e) => onCheckbox(e, item.id)}
                            />
                            {/* <span className='form-check-label'>Create</span> */}
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <input
                              {...formik.getFieldProps('permissions.can_edit')}
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_edit
                              }
                              name='can_edit'
                              onChange={(e) => onCheckbox(e, item.id)}
                            />
                            {/* <span className='form-check-label'>Edit</span> */}
                          </label>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-15'>
                            <input
                              {...formik.getFieldProps('permissions.can_delete')}
                              className='form-check-input'
                              type='checkbox'
                              checked={
                                roleForEdit.permissions?.find(
                                  (x: any) => x.permission_id == item.id
                                )?.can_delete
                              }
                              name='can_delete'
                              onChange={(e) => onCheckbox(e, item.id)}
                            />
                            {/* <span className='form-check-label'>Delete</span> */}
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
