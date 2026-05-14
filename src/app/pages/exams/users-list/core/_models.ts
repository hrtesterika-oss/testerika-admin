import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  coupon_title?: string
  coupon_code?: string
  percentage?: number
  minimum_order_price?: number
  avail_on_purchase?: string
  visible_on_app?: number
  description?: string
  coupon_uses?: any
  coupon_dates?: any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    coupon_title: Yup.string()
      .required('Coupon title is required')
      .label('Coupon Title'),
    coupon_code: Yup.string()
      .required('Coupon code is required')
      .label('Coupon Code'),
    percentage: Yup.number()
      .required('Percentage is required')
      .label('Percentage Amount'),
    minimum_order_price: Yup.number()
      .required('Minimum Order is required')
      .label('minimum_order_price'),
  }),
  Yup.object().shape({
    coupon_uses: Yup.object().shape({
      max_user: Yup.number().required('Max User is required'),
      max_use_per_user: Yup.number().required('max_use_per_user is required'),
    }),
  }),
  Yup.object().shape({
    coupon_dates: Yup.object().shape({
      start_date: Yup.date().required('Start date is required'),
      exp_date: Yup.date().required('Expiry date is required'),
    }),
  }),
]

export const initialUser: User = {
  id: undefined,
  coupon_title: '',
  coupon_code: '',
  percentage: undefined,
  minimum_order_price: undefined,
  avail_on_purchase: '',
  visible_on_app: undefined,
  description: '',
  coupon_uses: {
    max_user: undefined,
  },
  coupon_dates: {},
}

export {createAccountSchemas}
