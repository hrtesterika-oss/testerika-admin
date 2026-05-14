import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  quiz_id?: number
  name?: string
  image?: string
  sponsors?: number
  co_sponsors?: number
  sponsor_fee?: number
  co_sponsor_fee?: any
  description?: string
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    sponsors: Yup.number().required('Sponsors is required'),
    co_sponsors: Yup.number().required('Co-sponsors is required'),
    sponsor_fee: Yup.number().required('Sponsors fee is required'),
    co_sponsor_fee: Yup.number().required('Co Sponsors fee is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  quiz_id: undefined,
  name: '',
  image: '',
  sponsors: undefined,
  co_sponsors: undefined,
  sponsor_fee: undefined,
  co_sponsor_fee: undefined,
  description: '',
}

export {createAccountSchemas}
