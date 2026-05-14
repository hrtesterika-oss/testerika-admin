import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL =window.location.host==="localhost:3011"?"http://localhost:6003/api/quiz": 'https://api.testerika.com/api/quiz'
const USER_URL = `${API_URL}/quiz`
const COURSE_URL =window.location.host==="localhost:3011"?"http://localhost:6008/api/common/course": 'https://api.testerika.com/api/common/course'
const SUBJECT_URL =window.location.host==="localhost:3011"?"http://localhost:6008/api/common/subject/getAll": 'https://api.testerika.com/api/common/subject/getAll'
const QUIZTYPE_URL = `${API_URL}/quizType`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${USER_URL}/result?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getAllCourses = (): Promise<any> => {
  return axios.get(`${COURSE_URL}`).then((d: AxiosResponse<any>) => d.data)
}


const publishResultData = (id:number): Promise<any> => {
  return axios.get(`${USER_URL}/getQuizResultWithQuizId/${id}`).then((d: AxiosResponse<any>) => d.data)
}

const getAllSubjects = (): Promise<any> => {
  return axios.get(`${SUBJECT_URL}`).then((d: AxiosResponse<any>) => d.data)
}

const getQuizTypes = (): Promise<any> => {
  return axios.get(`${QUIZTYPE_URL}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<any | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<any>) => response.data)
}

const createUser = (user: any): Promise<any | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createQuizSetting = (quiz: any): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/quizSetting`, quiz)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${USER_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getQuizTypeById=(id:number)=>{
  return axios.get(`${API_URL}/quiz/getQuizTypeById/${id}`)
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
  updateStatus,
  createQuizSetting,
  getAllCourses,
  getAllSubjects,
  getQuizTypes,
  getQuizTypeById,
  publishResultData
}
