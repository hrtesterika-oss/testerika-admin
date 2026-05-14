import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6008/api/common": 'https://api.testerika.com/api/common'
export const USER_URL = `${API_URL}/passes`

const getUsers = (query: string): Promise<any> => {
  return axios.get(`${USER_URL}/passes/category/get?${query}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateSetting = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${USER_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedPassCategory = (userIds: any): Promise<void> => {
  const requests = userIds.map((id:any) => axios.delete(`${USER_URL}/passes/category/delete/${id}`))
  return axios.all(requests).then(() => {})
}

export const createPassCategory=(data:any)=>{
    return axios.post(`${USER_URL}/passes/category/add`,data)
}
export const getAllCoupon=()=>{
    return axios.get(`${USER_URL}/coupon`)
}
export const getPassCategoryById=(id:any)=>{
    return axios.get(`${USER_URL}/passes/category/get/${id}`)
}
export const updatePasscategoryById=(id:any,data:any)=>{
    return axios.put(`${USER_URL}/passes/category/update/${id}`,data)
}
export const deletePassCategoryById=(id:any)=>{
    return axios.delete(`${USER_URL}/passes/category/delete/${id}`)
}

export {
  getUsers,
  deleteUser,
  deleteSelectedPassCategory,
  getUserById,
  createUser,
  updateSetting,
  updateStatus,
}
