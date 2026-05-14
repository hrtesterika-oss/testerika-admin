import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { deleteQuestionDetailsUsingId, getUserById } from '../users-list/core/_requests';
import Switch from '@mui/material/Switch';
import { useCommonData } from '../users-list/commonData/CommonDataProvider'
import { MdDeleteOutline } from 'react-icons/md';
import { successMessage } from '../../../modules/auth/components/ToastComp';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ViewAllQuestions = () => {
   const [questionBankDetails,setQuestionDetails]=useState<Array<any[]>>([])
   const [data,setData]=useState<any>()
   const {id}=useParams()
    
   const getAllQuestions=async ()=>{
    const data=await getUserById(Number(id))
    console.log(data)
    setData(data)
    setQuestionDetails(data?.questions)
   }
   useEffect(()=>{
    getAllQuestions()
   },[])
 
  

  

    return (
      <div className="container">
          <div className="row">
             <div className="col-12 mt-5 py-5">

              {
                questionBankDetails.map((item:any,index:number)=>{
                   return   <div className="row my-5" key={index} style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"14px 20px",borderRadius:"10px"}}>
                   <div className="col-6 my-4 d-flex justify-flex-start align-items-center">
                         <h2 className="text-primary">Language : </h2>
                         <h2 className="ms-2 fs-4 fw-bolder">{item?.language}</h2>
                       </div>
                       <div className="col-6 my-4 d-flex justify-flex-start align-items-center">
                         <h2 className="text-primary">Status : </h2>
                         <h2 className={item.verified?.is_verified===1?`text-success ms-2 fs-4 fw-bolder`:`text-danger ms-2 fs-4 fw-bolder`}>{item.verified?.is_verified===1?"Verified":"Not Verified Yet"}</h2>
                       </div>
                       <div className="col-12 mt-4 d-flex justify-flex-start align-items-center">
                         <h2 className="text-primary" style={{fontSize:"16px"}}>Q.)</h2>
                         <div className="preview ms-2 " dangerouslySetInnerHTML={{__html:`${item?.question}`}}/>
                       </div>

                       <div className="col-12 my-4">
                       <div className="row" style={{display:"flex"}}>
                           {
                            item?.options?.map((item2:any,index2:number)=>{
                             return <div key={index2} className="col-6 d-flex justify-flex-start align-items-center mb-3">
                                 <h2 className={item2?.right_option===1?"text-success fw-bolder":`text-primary`} style={{fontSize:"16px"}}>{String.fromCharCode(index2+65)}.)</h2>                        
                                 <div className={item2?.right_option===1?"text-success fw-bolder preview ms-2 ":`text-dark preview ms-2 `} dangerouslySetInnerHTML={{__html:`${item2?.option}`}}/>
                              </div>                     
                            })
                           }
                        </div>

                         {/* {
                          item?.soution?.id && item?.solution?.solution.replace(/<[^>]*>?/gm, '')?.trim()!=="" && <div className="col-12 my-4">
                          <h2 className="text-primary" style={{fontSize:"16px"}}>Solution:</h2>                        
                          <div className="preview ms-2 mt-2" dangerouslySetInnerHTML={{__html:`${item?.solution?.solution}`}}/>
                          </div>
                         }

                         {
                          item?.hint?.id  && item?.hint?.hint.replace(/<[^>]*>?/gm, '')?.trim()!=="" && <div className="col-12 my-4">
                          <h2 className="text-primary" style={{fontSize:"16px"}}>Hint:</h2>                        
                          <div className="preview ms-2 mt-2" dangerouslySetInnerHTML={{__html:`${item?.hint?.hint}`}}/>
                          </div>
                         } */}
                         
                          
                       </div>
                   </div>
                })
              }
                 
             </div>

          </div>
      </div>
    )
      }


export default ViewAllQuestions