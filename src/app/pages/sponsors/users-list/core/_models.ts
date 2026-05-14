import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  name?: string
  mobile_number?: string
  email?: string
  logo?: string
  link?: string
  description?: string
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile_number: Yup.string().required('Mobile number is required'),
    email: Yup.string()
      .email('wrong email format')
      .required('Email is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  name: '',
  mobile_number: '',
  email: '',
  logo: '',
  link: '',
  description: '',
}

export {createAccountSchemas}
