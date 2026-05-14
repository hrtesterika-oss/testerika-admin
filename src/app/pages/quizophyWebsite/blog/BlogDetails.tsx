import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';

const BlogDetails = () => {
    const [blog,setBlog]=useState<any>()
    const params=useParams()
   const getBlogById=async ()=>{
       const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/blog/admin/${params.id}`)
       if(data?.success){
        setBlog(data?.data)
       }
   }
  useEffect(()=>{
    getBlogById()
  },[])
  return (
    <>
              <div className="container" style={{marginBottom:"100px"}}>
            <div className="row">
              <div className="col-12">
                 <div className="row">
                   <div className="col-12">
                         <div className="mx-auto p-5 d-flex flex-column text-center" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                          <h2 className="text-primary">{blog?.title}</h2>
                          <p style={{fontSize:"12px"}}><span style={{fontWeight:"600"}}>{new Date(blog?.date_time)?.getDate()+"-"+(Number(new Date(blog?.date_time)?.getMonth())+1)+"-"+new Date(blog?.date_time)?.getFullYear()+"   "+new Date(blog?.date_time)?.getHours()+":"+new Date(blog?.date_time)?.getMinutes()+":"+new Date(blog?.date_time)?.getSeconds()}</span></p>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div style={{width:"20%",height:"",margin:"20px auto",float:"left"}}>
                              <p className="text-primary fs-5 fw-bolder">Blog Thumbnail</p>
                              <img src={blog?.blog_thumbnail} style={{width:"100%",height:"150px",objectFit:"contain"}}/>
                            </div> 
                            <div style={{width:"70%",height:"",margin:"20px auto",float:"right"}}>
                            <p  className="text-primary fs-5 fw-bolder">Blog Image</p>
                              <img src={blog?.image} style={{width:"100%",height:"300px",objectFit:"contain"}}/>
                            </div> 
                          </div>
                        
                            <div className="mt-5 d-flex justify-content-center">
                              <h2 className="">Author:</h2>
                              <p className="fs-3 ms-4">{blog?.author}</p>
                            </div>
                         </div>
                         <div className="row">
                          <div className="col-12" style={{marginTop:"40px"}}>
                             <h2 className="text-primary">Description :</h2>
                             <div>
                             <p  className="preview" dangerouslySetInnerHTML={{__html:`${blog?.description}`}}/>
                             </div>
                          </div>

                         </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
         </>
  )
}

export default BlogDetails