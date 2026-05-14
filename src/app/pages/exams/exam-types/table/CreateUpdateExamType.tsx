import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { Router, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToastComp from '../../../conferenceQuiz/userList/ToastComp';
import {createUpdateSubPackages, getSubPackageById } from '../core/_requests';
import { ErrorMessage } from 'formik';
import { useCommonData } from '../../../question-bank/users-list/commonData/CommonDataProvider';
import Dropzone from 'react-dropzone';
import ToatComp from '../../../conferenceQuiz/blog/ToatComp';

const CreateUpdateExamType = () => {
    const [loading,setLoading]=useState<boolean>(true)
    const params=useParams()
    let [createPackage,setCreatePackage]=useState<any>({
        id:undefined,
        name:""
    })
   
    const navigate=useNavigate()
   
    // const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    // const filterStaffPermission=async (title:string)=>{
    //   let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    // //   if(!result[0]?.can_create && !result[0]?.can_edit ) navigate("/passes")
    // }
    // useEffect(()=>{
    //   filterStaffPermission(navItem?.item)
    //   },[navItem])

      const findSubPackagesById=async (id:any)=>{
         try{
          const {data}=await getSubPackageById(id)
          if(data?.success){
              setCreatePackage({
                id:data?.data?.id,
                name:data?.data?.name,
             })             
          }else{
            navigate("/exams/exam-types")
          }
         }catch(err){
            navigate("/exams/exam-types")
         }
      }

    const submitNewPass=async ()=>{  
         if(createPackage?.name?.trim()==""){
          ToastComp({message:"Exam Type should not be empty",type:"Error"})
              return false
         }
         else{
          if(params?.id){
            let payload={
              name:createPackage?.name,
              id:params?.id?params?.id:undefined
            }
            const {data}=await createUpdateSubPackages(payload)
            if(data?.success){
                ToastComp({message:"Exam Type Updated Successfully",type:"Success"})
                navigate("/exams/exam-types")
            }else{
              ToastComp({message:"Something went wrong.Please try again",type:"Error"})
            }
              
           }else{
              let payload={
                  name:createPackage?.name,
                  id:params?.id?params?.id:undefined
              }
              const {data}=await createUpdateSubPackages(payload)
              if(data?.success){
                  ToastComp({message:"Exam Type Created Successfully",type:"Success"})
                  navigate("/exams/exam-types")
              }else{
                ToastComp({message:"Something went wrong.Please try again",type:"Error"})
              }
           
       }
         }
         
    }

    useEffect(()=>{
       if(params?.id){
        findSubPackagesById(params?.id)
       }
    },[params])

    useEffect(()=>{
         let timer= setTimeout(()=>{
          setLoading(false)
         },200)
         return ()=>{
          clearTimeout(timer)
         }
    },[])
  

    return (
      <div className="container">
          <div className="row">

            {
              loading ? <div className="row">
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"60vh"}}>
                       <h2>Loading...</h2>
                    </div>
              </div>:
             <div className="col-12">
             <form className="my-1">
             <div className="row">
                
                      
                      <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Exam Type</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.name}  onChange={(e:any)=>{
                                        setCreatePackage({...createPackage,name:e?.target?.value})
                                    }} placeholder="Enter Exam type" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                         
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPass()
              }}>{params?.id?"Update":"Create"} Exam Type</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>
            }

          </div>
      </div>
    )
      }


export default CreateUpdateExamType