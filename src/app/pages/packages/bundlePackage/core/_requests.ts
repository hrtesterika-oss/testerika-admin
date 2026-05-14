import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6007/api/package": 'https://api.testerika.com/api/package'
export const BUNDLE_URL = `${API_URL}/bundle`
const getUsers = (query: string): Promise<any> => {
  return axios.get(`${BUNDLE_URL}/get/bundlePackage?${query}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${BUNDLE_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(BUNDLE_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateSetting = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${BUNDLE_URL}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${BUNDLE_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteSubPackages = (userId: any) => {
  return axios.delete(`${BUNDLE_URL}/${userId}`).then(() => {})
}

const deleteSelectedPackages = (userIds: Array<any>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${BUNDLE_URL}/delete/bundlePackage/${id}`))
  return axios.all(requests).then(() => {})
}

export const createUpdateSubPackages=(data:any)=>{
    return axios.post(`${BUNDLE_URL}/createUpdate`,data)
}
export const getAllSubPackages=()=>{
    return axios.get(`${BUNDLE_URL}/get/bundlePacakges`)
}
export const getAllSubPackagesById=(id:any)=>{
    return axios.get(`${BUNDLE_URL}/get/bundlePackage/${id}`)
}
export const getSubPackageById=(id:any)=>{
    return axios.get(`${BUNDLE_URL}/get/bundlePackage/getById/${id}`)
}
export const deleteSubPackageById=(id:any)=>{
    return axios.delete(`${BUNDLE_URL}/delete/bundlePackage/${id}`)
}
export const getAllSubPackagesData=()=>{
  return axios.get(`${BUNDLE_URL}/get/getAllPackages`)
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
