import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  subject_id?: number
  quiz_type_id?: number
  question_type_id?: number
  name?: string
  duration?: number
  total_questions?: number
  marks?: number
  language?: string
  courses?: any
  dates?: any
  prize?: any
  questions?: any
  question_choices?:any,
  question_added_to_quiz_type?:any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quiz_type_id: Yup.number().required('Quiz Type is required'),
    courses: Yup.array().min(1),
    subject_id: Yup.number().required('Subject id is required'),
    duration: Yup.number().required('Quiz duration is required'),
    language: Yup.string().required('Quiz language is required'),
    total_questions: Yup.number().required('Total questions is required'),
    marks: Yup.number().required('Marks are required'),
  }),
  Yup.object().shape({
    dates: Yup.object().shape({
      question_time: Yup.number().required('Question time is required'),
      reg_open_date: Yup.date().required('Registration open date is required'),
      start_date: Yup.date().required('Start date is required'),
      result_publish_date: Yup.date().required('Result publish date is required'),
    }),
    prize: Yup.object().shape({
      total_spots: Yup.number().required('Total spots is required'),
      entry_fee: Yup.number().required('Entry fee is required'),
      total_winner_percentage: Yup.number().required('Winner percentage is required'),
      prize_distribution_percentage: Yup.number().required('Prize distribution is required'),
      // prize_pool: Yup.number().required('Prize pool is required'),
      // first_prize: Yup.number().required('First prize is required'),
    }),
  }),
]

export const initialUser: User = {
  id: undefined,
  subject_id: undefined,
  quiz_type_id: undefined,
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
