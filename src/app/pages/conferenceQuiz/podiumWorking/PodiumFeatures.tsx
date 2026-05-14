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
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ToastComp from '../userList/ToastComp';
import { useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };



export default function PodiumFeatures() {
    const [open,setOpen]=React.useState<boolean>(false)
    const [editFeatures,setEditFeatures]=useState<any>()
    const [createFeatures,setCreateFeatures]=useState<any>({
        heading1:"",
        heading2:"",
        content1:"",
        content2:"",
        image:"",
        category:"Podium Features"
    })
    const [featuresCategory,setFeaturesCategory]=useState<any>({
      value: 'Podium Features', label: 'Podium Features'
    })
    const [mainFeaturesCategory,setMainFeaturesCategory]=useState<any>({
      value: 'Podium Features', label: 'Podium Features'
    })
    const options=[
      {value: 'Podium Features', label: 'Podium Features'},
      { value: 'Podium Banner', label: 'Podium Banner'},
      { value: 'Podium Main Banner', label: 'Podium Main Banner'},
    ]

    const [featuresImage,setFeaturesImage]=useState<string>("")

  const [podiumFeatures,setPodiumFeatures]=useState<any[]>([])
const [filterPodiumCategory,setFilterPodiumCategory] =useState<any[]>([])
 const filterDataAccordingToCategory=(data:any)=>{
    let filterCategory=podiumFeatures.filter((item,index)=>{
            return item?.category===data
    })
    setFilterPodiumCategory(filterCategory)
    // console.log(filterCategory)

  }

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
      ToastComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Warning"})
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
      ToastComp({message:"Only image supported",type:"Error"})

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
                // if(editFeatures?.id){
                //   setEditFeatures({...editFeatures,image:data?.data?.image})
                // }else{
                //   setCreateFeatures({...createFeatures,image:data?.data?.image})
                // }
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
    const onOpenModal = (row:any) => {
        setEditFeatures(row)
        setOpen(true)
      };
      const onCloseModal = () => {
        getAllPodiumFeatures()
        setFeaturesImage("")
        setEditFeatures(null)
        setCreateFeatures({
          heading1:"",
          heading2:"",
          content1:"",
          content2:"",
          image:"",
          category:"Podium Features"
        })
        setOpen(false)
      };

      const getAllPodiumFeatures=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getAllPodiumFeatures`)
         if(data?.success){
          setPodiumFeatures(data?.data)
          setFilterPodiumCategory(data?.data)
         }
      }
      useEffect(()=>{
        getAllPodiumFeatures()
      },[])

  return (
    <div className="container mt-0">
         
              <div className="row d-flex justify-content-between my-5 mb-5">
              <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                    <label className="required fs-6 fw-semibold mb-1">Filter Podium Features Category</label>

                                   <Select options={options} defaultValue={mainFeaturesCategory} onChange={(e:any)=>{
                                       setMainFeaturesCategory(e)
                                       filterDataAccordingToCategory(e?.value)
                                      
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              {permissionList?.can_create && <button className="btn btn-primary" style={{width:"250px",height:"43px"}} onClick={()=>{
                setEditFeatures(null)
                setOpen(true)
               }}>Add More Features</button>}
              </div>

              <div className="gy-5" style={{display:"flex", flexWrap:"wrap", flexDirection:"row",justifyContent:"space-evenly"}}>
              {
permissionList?.can_view &&  filterPodiumCategory?.length>0 ?
filterPodiumCategory.map((item,index)=>{
    return    <div key={index} className="card m-4 col-md-4" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <div style={{width:"90%",height:"200px",margin:"10px auto"}}>
           <img className="card-img-top" style={{width:"100%",height:"100%"}} src={item?.image} alt="Card image cap"/>
       </div>
    <div className="card-body">
      <h6 className="card-title">Heading : <span className="text-primary">{item?.heading1}</span></h6>
      {
        item?.heading2 &&  <h6 className="card-title">Heading2 : <span className="text-primary">{item?.heading2}</span></h6>
      }

      <h6 className="card-title">Content : <span className="text-primary">{item?.content1}</span></h6>
      {
        item?.content2 && <h6 className="card-title"> Content2 : <span className="text-primary">{item?.content2}</span></h6>
      }

      <div className="w-100" style={{display:"flex",justifyContent:"flex-end",margin:"30px auto 3px auto"}}>
        <span>
          {permissionList?.can_edit && <AiFillEdit style={{color:"black",fontSize:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
            setFeaturesImage(item?.image)
            onOpenModal(item)
      }}/>}
    {permissionList?.can_delete &&  <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
          const {data}=await axios.delete(`${APIURLQUIZ}/admin/deleteFeaturesById/${item?.id}`)
          if(data?.success){
            getAllPodiumFeatures()
            ToastComp({message:data?.message,type:"Success"})
          }
      }}/>}</span>
    </div>

    </div>
  </div>
}) : <>
  <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Features Found</h2></div>
</>
}
              </div>
              
      

      {
         <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">{editFeatures?.id ?"Update":"Create"} Features</h2>
             <form className="my-5">
             <div className="row">
             <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                                    <label className="required fs-6 fw-semibold mb-1">Select Podium Features Category</label>

                                   <Select options={options} defaultValue={featuresCategory} onChange={(e:any)=>{
                                       setFeaturesCategory(e)
                                       if(editFeatures?.id){
                                        setEditFeatures({...editFeatures,category:e?.value})
                                       }else{
                                        setCreateFeatures({...createFeatures,category:e?.value})
                                       }
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                     
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Heading1</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFeatures?.id ?editFeatures?.heading1:createFeatures?.heading1} onChange={(e:any)=>{
                                    if(editFeatures?.id){
                                        setEditFeatures({...editFeatures,heading1:e?.target?.value})
                                    }else{
                                        setCreateFeatures({...createFeatures,heading1:e?.target?.value})
                                    }
                                  }} placeholder="Enter Heading..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="fs-6 fw-semibold mb-1">Enter Heading2 (Optional)</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFeatures?.id ?editFeatures?.heading2:createFeatures?.heading2} onChange={(e:any)=>{
                                    if(editFeatures?.id){
                                        setEditFeatures({...editFeatures,heading2:e?.target?.value})
                                    }else{
                                        setCreateFeatures({...createFeatures,heading2:e?.target?.value})
                                    }
                                  }} placeholder="Enter Heading..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Enter Content1</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFeatures?.id ?editFeatures?.content1:createFeatures?.content1} onChange={(e:any)=>{
                                    if(editFeatures?.id){
                                        setEditFeatures({...editFeatures,content1:e?.target?.value})
                                    }else{
                                        setCreateFeatures({...createFeatures,content1:e?.target?.value})
                                    }
                                  }} placeholder="Enter Content..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className=" fs-6 fw-semibold mb-1">Enter Content2 (Optional)</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFeatures?.id ?editFeatures?.content2:createFeatures?.Content2} onChange={(e:any)=>{
                                    if(editFeatures?.id){
                                        setEditFeatures({...editFeatures,content2:e?.target?.value})
                                    }else{
                                        setCreateFeatures({...createFeatures,content2:e?.target?.value})
                                    }
                                  }} placeholder="Enter Content..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        editFeatures && editFeatures?.id &&   <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Update Active Status</label>
                        <Switch {...label} checked={editFeatures?.active===1 ? true : false} onChange={(e:any)=>{
                            setEditFeatures({...editFeatures,active:editFeatures?.active===1?0:1})
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
              <button className="btn btn-success w-25 mt-5 text-center mx-auto" disabled={editFeatures?.id ? (editFeatures?.heading1==="" || editFeatures?.heading1===null || editFeatures?.content1==="" || editFeatures?.content1===null) : (createFeatures?.heading1==="" || createFeatures?.heading1===null || createFeatures?.content1==="" || createFeatures?.content1===null) } onClick={async (e:any)=>{
                   e?.preventDefault()
                   if(editFeatures?.id){
                     if(editFeatures?.heading1?.trim()==="" || editFeatures?.content1?.trim()==="" || editFeatures?.heading1===null || editFeatures?.content1===null){
                      ToastComp({message:"Please filled required details",type:"Error"})
                            return
                     }
                     else if(featuresImage?.trim()===""){
                      ToastComp({message:"Please upload features image",type:"Error"})
                        return
                     }
                     else{
                        const {data}=await axios.put(`${APIURLQUIZ}/admin/updateFeaturesById/${editFeatures?.id}`,{...editFeatures,image:featuresImage})
                        if(data?.success){
                           onCloseModal()
                           ToastComp({message:data?.success,type:"Success"})
                        }
                     }
                    
                   }else{
                    if(createFeatures?.heading1?.trim()==="" || createFeatures?.content1?.trim()===""  || createFeatures?.heading1===null || createFeatures?.content1===null){
                      ToastComp({message:"Please filled required details",type:"Error"})
                            return
                     }
                     else if(featuresImage?.trim()===""){
                      ToastComp({message:"Please upload features image",type:"Error"})
                        return
                     }
                     else{
                        const {data}=await axios.post(`${APIURLQUIZ}/admin/createPodiumFeatures`,{...createFeatures,image:featuresImage})
                        if(data?.success){
                           onCloseModal()
                           ToastComp({message:data?.message,type:"Success"})
                        }
                     }
                  
                   }
              }}>{editFeatures?.id?"Update":"Create"} Features</button>
              </div>
              </div>
            
             </form>
                   </Modal>
          }

      
    </div>
   
  )
        }