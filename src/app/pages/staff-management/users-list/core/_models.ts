import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type Role = {
  id?: ID
  first_name: string
  last_name: string
  email: string
  phone_number: string
  password: string
  profile_image: any
  admin: boolean
  role_id: any
  permissions: any
}

export type PermissionQueryResponse = Response<Array<Role>>

export const initialRole: Role = {
  id: undefined,
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  profile_image: '',
  admin: false,
  role_id: null,
  permissions: [],
}

const createAccountSchemas = [
  Yup.object({
    first_name: Yup.string()
      .required('First name is required')
      .label('first_name'),
    last_name: Yup.string()
      .required('Last name is required')
      .label('last_name'),
    email: Yup.string()
      .email('Wrong email format')
      .required('Email is required')
      .label('email'),
    phone_number: Yup.string()
      // .positive()
      .length(10)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
      )
      .required('Phone number is required')
      .label('Phone Number'),
    password: Yup.string()
      .required('Password is required')
      .label('password'),
    // profile_image: Yup.object().label('profile_image')
  }),
  Yup.object({
    role_id: Yup.string()
      .required('Please select role')
      .label('role'),
  }),
]

export {createAccountSchemas}
