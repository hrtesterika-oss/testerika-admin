import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
export const PASSESURL=window.location.host=="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6007/api/package": 'https://api.testerika.com/api/package'

export const USER_URL=window.location.host==="localhost:3011"?"http://localhost:6001/api/user/user":"https://api.testerika.com/api/user/user"

export const PACKAGE_URL = `${API_URL}/package`
const getUsers = (query: string): Promise<any> => {
  return axios.get(`${PACKAGE_URL}/get/packages?${query}`).then((d: AxiosResponse<any>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${PACKAGE_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(PACKAGE_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateSetting = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${PACKAGE_URL}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (status: any, id: ID): Promise<User | undefined> => {
  return axios
    .put(`${PACKAGE_URL}/${id}`, status)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteSubPackages = (userId: any) => {
  return axios.delete(`${PACKAGE_URL}/${userId}`).then(() => {})
}

const deleteSelectedPackages = (userIds: Array<any>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${PACKAGE_URL}/delete/packages/${id}`))
  return axios.all(requests).then(() => {})
}

export const createUpdateSubPackages=(data:any)=>{
    return axios.post(`${PACKAGE_URL}/createUpdate`,data)
}
export const getAllSubPackages=()=>{
    return axios.get(`${PACKAGE_URL}/get/packages`)
}
export const getAllSubPackagesById=(id:any)=>{
    return axios.get(`${PACKAGE_URL}/get/packages/${id}`)
}
export const getSubPackageById=(id:any)=>{
    return axios.get(`${PACKAGE_URL}/get/packages/getById/${id}`)
}
export const deleteSubPackageById=(id:any)=>{
    return axios.delete(`${PACKAGE_URL}/delete/packages/${id}`)
}
export const getAllSubPackagesData=()=>{
  return axios.get(`${PACKAGE_URL}/get/getAllSubPackages`)
}

export const generateLeaderBoard=(data:any)=>{
  return axios.post(`${PACKAGE_URL}/leaderboard/get`,data)
}

export const getAllUserDetailUsingUserIds=(userIds:any[])=>{
  return axios.post(`${USER_URL}/getAllUsersUsingUserId`,{userIds})
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
