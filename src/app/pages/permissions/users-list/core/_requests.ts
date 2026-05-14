import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Permission, PermissionQueryResponse} from './_models'

// const API_URL = process.env.REACT_APP_THEME_API_URL
const API_URL = window.location.host==="localhost:3011"?"http://localhost:6008/api/common":"https://api.testerika.com/api/common"
const PERMISSION_URL = `${API_URL}/permission`

const getUsers = (query: string): Promise<PermissionQueryResponse> => {
  return axios
    .get(`${PERMISSION_URL}?${query}`)
    .then((d: AxiosResponse<PermissionQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Permission | undefined> => {
  return axios
    .get(`${PERMISSION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Permission>>) => response.data)
    .then((response: Response<Permission>) => response.data)
}

const createUser = (user: Permission): Promise<any | undefined> => {
  return axios
    .post(PERMISSION_URL, user)
    .then((response: AxiosResponse<Response<any>>) => response.data)
}

const updateUser = (user: Permission): Promise<Permission | undefined> => {
  return axios
    .put(`${PERMISSION_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Permission>>) => response.data)
    .then((response: Response<Permission>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${PERMISSION_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${PERMISSION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
