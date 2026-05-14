import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Editor from '../../quizophyWebsite/editor/Editor'
import ToastComp from '../../conferenceQuiz/userList/ToastComp'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../users-list/core/_requests'
const API_URL =window.location.host==="localhost:3011"?"http://localhost:6003/api/quiz/quiz": 'https://api.testerika.com/api/quiz/quiz'

const AdddNotification = () => {
    const [value,setValue]=useState("")
    const params=useParams()
    const [data,setData]=useState({
        id:undefined,
        quiz_id:undefined,
        notification_subject:"",
        message:"",
        notification_type:"Default",
        send_push_notification:0,
        show_my_name:0
    })
    const navigate=useNavigate()
    const [type,setType]=useState({
        label:"Default",value:"Default"
    })

    useEffect(()=>{
       if(params && params?.id){
        getUserById(params?.id).then((data)=>{
           setData(data)
           setValue(data?.message)
           setType({value:data?.notification_type,label:data?.notification_type})
        })
       }
    },[])
    const options = [
        {label: 'Default', value: 'Default'},
        {label: 'Attempt Quiz', value: 'Attempt Quiz'},
        {label: 'Missing Quiz', value: 'Missing Quiz'},
        {label: 'Result', value: 'Result'},
        {label: 'Winning Amount', value: 'Winning Amount'},
        {label: 'Withdrawal', value: 'Withdrawal'},
        {label: 'Book Update', value: 'Book Update'}
      ]
      const submitNotification=async ()=>{
        if(data?.notification_subject?.trim()=="" || !data?.notification_subject?.trim()){
            ToastComp({message:"Notifications Subject can't be empty",type:"Error"})
         }
         else if(data?.notification_type?.trim()=="" || !data?.notification_type?.trim()){
            ToastComp({message:"Notification Type can't be empty",type:"Error"})
         }
         else if(value?.trim()=="" || !value?.trim()){
            ToastComp({message:"Message can't be empty",type:"Error"})
         }
         else{
             if(params && params?.id){
                const data2=await axios.put(`${API_URL}/updateNotifications/${params?.id}`,{...data,message:value})
                if(data2?.data?.success){
                    ToastComp({message:"Notification Updated Successfully",type:"Success"})
                    navigate("/utilities/notifications")
                }
             }else{
                const data2=await axios.post(`${API_URL}/createNotifications`,{...data,message:value})
                if(data2?.data?.success){
                    ToastComp({message:"Notification Created Successfully",type:"Success"})
                    navigate("/utilities/notifications")
                }
             }
           
         }
         
      }

  return (
    <div className="container">
         <div className="row">
            <div className="col-12">
                <div className="row" style={{width:"80%",margin:"auto",padding:"20px",borderRadius:"10px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",marginBottom:"100px"}}>
                    <div className="col-12 text-center mx-auto my-4" style={{borderBottom:"1px solid black"}}>
                        <h5> {params?.id?"Update":"Add"} Announcement</h5>
                    </div>
                    <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary mb-3">Subject</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} placeholder="Enter Subject" name="first-name" value={data?.notification_subject} onChange={(e:any)=>{
                                    setData({...data,notification_subject:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                    </div>
                    <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary mb-3">Select Pushnotification Type</label>
                                <Select
                                    options={options}
                                    className='basic-multi-select'
                                    classNamePrefix='select'
                                    value={type}
                                    placeholder="Select Pushnotification Type "
                                    onChange={(e: any, i: any) => {
                                        setType(e)
                                        setData({...data,notification_type:e?.value})
                                    }}
                              />   
                              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                    </div>
                    <div className="col-12">
                        <label className="required fs-6 fw-semibold text-primary my-5">Message</label>
                            <Editor setValue={setValue} value={value}/>
                        </div>
                       

                        <div className="col-12 text-center mx-auto" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div className='fv-row'>
                                <label className='form-check form-check-custom form-check-solid me-9'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    checked={data?.send_push_notification===1?true:false}
                                    name='core_permission'
                                    id='kt_permissions_core'
                                    onChange={(e:any)=>{
                                       if(data?.send_push_notification===1){
                                        setData({...data,send_push_notification:0})
                                       }else{
                                        setData({...data,send_push_notification:1})

                                       }
                                    }}
                                />
                                <span className='form-check-label'>Send Push Notifications</span>
                                </label>
                            </div>
                            <div className='fv-row'>
                                <label className='form-check form-check-custom form-check-solid me-9'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    checked={data?.show_my_name===1?true:false}
                                    name='core_permission'
                                    id='kt_permissions_core'
                                    onChange={(e:any)=>{
                                       if(data?.show_my_name===1){
                                        setData({...data,show_my_name:0})
                                       }else{
                                        setData({...data,show_my_name:1})
                                       }
                                    }}
                                />
                                <span className='form-check-label'>Show My Name</span>
                                </label>
                            </div>
                            <div>
                            <button className="btn btn-primary my-4" onClick={()=>{
                                 submitNotification()
                            }}>Save</button>
                            </div>
                          
                        </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default AdddNotification