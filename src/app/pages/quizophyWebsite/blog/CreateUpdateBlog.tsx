import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import Dropzone from 'react-dropzone';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL';
import { toast } from 'react-toastify';
import Switch from '@mui/material/Switch';
import ToatComp from './ToatComp';
import { useAuth } from '../../../modules/auth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../blog/index.css"
import { MdOutlineAdd } from 'react-icons/md';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { API_URL } from '../../settings/components/ApiUrl';
import { useSelector } from 'react-redux';
import Editor from '../editor/Editor';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const CreateUpdateBlog = () => {
    const navigate=useNavigate()
    const [editBlog,setEditBlog]=useState<any>()
    const {currentUser}=useAuth()
    const [blogSlug,setBlogSlug]=useState<any>()
    const [value,setValue]=useState<any>()
    const [createNewCategory,setCreateNewcategory]=useState<boolean>(false)
    const [blogImage,setblogImage]=useState<any>("")
    const [blogThumbnail,setblogThumbnail]=useState<any>("")

    const params=useParams()
    const [createBlog,setCreateBlog]=useState<any>({
        title:"",
        draft:0,
        description:"",
        image:"",
        auther:currentUser?.first_name+" "+currentUser?.last_name,
        date_time:new Date(),
        category:"",
        blog_thumbnail:""
    })
    const [blogCategory,setBlogCategory]=useState<any>()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
      const filterStaffPermission=async (title:string)=>{
        let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
        if(params.id && !result[0]?.can_edit)
          navigate("/quizophy-website/blog")
          else if(!params.id && !result[0]?.can_create)
          navigate("/quizophy-website/blog")
      }
      useEffect(()=>{
        filterStaffPermission(navItem?.item)
        },[navItem])
	const getAllBlogCategory=async ()=>{
         const {data}=  await axios.get(`${API_URL}/option/website_blog_category`)
		 setBlogCategory(data)
	}
	useEffect(()=>{
         getAllBlogCategory()
	},[])

    const modules = {
        toolbar: [
            [{header:[1,2,3,4,5,6,false]     
            }],
            [{ 'color': [] }, { 'background': [] }], 
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link','image', 'video'],
          [{ 'align': [] }],
          ['clean']
        ],
    }

const createNewBlog=async ()=>{
       if(createBlog?.title?.trim()===""){
        ToatComp({message:"Please Enter Blog Title",type:"Error"})
       }else if(value?.trim()==="" || !value?.trim()){
        ToatComp({message:"Please Enter Blog Description",type:"Error"})
       }else if(blogImage?.trim()==="" || !blogImage){
        ToatComp({message:"Please Upload Blog Image",type:"Error"})
       }
       else if(blogThumbnail?.trim()=="" || !blogThumbnail){
        ToatComp({message:"Please Upload Blog Thumbnail",type:"Error"})
       }
       else if(createBlog?.category?.trim()===""){
        ToatComp({message:"Please Select Blog Category",type:"Error"})
       }
      else{
        const {data}=await axios.post(`${QUIZOPHY_WEBSITE_API_URL}/blog/add`,{...createBlog,draft:0,blog_thumbnail:blogThumbnail,author:"Quizophy",image:blogImage,slug:blogSlug,description:value})
         if(data?.success){
            ToatComp({message:data?.message,type:"Success"})
            navigate("/quizophy-website/blog")
         }
       }
    }

    const saveBlogInDraft=async ()=>{
       if(editBlog?.id && params?.id){
        setEditBlog({...editBlog,draft:1})
        const {data}=await axios.put(`${QUIZOPHY_WEBSITE_API_URL}/blog/${params?.id}`,{...editBlog,draft:1,blog_thumbnail:blogThumbnail,image:blogImage,author:"Quizophy",slug:blogSlug,description:value})
        if(data?.success){
           if(createNewCategory){
               saveBlogCategory()
           }
           navigate("/quizophy-website/blog")
           ToatComp({message:"Blog Saved in Draft Successfully",type:"Success"})
        }
       }else{
        setCreateBlog({...createBlog,draft:1})
        const {data}=await axios.post(`${QUIZOPHY_WEBSITE_API_URL}/blog/add`,{...createBlog,draft:1,blog_thumbnail:blogThumbnail,author:"Quizophy",image:blogImage,slug:blogSlug,description:value})
        if(data?.success){
           ToatComp({message:"Blog Saved in Draft Successfully",type:"Success"})
           navigate("/quizophy-website/blog")
        }
       }
      
   }
    const updateBlogData=async ()=>{
       if(editBlog?.title?.trim()===""){
        ToatComp({message:"Please Enter Blog Title",type:"Error"})
       }else if(value?.trim()==="" || !value?.trim()){
        ToatComp({message:"Please Enter Blog Description",type:"Error"})
       }else if(blogImage?.trim()===""){
        ToatComp({message:"Please Upload Blog Image",type:"Error"})
       }
       else if(blogThumbnail?.trim()=="" || !blogThumbnail){
        ToatComp({message:"Please Upload Blog Thumbnail",type:"Error"})
       }
       else if(editBlog?.category?.trim()===""){
        ToatComp({message:"Please Select Blog Category",type:"Error"})
       }
       else{
        const {data}=await axios.put(`${QUIZOPHY_WEBSITE_API_URL}/blog/${params?.id}`,{...editBlog,draft:0,image:blogImage,blog_thumbnail:blogThumbnail, author:"Quizophy",slug:blogSlug,description:value})
         if(data?.success){
            if(createNewCategory){
                saveBlogCategory()
            }
            navigate("/quizophy-website/blog")
            ToatComp({message:data?.message,type:"Success"})
         }
       }
    }
   const getBlogById=async ()=>{
       const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/blog/admin/${params.id}`)
       if(data?.success){
        setblogImage(data?.data?.image)
        setblogThumbnail(data?.data?.blog_thumbnail)
        setBlogSlug(data?.data?.slug)
        setValue(data?.data?.description)
        setEditBlog(data?.data)
       }
   }
  useEffect(()=>{
    if(params?.id){
        getBlogById()
    }
  },[])

  const saveBlogCategory=async ()=>{
    const {data}= await axios.put(`${API_URL}/option/${blogCategory?.name}`,{value:editBlog?.id?editBlog?.category:createBlog?.category})
    if(data?.success){
        setCreateNewcategory(false)
        getAllBlogCategory()
        ToatComp({message:data?.message,type:"Success"})
    }else{
        ToatComp({message:data?.message,type:"Error"})
    }
  }

  
  const uploadImageThumbnail = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
        ToatComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Warning"})
       
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
        ToatComp({message:"Only image supported",type:"Error"})
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        await axios
        .post(`${APIURLQUIZ}/admin/upload-testimonial-image`, fd)
          .then((data: AxiosResponse<any>) => {
              if(data?.data?.success){
                setblogThumbnail(data?.data?.image)
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
        ToatComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Warning"})
       
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
        ToatComp({message:"Only image supported",type:"Error"})
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        await axios
        .post(`${APIURLQUIZ}/admin/upload-testimonial-image`, fd)
          .then((data: AxiosResponse<any>) => {
              if(data?.data?.success){
                setblogImage(data?.data?.image)
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
  return (
    <>
              <div className="container" style={{marginTop:"30px",marginBottom:"40px"}}>
            <div className="row">
              <div className="col-12">
                 <div className="row">
                   <div className="col-12">
                         <div className="row my-5">
                            <div className="col-6" >
                               <div className="p-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                               <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Title</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.title :createBlog?.title}  onChange={(e:any)=>{
                                    if(editBlog?.id){
                                        setEditBlog({...editBlog,title:e?.target?.value})
                                        const noSpecialChars = e?.target?.value?.replace(/[^a-zA-Z ]/g, '');
                                        var newStr = noSpecialChars.replace(/  +/g, ' ');
                                        newStr=newStr?.trim()
                                            let splitArr=newStr?.split(" ")
                                            setBlogSlug(splitArr?.join("-")?.toLowerCase())                                       
                                    }else{
                                        setCreateBlog({...createBlog,title:e?.target?.value})
                                        const noSpecialChars = e?.target?.value?.replace(/[^a-zA-Z ]/g, '');
                                        var newStr = noSpecialChars.replace(/  +/g, ' ');
                                        newStr=newStr?.trim()
                                            let splitArr=newStr?.split(" ")
                                            setBlogSlug(splitArr?.join("-")?.toLowerCase())                                       
                                    }
                                }} placeholder="Enter Blog Title" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Slug</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} disabled value={blogSlug} onChange={()=>{}} placeholder="Your Blog Slug" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Meta Title</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.metaTitle :createBlog?.metaTitle}  onChange={(e:any)=>{
                                    if(editBlog?.id){
                                        setEditBlog({...editBlog,metaTitle:e?.target?.value})                                       
                                    }else{
                                        setCreateBlog({...createBlog,metaTitle:e?.target?.value})                                      
                                    }
                                }} placeholder="Enter Blog Meta Title" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Blog Meta Description</label>
                             
                                <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.metaDescription :createBlog?.metaDescription}  onChange={(e:any)=>{
                                    if(editBlog?.id){
                                        setEditBlog({...editBlog,metaDescription:e?.target?.value})                                       
                                    }else{
                                        setCreateBlog({...createBlog,metaDescription:e?.target?.value})                                      
                                    }
                                }} placeholder="Enter Blog Meta Description" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
         
            
              <div className="col-md-12 fv-row fv-plugins-icon-container mt-3 d-flex">
                {
                    !createNewCategory && <div>
                    <label className="required fs-6 fw-semibold text-primary mb-3">Select Blog Category</label>
                    <div className="d-flex align-items-center" style={{width:"300px"}}>
                    <select className="form_style form-select form-control w-100 p-2" value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                                        if(editBlog?.id){
                                            setEditBlog({...editBlog,category:e?.target?.value})
                                        }else{
                                            setCreateBlog({...createBlog,category:e?.target?.value})
                                        }
                                 }}>
                        {
                            blogCategory?.value?.length>0 && blogCategory?.value?.map((item:any,index:number)=>{
                                 return <option key={index}>{item}</option>
                            })
                        }

                    </select> 
                    <p className=" mx-3 my-2 bg-success text-white p-1" style={{borderRadius:"10px",cursor:"pointer"}} onClick={(e:any)=>{
                            e?.preventDefault()
                             if(editBlog?.id){
                            setEditBlog({...editBlog,category:""})
                           }else{
                            setCreateBlog({...createBlog,category:""})
                           }
                           setCreateNewcategory(true)
                          
                     }}><MdOutlineAdd style={{fontSize:"23px"}}/></p>
                    </div>
                    </div>
                }
                
                {/* <div>
                    {
                        !createNewCategory && <button className=" btn btn-sm my-3 btn-primary mb-3" onClick={(e:any)=>{
                            e?.preventDefault()
                             if(editBlog?.id){
                            setEditBlog({...editBlog,category:""})
                           }else{
                            setCreateBlog({...createBlog,category:""})
                           }
                           setCreateNewcategory(true)
                          
                     }}>Create New category</button>
                    }
                      {
                        createNewCategory && <button className=" btn btn-sm my-3 btn-primary mb-3" onClick={(e:any)=>{
                            e?.preventDefault()
                            saveBlogCategory()
                          
                     }}>Save Category</button>
                    }
                    {
                       createNewCategory && <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                        if(editBlog?.id){
                            setEditBlog({...editBlog,category:e?.target?.value})
                           }else{
                            setCreateBlog({...createBlog,category:e?.target?.value})
                           }
                       }} placeholder="Create Blog Category" name="first-name"/>

                    }
                     

                    </div> */}
<div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
            
            
                               </div>
                            </div>
                            <div className="col-6">
                                 <div className="py-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
                                 <h2 className="text-center">Upload Blog Thumbnail</h2>

                                 <div className="p-5 mt-5 bg-white mx-auto shadow text-center" style={{width: 350}}>
                                 {blogThumbnail ? <>
                            <img src={blogThumbnail} style={{ height: "120px", width: "100%",objectFit:"contain" }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setblogThumbnail("")
                                  }}
                                >
                                  <i className='bi bi-x fs-2'></i>
                                </button>
                                </>
                            : (
                              <Dropzone onDrop={(acceptedFiles) => {
                                uploadImageThumbnail(acceptedFiles)
                              }}>
                                {({ getRootProps, getInputProps }) => (
                                  <section className='row'>
                                    <div className='col-sm-12' {...getRootProps()}>
                                      <i className='fas fa-plus-square fa-3x mt-11 text-primary'></i>
                                      <div className='' style={{ fontSize: 13 }}>
                                        Upload Blog Thumbnail
                                      </div>
                                      <input accept=".jpg, .png, .jpeg" {...getInputProps()} />
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                            )}
                                    </div>
                                    {
                                        editBlog?.id &&  <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                        <label className="required fs-6 fw-semibold mb-1 mx-auto p-5">Update Active Status</label>
                                        <Switch {...label} checked={editBlog?.active===1 ? true : false} onChange={(e:any)=>{
                                            setEditBlog({...editBlog,active:editBlog?.active===1?0:1})
                                          }}/>
                                       
                                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                                    }
                                 </div>
                            </div>
                            {/* //upload Blog Image  */}
                            <div className="col-12 my-4">
                                 <div className="py-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
                                 <h2 className="text-center">Upload Blog Image</h2>

                                 <div className="p-5 mt-5 bg-white mx-auto shadow text-center" style={{width: "70%"}}>
                                 {blogImage ? <>
                            <img src={blogImage} style={{ height: "300px", width: "100%",objectFit:"contain" }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setblogImage("")
                                  }}
                                >
                                  <i className='bi bi-x fs-2'></i>
                                </button>
                                </>
                            : (
                              <Dropzone onDrop={(acceptedFiles) => {
                                uploadImage(acceptedFiles)
                              }}>
                                {({ getRootProps, getInputProps }) => (
                                  <section className='row'>
                                    <div className='col-sm-12' {...getRootProps()}>
                                      <i className='fas fa-plus-square fa-3x mt-11 text-primary'></i>
                                      <div className='' style={{ fontSize: 13 }}>
                                        Upload Blog Image
                                      </div>
                                      <input accept=".jpg, .png, .jpeg" {...getInputProps()} />
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                            )}
                                    </div>
                                  
                                 </div>
                            </div>
                             {/* end upload blog image  */}

                            <div className="col-12">
                              <div className="col-12"  style={{margin:"100px auto"}}>
                                  <div className="row">
                                    <h2 className="text-primary">Blog Description: </h2>
                                    <div className="col-12">
                                    <ReactQuill theme="snow" modules={modules} value={value || ""} onChange={setValue} />
                                    {/* <Editor setValue={setValue} value={value}/> */}
                                    </div>
                                  </div>
                              </div>
                            </div>

                            <div className="col-12">
                                <div className="text-center mx-auto my-6">
                                   {editBlog?.id ? <button className="btn btn-success text-white" onClick={(e:any)=>{
                                       e?.preventDefault()
                                       updateBlogData()
                                   }}>Publish Blog</button> :<button className="btn btn-primary text-white" onClick={(e:any)=>{
                                        e?.preventDefault()
                                        createNewBlog()
                                   }}>Publish Blog</button>} 
                                   <button className="btn btn-warning text-white ms-4" onClick={(e:any)=>{
                                        e?.preventDefault()
                                        saveBlogInDraft()
                                   }}>Save In Draft</button>
                                </div>
                            </div>
                         </div>
                   </div>
                 </div>
              </div>
            </div>
            {
                <Modal open={createNewCategory}   onClose={()=>{
                    setCreateNewcategory(false)
                }} center>
                           <div style={{padding:"50px",textAlign:"center",margin:"auto"}}>
                            <h5>Add New Category</h5>
                    
                    {
                       createNewCategory && <input autoFocus={false} autoComplete="off" className="form_style form-control form-control-solid fw-bolder w-100" style={{background:"#f2f2f2"}} value={editBlog?.id ? editBlog?.category:createBlog?.category} onChange={(e:any)=>{
                        if(editBlog?.id){
                            setEditBlog({...editBlog,category:e?.target?.value})
                           }else{
                            setCreateBlog({...createBlog,category:e?.target?.value})
                           }
                       }} placeholder="Create Blog Category" name="first-name"/>

                    }
                            {
                        createNewCategory && <button disabled={editBlog?.id ? editBlog?.category?.trim()?.length<0 : createBlog?.category?.trim()?.length<0} className=" my-3 btn btn-sm my-3 btn-primary" onClick={(e:any)=>{
                            e?.preventDefault()
                            saveBlogCategory()
                     }}>Save Category</button>
                    }
                            </div>               
                       </Modal>
            }
            {/* <Example placeholder={"Start Typing"}/> */}
          </div>
          
         </>
  )
}

export default CreateUpdateBlog