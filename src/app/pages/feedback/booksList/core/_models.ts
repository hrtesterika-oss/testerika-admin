import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  user_id?: number
  mobile_number?: string
  email?: string
  message?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  id: undefined,
  user_id: undefined,
  mobile_number: '',
  email: '',
  message: '',
}
