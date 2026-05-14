import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  course_name?: string
  image?: string
  position?: number
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    course_name: Yup.string().required('Course Name is required'),
    position: Yup.number().required('Position is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  course_name: '',
  image: undefined,
  position: undefined,
}

export {createAccountSchemas}
