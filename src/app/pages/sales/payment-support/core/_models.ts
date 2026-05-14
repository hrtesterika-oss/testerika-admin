import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  user_id?: number
  transaction_id?: string
  screenshot?: string
  comments?: string
  payment_support_status?: string
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // sponsors: Yup.number().required('Sponsors is required'),
    // co_sponsors: Yup.number().required('Co-sponsors is required'),
    // sponsor_fee: Yup.number().required('Sponsors fee is required'),
    // co_sponsor_fee: Yup.number().required('Co Sponsors fee is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  user_id: undefined,
  transaction_id: '',
  screenshot: '',
  comments: '',
  payment_support_status: '',
}

export {createAccountSchemas}
