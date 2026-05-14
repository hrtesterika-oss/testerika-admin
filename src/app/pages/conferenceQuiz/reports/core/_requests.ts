import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = 'http://localhost:5006/api/conferenceQuiz/quiz'
const BOOK_URL = `${API_URL}/book`
const COURSE_URL = `${API_URL}/course`

const getUsers = (query: string, id: any): Promise<UsersQueryResponse> => {
  let pinId = parseInt(id)
  return axios
    .get(`${API_URL}/getPins/${pinId}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getAllCourses = (): Promise<any> => {
  return axios.get(`${COURSE_URL}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getQuizByPin = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/pin/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const shareIndex = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/shareIndex/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<any>) => response.data)
}

const showRank = (): Promise<any | undefined> => {
  return axios
    .post(`${API_URL}/showRank`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<any>) => response.data)
}

const startQuiz = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/start/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createPin = (data: any): Promise<User | undefined> => {
  return axios
    .post(`${API_URL}/pin`, data)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getResult = (data: any): Promise<User | undefined> => {
  return axios
    .post(`${API_URL}/getResult`, data)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${BOOK_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${BOOK_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${BOOK_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createPin,
  updateStatus,
  getAllCourses,
  startQuiz,
  shareIndex,
  showRank,
  getQuizByPin,
  getResult,
}


