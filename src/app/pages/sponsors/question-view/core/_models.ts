import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  sponsor_program_id?: number
  sponsor_id?: number
  type?: string
  amount?: number
  discount?: number
  net_amount?: number
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    type: Yup.string().required('Type is required'),
    sponsor_program_id: Yup.number().required('Sponsor program is required'),
    sponsor_id: Yup.number().required('sponsors is required'),
    amount: Yup.number().required('amount is required'),
    discount: Yup.number().required('discount is required'),
    net_amount: Yup.number().required('Net amount is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  sponsor_program_id: undefined,
  sponsor_id: undefined,
  type: '',
  amount: undefined,
  discount: undefined,
  net_amount: undefined,
}

export {createAccountSchemas}
