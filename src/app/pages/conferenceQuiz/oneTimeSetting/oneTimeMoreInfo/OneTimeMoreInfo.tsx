import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { APIURLQUIZ } from '../../APIURL'
import axios from "axios"
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastComp from '../../userList/ToastComp'
import { useSelector } from 'react-redux'

const OneTimeMoreInfo = () => {
    const params=useParams()
    const [oneTimeRequest,setOneTimeRequest]=useState<any>()
    const [status,setStatus]=useState<any>({
        value:"Pending",label:"Pending"
    })
    const navigate=useNavigate()
    const [oneTimeData,setOneTimeData]=useState<any>({
        price_inr:0,
        price_usd:0,
        yourMessage:""
    })
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
    },[navItem])
    const getOneTimeRequestById=async()=>{
       const {data}=await axios.get(`${APIURLQUIZ}/admin/getOneTimeRequest/${params?.id}`)
       if(data?.success){
        setStatus({
            value:data?.data?.status,label:data?.data?.status
        })
        setOneTimeData({...oneTimeData,price_usd:data?.data?.price_usd,price_inr:data?.data?.price_inr,yourMessage:data?.data?.adminMessage})
        setOneTimeRequest(data?.data)
          
       }
    }

    const deleteOneTimeRequestById=async ()=>{
        const {data}=await axios.delete(`${APIURLQUIZ}/admin/deleteOneTimeById/${params?.id}`)
        if(data?.success){
          ToastComp({message:"Request Deleted Successfully",type:"Success"})
            navigate("/conference-quiz/podium/one-time/setting")
        }
    }
    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Verified', label: 'Verified' },
        { value: 'Rejected', label: 'Rejected' },
      ];
    useEffect(()=>{
       getOneTimeRequestById()
    },[])

    const confirmRequest=async ()=>{
      if(status?.value==="Pending"){
        ToastComp({message:"Please update status to Verified or Rejected",type:"Warning"})
      }else if(oneTimeData?.price_inr<=0){
        ToastComp({message:"Price (INR) must be greater than 0",type:"Error"})

      }else if(oneTimeData?.price_usd<=0){
        ToastComp({message:"Price (USD) must be greater than 0",type:"Error"})

      }else if(oneTimeRequest?.player_limit<=0){
        ToastComp({message:"Player limit must be graeter than 0",type:"Error"})

      }
      else{
        const {data}=await axios.put(`${APIURLQUIZ}/admin/updateOneTimeById/${oneTimeRequest?.id}`,{oneTimeRequest,status,oneTimeData})
        if(data?.success){
          ToastComp({message:"Request Updated Successfully",type:"Success"})
                navigate("/conference-quiz/podium/one-time/setting")
        }
      }
    }
  return (
    <div className="row">
          <div className="col-12">
             <form className="my-5">
             <div className="row">
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Email</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" disabled style={{background:"#f2f2f2"}} value={oneTimeRequest?.user_email}  onChange={(e:any)=>{
                                  }} placeholder="Enter Email" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" disabled style={{background:"#f2f2f2"}} value={oneTimeRequest?.plan_name}  onChange={(e:any)=>{
                                    }} placeholder="Enter Plan Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      
                      
                        <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Buy Date</label>
                       
                          <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} disabled value={oneTimeRequest?.plan_buy_date}  onChange={(e:any)=>{
                                    }} placeholder="Enter Plan Buy Date (yyy/mm/dd)" name="first-name"/> 
                         
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
             
                      
                       <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Player Limit</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={oneTimeRequest?.player_limit}  onChange={(e:any)=>{
                               setOneTimeRequest({...oneTimeRequest,player_limit:Number(e?.target?.value)})
                                    }} placeholder="Enter Player Limit" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      
                      
                    <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Enter Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={oneTimeData?.price_inr}  onChange={(e:any)=>{
                                        setOneTimeData({...oneTimeData,price_inr:Number(e?.target?.value)})
                                    
                                    }} placeholder="Enter Price (INR)" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>   
                    
              <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Enter Price (USD)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={oneTimeData?.price_usd}  onChange={(e:any)=>{
                                        setOneTimeData({...oneTimeData,price_usd:Number(e?.target?.value)})
                                    
                                    }} placeholder="Enter Price (USD)" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> 
              <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Update Status</label>
                       
                          <Select options={options} value={status}  onChange={(e:any)=>{
                              setStatus(e)
                            }} />
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>  
              <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="fs-6 fw-semibold mb-1">User Message</label>
                       
                          <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} disabled value={oneTimeRequest?.message?oneTimeRequest?.message:"No Message Found"}  onChange={(e:any)=>{
                                    }} placeholder="Enter Message" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>  
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                          <label className="fs-6 fw-semibold mb-1">Your Message (optional)</label>
                       
                          <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={oneTimeData?.yourMessage}  onChange={(e:any)=>{
                                setOneTimeData({...oneTimeData,yourMessage:e?.target?.value})
                                    }} placeholder="Your Message" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>  

              </div>
              <div className="col-12 d-flex flex-column mt-6">
             {permissionList?.can_create && <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   confirmRequest()
              }}>Confirm Request</button>}
             {permissionList?.can_delete &&  <button className="btn btn-danger mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   deleteOneTimeRequestById()
              }}>Delete Request</button>}
              
              </div>
            
             </form>
                   
             </div>
    </div>
  )
}

export default OneTimeMoreInfo