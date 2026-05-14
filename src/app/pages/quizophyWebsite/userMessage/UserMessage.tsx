import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import Dropzone from 'react-dropzone';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL';
import ToatComp from '../blog/ToatComp';
import { useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };



export default function UserMessage() { 

  const [userMessage,setUserMessage]=useState<any[]>([])
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
      const getAllUserMessage=async ()=>{
         const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/user/getAllMessage`)
         if(data?.success){
            setUserMessage(data?.data)
         }
      }
      useEffect(()=>{
         getAllUserMessage()
      },[])

  return (
    <div className="container mt-0">

              <div className="gy-5" style={{display:"flex", flexWrap:"wrap", flexDirection:"row",justifyContent:"space-evenly"}}>
              {

permissionList?.can_view && userMessage?.length>0 ?
userMessage.map((item,index)=>{
    return    <div key={index} className="card m-4" style={{maxWidth: "25rem",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
    <div className="card-body">
    <h6 className="card-title text-center text-success my-4">User Message</h6>

      <h6 className="card-title">Name : <span className="text-primary">{item?.name}</span></h6>
      <h6 className="card-title">Email : <span className="text-primary">{item?.email}</span></h6>
      <h6 className="card-title">Phone Number : <span className="text-primary">{item?.phone_number}</span></h6>
      <h6 className="card-title">Message : <span className="text-primary">{item?.message}</span></h6>

      <div className="w-100" style={{display:"flex",justifyContent:"flex-end",margin:"30px auto 3px auto"}}>
        <span>{permissionList?.can_delete && <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${QUIZOPHY_WEBSITE_API_URL}/user/${item?.id}`)
          if(data?.success){
            getAllUserMessage()
            ToatComp({message:data?.message,type:"Success"})
          }
      }}/>}</span>
    </div>

    </div>
  </div>
}) : <>
  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Message Found</h2></div>
</>
}
              </div>

      
    </div>
   
  )
        }