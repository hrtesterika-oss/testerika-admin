import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = window.location.host==="localhost:3011"?"http://localhost:6002/api/question":'https://api.testerika.com/api/question'
const QUESTION_URL = `${API_URL}/question`
const QUIZ_URL = window.location.host==="localhost:3011"?"http://localhost:6003/api/quiz/quiz":'https://api.testerika.com/api/quiz/quiz'

const getUsers = (id:any,query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${QUESTION_URL}/getAllQuestionUsingQuizId/${id}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getQuizQuestions = (id: any): Promise<any> => {
  return axios
    .get(`${QUIZ_URL}/getQuizQuestion/${id}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${QUESTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const addQuestion = (question: any): Promise<any> => {
  return axios
    .post(`${QUIZ_URL}/addQuestion`, question)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const addSelectedQuestion = (questionId: Array<ID>, quizId: any): Promise<void> => {
  const requests = questionId.map((id) =>
    axios.post(`${QUIZ_URL}/addQuestion`, {quiz_id: quizId, question_bank_id: id})
  )
  return axios.all(requests).then(() => {})
}

const deleteUser = (questionId: ID): Promise<void> => {
  return axios.delete(`${QUIZ_URL}/question/${questionId}`).then(() => {})
}

const deleteSelectedUsers = (questionId: Array<ID>): Promise<void> => {
  const requests = questionId.map((id) => axios.delete(`${QUIZ_URL}/question/${id}`))
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
}
