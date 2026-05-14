import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { APIURLQUIZ } from '../APIURL';
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import Dropzone from 'react-dropzone';
import ToastComp from '../userList/ToastComp';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Switch demo' } };



export default function Testimonial() {
    const [open,setOpen]=React.useState<boolean>(false)
    const [editTestimonial,setEditTestimonial]=useState<any>()
    const [createTestimonial,setCreateTestimonial]=useState<any>({
        name:"",
        designation:"",
        speakUp:"",
        image:""
    })

    const [testimonialImage,setTestimonialImage]=useState<string>("")

  const [testimonials,setTestimonials]=useState<any[]>([])
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])
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
  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
      ToastComp({message:`Image is of un-expected size (size must be less than 1MB)`,type:"Warning"})
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
      ToastComp({message:`Only image supported`,type:"Error"})
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
                setTestimonialImage(data?.data?.image)
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
    const onOpenModal = (row:any) => {
        setEditTestimonial(row)
        setOpen(true)
      };
      const onCloseModal = () => {
        getAllTestimonials()
        setTestimonialImage("")
        setEditTestimonial(null)
        setCreateTestimonial(null)
        setOpen(false)
      };

      const getAllTestimonials=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getAllTestimonials`)
         if(data?.success){
            setTestimonials(data?.data)
         }
      }
      useEffect(()=>{
         getAllTestimonials()
      },[])

  return (
    <div className="container mt-0">
         
              <div className="row d-flex justify-content-end my-5 mb-5">
              {permissionList?.can_create && <button className="btn btn-primary" style={{width:"250px"}} onClick={()=>{
                setEditTestimonial(null)
                setOpen(true)
               }}>Add More Testimonial</button>}
              </div>

              <div className="gy-5" style={{display:"flex", flexWrap:"wrap", flexDirection:"row",justifyContent:"space-evenly"}}>
              {

permissionList?.can_view && testimonials?.length>0 ?
testimonials.map((item,index)=>{
    return    <div key={index} className="card m-4" style={{maxWidth: "25rem",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <div style={{width:"100px",height:"100px",borderRadius:"100%",margin:"10px auto"}}>
           <img className="card-img-top" style={{width:"100%",height:"100%",borderRadius:"100%"}} src={item?.image} alt="Card image cap"/>
    </div>
    <div className="card-body">
      <h6 className="card-title">Name : <span className="text-primary">{item?.name}</span></h6>
      <h6 className="card-title">Designation : <span className="text-primary">{item?.designation}</span></h6>

      <h6 className="card-text">Speak Up : <span className="text-primary">{item?.speakUp}</span></h6>
      <div className="w-100" style={{display:"flex",justifyContent:"flex-end",margin:"30px auto 3px auto"}}>
        <span>
          {permissionList?.can_edit && <AiFillEdit style={{color:"black",fontSize:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
          setTestimonialImage(item?.image)
            onOpenModal(item)
      }}/>}
      {permissionList?.can_delete && <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${APIURLQUIZ}/admin/deleteTestimonialById/${item?.id}`)
          if(data?.success){
            getAllTestimonials()
            ToastComp({message:data?.message,type:"Success"})
          }
      }}/>}
      </span>
    </div>

    </div>
  </div>
}) : <>
  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Testimonials Found</h2></div>
</>
}
              </div>
              
      

      {
         <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">{editTestimonial?.id?"Update":"Create"} Testimonial</h2>
             <form className="my-5">
             <div className="row">
                     
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTestimonial?.id ?editTestimonial?.name:createTestimonial?.name} onChange={(e:any)=>{
                                    if(editTestimonial?.id){
                                        setEditTestimonial({...editTestimonial,name:e?.target?.value})
                                    }else{
                                        setCreateTestimonial({...createTestimonial,name:e?.target?.value})
                                    }
                                  }} placeholder="Enter Name..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Designation</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTestimonial?.id ?editTestimonial?.designation:createTestimonial?.designation} onChange={(e:any)=>{
                                    if(editTestimonial?.id){
                                        setEditTestimonial({...editTestimonial,designation:e?.target?.value})
                                    }else{
                                        setCreateTestimonial({...createTestimonial,designation:e?.target?.value})
                                    }
                                  }} placeholder="Enter Designation..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Quotes</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTestimonial?.id ?editTestimonial?.speakUp:createTestimonial?.speakUp} onChange={(e:any)=>{
                                    if(editTestimonial?.id){
                                        setEditTestimonial({...editTestimonial,speakUp:e?.target?.value})
                                    }else{
                                        setCreateTestimonial({...createTestimonial,speakUp:e?.target?.value})
                                    }
                                  }} placeholder="Enter Quotes..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        editTestimonial && editTestimonial?.id &&   <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Update Active Status</label>
                        <Switch {...label} checked={editTestimonial?.active===1 ? true : false} onChange={(e:any)=>{
                            setEditTestimonial({...editTestimonial,active:editTestimonial?.active===1?0:1})
                          }}/>
                       
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                    
                    <div className="col-12">
                       <div
                            className='mt-5 bg-white mx-auto shadow text-center'
                            style={{
                              height: 150,
                              width: 350,
                            }}
                          >
                            {testimonialImage ? <>
                            <img src={testimonialImage} style={{ height: 150, width: 250 }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                     setTestimonialImage("")
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
                                        Upload Profile Image
                                      </div>
                                      <input accept=".jpg, .png, .jpeg" {...getInputProps()} />
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                            )}
                          </div>
                  </div>

                      
                     
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={async (e:any)=>{
                   e?.preventDefault()
                   if(editTestimonial?.id){
                     if(editTestimonial?.name?.trim()==="" || editTestimonial?.designation?.trim()==="" || editTestimonial?.speakUp?.trim()===""){
                      ToastComp({message:`All fields are required`,type:"Error"})

                     }else{
                        const {data}=await axios.put(`${APIURLQUIZ}/admin/updateTestimonialById/${editTestimonial?.id}`,{...editTestimonial,image:testimonialImage?testimonialImage:"https://cdn-icons-png.flaticon.com/512/2202/2202112.png"})
                        if(data?.success){
                           onCloseModal()
                           ToastComp({message:data?.message,type:"Success"})

                        }
                     }
                    
                   }else{
                    if(createTestimonial?.name?.trim()==="" || createTestimonial?.designation?.trim()==="" || createTestimonial?.speakUp?.trim()===""){
                      ToastComp({message:`All fields are required`,type:"Error"})

                     }else{
                        const {data}=await axios.post(`${APIURLQUIZ}/admin/createTestimonial`,{...createTestimonial,image:testimonialImage?testimonialImage:"https://cdn-icons-png.flaticon.com/512/2202/2202112.png"})
                        if(data?.success){
                          ToastComp({message:data?.message,type:"Success"})

                        }
                     }
                  
                   }
              }}>{editTestimonial?.id?"Update":"Create"} Testimonial</button>
              </div>
              </div>
            
             </form>
                   </Modal>
          }

      
    </div>
   
  )
        }