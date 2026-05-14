import axios from "axios"
const API_URL=window.location.host=="localhost:3011"?"https://api.testerika.com/api/conferenceQuiz/quiz/admin":"https://api.testerika.com/api/conferenceQuiz/quiz/admin"

export const createCoupon=(data:any)=>{
    return axios.post(`${API_URL}/coupon/add`,data)
}
export const getAllCoupon=()=>{
    return axios.get(`${API_URL}/coupon`)
}
export const getCouponById=(id:any)=>{
    return axios.get(`${API_URL}/coupon/${id}`)
}
export const updateCouponById=(id:any,data:any)=>{
    return axios.put(`${API_URL}/coupon/${id}`,data)
}
export const deleteCouponById=(id:any)=>{
    return axios.delete(`${API_URL}/coupon/${id}`)
}
export const findCouponByCode=(code:any)=>{
    return axios.get(`${API_URL}/coupon/check/${code}`)
}

