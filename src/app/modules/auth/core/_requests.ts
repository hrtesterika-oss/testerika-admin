import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL_STAFF = window.location.host==="localhost:3011"?"http://localhost:6008/api/common/staff":"https://api.testerika.com/api/common/staff"
const LOCAL_API_URL = process.env.API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `https://preview.keenthemes.com/metronic8/laravel/api/verify_token`
export const LOGIN_URL = `https://api.testerika.com/api/common/staff/login`
export const VERIFY_URL = `https://api.testerika.com/api/common/staff/verifyOtp`
export const RESEND_URL = `https://api.testerika.com/api/common/staff/resendOtp`
export const REGISTER_URL = `${API_URL_STAFF}/register`
export const REQUEST_PASSWORD_URL = `${API_URL_STAFF}/forgot-password`
export const RESET_PASSWORD_URL = `${API_URL_STAFF}/reset-password`


// Server should return AuthModel
export function login (email: string, password: string) {
  return axios.post<any>(`${API_URL_STAFF}/login`, {
    email,
    password,
  })
}

export function verify (phone_number: string, otp: string) {
  return axios.post<any>(`${API_URL_STAFF}/verify-otp`, {
    phone_number,
    otp,
  })
}

export function resend (phone_number: string) {
  return axios.post<any>(`${API_URL_STAFF}/resend-otp`, {
    phone_number,
  })
}

// Server should return AuthModel
export function register (
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  phone_number:string
  // password_confirmation: string
) {
  return axios.post<any>(REGISTER_URL, {
    email,
    first_name,
    last_name,
    password,
    phone_number
    // password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword (email: string) {
  return axios.post(REQUEST_PASSWORD_URL, {
    email,
  })
}


export function resetPassword (email:string,otp: string,password:string) {
  return axios.post(RESET_PASSWORD_URL, {
    email,otp,password,
  })
}

export function getUserByToken (token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
