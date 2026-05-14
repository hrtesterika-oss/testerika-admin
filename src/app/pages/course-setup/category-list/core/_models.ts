import {ID, Response} from '../../../../../_metronic/helpers'
import * as Yup from 'yup'

export type User = {
  id?: ID
  course_id?: number
  course_category?: string
  slug?: string
  image?: string
  position?: number
}

export type UsersQueryResponse = Response<Array<User>>

const createAccountSchemas = [
  Yup.object().shape({
    course_category: Yup.string().required('Course Category is required'),
    slug: Yup.string().required('Slug is required'),
    position: Yup.number().required('Category position is required'),
    // course_id: Yup.number().required('Course is required'),
  }),
]

export const initialUser: User = {
  id: undefined,
  course_id: undefined,
  course_category: '',
  slug: '',
  image: undefined,
  position: undefined,
}

export {createAccountSchemas}
