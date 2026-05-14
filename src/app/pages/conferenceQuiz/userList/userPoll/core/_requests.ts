import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011" ? 'http://localhost:5006/api/conferenceQuiz/poll' : 'http://localhost:5006/api/conferenceQuiz/poll'
const QUESTION_URL = `${API_URL}/quiz`
const QUIZ_URL = window.location.host==="localhost:3011" ? 'http://localhost:5006/api/conferenceQuiz/poll' : 'http://localhost:5006/api/conferenceQuiz/poll'

// const getUsers = (id:any,query: string): Promise<UsersQueryResponse> => {
  // return axios
  //   .get(`${API_URL}?${query}&id=${id}`)
  //   .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
// }

const getUsers = (id:any,query:string) => {
  return axios
    .get(`${API_URL}?${query}&id=${id}`)
    .then((d: any) => d.data)
}

const getSummary = (id:any) => {
  return axios
    .get(`${API_URL}/getSummary/${id}`)
    .then((d: any) => d.data)
}


const updateStatus=(status:any,id:any)=>{
  return axios
  .put(`${API_URL}/status/${id}`,status)
  .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getQuizQuestions = (id: number,quiz_id:any): Promise<any> => {
  return axios
    .get(`${QUIZ_URL}/quizQuestion/${id}/${quiz_id}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (key: any) => {
  return axios
    .get(`${API_URL}/get-poll-detail-podium/${key}`)
    .then((response: AxiosResponse<Response<any>>) => response.data)
}

const createPoll = (data: any): Promise<any> => {
  return axios
    .post(`${API_URL}/createPoll`, data)
}
const updatePoll = (id:any,data: any): Promise<any> => {
  return axios
    .put(`${API_URL}/editPoll/${id}`, data)
}

const getPollResult=(key:any)=>{
  return axios.get(`${API_URL}/getPollResult/${key}`)
}


const addSelectedQuestion = (questionId: Array<ID>, quizId: any): Promise<void> => {
  const requests = questionId.map((id) =>
    axios.post(`${QUIZ_URL}/addQuestion`, {quiz_id: quizId, question_bank_id: id})
  )
  return axios.all(requests).then(() => {})
}

const deleteUser = (quiz_id:any): Promise<void> => {
  return axios.delete(`${API_URL}/${quiz_id}`).then(() => {})
}

const deleteSelectedUsers = (quizId: Array<ID>): Promise<void> => {
  const requests = quizId.map((id) => axios.delete(`${API_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createPoll,
  addSelectedQuestion,
  getQuizQuestions,
  updateStatus,
  getSummary,
  updatePoll,
  getPollResult
}



