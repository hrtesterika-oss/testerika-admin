import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const CATEGORY_URL = window.location.host==="localhost:3011"?"http://localhost:6008/api/common/courseCategory" :'https://api.testerika.com/api/common/courseCategory'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${CATEGORY_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getAllCategories = (): Promise<any> => {
  return axios.get(`${CATEGORY_URL}/getAll`).then((d: AxiosResponse<any>) => d.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(CATEGORY_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${CATEGORY_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${CATEGORY_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (questionId: ID): Promise<void> => {
  return axios.delete(`${CATEGORY_URL}/${questionId}`).then(() => {})
}

const deleteSelectedUsers = (questionId: Array<ID>): Promise<void> => {
  const requests = questionId.map((id) => axios.delete(`${CATEGORY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  updateStatus,
  createUser,
  getAllCategories,
}
