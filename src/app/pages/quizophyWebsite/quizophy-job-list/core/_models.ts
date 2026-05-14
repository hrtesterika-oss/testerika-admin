import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  name?: string
  amount?: number
  description?: string
  image?: string
  type?: string
  book_pdf?: string
  new_release?: boolean
  courses?: any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    name: Yup.string().required('Book name is required'),
    type: Yup.string().required('Book type is required'),
    // amount: Yup.number().required('Amount is required'),
    book_pdf: Yup.string().required('Book pdf url is required'),
    courses: Yup.array().min(1),
  }),
]

export const initialUser: User = {
  id: undefined,
  name: '',
  description: '',
  image: '',
  book_pdf: '',
  new_release: false,
  courses: [],
  amount: undefined,
  type: 'FREE',
}

export {createAccountSchemas}
