import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

 const errrorMessage=(message)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
        return
 }
 const successMessage=(message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
        return
 }
 const warningMessage=(message)=>{
    toast.warning(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
        return
 }
export {errrorMessage,successMessage,warningMessage}

