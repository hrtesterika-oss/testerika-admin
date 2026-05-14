import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PAYMENT_API_KEY=window.location.host==="localhost:3011"?"http://localhost:6007/api/package/payment":'https://api.testerika.com/api/package/payment'
export const COMMON_API_KEY=window.location.host==="localhost:3011"?"http://localhost:6008/api/common":'https://api.testerika.com/api/common'
export const USERS_API_KEY = window.location.host==="localhost:3011"?"http://localhost:6001/api/user/user" : 'https://api.testerika.com/api/user/user'
export const EXAM_API_KEY=window.location.host==="localhost:3011"?"http://localhost:6007/api/package/exam":'https://api.testerika.com/api/package/exam'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6001/api/user":'https://api.testerika.com/api/user'
export const USER_URL = `${API_URL}/user`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${USER_URL}?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  if (!id) {
    return Promise.reject('Invalid ID')
  }
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUserStatus=(id:any,status:Number)=>{
   return axios.post(`${USER_URL}/update/user/status`,{id,status})
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: any)=> {
  return axios
    .post(`${USER_URL}/update`, user)
    .then((response:any) => response.data)
}

const updateBank = (user: User, id: ID): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/updateBank/${id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUpi = (user: User, id: ID): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/updateUpi/${id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updatePan = (user: User, id: ID): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/updatePan/${id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  updateBank,
  updateUpi,
  updatePan,
  updateUserStatus
}
