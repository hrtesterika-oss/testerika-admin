import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Role, PermissionQueryResponse} from './_models'

// const API_URL = process.env.REACT_APP_THEME_API_URL
export const API_URL=window.location.host==="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const ROLE_URL = `${API_URL}/staff`

const getUsers = (query: string): Promise<PermissionQueryResponse> => {
  return axios
    .get(`${ROLE_URL}?${query}`)
    .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const getRoles = (): Promise<PermissionQueryResponse> => {
  return axios.get(`${ROLE_URL}/roles`).then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const getPermissions = (): Promise<PermissionQueryResponse> => {
  return axios
    .get(`${API_URL}/role/permissions`)
    .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const checkEmail = (email: string): Promise<PermissionQueryResponse> => {
  return axios
    .get(`${ROLE_URL}/checkEmail?email=${email}`)
    .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const uploadImagedata=(fd:any)=>{
   return axios.post(`${ROLE_URL}/upload-image`,fd)
}

const getUserById = (id: ID): Promise<any> => {
  return axios.get(`${ROLE_URL}/${id}`)
}

const createUser = (role: any): Promise<any> => {
  const fd = new FormData()
  // const admin: any = role.admin
  // fd.append('first_name', role.first_name)
  // fd.append('last_name', role.last_name)
  // fd.append('email', role.email)
  // fd.append('phone_number', role.phone_number)
  // fd.append('password', role.password)
  // fd.append('profile_image', role.profile_image)
  // fd.append('admin', admin)
  // fd.append('role_id', role.role_id)
  // fd.append('permissions', JSON.stringify(role.permissions))
  return axios.post(`${ROLE_URL}/createNewStaff`, role)
}

const updateUser = (role: any): Promise<any> => {
  const fd = new FormData()
  // const admin: any = role.admin
  // fd.append('first_name', role.first_name)
  // fd.append('last_name', role.last_name)
  // fd.append('email', role.email)
  // fd.append('phone_number', role.phone_number)
  // fd.append('password', role.password)
  // fd.append('profile_image', role.profile_image)
  // fd.append('admin', admin)
  // fd.append('role_id', role.role_id)
  // fd.append('permissions', JSON.stringify(role.permissions))
  return axios.put(`${ROLE_URL}/${role.id}`, role)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${ROLE_URL}/${userId}`).then(() => {})
}

const deleteUserData = (userId: number): Promise<any> => {
  return axios.delete(`${ROLE_URL}/${userId}`)
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${ROLE_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  getPermissions,
  getRoles,
  checkEmail,
  uploadImagedata,
  deleteUserData
}
