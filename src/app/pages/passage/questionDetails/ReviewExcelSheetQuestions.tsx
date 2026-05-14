import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.css"
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { MdDeleteOutline } from 'react-icons/md';
import {BiArrowBack} from "react-icons/bi"
import { errrorMessage, successMessage, warningMessage } from '../../../modules/auth/components/ToastComp';
import Swal from 'sweetalert2';
import { uploadQuestionFromExcelSheet } from '../users-list/core/_requests';

const ReviewExcelSheetQuestions = () => {
    const location:any=useLocation()
    const {questionBank,questionDetail}=location.state
    const [questionsData,setQuestionsData]=useState<Array<any[]>>(questionBank)
    const navigate=useNavigate()
    const modules = {
        toolbar: [
            [{header:[1,2,3,4,5,6,false]     
            }],
            [{ 'color': [] }], 
          [{size: []}],
          ['bold', 'italic'],
        ],
    }
  return (
    <div className="container">
          <div className="row">
             <div className="col-12">
                <div className="row">
              {
                questionsData?.length>0 && questionsData?.map((item:any,index:number)=>{
                      return   <div key={index} className="col-12 my-5 py-5" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                        <div>
                             <p className="text-primary fw-bolder fs-3">Q.) <span className="text-dark">{index+1}.</span></p>
                       </div>
                      <form>
                      <div className="col-12">
                              <label className='d-flex align-items-center form-label required text-primary'>Type Question</label>
                              <ReactQuill theme="snow" modules={modules} value={item.question} onChange={(e:any)=>{
                                  let totalData:any[]=questionsData
                                   let temp:any=questionsData[index]
                                   temp={...temp,question:e}
                                   totalData.splice(index,1,temp)
                                   setQuestionsData(totalData)
                                //      setQuestionsData()
                                  }} />
                     </div>

                     <div className="col-12">
                           <div className="col-12">
                              <label className='d-flex align-items-center form-label required text-primary mt-4'>Type Options</label>
                           </div>
                           <div className="col-12">
                           {
                              item?.options && item?.options?.length>0 && item?.options?.map((item:any,index2:number)=>{
                                  return   <div className="row" key={index2}>
                                  <div className="col-10 gy-4 d-flex align-items-center">
                                  <p className="fs-1 text-primary me-3">{String.fromCharCode(index2+65)}.)</p>
                                  <ReactQuill className="option_quill w-100" theme="snow" value={item.option} modules={modules} onChange={(e:any)=>{
                                    let mainArr:any[]=[...questionsData]
                                    let totalData:any={...questionsData[index]}
                                    let temp:any[]=totalData.options
                                    temp[index2]={...temp[index2],option:e}
                                    totalData.options=temp
                                    mainArr.splice(index,1,totalData)
                                    setQuestionsData(mainArr)
                                  }} />
                                  </div>
                                  <div className="col-2 d-flex justify-content-start align-items-center">
                                      {
                                          questionDetail?.question_type?.value==="Single" ?  <input
                                          name='right_option'
                                          type={'radio'}
                                          className={clsx('form-check-input mb-3 mb-lg-0')}
                                          autoComplete='off'
                                          checked={item?.right_option===1}
                                          onChange={(e:any)=>{
                                              let mainArr:any[]=[...questionsData]
                                            let totalData:any={...questionsData[index]}
                                             let temp:any[]=totalData.options
                                             temp.map((x: any) => {
                                                x.right_option = 0
                                              })
                                            temp[index2]={...temp[index2],right_option:1}
                                            totalData.options=temp
                                            mainArr.splice(index,1,totalData)
                                             setQuestionsData(mainArr)
  
                                          }}
                                       />: <input
                                       name='right_option'
                                       type={'checkbox'}
                                       className={clsx('form-check-input mb-3 mb-lg-0')}
                                       autoComplete='off'
                                       checked={item?.right_option===1}
                                       onChange={(e:any)=>{
                                           let mainArr:any[]=[...questionsData]
                                           let totalData:any={...questionsData[index]}
                                            let temp:any[]=totalData.options
                                           temp[index2]={...temp[index2],right_option:temp[index2]?.right_option===1?0:1}
                                           totalData.options=temp
                                           mainArr.splice(index,1,totalData)
                                            setQuestionsData(mainArr)
                                       }}
                                    />
                                      }
                                 
                                  </div>
                              </div>
                              })

                              
                           }
                            {item?.options?.length>2 && 
                            <MdDeleteOutline className="cursor-pointer" style={{float:"right", transform:"scale(2)", marginTop:"-65px", color:"red", marginRight:"20px",cursor:"pointer"}}  onClick={ ()=>{
                                //   data=data.slice(0,data?.length-1)
                                //   setQuestionsData({...questionsData,options:data})
                                let mainArr:any[]=[...questionsData]
                                let totalData:any={...questionsData[index]}
                                let temp:any[]=totalData.options
                                temp=temp.slice(0,temp.length-1)
                                totalData.options=temp
                                mainArr.splice(index,1,totalData)
                                setQuestionsData(mainArr)
                                                         
                          }}/>
                          }
                         
                           </div> 
                                                      
                             
                              <div className="my-5 p-5">
                                {item?.options?.length<10 && <p className="text-success fw-bolder" style={{float:"right",cursor:"pointer"}} onClick={()=>{
                                     let mainArr:any[]=[...questionsData]
                                     let totalData:any={...questionsData[index]}
                                     let temp:any[]=totalData.options
                                     temp.push({option:"",right_option:""})
                                     totalData.options=temp
                                     mainArr.splice(index,1,totalData)
                                     setQuestionsData(mainArr)
                                  }}>Add More Options</p>}
                              </div>
                              <hr/> 



                              <div className="col-12 my-5">
                                 
                                
                                 <div className="col-12">
                                          <label className='d-flex align-items-center form-label required text-primary'>Add Solution</label>
                                          <ReactQuill theme="snow" modules={modules} value={item.solution} onChange={(e:any)=>{
                                            //   setQuestionsData({...questionsData,solution:{...questionsData.solution,solution:e}})
                                            let totalData:any[]=questionsData
                                            let temp:any=questionsData[index]
                                            temp={...temp,solution:e}
                                            totalData.splice(index,1,temp)
                                            setQuestionsData(totalData)
                                              }} />
                                   </div>
                                
                                  <div className="col-12 my-3">
                                          <label className='d-flex align-items-center form-label required text-primary'>Add Hint</label>
                                          <ReactQuill theme="snow" modules={modules} value={item.hint} onChange={(e:any)=>{
                                            //   setQuestionsData({...questionsData,hint:{...questionsData.hint,hint:e}})
                                            let totalData:any[]=questionsData
                                            let temp:any=questionsData[index]
                                            temp={...temp,hint:e}
                                            totalData.splice(index,1,temp)
                                            setQuestionsData(totalData)
                                              }} />
                                   </div>
                                

                  
                              </div>
                            

                     </div>

                     </form>
                  </div>
                })
              }
                </div>
                <div className="row">
                    <div className="col-12">
                        <div>
                            <button className="btn btn-primary" onClick={async (e:any)=>{
                                  e?.preventDefault()
                                  let validate=true
                                  let questionCheck=questionsData.some((item:any)=>item?.question?.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
                                   if(questionCheck){
                                    validate=false
                                     errrorMessage("Please type All question")
                                   }else{
                                    questionsData?.map((item:any,index:number)=>{
                                        let optionCheck= item?.options?.some((item2:any)=>item2?.option?.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
                                        if(optionCheck){
                                            validate=false
                                             errrorMessage(`Please type All Options of question ${index+1}`)
                                             return
                                        }
                                      })
                                      questionsData?.map((item:any,index:number)=>{
                                        let optionCheck= item?.options?.find((item2:any)=>item2?.right_option===1)
                                        if(!optionCheck){
                                            validate=false
                                             errrorMessage(`Please select right Options of question ${index+1}`)
                                             return
                                        }
                                      })
                                   }                              
                                  
                                   if(validate){
                                    const {data}=await uploadQuestionFromExcelSheet({questionDetail,questionBank:questionsData})
                                    if(data?.success){
                                        Swal.fire({
                                            icon:"success",
                                            title: 'Questions Created Successfully!',
                                            confirmButtonText: 'Thank You',
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {
                                            navigate("/questions")
                                            } else if (result.isDenied) {
                                            navigate("/questions")
                                            }
                                        })
                                    }
                                   }
                                    
                                        
                                    
                            }}>Save Questions</button>
                        </div>
                    </div>
                </div>
             </div>
          </div>  
    </div>
  )
}

export default ReviewExcelSheetQuestions