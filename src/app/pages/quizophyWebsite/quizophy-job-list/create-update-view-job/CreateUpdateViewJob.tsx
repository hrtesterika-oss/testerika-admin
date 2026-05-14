import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, getUserById, updateJobStatus } from '../core/_requests';
import axios from 'axios';
import { APIURLQUIZ } from '../../../conferenceQuiz/APIURL';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const CreateUpdateViewJob = () => {
  const [type,setType]=useState("view")
  const [open,setOpen]=useState<any>(false)
  const [selectState,setSelectState]=useState<any[]>([])
  const navigate=useNavigate()
  const [userData,setUserData]=useState<any>({
   profile:"",
   vacancies:1,
   work_status:"Full Time",
   experience:"1+ Years",
   location:"Jaipur",
   notice_period:"1-2 Months",
   active:1,
   draft:0,
   job_description:""
  })
  const uploadImage = async (file:any) => {
		const fd = new FormData()
		fd.append('image', file[0])
		await axios
		.post(`${APIURLQUIZ}/upload-question-image`, fd)
		  .then((data) => {
			 setUserData({...userData,job_description:data?.data?.image})
		  })
		  .catch((err) => {
			console.log(err, 'err')
		  })
	  }
  const onChangeFile = (e:any) => {
		e.preventDefault();
		uploadImage(e?.target?.files)
	  }
  const params=useParams()
  useEffect(()=>{
      if(params?.id){
        getUserById(params?.id).then((data)=>{
            if(data?.id){
                setUserData(data)
            }else{
                navigate("/quizophy-website/job-list")
            }
        }).catch(()=>{
        })
      }
  },[params])
  return (
    <div>
         <div className="container">
                                        <div className="row" style={{paddingTop:"20px",paddingBottom:"100px"}}>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Job Profile
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                placeholder="Enter Job Profile"
                                                                value={userData?.profile}
                                                                  onChange={(e)=>{
                                                                    setUserData({...userData,profile:e?.target?.value})
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                   
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Total Vacancies
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="number"                                                                
                                                                placeholder="Enter Total Vacancies"
                                                                value={userData?.vacancies}
                                                                  onChange={(e)=>{
                                                                    setUserData({...userData,vacancies:e?.target?.value})
                                                                   }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Work Status
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"                                                         
                                                                placeholder="Enter Work Status"
                                                                value={userData?.work_status}
                                                                  onChange={(e)=>{
                                                                    setUserData({...userData,work_status:e?.target?.value})
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Experience Required
                                                              
                                                          <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"                                                                
                                                                placeholder="Experience Required"
                                                                value={userData?.experience}
                                                                  onChange={(e)=>{
                                                                    setUserData({...userData,experience:e?.target?.value})
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Location 
                                                          <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"                                                               
                                                                placeholder="Enter Location"
                                                                value={userData?.location}
                                                                disabled
                                                                  onChange={(e)=>{
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Notice Period
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                placeholder="Enter Notice Period"
                                                                value={userData?.notice_period}
                                                                  onChange={(e)=>{
                                                                    setUserData({...userData,notice_period:e?.target?.value})
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Upload Job Description
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="file"                                                         
                                                                  onChange={(e)=>{
                                                                    onChangeFile(e)
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px",marginRight:"20px",}}>Active Status 
                                                          <Switch {...label} checked={userData?.active==1 ? true : false} onChange={(e:any)=>{
                                                                    setUserData({...userData,active:userData?.active==1?0:1})
                                                        }}/>
                                                            </label>
                                                        </div>
                                                        

                                                          {<div className="col-12 fv-row fv-plugins-icon-container mt-3">
                                                            <button className="btn btn-primary" style={{cursor:"pointer",marginTop:"25px", marginLeft:"auto",textAlign:"center"}} onClick={async (e)=>{
                                                              e?.preventDefault()
                                                              if(params?.id && userData?.id){
                                                                const {data}=await updateJobStatus(params?.id,userData)
                                                                if(data?.success){
                                                                    toast.success('Job Status Updated Successfully', {
                                                                        position: "top-right",
                                                                        autoClose: 2000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "dark",
                                                                    })
                                                                    navigate("/quizophy-website/job-list")
                                                                }
                                                              }else{
                                                                if(userData?.profile?.trim()=="" || !userData?.profile?.trim()){
                                                                    toast.error("Job Profile Can't be Empty", {
                                                                        position: "top-right",
                                                                        autoClose: 2000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "dark",
                                                                    })
                                                                }
                                                                else if(userData?.job_description?.trim()==""  || !userData?.job_description?.trim()){
                                                                  toast.error("Job Description Can't be Empty", {
                                                                    position: "top-right",
                                                                    autoClose: 2000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: "dark",
                                                                })
                                                                }
                                                                else{
                                                                    const {data}=await createJob(userData)
                                                                    if(data?.success){
                                                                        toast.success('Job Created Successfully', {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            draggable: true,
                                                                            progress: undefined,
                                                                            theme: "dark",
                                                                        })
                                                                        navigate("/quizophy-website/job-list") 
                                                                    }
                                                                }
                                                              
                                                              }
                                                             
                                                            //   if(data?.success){
                                                            //     toast.success('Employee Job Status Updated Successfully', {
                                                            //       position: "top-right",
                                                            //       autoClose: 2000,
                                                            //       hideProgressBar: false,
                                                            //       closeOnClick: true,
                                                            //       pauseOnHover: true,
                                                            //       draggable: true,
                                                            //       progress: undefined,
                                                            //       theme: "dark",
                                                            //   })
                                                            //   setType("view")
                                                            //   setOpen(false)
                                                            //   queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
                                                            //   setUserData({
                                                            //     full_name:"",
                                                            //     email:"",
                                                            //     phone_number:"",
                                                            //     current_location:"Rajasthan",
                                                            //     ready_to_relocate:"Yes",
                                                            //     current_company:"",
                                                            //     current_position:"",
                                                            //     position_applied_for:"",
                                                            //     total_experience:"",
                                                            //     current_ctc:"",
                                                            //     expected_ctc:"",
                                                            //     notice_period:"",
                                                            //     resume:""
                                                            //   })
                                                            //   }else{
                                                            //     toast.error('Something went wrong. Please try again.', {
                                                            //       position: "top-right",
                                                            //       autoClose: 2000,
                                                            //       hideProgressBar: false,
                                                            //       closeOnClick: true,
                                                            //       pauseOnHover: true,
                                                            //       draggable: true,
                                                            //       progress: undefined,
                                                            //       theme: "dark",
                                                            //   })
                                                            //   }
                                                            //   const {data}=await axios.post(`${APIURL}/apply-for-job`,userData)
                                                              
                                                            //   if(data?.success){
                                                            //     setOpen(false)
                                                            //  setUserData({
                                                            //       full_name:"",
                                                            //       email:"",
                                                            //       phone_number:"",
                                                            //       current_location:"Rajasthan",
                                                            //       ready_to_relocate:"Yes",
                                                            //       current_company:"",
                                                            //       current_position:"",
                                                            //       position_applied_for:"",
                                                            //       total_experience:"",
                                                            //       current_ctc:"",
                                                            //       expected_ctc:"",
                                                            //       notice_period:"",
                                                            //       resume:""
                                                            //     })
                                                            //     ToastComp({message:"Job Applied Successfully",type:"Success"})
                                                            //   }
                                                            // }
                                                          }}>
                                                              {params?.id?"Edit":"Create"} Job</button>
                                                              <button className={`btn ${userData?.draft==1?"btn-danger":"btn-warning"} ms-3`} style={{cursor:"pointer",marginTop:"25px", marginLeft:"auto",textAlign:"center"}} onClick={async (e)=>{
                                                              e?.preventDefault()
                                                              if(params?.id && userData?.id){
                                                                const {data}=await updateJobStatus(params?.id,{...userData,draft:userData?.draft==1?0:1})
                                                                if(data?.success){
                                                                    toast.success('Job Status Updated Successfully', {
                                                                        position: "top-right",
                                                                        autoClose: 2000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "dark",
                                                                    })
                                                                    navigate("/quizophy-website/job-list")
                                                                }
                                                              }else{
                                                                if(userData?.profile?.trim()=="" || !userData?.profile?.trim()){
                                                                    toast.error("Job Profile Can't be Empty", {
                                                                        position: "top-right",
                                                                        autoClose: 2000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "dark",
                                                                    })
                                                                }
                                                                else if(userData?.job_description?.trim()==""  || !userData?.job_description?.trim()){
                                                                  toast.error("Job Description Can't be Empty", {
                                                                    position: "top-right",
                                                                    autoClose: 2000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: "dark",
                                                                })
                                                                }else{
                                                                    const {data}=await createJob({...userData,draft:userData?.draft==1?0:1})
                                                                    if(data?.success){
                                                                        toast.success('Job Created Successfully', {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            draggable: true,
                                                                            progress: undefined,
                                                                            theme: "dark",
                                                                        })
                                                                        navigate("/quizophy-website/job-list") 
                                                                    }
                                                                }
                                                              }
                                                          }}>
                                                              {userData?.draft==1?"Remove From Draft":"Save in Draft"}</button>
                                                        </div>}
                                                      
                            </div>
                                  </div>
    </div>
  )
}

export default CreateUpdateViewJob