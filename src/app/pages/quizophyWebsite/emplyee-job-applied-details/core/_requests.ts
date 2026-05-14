import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
const API_URL = window.location.host==="localhost:3011" ? 'http://localhost:5006/api/conferenceQuiz/web/admin-setting' : 'http://localhost:5006/api/conferenceQuiz/web/admin-setting'

const TEMP_URL = window.location.host==="localhost:3011" ? 'http://localhost:5006/api/conferenceQuiz/web/admin-setting' : 'http://localhost:5006/api/conferenceQuiz/web/admin-setting'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${API_URL}/getAllAppliedJob?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}
const updateEmployeeJobStatus=(id:any,data:any)=>{
   return axios.put(`${API_URL}/updateEmployeeJobStatus/${id}`,data)
}

const getAllTemplates = (): Promise<any> => {
  return axios.get(`${TEMP_URL}/getAll`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getSummary = (id: any): Promise<any | undefined> => {
  return axios
    .get(`${API_URL}/getSummary/${id}`)
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

const timesUp = (): Promise<any | undefined> => {
  return axios
    .post(`${API_URL}/timeUp`)
    .then((response: AxiosResponse<Response<any>>) => response.data)
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

const createQuiz = (data: any): Promise<User | undefined> => {
  return axios
    .post(`${API_URL}`, data)
    .then((response: AxiosResponse<Response<any>>) => response.data)
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
    .put(`${API_URL}/status/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateQuiz = (data: any): Promise<User | undefined> => {
  return axios
    .put(`${API_URL}`, data)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${API_URL}/deleteEmployeeJobStatus/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${API_URL}/deleteEmployeeJobStatus/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createPin,
  updateStatus,
  getAllTemplates,
  startQuiz,
  shareIndex,
  showRank,
  getQuizByPin,
  getResult,
  getSummary,
  updateQuiz,
  createQuiz,
  timesUp,
  updateEmployeeJobStatus
}



