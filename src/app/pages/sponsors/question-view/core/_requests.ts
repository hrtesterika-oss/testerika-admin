import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6008/api/common" :'https://api.testerika.com/api/common'
const SUBSCRIPTION_URL = `${API_URL}/subscription`
const PROGRAM =window.location.host==="localhost:3011"?"http://localhost:6008/api/common/program/programs": 'https://api.testerika.com/api/common/program/programs'
const SPONSOR =window.location.host==="localhost:3011"?"http://localhost:6008/api/common/sponsor/sponsors": 'https://api.testerika.com/api/common/sponsor/sponsors'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${SUBSCRIPTION_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getSponsors = (): Promise<any> => {
  return axios.get(`${SPONSOR}`).then((d: AxiosResponse<any>) => d.data)
}

const getPrograms = (): Promise<any> => {
  return axios.get(`${PROGRAM}`).then((d: AxiosResponse<any>) => d.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${SUBSCRIPTION_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(SUBSCRIPTION_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${SUBSCRIPTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (questionId: ID): Promise<void> => {
  return axios.delete(`${SUBSCRIPTION_URL}/${questionId}`).then(() => {})
}

const deleteSelectedUsers = (questionId: Array<ID>): Promise<void> => {
  const requests = questionId.map((id) => axios.delete(`${SUBSCRIPTION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  updateStatus,
  createUser,
  getSponsors,
  getPrograms,
}
