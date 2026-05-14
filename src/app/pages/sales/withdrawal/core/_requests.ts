import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6004/api/wallet":'https://api.testerika.com/api/wallet'
const WITHDRAW_URL = `${API_URL}/withdraw`
const WALLET_URL = `${API_URL}/wallet`
const USERS = window.location.host==="localhost:3011"?"http://localhost:6001/api/user/user/getAll" : 'https://api.testerika.com/api/user/user/getAll'
const QUIZ =window.location.host==="localhost:3011"?"http://localhost:6001/api/user/user/getAll" : 'https://api.testerika.com/api/quiz/quiz/getAll'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${WITHDRAW_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getAllUsers = (): Promise<any> => {
  return axios.get(`${USERS}`).then((d: AxiosResponse<any>) => d.data)
}

const getQuiz = (): Promise<any> => {
  return axios.get(`${QUIZ}`).then((d: AxiosResponse<any>) => d.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${WITHDRAW_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(WITHDRAW_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${WITHDRAW_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (questionId: ID): Promise<void> => {
  return axios.delete(`${WITHDRAW_URL}/${questionId}`).then(() => {})
}

const deleteSelectedUsers = (questionId: Array<ID>): Promise<void> => {
  const requests = questionId.map((id) => axios.delete(`${WITHDRAW_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  updateStatus,
  createUser,
  getAllUsers,
  getQuiz,
}
