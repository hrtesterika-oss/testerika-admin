import axios from "axios"

export const PAYMENT_API_KEY=window.location.host==="localhost:3011"?"http://localhost:6007/api/package/payment":'https://api.testerika.com/api/package/payment'
export const USERURL=window.location.host=="localhost:3011"?"http://localhost:6001/api/user/user":"https://api.testerika.com/api/user/user"

export const getPlanStatusActiveInactiveNotBuyYet=(status,query)=>{
    return axios.get(`${PAYMENT_API_KEY}/getPremiumUser/${status}?${query}`)
}
export const getTotalTransactionCountForEveryMonthAccordingToYear=(start,end,email)=>{
   return axios.get(`${PAYMENT_API_KEY}/getTotalTransactionForEveryMonth/${start}/${end}?email=${email}`)
}
export const getAllRegistereduserList=(userIds)=>{
   return axios.post(`${USERURL}/getAllUsersUsingUserId`,{userIds})
}

export const getTotalAmountAccordingToMonthEveryYear=(start,end,currency,email)=>{
    return axios.get(`${PAYMENT_API_KEY}/getTotalPayableAmountAccordingToYearCurrencyEmail/${start}/${end}?currency=${currency}&email=${email}`)
}

export const todayLoginUserView=(ids)=>{
        return axios.post(`${PAYMENT_API_KEY}/getPaymentDetailTodayLoginUser`,{userIds:ids})

}