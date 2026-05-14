import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToastComp from '../../../conferenceQuiz/userList/ToastComp';
import { PASSESURL, getAllPassType } from '../core/_requests';
import { ErrorMessage } from 'formik';

const CreateUpdatePasses = () => {
    const [selectCategory, setSelectCategory] = useState<string>("");
    const [loading,setLoading]=useState<boolean>(true)
    const [passType,setPassType]=useState<any[]>([])
    const params=useParams()
  
    let [createPass,setCreatePass]=useState<any>({
        pass_name:"",
        duration:"1 Months",
        price_inr:0,
        price_usd:0,
        pass_type:undefined
    })
  
      const [visiblePanel,setVisiblePanel]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [passDuration,setPassDuration]=useState<any>({ value: "1 Months", label: "1 Months" })
   
   
    const navigate=useNavigate()
   
    const optionDuration = [
      { value: "1 Months", label: "1 Months" },
      { value: "2 Months", label: "2 Months" },
      { value: "3 Months", label: "3 Months" },
      { value: "6 Months", label: "6 Months" },
      { value: "12 Months", label: "12 Months" },
      { value: "18 Months", label: "18 Months" },
      { value: "24 Months", label: "24 Months" }
    ];


    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      if(!result[0]?.can_create && !result[0]?.can_edit ) navigate("/passes")
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])

      const findPassById=async (type:any)=>{
         const {data}=await axios.get(`${PASSESURL}/passes/passes/${params?.id}`)
         if(data?.success){
           type?.filter((item:any)=>{
               if(data?.data?.pass_type_id==item?.id){
                  let newTemp={
                    id:item?.id,
                    name:item?.name,
                    value:item?.name,
                    label:item?.name,
                    visible:item?.visible
                  }
                  setCreatePass({...createPass,pass_type:newTemp,pass_name:data?.data?.pass_name,
                    price_inr:data?.data?.price_inr,
                    price_usd:data?.data?.price_usd})
                  // console.log(newTemp,"LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
                  // return newTemp
               }
            })
           
            setPassDuration({value:data?.data?.duration,label:data?.data?.duration})
         }else{
            ToastComp({message:"Something went wrong",type:"Error"})
         }
      }

      const getAllPassTypeDetailsData=async ()=>{
        const {data}=await getAllPassType()
        console.log(data)
        if(data?.success){
          let temp=data?.data?.map((item:any)=>{
            return {
              ...item,
              value:item?.name,
              label:item?.name
            }
          })
          if(params?.id){
            findPassById(data?.data)
          }
          setPassType(temp)
        }

      }

      useEffect(()=>{
         getAllPassTypeDetailsData()
      },[params])

    


    const submitNewPass=async ()=>{            
        if(createPass?.pass_name?.trim()==""){
          ToastComp({message:"Pass name should not be empty",type:"Error"})
              return false
         }
         else if(createPass?.duration?.trim()==""){
            ToastComp({message:"Pass duration should not be empty",type:"Error"})
                return false
           }
           else if(createPass?.price_inr<=0){
            ToastComp({message:"Pass price (INR) must be greater than 0",type:"Error"})
                return false
           }
           else if(createPass?.price_usd<=0){
            ToastComp({message:"Pass price (USD) must be greater than 0",type:"Error"})
                return false
           }
           else if(!createPass?.pass_type){
            ToastComp({message:"Pass Type can't be empty",type:"Error"})
                return false
           }
          else{
            if(params?.id){
              const {data}=await axios.put(`${PASSESURL}/passes/passes/${params?.id}`,{...createPass})
              if(data?.success){
                ToastComp({message:"Pass Updated successfully",type:"Success"})
                   navigate("/passes/passes")
              }else{
                ToastComp({message:data?.message,type:"Error"})
              } 
            }else{
              const {data}=await axios.post(`${PASSESURL}/passes/passes/add`,{...createPass})
              if(data?.success){
                ToastComp({message:"New Pass created successfully",type:"Success"})
                   navigate("/passes/passes")
              }else{
                ToastComp({message:data?.message,type:"Error"})
              }
            }
           
         } 

        console.log(createPass)
      
         
    }

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
                                  <label className="required fs-6 fw-semibold mb-1">Pass Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPass?.pass_name}  onChange={(e:any)=>{
                                      setCreatePass({...createPass,pass_name:e?.target?.value})
                                    }} placeholder="Enter Pass Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      

                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Pass Duration</label>
                     
                           <Select options={optionDuration}  value={passDuration}  onChange={(e:any)=>{
                              setPassDuration(e)
                              setCreatePass({...createPass,duration:e?.value})
                          }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>  

                     
                       <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPass?.price_inr}  onChange={(e:any)=>{
                             setCreatePass({...createPass,price_inr:e?.target?.value})
                                    }} placeholder="Enter Price in INR" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                    
                    
                       <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Price (USD)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPass?.price_usd}  onChange={(e:any)=>{
                                  setCreatePass({...createPass,price_usd:e?.target?.value})
                                    }} placeholder="Enter Price in USD" name="first-name"/>
                  <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>     

                    <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                            <label className="required fs-6 fw-semibold mb-1">Select pass Type</label>
                                        
                                            <Select options={passType}  value={createPass?.pass_type}  onChange={(e:any)=>{
                                                // setVisiblePanel(e)
                                                // if(e?.value=="YES"){
                                                setCreatePass({...createPass,pass_type:e})
                                                // }else{
                                                //     setCreatePass({...createPass,visible_on_panel:e?.value=="YES"?1:0})
                                                // }
                                            }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>          
                     
                    
                     
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPass()
              }}>{params?.id?"Update":"Create"} Pass</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>
            }

          </div>
      </div>
    )
      }


export default CreateUpdatePasses