export const APIURLAUTH=window.location.host == 'localhost:3011' ? 'http://localhost:5006/api/conferenceQuiz/auth' : `https://api.testerika.com/api/conferenceQuiz/auth`
export const APIURLQUIZ=window.location.host == 'localhost:3011' ? 'http://localhost:5006/api/conferenceQuiz/quiz' : `https://api.testerika.com/api/conferenceQuiz/quiz`
export const APIURLTEMPLATE=window.location.host == 'localhost:3011' ? 'http://localhost:5006/api/conferenceQuiz/template' : `https://api.testerika.com/api/conferenceQuiz/template`
export const APIURLPAYMENT=window.location.host == 'localhost:3011' ? 'http://localhost:5006/api/conferenceQuiz/quiz/payment-gateway' : `https://api.testerika.com/api/conferenceQuiz/quiz/payment-gateway`
