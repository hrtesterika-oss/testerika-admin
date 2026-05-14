import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  subject_id?: number
  question_type_id?: number
  name?: string
  duration?: number
  total_questions?: number
  marks?: number
  language?: string
  courses?: any
  dates?: object
  prize?: any
  questions?: any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    firstname: Yup.string()
      .required('First name is required')
      .label('first_name'),
    lastname: Yup.string()
      .required('Last name is required')
      .label('last_name'),
    email: Yup.string()
      .email('Wrong email format')
      .required('Email is required')
      .label('email'),
    phone: Yup.string()
      // .positive()
      .length(10)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
      )
      .required('Phone number is required')
      .label('phone'),
    password: Yup.string()
      .required('Password is required')
      .label('password'),
    dob: Yup.string().required('Dob is required'),
    address: Yup.object().shape({
      city: Yup.string().required('City is required'),
      district: Yup.string().required('District is required'),
      state: Yup.string().required('State is required'),
    }),
    device: Yup.array().of(
      Yup.object().shape({
        device_id: Yup.string().required('Device Id is required'),
        device_token: Yup.string().required('Device Token is required'),
      })
    ),
    touchId_enable: Yup.number().required('Fingure Print is required'),
    // profile_image: Yup.object().label('profile_image')
  }),
  Yup.object().shape({
    bank: Yup.object().shape({
      account_number: Yup.string().required('Account Number is required'),
      ifsc_code: Yup.string().required('IFSC code is required'),
      bank_name: Yup.string().required('Bank Name is required'),
      branch_name: Yup.string().required('Branch Name is required'),
      state: Yup.string().required('State is required'),
    }),
  }),
  Yup.object().shape({
    upi: Yup.object().shape({
      upi_id: Yup.string().required('Upi Id is required'),
      name: Yup.string().required('Name is required'),
      father_name: Yup.string().required('Father name is required'),
    }),
  }),
  Yup.object().shape({
    pan: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      pannumber: Yup.string().required('Pan number is required'),
      dob: Yup.string().required('DOB is required'),
    }),
  }),
]

export const initialUser: User = {
  id: undefined,
  subject_id: undefined,
  question_type_id: undefined,
  courses: [],
  marks: undefined,
  questions: [],
  name: '',
  duration: undefined,
  total_questions: undefined,
  language: '',
  dates: {},
  prize: {},
}

export {createAccountSchemas}
