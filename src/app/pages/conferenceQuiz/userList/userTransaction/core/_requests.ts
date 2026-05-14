import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
import { APIURLQUIZ } from '../../../APIURL'

const API_URL = window.location.host==="localhost:3011" ? 'http://localhost:5006/api/conferenceQuiz/quiz' : 'http://localhost:5006/api/conferenceQuiz/quiz'
const QUESTION_URL = `${API_URL}/quiz`
const QUIZ_URL = window.location.host==="localhost:3011"?"http://localhost:6003/api/quiz/quiz": 'https://api.testerika.com/api/quiz/quiz'

// const getUsers = (id:any,query: string): Promise<UsersQueryResponse> => {
//   return axios
    // .get(`${API_URL}?${query}&id=${id}`)
    // .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
// }

const getUsers=(email:string,query:string)=>{
  return axios.get(`${API_URL}/admin/getAllTransaction?${query}&email=${email}`)
  .then((d: AxiosResponse<UsersQueryResponse>) => d.data)

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

const getUserById = (key: any): Promise<User | undefined> => {
  return axios
    .get(`${API_URL}/get-quiz-detail-podium/${key}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const addQuestion = (question: any): Promise<any> => {
  return axios
    .post(`${QUIZ_URL}/addQuestion`, question)
}

const addSelectedQuestion = (questionId: Array<ID>, quizId: any): Promise<void> => {
  const requests = questionId.map((id) =>
    axios.post(`${QUIZ_URL}/addQuestion`, {quiz_id: quizId, question_bank_id: id})
  )
  return axios.all(requests).then(() => {})
}

const deleteUser = (id:any,email:any): Promise<void> => {
  return axios.delete(`${APIURLQUIZ}/admin/deleteTransaction/${id}/${email}`).then(() => {})
}


const deleteSelectedUsers = (quizId: Array<ID>): Promise<void> => {
  const requests = quizId.map((id) => axios.delete(`${APIURLQUIZ}/admin/deleteTransaction/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  addQuestion,
  addSelectedQuestion,
  getQuizQuestions,
  updateStatus
}



