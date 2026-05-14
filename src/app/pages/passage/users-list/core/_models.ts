import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  subject_id?: number
  question_type?: string
  level?: string
  questions?: any
  courses?: any
  marks?: any
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    question_type: Yup.string()
      .required('question_type is required')
      .label('question_type'),
    level: Yup.string()
      .required('level is required')
      .label('level'),
    courses: Yup.array().min(1),
    subject_id: Yup.number()
      .required('subject_id is required')
      .label('subject_id'),
    marks: Yup.object().shape({
      marks: Yup.number().required('Marks is required'),
      negitive_mark: Yup.number().required('Negitive Mark is required'),
    }),
  }),
  Yup.object().shape({
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
        solution: Yup.object().shape({
          solution: Yup.string().required('Solution is required'),
        }),
        hint: Yup.object().shape({
          hint: Yup.string().required('Hint is required'),
        }),
      })
    ),
  }),
]

export const initialUser: User = {
  subject_id: undefined,
  question_type: '',
  level: '',
  courses: [],
  marks: {
    marks: null,
    negitive_mark: null,
  },
  questions: [
    {
      question_bank_id: null,
      question: '',
      language: 'HINDI',
      hint: {hint: ''},
      options: [{option: '', right_option: 0}],
      solution: {solution: ''},
      verified: {is_verified: null, verified_by: ''},
    },
    {
      question_bank_id: null,
      question: '',
      language: 'ENGLISH',
      hint: {hint: ''},
      options: [{option: '', right_option: 0}],
      solution: {solution: ''},
      verified: {is_verified: null, verified_by: ''},
    },
  ],
}

export {createAccountSchemas}
