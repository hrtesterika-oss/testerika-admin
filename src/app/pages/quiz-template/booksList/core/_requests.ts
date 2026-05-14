import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = 'http://localhost:5006/api/conferenceQuiz/template'

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.get(`${API_URL}?${query}`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${API_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const CreateTemplate = (data: any): Promise<any | undefined> => {
  return axios
    .post(API_URL, data)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateStatus = (data: any, id: ID): Promise<any | undefined> => {
  return axios
    .put(`${API_URL}/${id}`, data)
    .then((response: AxiosResponse<Response<any>>) => response.data)
    .then((response: Response<any>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${API_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${API_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, CreateTemplate, updateStatus}


