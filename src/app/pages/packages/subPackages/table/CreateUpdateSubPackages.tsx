import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToastComp from '../../../conferenceQuiz/userList/ToastComp';
import {createUpdateSubPackages, getSubPackageById } from '../core/_requests';
import { ErrorMessage } from 'formik';
import { useCommonData } from '../../../question-bank/users-list/commonData/CommonDataProvider';
import Dropzone from 'react-dropzone';
import ToatComp from '../../../conferenceQuiz/blog/ToatComp';

const CreateUpdateSubPackages = () => {
    const [loading,setLoading]=useState<boolean>(true)
    const params=useParams()
    const {allCourses,allSubjects}=useCommonData()  
    const [courses,setCourses]=useState<any[]>(allCourses)
    let [createPackage,setCreatePackage]=useState<any>({
        id:undefined,
        name:"",
        description:"",
        courses:[]
    })
    useEffect(()=>{
        if(allCourses && allSubjects){
          setCourses(allCourses)
        }
    },[allCourses,allSubjects])
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
            let courseId=data?.data?.subpackagecourses?.map((item:any)=>item?.courseid)
            if(courseId && allCourses){
              setCreatePackage({
                id:data?.data?.id,
                name:data?.data?.name,
                description:data?.data?.description,
                courses:allCourses?.filter((item:any)=>courseId?.includes(item?.id))
             })             
            }
             
          }else{
            navigate("/packages/sub-packages")
          }
         }catch(err){
            navigate("/packages/sub-packages")
         }
      }

    const submitNewPass=async ()=>{  
         if(createPackage?.name?.trim()==""){
          ToastComp({message:"SubPackage name should not be empty",type:"Error"})
              return false
         }
         else if(createPackage?.description?.trim()==""){
            ToastComp({message:"SubPackage Description should not be empty",type:"Error"})
                return false
         } 
         else if(createPackage?.courses?.length<=0){
            ToastComp({message:"Select Courses (Courses can't be empty)",type:"Error"})
            return false
         }else{
             if(params?.id){
              let payload={
                name:createPackage?.name,
                description:createPackage?.description,
                id:params?.id?params?.id:undefined,
                coursesIds:createPackage?.courses?.map((item:any)=>item?.id)
              }
              const {data}=await createUpdateSubPackages(payload)
              if(data?.success){
                  ToastComp({message:"SubPackage Updated Successfully",type:"Success"})
                  navigate("/packages/sub-packages")
              }else{
                ToastComp({message:"Something went wrong.Please try again",type:"Error"})
              }
                
             }else{
                let payload={
                    name:createPackage?.name,
                    description:createPackage?.description,
                    id:params?.id?params?.id:undefined,
                    coursesIds:createPackage?.courses?.map((item:any)=>item?.id)
                }
                const {data}=await createUpdateSubPackages(payload)
                if(data?.success){
                    ToastComp({message:"SubPackage Created Successfully",type:"Success"})
                    navigate("/packages/sub-packages")
                }else{
                  ToastComp({message:"Something went wrong.Please try again",type:"Error"})
                }
             }
         }
        //    else if(createPackage?.price_inr<=0){
        //     ToastComp({message:"Pass price (INR) must be greater than 0",type:"Error"})
        //         return false
        //    }
        //    else if(createPackage?.price_usd<=0){
        //     ToastComp({message:"Pass price (USD) must be greater than 0",type:"Error"})
        //         return false
        //    }
        //    else if(!createPackage?.pass_type){
        //     ToastComp({message:"Pass Type can't be empty",type:"Error"})
        //         return false
        //    }
        //   else{
        //     if(params?.id){
        //       const {data}=await axios.put(`${PASSESURL}/passes/passes/${params?.id}`,{...createPackage})
        //       if(data?.success){
        //         ToastComp({message:"Pass Updated successfully",type:"Success"})
        //            navigate("/passes/passes")
        //       }else{
        //         ToastComp({message:data?.message,type:"Error"})
        //       } 
        //     }else{
        //       const {data}=await axios.post(`${PASSESURL}/passes/passes/add`,{...createPackage})
        //       if(data?.success){
        //         ToastComp({message:"New Pass created successfully",type:"Success"})
        //            navigate("/passes/passes")
        //       }else{
        //         ToastComp({message:data?.message,type:"Error"})
        //       }
        //     }
           
        //  } 

        // console.log(createPackage)
      
         
    }

    useEffect(()=>{
       if(params?.id && allCourses){
        findSubPackagesById(params?.id)
       }
    },[params,allCourses])

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
                                  <label className="required fs-6 fw-semibold mb-1">Sub-Package Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.name}  onChange={(e:any)=>{
                                        setCreatePackage({...createPackage,name:e?.target?.value})
                                    }} placeholder="Enter SUb-Package Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                      <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Courses</label>
                     
                           <Select 
                            options={courses} 
                            isMulti
                            name='courses'
                            className='basic-multi-select'
                            classNamePrefix='select'
                             value={createPackage?.courses}
                             getOptionLabel={(option: any) => option.course_name}
                             getOptionValue={(option: any) => option.id}   
                             onChange={(e:any)=>{
                              setCreatePackage({...createPackage,courses:e})
                          }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                     <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Sub-Package Description</label>
                                  <textarea  className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.description}  onChange={(e:any)=>{
                                      setCreatePackage({...createPackage,description:e?.target?.value})
                                    }} placeholder="Enter Sub-Package Description" rows={3} name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>  

                         
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPass()
              }}>{params?.id?"Update":"Create"} SUb-Package</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>
            }

          </div>
      </div>
    )
      }


export default CreateUpdateSubPackages