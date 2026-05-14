import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6002/api/question": 'https://api.testerika.com/api/question'
const USER_URL = `${API_URL}/question`
const COURSE_URL = window.location.host==="localhost:3011"?"http://localhost:6008/api/common/course": 'https://api.testerika.com/api/common/course'
const SUBJECT_URL =window.location.host==="localhost:3011"?"http://localhost:6008/api/common/subject/getAll":  'https://api.testerika.com/api/common/subject/getAll'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${USER_URL}?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<any> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getQuestionUsingQuestionBankIdAndLanguage=(id:any,language:string)=>{
   return axios.get(`${API_URL}/question/${id}/${language}`)
}

const getAllCourses = (): Promise<any> => {
  return axios.get(`${COURSE_URL}`).then((d: AxiosResponse<any>) => d.data)
}

const getAllSubjects = (): Promise<any> => {
  return axios.get(`${SUBJECT_URL}`).then((d: AxiosResponse<any>) => d.data)
}

const createUser = (user: any):any => {
  return axios.post(USER_URL, user)
}

const updateUser = (questionbankId:number,questionId:number,user: any):any => {
  return axios.put(`${USER_URL}/${questionbankId}/${questionId}`, user)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${API_URL}/questionBank/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
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
  console.log(userId)
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const deleteQuestionDetailsUsingId= (id:number)=>{
    return  axios.delete(`${API_URL}/question/deleteQuestion/${id}`)
}

const getQuestionDetailsusingQuestionbankIdANdQuestionId=(questionBankId:number)=>{
   return axios.get(`${API_URL}/question/getQuestionDetail/${questionBankId}`)
}

const deleteSingleOption=(id:number)=>{
  return axios.delete(`${API_URL}/question/deleteOption/${id}`)
}

const uploadQuestionFromExcelSheet=(data:any)=>{
   return axios.post(`${API_URL}/questionBank/uploadQuestionsFromExcelSheet`,data)
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
  updateStatus,
  getAllCourses,
  getAllSubjects,
  deleteQuestionDetailsUsingId,
  getQuestionDetailsusingQuestionbankIdANdQuestionId,
  deleteSingleOption,
  getQuestionUsingQuestionBankIdAndLanguage,
  uploadQuestionFromExcelSheet
}
