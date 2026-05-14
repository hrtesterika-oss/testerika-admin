import React,{useEffect,useState} from 'react'
import axios from "axios"
import { API_URL } from '../staff-management/users-list/core/_requests'
import { useAuth } from '../../modules/auth'
import { useDispatch } from 'react-redux'
const MiddleWare = ({children}:any) => {
    const dispatch=useDispatch()
    let filterUrlArr:any=["/dashboard"];

    const {currentUser}=useAuth()
    const getAuthorizedAsideMenu=async ()=>{
          const {data}=await axios.get(`${API_URL}/option/getAsideMenu/${currentUser?.id}`)
          if(data?.success){
            data?.data && data?.data?.map((item:any,index:number)=>{
              if(typeof item?.name==="string"){
                filterUrlArr.push(item?.url)
              }else{
                item?.name?.value?.map((item2:any)=>{
                    filterUrlArr.push(item2?.url)
                })
              }
        })

        dispatch({type:"addAsideMenuUrl",payload:filterUrlArr})
            dispatch({
                type:"addAsideMenu",
                payload:data.data
            })

            dispatch({
              type:"addStaffPermission",
              payload:data.permissions
          })
            
          }
    }
    useEffect(()=>{
        console.log("MiddleWare currentUser:", currentUser)
        if (currentUser && currentUser.id) {
           getAuthorizedAsideMenu()
        }
    },[currentUser])


    // const getA


    // useEffect(()=>{
    //    getAllStaffAuthorizedPermission()
    // },[])
  return (
    <div>{children}</div>
  )
}

export default MiddleWare