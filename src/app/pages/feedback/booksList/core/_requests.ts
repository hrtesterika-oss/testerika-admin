import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6001/api/user": 'https://api.testerika.com/api/user'
const FEEDBACK_URL = `${API_URL}/feedback`
const USERS =window.location.host==="localhost:3011"?"http://localhost:6001/api/user/user/getAll" :'https://api.testerika.com/api/user/user/getAll'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${FEEDBACK_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getAllUsers = (): Promise<any> => {
  return axios.get(`${USERS}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${FEEDBACK_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

// const createUser = (user: User): Promise<User | undefined> => {
//   return axios
//     .post(FEEDBACK_URL, user)
//     .then((response: AxiosResponse<Response<User>>) => response.data)
//     .then((response: Response<User>) => response.data)
// }

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${FEEDBACK_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${FEEDBACK_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${FEEDBACK_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  // createUser,
  updateStatus,
  getAllUsers,
}
