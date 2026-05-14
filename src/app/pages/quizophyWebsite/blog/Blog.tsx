import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';
import Dropzone from 'react-dropzone';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ToatComp from './ToatComp';
import { useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL';
import { API_URL } from '../../settings/components/ApiUrl';
const Blog = () => {
    const [blogs,setBlogs]=useState<any[]>([])
    const navigate=useNavigate()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const [posterOpen,setPosterOpen]=useState<boolean>(false)
    const [posterImage,setPosterImage]=useState("")
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
  }

  const getQuizophyPosterImage=async ()=>{
      const {data}=await axios.get(`${API_URL}/option/quizophy_poster_image`)
      if(data?.value)
        setPosterImage((data?.value))
  }

  const uploadImage = async (file: any) => {
    const fd = new FormData()
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
        .post(`${API_URL}/staff/upload-image`, fd)
          .then((data: AxiosResponse<any>) => {
              if(data?.data?.success){
                console.log(data?.data)
                setPosterImage(data?.data?.image)
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
    const getAllBlog=async ()=>{
         const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/admin/blog`)
         if(data?.success){
            setBlogs(data?.data)
         }
    }
     useEffect(()=>{
         getAllBlog()
     },[])
   return (
     <>
       <div className="postbox__area pt-120 pb-120">
         <div className="container" style={{paddingTop:"30px"}}>
           <div className="row gy-5">
             <div className="col-12 d-flex justify-content-between">
             {permissionList?.can_view && 
                  <button className="btn my-2 btn-primary text-center" onClick={()=>{
                    navigate("/quizophy-website/blog/draft")
                }}>
                   View Draft
                </button>
               }
               {permissionList?.can_create && 
                  <button className="btn my-2 btn-primary text-center" onClick={()=>{
                    getQuizophyPosterImage()
                    setPosterOpen(true)
                }}>
                   Add Quizophy Poster
                </button>
               }

                {permissionList?.can_create && 
                  <button className="btn my-2 btn-primary text-center" onClick={()=>{
                    navigate("/quizophy-website/blog/create")
                }}>
                    Create New Blog
                </button>
               }
             </div>
             <div className="col-12 my-5">
                <div className="row gy-5">
                 {
                   permissionList?.can_view && blogs && blogs?.length>0 ?
                    blogs.map((item,index)=>{
                        return  <div key={index} className="col-lg-4 col-md-6 col-sm-11 text-center">
                         <div className="p-5 text-center" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                               <div className="w-100">
                                  <img src={item?.blog_thumbnail} alt=""  width="100%" height="auto"/>
                                 </div>
                                 <h2 className="my-4 fs-6">{item?.title?.substring(0,30)}...</h2>
                                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"20px auto"}}>
                                 <Link to={`/quizophy-website/blog/${item.id}`}><a className="btn btn-warning text-white w-100 px-4 py-2 ">Read More</a></Link>
                                 <span >
                                 {permissionList?.can_edit && <AiFillEdit style={{color:"black",fontSize:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
                                           navigate(`/quizophy-website/blog/edit/${item?.id}`)
                                    }}/> }
      {permissionList?.can_delete &&<AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${QUIZOPHY_WEBSITE_API_URL}/blog/${item?.id}`)
          if(data?.success){
            getAllBlog()
            ToatComp({message:data?.message,type:"Success"})

          }
      }}/>}</span>
                                    </div>

                               
                           </div>
                               
                        </div>
                   }) : <>  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Blog Found</h2></div>
                   </>
                 }                
                </div>
             </div>
           </div>
         </div>
       </div>
       {
        posterOpen &&   <Modal open={posterOpen} onClose={()=>setPosterOpen(false)} center>
              <div style={{width:"600px",padding:"30px"}}>
                 <h5 className="my-4 mx-auto">Upload Quizophy Poster</h5>
                 <div>
                 <div className="col-12 my-4">
                                 <div className="py-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
                                 <div className="p-5 mt-5 bg-white mx-auto shadow text-center" style={{width: "70%"}}>
                                 {posterImage ? <>
                            <img src={posterImage} style={{ height: "300px", width: "100%",objectFit:"contain" }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setPosterImage("")
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
                                        Upload Quizophy Poster Image
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
                 </div>

                  <div className="mx-auto text-center d-flex flex-column">
                    {
                      posterImage!="" && <button className="btn btn-primary text-center mx-auto my-2" onClick={async (e:any)=>{
                            e?.preventDefault()
                            const {data}=await axios.put(`${API_URL}/option`,{name:"quizophy_poster_image",value:posterImage?posterImage:""})
                            console.log(data)
                            if(data?.success){
                              ToatComp({message:"Quizophy Poster Image Updated SUccessfully",type:"Success"})
                              setPosterImage("")
                              setPosterOpen(false)
                            }
                    }}>
                         Upload Poster Image
                    </button>
                    }
                     {
                      posterImage!="" && <button className="btn btn-primary text-center mx-auto my-2" onClick={async (e:any)=>{
                            e?.preventDefault()
                            const {data}=await axios.put(`${API_URL}/option`,{name:"quizophy_poster_image",value:""})
                            if(data?.success){
                              ToatComp({message:"Quizophy Poster Image Updated SUccessfully",type:"Success"})
                              setPosterImage("")
                              setPosterOpen(false)
                            }
                    }}>
                         Remove Poster Image
                    </button>
                    }
                  </div>
              </div>
          </Modal>
       }
     </>
   );
 };
 
 export default Blog;