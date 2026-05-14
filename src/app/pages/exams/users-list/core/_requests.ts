import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6007/api/package": 'https://api.testerika.com/api/package'
export const EXAM_URL = `${API_URL}/exam`
const getUsers = (query: string): Promise<any> => {
  return axios.get(`${EXAM_URL}/get/exam?${query}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${EXAM_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(EXAM_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateSetting = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${EXAM_URL}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${EXAM_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteSubPackages = (userId: any) => {
  return axios.delete(`${EXAM_URL}/${userId}`).then(() => {})
}

const deleteSelectedPackages = (userIds: Array<any>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${EXAM_URL}/delete/exam/${id}`))
  return axios.all(requests).then(() => {})
}

export const createUpdateSubPackages=(data:any)=>{
    return axios.post(`${EXAM_URL}/createUpdate`,data)
}
export const getAllSubPackages=()=>{
    return axios.get(`${EXAM_URL}/get/exam`)
}
export const getAllSubPackagesById=(id:any)=>{
    return axios.get(`${EXAM_URL}/get/exam/${id}`)
}
export const getSubPackageById=(id:any)=>{
    return axios.get(`${EXAM_URL}/get/exam/getById/${id}`)
}
export const deleteSubPackageById=(id:any)=>{
    return axios.delete(`${EXAM_URL}/delete/exam/${id}`)
}
export const getAllSubPackagesData=()=>{
  return axios.get(`${EXAM_URL}/get/getAllExamTypes`)
}

export {
  getUsers,
  getUserById,
  deleteSelectedPackages,
  deleteSubPackages,
  createUser,
  updateSetting,
  updateStatus,
}
