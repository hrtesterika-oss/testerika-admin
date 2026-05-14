import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6008/api/common": 'https://api.testerika.com/api/common'
export const USER_URL = `${API_URL}/passes`

const getUsers = (query: string): Promise<any> => {
  return axios.get(`${USER_URL}/passes?${query}`).then((d: AxiosResponse<any>) => d.data)
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

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/passes/${id}`))
  return axios.all(requests).then(() => {})
}

export const createCoupon=(data:any)=>{
    return axios.post(`${USER_URL}/coupon/add`,data)
}
export const getAllCoupon=()=>{
    return axios.get(`${USER_URL}/coupon`)
}
export const getCouponById=(id:any)=>{
    return axios.get(`${USER_URL}/coupon/${id}`)
}
export const updateCouponById=(id:any,data:any)=>{
    return axios.put(`${USER_URL}/coupon/${id}`,data)
}
export const deleteCouponById=(id:any)=>{
    return axios.delete(`${USER_URL}/passes/${id}`)
}
export const findCouponByCode=(code:any)=>{
    return axios.get(`${USER_URL}/coupon/check/${code}`)
}
export const getAllPassType=()=>{
  return axios.get(`${USER_URL}/passes/getAllPassType/get`)
}
export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateSetting,
  updateStatus,
}
