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
import { PASSESURL } from '../core/_requests';
import { ErrorMessage } from 'formik';

const CreateUpdatePassesCategory = () => {
    const [selectCategory, setSelectCategory] = useState<string>("");
    const [loading,setLoading]=useState<boolean>(true)
    const params=useParams()
    let [createPass,setCreatePass]=useState<any>({
        name:"",
        visible:1,
        features:[]
    })

  
      const [visiblePanel,setVisiblePanel]=useState<any>({
         value: 'YES', label: 'YES'
      })

    let options=[
      {
        value: 'YES', label: 'YES'
      },
      {
        value: 'NO', label: 'NO'
      }
    ]

    let optionsFeatures=[
      {
        value: 'Free Quizzes', label: 'Free Quizzes'
      },
      {
        value: 'Premium Quizzes', label: 'Premium Quizzes'
      },
      {
        value: 'Doubts', label: 'Doubts'
      },
      {
        value: 'Packages', label: 'Packages'
      },
      {
        value: 'Premium Packages', label: 'Premium Packages'
      },
      {
        value: 'Featured Packages', label: 'Featured Packages'
      }
    ]
   
   
    const navigate=useNavigate()
   


    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      if(!result[0]?.can_create && !result[0]?.can_edit ) navigate("/passes")
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])

      const findPassById=async ()=>{
         const {data}=await axios.get(`${PASSESURL}/passes/passes/category/get/${params?.id}`)
         if(data?.success){
            setCreatePass(data?.data)
            if(data?.data?.features?.length>0){
              let features=data?.data?.features?.map((item:any)=>{
                return {
                  value:item?.feature,
                  label:item?.feature,
                  id:item?.id
                }
              })
              setCreatePass({...createPass,name:data?.data?.name,visible:data?.data?.visible,features:features})
            }
            // setVisiblePanel({value:data?.data?.visible_on_panel==1?"YES":"NO",label:data?.data?.visible_on_panel==1?"YES":"NO"})
            // setCreatePass(data?.data)
         }else{
            ToastComp({message:"Something went wrong",type:"Error"})
         }
      }

      useEffect(()=>{
         if(params?.id){
            findPassById()
         }
      },[params])

    


    const submitNewPass=async ()=>{            
        if(createPass?.name?.trim()==""){
          ToastComp({message:"Pass Category name should not be empty",type:"Error"})
              return false
         }
         else if(createPass?.features?.length<=0){
          ToastComp({message:"At least one Features is Required",type:"Error"})
          return false
         }
          else{
            if(params?.id){
              const {data}=await axios.put(`${PASSESURL}/passes/passes/category/update/${params?.id}`,{...createPass})
              if(data?.success){
                ToastComp({message:"Pass category Updated successfully",type:"Success"})
                   navigate("/passes/category")
              }else{
                ToastComp({message:data?.message,type:"Error"})
              } 
            }else{
              const {data}=await axios.post(`${PASSESURL}/passes/passes/category/add`,{...createPass})
              if(data?.success){
                ToastComp({message:"New Pass category created successfully",type:"Success"})
                navigate("/passes/category")
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
                                  <label className="required fs-6 fw-semibold mb-1">Pass Category Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPass?.name}  onChange={(e:any)=>{
                                      setCreatePass({...createPass,name:e?.target?.value})
                                    }} placeholder="Enter Pass Category Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      

                       

                    {/* <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                            <label className="required fs-6 fw-semibold mb-1">Visible on Panel</label>
                                        
                                            <Select options={options}  value={visiblePanel}  onChange={(e:any)=>{
                                                setVisiblePanel(e)
                                                if(e?.value=="YES"){
                                                setCreatePass({...createPass,visible:e?.value=="YES"?1:0})
                                                }else{
                                                    setCreatePass({...createPass,visible:e?.value=="YES"?1:0})
                                                }
                                            }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>           */}
                     

                     <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                            <label className="required fs-6 fw-semibold mb-1">Assign Features</label>
                                        
                                            <Select
                                              isMulti
                                              name='language'
                                              options={optionsFeatures}
                                              className='basic-multi-select'
                                              classNamePrefix='select'
                                              value={createPass?.features}
                                              onChange={(e: any, i: any) => {
                                                 setCreatePass({...createPass,features:e})
                                              }}
                                            />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>          
                     
                    
                     
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPass()
              }}>{params?.id?"Update":"Create"} Pass Category</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>
            }

          </div>
      </div>
    )
      }


export default CreateUpdatePassesCategory