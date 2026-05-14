import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6007/api/package": 'https://api.testerika.com/api/package'
export const EXAM_SECTION = `${API_URL}/exam`
const getUsers = (query: string,id:any): Promise<any> => {
  return axios.get(`${EXAM_SECTION}/exam_section/get/section/${id}/?${query}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${EXAM_SECTION}/exam_section/get/section/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(EXAM_SECTION, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateSetting = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${EXAM_SECTION}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${EXAM_SECTION}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteSubPackages = (userId: any) => {
  return axios.delete(`${EXAM_SECTION}/${userId}`).then(() => {})
}

const deleteSelectedPackages = (userIds: Array<any>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${EXAM_SECTION}/exam_section/delete/exam/${id}`))
  return axios.all(requests).then(() => {})
}

export const createUpdateSubPackages=(data:any)=>{
    return axios.post(`${EXAM_SECTION}/exam_section/createUpdate`,data)
}
export const getAllSubPackages=()=>{
    return axios.get(`${EXAM_SECTION}/get/bundlePacakges`)
}
export const getAllSubPackagesById=(id:any)=>{
    return axios.get(`${EXAM_SECTION}/get/bundlePackage/${id}`)
}
export const getSubPackageById=(id:any)=>{
    return axios.get(`${EXAM_SECTION}/exam_section/get/exam/getById/${id}`)
}
export const deleteSubPackageById=(id:any)=>{
    return axios.delete(`${EXAM_SECTION}/exam_section/delete/exam/${id}`)
}
export const getALlExamCourses=(id:any)=>{
  return axios.get(`${EXAM_SECTION}/exam_section/get/courses/${id}`)
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
