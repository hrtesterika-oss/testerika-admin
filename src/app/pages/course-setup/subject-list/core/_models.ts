import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  subject_name?: string
  courses?: any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    subject_name: Yup.string().required('Subject Name is required'),
    courses: Yup.array().min(1),
  }),
]

export const initialUser: User = {
  id: undefined,
  courses: [],
  subject_name: '',
}

export {createAccountSchemas}
