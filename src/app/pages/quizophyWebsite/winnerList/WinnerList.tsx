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
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import Dropzone from 'react-dropzone';
import { APIURLQUIZ } from '../../conferenceQuiz/APIURL';
import { QUIZOPHY_WEBSITE_API_URL } from '../ApiUrl';
import ToatComp from '../blog/ToatComp';
import { useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };



export default function WinnerList() {
    const [open,setOpen]=React.useState<boolean>(false)
    const [editWinnerList,setEditWinnerList]=useState<any>()
    const [createWinnerList,setCreateWinnerList]=useState<any>({
        heading:"",
        date_time:new Date(),
        image:"",
    })

    const [featuresImage,setFeaturesImage]=useState<string>("")

const [filterPodiumCategory,setFilterPodiumCategory] =useState<any[]>([])
const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
const [permissionList,setPermissionList]=useState<any>({})
const filterStaffPermission=async (title:string)=>{
  let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
  setPermissionList(result[0])
}
useEffect(()=>{
  filterStaffPermission(navItem?.item)
  },[navItem])
  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
        ToatComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Error"})
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
        ToatComp({message:"Only image Supported",type:"Error"})

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
                setFeaturesImage(data?.data?.image)
                // if(editWinnerList?.id){
                //   setEditWinnerList({...editWinnerList,image:data?.data?.image})
                // }else{
                //   setCreateWinnerList({...createWinnerList,image:data?.data?.image})
                // }
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
    const onOpenModal = (row:any) => {
        setEditWinnerList(row)
        setOpen(true)
      };
      const onCloseModal = () => {
        getAllPodiumFeatures()
        setFeaturesImage("")
        setEditWinnerList(null)
        setCreateWinnerList({
          heading:"",
          date_time:new Date(),
          image:"",
        })
        setOpen(false)
      };

      const getAllPodiumFeatures=async ()=>{
         const {data}=await axios.get(`${QUIZOPHY_WEBSITE_API_URL}/admin/winnerList`)
         if(data?.success){
          setFilterPodiumCategory(data?.data)
         }
      }
      useEffect(()=>{
        getAllPodiumFeatures()
      },[])

  return (
    <div className="container mt-0">
         
              <div className="row my-5 mb-5 mx-auto">
             {permissionList?.can_create && <button className="btn btn-primary" style={{width:"250px",height:"43px",marginLeft:"auto"}} onClick={()=>{
                setEditWinnerList(null)
                setOpen(true)
               }}>Add Winner List</button>}
              </div>

              <div className="gy-5" style={{display:"flex", flexWrap:"wrap", flexDirection:"row",justifyContent:"space-evenly"}}>
              {
permissionList?.can_view && filterPodiumCategory?.length>0 ?
filterPodiumCategory.map((item,index)=>{
    return    <div key={index} className="card m-4 col-md-4" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <div style={{width:"140px",height:"140px",margin:"15px auto"}}>
           <img className="card-img-top" style={{width:"100%",borderRadius:"100%"}} src={item?.image} alt="Card image cap"/>
       </div>
    <div className="card-body">
      <h6 className="card-title">Quiz Title : <span className="text-primary">{item?.heading}</span></h6>

      <h6 className="card-title">Date : <span className="text-primary">{item?.date_time}</span></h6>

      <div className="w-100" style={{display:"flex",justifyContent:"flex-end",margin:"30px auto 3px auto"}}>
        <span>
          {permissionList?.can_edit && <AiFillEdit style={{color:"black",fontSize:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
            setFeaturesImage(item?.image)
            onOpenModal(item)
          }}/>}
          {permissionList?.can_delete && <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${QUIZOPHY_WEBSITE_API_URL}/winnerList/${item?.id}`)
          if(data?.success){
            getAllPodiumFeatures()
            ToatComp({message:data?.message,type:"Success"})
          }
      }}/>}
      </span>
    </div>

    </div>
  </div>
}) : <>
  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Winner List Found</h2></div>
</>
}
              </div>
              
      

      {
         <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">{editWinnerList?.id ?"Update":"Create"} Features</h2>
             <form className="my-5">
             <div className="row">
                     
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Quiz Title</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editWinnerList?.id ?editWinnerList?.heading:createWinnerList?.heading} onChange={(e:any)=>{
                                    if(editWinnerList?.id){
                                        setEditWinnerList({...editWinnerList,heading:e?.target?.value})
                                    }else{
                                        setCreateWinnerList({...createWinnerList,heading:e?.target?.value})
                                    }
                                  }} placeholder="Enter Title..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Select Date</label>
                               
                                  <input type="date" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editWinnerList?.id ?editWinnerList?.date_time:createWinnerList?.date_time} onChange={(e:any)=>{
                                    if(editWinnerList?.id){
                                        setEditWinnerList({...editWinnerList,date_time:e?.target?.value})
                                    }else{
                                        setCreateWinnerList({...createWinnerList,date_time:e?.target?.value})
                                    }
                                  }} placeholder="Enter Date..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        editWinnerList && editWinnerList?.id &&   <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Update Active Status</label>
                        <Switch {...label} checked={editWinnerList?.active===1 ? true : false} onChange={(e:any)=>{
                            setEditWinnerList({...editWinnerList,active:editWinnerList?.active===1?0:1})
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
                            {featuresImage? <>
                            <img src={featuresImage} style={{ height: 150, width: 250 }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setFeaturesImage("")
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
                                        Upload Winner Image
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
              <button className="btn btn-success w-25 mt-5 text-center mx-auto" disabled={editWinnerList?.id ? (editWinnerList?.heading==="" || editWinnerList?.heading===null || editWinnerList?.date_time==="" || editWinnerList?.date_time===null) : (createWinnerList?.heading==="" || createWinnerList?.heading===null || createWinnerList?.date_time==="" || createWinnerList?.date_time===null) } onClick={async (e:any)=>{
                   e?.preventDefault()
                   if(editWinnerList?.id){
                     if(editWinnerList?.heading?.trim()==="" || editWinnerList?.date_time?.trim()==="" || editWinnerList?.heading===null || editWinnerList?.date_time===null){
                        ToatComp({message:"All Filled required details",type:"Error"})
                            return
                     }
                     else if(featuresImage?.trim()===""){
                        ToatComp({message:"Please upload winner list image",type:"Error"})

                        return
                     }
                     else{
                        const {data}=await axios.put(`${QUIZOPHY_WEBSITE_API_URL}/winnerList/${editWinnerList?.id}`,{...editWinnerList,image:featuresImage})
                        if(data?.success){
                           onCloseModal()
                           ToatComp({message:data?.message,type:"Success"})

                        }
                     }
                    
                   }else{
                    if(createWinnerList?.heading?.trim()==="" || createWinnerList?.date_time?.trim()===""  || createWinnerList?.heading===null || createWinnerList?.date_time===null){
                        ToatComp({message:"All Fields are required",type:"Error"})

                            return
                     }
                     else if(featuresImage?.trim()===""){
                        ToatComp({message:"Please upload winner list image",type:"Error"})

                        return
                     }
                     else{
                        const {data}=await axios.post(`${QUIZOPHY_WEBSITE_API_URL}/winnerList/createWinnerList`,{...createWinnerList,image:featuresImage})
                        if(data?.success){
                           onCloseModal()
                           ToatComp({message:data?.message,type:"Success"})

                        }
                     }
                  
                   }
              }}>{editWinnerList?.id?"Update":"Create"} Winner List</button>
              </div>
              </div>
            
             </form>
                   </Modal>
          }

      
    </div>
   
  )
        }