import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialPermission, Permission} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'

type Props = {
  isUserLoading: boolean
  user: Permission
}

const editUserSchema = Yup.object().shape({
  short_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Short_name is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [userForEdit] = useState<Permission>({
    ...user,
    name: user.name || initialPermission.name,
    short_name: user.short_name || initialPermission.short_name,
    core_permission: user.core_permission || initialPermission.core_permission,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  // const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const data=await updateUser(values)
          if(data){
            console.log(data)
            Swal.fire({
              title: 'Success!',
              text: `Permission ${values.id ? 'Updated' : 'Created'}!`,
              icon: 'success',
              confirmButtonText: 'Okay',
            })
            setSubmitting(true)
            cancel(true)
          }
        } else {
          const data=await createUser(values)
          console.log(data)
          if(data){
            Swal.fire({
              title: 'Success!',
              text: `Permission ${values.id ? 'Updated' : 'Created'}!`,
              icon: 'success',
              confirmButtonText: 'Okay',
            })
            setSubmitting(true)
            cancel(true)
          }
        }
      } catch (ex) {
        console.error(ex)
      } 
      // finally {
      //   setSubmitting(true)
      //   cancel(true)
      // }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Permission Name</label>
            <input
              placeholder='Enter a permission name'
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

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Short Name</label>

            <input
              placeholder='Enter a short name for permission'
              {...formik.getFieldProps('short_name')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.short_name && formik.errors.short_name},
                {
                  'is-valid': formik.touched.short_name && !formik.errors.short_name,
                }
              )}
              type='text'
              name='short_name'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.short_name && formik.errors.short_name && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.short_name}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            <label className='form-check form-check-custom form-check-solid me-9'>
              <input
                {...formik.getFieldProps('core_permission')}
                className='form-check-input'
                type='checkbox'
                checked={formik.values.core_permission}
                name='core_permission'
                id='kt_permissions_core'
              />
              <span className='form-check-label'>Set as core permission</span>
            </label>
          </div>
          {/* end::Input group */}
          <div className='text-gray-600'>
            Permission set as a <strong className='me-1'>Core Permission</strong>will be locked and
            <strong className='me-1'> not editable</strong>in future
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
