import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  user_id?: number
  upi_id?: string
  account_number?: string
  ifsc_code?: string
  amount?: number
  branch_name?: string
  withdraw_status?: string
}

export type Withdraw = {
  id?: ID
  user_id?: number
  transaction_id?: string
  tds_amount?: number
  gross_amount?: number
  amount?: number
  type?: string
  transaction_type?: string
  narration?: string
  transaction_status?: string
}

export type UsersQueryResponse = Response<Array<Withdraw>>

const createAccountSchemas = [
  Yup.object().shape({
    user_id: Yup.number().required('User is required'),
    gross_amount: Yup.number().required('Gross amount is required'),
    amount: Yup.number().required('Amount is required'),
    narration: Yup.string().required('Narration is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  user_id: undefined,
  upi_id: '',
  account_number: '',
  ifsc_code: '',
  amount: undefined,
  branch_name: '',
  withdraw_status: '',
}

export const initialWithdraw: Withdraw = {
  id: undefined,
  user_id: undefined,
  transaction_id: '',
  tds_amount: 0,
  gross_amount: undefined,
  amount: undefined,
  type: 'Dr',
  transaction_type: 'withdrawal',
  narration: 'Withdrawal request in process',
  transaction_status: 'Pending',
}

export {createAccountSchemas}
