import React, { useState,useRef, useEffect } from 'react'
import Select from 'react-select'
import {AiOutlineDelete} from "react-icons/ai"
import {RxCross2} from "react-icons/rx"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { APIURLQUIZ } from '../../../APIURL'
import Flatpickr from "react-flatpickr";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { toast } from 'react-toastify'
import ToastComp from '../../ToastComp'
import { createPoll, getUserById, updatePoll } from '../core/_requests'
const EditPoll = () => {
  const params=useParams()
  const navigate=useNavigate()
  const [selectedType,setSelectedType]=useState({label:"Multiple Choice",value:"Multiple Choice"})
  const [selectMultiple,setSelcetMultiple]=useState({label:"Unlimited",value:"Unlimited"})
  const [votingSecurity,setVotingSecurity]=useState({label:"One Vote Per IP Address",value:"One Vote Per IP Address"})
  const [resultVisibile,setResultVisible]=useState({label:"Always Public",value:"Always Public"})
  const [descriptionThumbnail, setDescriptionThumbnail] = useState(false)
  const [uploadThumbnail,setUploadThumbnail]=useState(false)
  const [pollThumbnail,setPollThumbnail]=useState("")
  const [openAdvanceSetting,setOpenAdvanceSetting]=useState(false)
  const inputFileRef:any=useRef("")

  const [polldata,setPolldata]=useState<any>({
    allow_selection_for_multiple_option:0,
    user_id: params?.id,
    required_participant_name:1,
    poll_title:"",
    poll_type:"Multiple Choice",
    description:"",
    thumbnail:"",
    voting_security:"One Vote Per IP Address",
    strict_checking:1,
    use_recaptcha:0,
    options:[
       {
        id:undefined,
        option:"",
        title:"",
        description:""
       },
       {
        id:undefined,
        option:"",
        title:"",
        description:""
       }
    ],
    selections:{
        type:"Unlimited",
        exact_count:-1,
        min_range_count:0,
        max_range_count:0
    },
    draft:0,
    starting_date:new Date(),
    expiry_date:null,
    hide_share_button:0,
    allow_comment:1,
    result_visibility:"Always Public",
    edit_vote_permission:"Nobody",
    close_poll_on_scheduled_date:1,
    hide_participants_from_each_other:0
  })
  const getPollDetailUsingPollKey=async (quizKey:string)=>{
    const data=await getUserById(quizKey)
    if(data && data?.data && data?.data?.id){
      setVotingSecurity({label:data?.data?.voting_security,value:data?.data?.voting_security})
      setSelcetMultiple({value:data?.data?.selection?.type,label:data?.data?.selection?.type})
      setResultVisible({label:data?.data?.result_visibility,value:data?.data?.result_visibility})
      setSelectedType({label:data?.data?.poll_type,value:data?.data?.poll_type})
      setPollThumbnail(data?.data?.thumbnail)
      let payload={
        id:data?.data?.id,
        allow_selection_for_multiple_option:data?.data?.allow_selection_for_multiple_option,
        required_participant_name:data?.data?.required_participant_name,
        poll_title:data?.data?.poll_title,
        poll_type:data?.data?.poll_type,
        description:data?.data?.description,
        thumbnail:data?.data?.thumbnail,
        voting_security:data?.data?.voting_security,
        strict_checking:data?.data?.strict_checking,
        use_recaptcha:data?.data?.use_recaptcha,
        options:data?.data?.options?.flatMap((item:any)=>[
          {
            id:item?.id,
            poll_id:item?.poll_id,
            option:item?.option,
            title:item?.title,
            description:item?.description
          }
        ]),
        selections:{
            id:data?.data?.selection?.id,
            poll_id:data?.data?.selection?.poll_id,
            type:data?.data?.selection?.type,
            exact_count:Number(data?.data?.selection?.exact_count)>0?Number(data?.data?.selection?.exact_count):0,
            min_range_count:Number(data?.data?.selection?.min_range_count)>0?Number(data?.data?.selection?.min_range_count):0,
            max_range_count:Number(data?.data?.selection?.max_range_count)>0?Number(data?.data?.selection?.max_range_count):0
        },
        draft:0,
        // starting_date:data?.data?.starting_date,
        // expiry_date:data?.data?.expiry_date,
        hide_share_button:data?.data?.hide_share_button,
        allow_comment:data?.data?.allow_comment,
        result_visibility:data?.data?.result_visibility,
        edit_vote_permission:data?.data?.edit_vote_permission,
        close_poll_on_scheduled_date:data?.data?.close_poll_on_scheduled_date,
        hide_participants_from_each_other:data?.data?.hide_participants_from_each_other
      }
      setPolldata({...payload})
    }
  }
useEffect(()=>{
  if(params?.poll_id && params?.id){
    getPollDetailUsingPollKey(params?.poll_id)
  }
},[params?.id,params?.poll_id])
  const onChange2 = async(e:any,index:any) => {
    e.preventDefault();
    const fd = new FormData()
    fd.append('image', e?.target?.files[0])
    await axios
    .post(`${APIURLQUIZ}/upload-question-image`, fd)
      .then((data) => {
         if(data?.data?.image){
            let temp = {...polldata}
            temp.options[index] = { ...temp.options[index], option: data?.data?.image}
            setPolldata(temp)
         }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
    
  }
  let options=[
    {
        label:"Unlimited",value:"Unlimited"
    },
    {
        label:"Exact",value:"Exact"
    },
    {
        label:"Range",value:"Range"
    }
  ]
  let votingType=[
    {
        label:"Multiple Choice",value:"Multiple Choice"
    },
    {
        label:"Yes or No",value:"Yes or No"
    },
    {
        label:"Image Poll",value:"Image Poll"
    },
    {
        label:"Audio Poll",value:"Audio Poll"
    },
    {
        label:"Video Poll",value:"Video Poll"
    }
  ]
  let votingSecurityOption:any=[
    {
        label:"One Vote Per Browser Session",value:"One Vote Per Browser Session",

    },
    {
       label:"One Vote Per IP Address",value:"One Vote Per IP Address"
    },
    {
        label:"One Vote Per Conference Account",value:"One Vote Per Conference Account"
     },
     {
        label:"One Vote Per Unique Code",value:"One Vote Per Unique Code"
     }
  ]

  let resultVisibility:any=[
    {
        label:"Always Public",value:"Always Public",

    },
    {
       label:"Public After End Date",value:"Public After End Date"
    },
    {
        label:"Public After Vote",value:"Public After Vote"
     },
     {
        label:"Not Public",value:"Not Public"
     }
  ]
  let editVotePermission=[
    {
        label:"Nobody",value:"Nobody",

    },
    {
       label:"Admin",value:"Admin"
    },
    {
        label:"Admin and Own votes",value:"Admin and Own votes"
     },
     {
        label:"Own Votes Only",value:"Own Votes Only"
     },
     {
        label:"Everybody",value:"Everybody"
     }
  ]
  const uploadImage = async (file:any) => {
    const fd = new FormData()
    fd.append('image', file[0])
    await axios
    .post(`${APIURLQUIZ}/upload-question-image`, fd)
      .then((data) => {
         if(data?.data?.image){
            setUploadThumbnail(false)
            setPollThumbnail(data?.data?.image)
         }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }
  const onChange = (e:any) => {
    e.preventDefault();
    if(Math.ceil( ( (e.target.files[0].size * 8) / 8) / 1000 )>1024){ 
        toast.error('Image is of un-expected size (size must be less than 1MB)', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
     return 
    }
    let typeArr=e?.target?.files[0].type?.split("/")
    if(typeArr[0]!=="video" || typeArr[0]!=="audio" || typeArr[1]!=="mpeg" || typeArr[1]!=="mp3" || typeArr[1]!=="mp4" || typeArr[1]!=="mkv" || typeArr[1]!=="x-matroska"){
        uploadImage(e?.target?.files)
    }else{
        toast.error('Only image supported', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            return
    }
  }
  const onBtnClick = () => {
    inputFileRef?.current?.click();
  }

  const onCloseModal = () => {
    setUploadThumbnail(false)
  };
  return (
    <div>
      <div className="container-fluid" style={{marginBottom:"100px"}}>
        <div className="row">
          <div className="col-12">
            <div className="row" >
                <div className="col-12" style={{margin:"10px auto",borderRadius:"10px",padding:"20px",boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px"}}>
                     <div className="col-12 fv-row fv-plugins-icon-container mt-3" style={{position:"relative"}}>
                                  <label className="required fs-6 fw-semibold mb-1">Poll Title</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  value={polldata?.poll_title}  onChange={(e:any)=>{
                                       setPolldata({...polldata,poll_title:e?.target?.value})
                                  }} placeholder="Enter Poll Title" name="first-name"/>
                                  <div style={{position:"absolute",top:"30px",right:"10px",cursor:"pointer"}}>
                                    <svg style={{width:"30px"}} className="text-gray-400"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"  onClick={()=>{
                                          setUploadThumbnail(true)
                                        }}>
	                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                          pollThumbnail!="" && <>
                          <label>Poll Thumbnail</label>
                          <div className='text-center' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>    
                              <img src={pollThumbnail} style={{ height: "200px", width: "200px" ,borderRadius:"100%" ,padding:"3px" }} /> 
                              <button className="btn text-center" style={{width:"30px",height:"30px"}}  onClick={() => {
                                  setPollThumbnail("")
                                  setUploadThumbnail(false)
                                  }}> 
                                 <svg className="h-5 w-5 text-gray-400" style={{width:"20px",color:"red"}} xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20" stroke="">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg></button>                                
                        </div>
                        </>
                      }
                      <div className="col-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="fs-6 fw-semibold mb-1">Poll Description (Optional)</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={polldata?.description}  onChange={(e:any)=>{
                                      setPolldata({...polldata,description:e?.target?.value})
                                  }} placeholder="Enter Poll Description" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                                
                                        <div className="col-12 fv-row fv-plugins-icon-container mt-3">
                                                    <label className="fs-6 fw-semibold mb-1">Poll Option</label>
                                        <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                                        <div>
                                          {
                                            polldata?.options?.length>0 && (polldata?.poll_type=="Multiple Choice" || polldata?.poll_type=="Yes or No") && polldata?.options?.map((item:any,index:number)=>{
                                              return  <div key={index} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                              <input
                                                type="text"
                                                 disabled={polldata?.poll_type=="Yes or No"}
                                                className={` form-control py-2 my-2 text-dark`}
                                                style={{color:"black"}}
                                                required
                                                id="pn4"
                                                 value={item?.option}
                                                placeholder={`Enter Option ${index+1}`}
                                                onChange={(e)=>{
                                                    let temp=[...polldata.options]
                                                    temp[index]={...temp[index],option:e?.target?.value}
                                                    setPolldata({...polldata,options:temp})
                                                }}
                                            />
                                              {index==polldata?.options?.length-1 && polldata?.poll_type!="Yes or No" && polldata?.options?.length>2 && <button style={{fontSize:"25px",marginLeft:"25px",color:"red",outline:"none",border:"none",background:"none"}} onClick={()=>{
                                                  setPolldata({...polldata,options:polldata.options.splice(0,polldata?.options?.length-1)})
                                              }}>
                                                <AiOutlineDelete/>
                                              </button>}
                                           </div>
                                        })
                            
                                      }
                                  <div className="row mx-auto">
                                  <div className="d-flex" style={{flexWrap:"wrap"}}>
                                      {
                                        polldata?.options?.length>0 && (polldata?.poll_type=="Image Poll" || polldata?.poll_type=="Audio Poll" || polldata?.poll_type=="Video Poll") && polldata?.options?.map((item:any,index:number)=>{
                                          return <div key={index} style={{width:"250px",margin:"10px 10px",position:"relative",border:`${"1px solid black"}`,borderRadius:"5px",padding:"15px"}}>
                                          <div>
                                            {
                                                item?.option!="" ? <div style={{ width: "100%",margin:"10px auto",cursor:"pointer",border:`${"1px dotted black"}`,display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"10px",borderRadius:"2px" }} className="text-center bg-light p-5" >
                                                {
                                                  polldata?.poll_type=="Image Poll" && <img src={item?.option} style={{margin:"auto",textAlign:"center",height:"92px",width:"90%",objectFit:"contain"}}/>    
                                                }   
                                                {
                                                  polldata?.poll_type=="Audio Poll" &&  <audio style={{margin:"auto",textAlign:"center",width:"90%",objectFit:"contain"}}   controls >
                                                    <source src={item?.option} />
                                                  </audio>    
                                                }       
                                                {
                                                  polldata?.poll_type=="Video Poll" && <video className="video_custom_style_given" style={{margin:"auto",height:"150px",textAlign:"center",width:"90%",objectFit:"contain"}}   controls >
                                                  <source src={item?.option} />
                                                </video>        
                                                }                                          
                                                <button className="btn text-center" style={{width:"30px",height:"30px"}}  onClick={() => {
                                                    let temp = {...polldata}
                                                    temp.options[index] = { ...temp.options[index], option: ""}
                                                    setPolldata(temp)
                                                }}> 
                                                    <svg className="h-5 w-5 text-gray-400" style={{width:"20px",color:"red"}} xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20" stroke="">
                                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                    </svg>
                                                </button> 
                                            </div>:
                                            
                                            <div style={{ width: "100%",margin:"10px auto",border:`${"1px dotted black"}`,marginBottom:"10px",borderRadius:"2px" }} className="text-center bg-light p-5" >
                                                <label  style={{cursor:"pointer"}}>
                                                <input type="file" onChange={(e)=>{
                                                    onChange2(e,index)
                                                }} accept={polldata?.poll_type=="Image Poll"?".jpg, .png, .jpeg":polldata?.poll_type=="Audio Poll"?".mp3":".mp4, .mkv, .x-matroska,.mpeg"} style={{display:"none",border:"none",outline:"none",width:"100%",height:"100%",zIndex:"-100"}}/>
                                                    <svg style={{width:"60px"}} className="text-gray-400"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
	                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                <p className="text-sm text-slate-500 dark:text-slate-300 f">
                                                    Upload Image/Audio/Video
                                                </p>
                                                </label>

                                            </div>
                                          }
                                          </div>
                                          <input
                                              type="text"
                                              className={` form-control py-2 mb-3 text-dark`}
                                              style={{color:"black"}}
                                              required
                                              id="pn4"
                                              value={item?.title}
                                              placeholder={`Enter Title`}
                                              onChange={(e)=>{
                                                let temp=[...polldata.options]
                                                temp[index]={...temp[index],title:e?.target?.value}
                                                setPolldata({...polldata,options:temp})
                                              }}
                                          />
                                          <input
                                              type="text"
                                              className={` form-control py-2 text-dark`}
                                              style={{color:"black"}}
                                              required
                                              id="pn4"
                                              value={item?.description}
                                              placeholder={`Enter Description`}
                                              onChange={(e)=>{
                                                let temp=[...polldata.options]
                                                temp[index]={...temp[index],description:e?.target?.value}
                                                setPolldata({...polldata,options:temp})
                                              }}
                                          />
                                          {index==polldata?.options?.length-1 && polldata?.options?.length>2 && <button style={{position:"absolute",top:"-10px",right:"0px",fontSize:"30px",border:"none",outline:"none",background:"none"}} onClick={()=>{
                                            setPolldata({...polldata,options:polldata.options.splice(0,polldata?.options?.length-1)})
                                          }}>
                                            <svg className="h-5 w-5 text-gray-400" style={{width:"30px",color:"red"}} xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20" stroke="">
                                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                              </svg>
                                          </button>
                                          }
                                      </div>
                                        })
                                      }
                                  </div>
                                  </div>
                       

                    {polldata?.options?.length<8 && polldata?.poll_type!="Yes or No" &&  <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <svg style={{width:"20px"}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" stroke="">
	                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
                        </svg> 
                      <span style={{marginLeft:"10px",fontSize:"16px",color:"#4669fa",cursor:"pointer",fontWeight:"600"}} onClick={()=>{
                        let data = {...polldata}
                        data.options.push({ option: '', id: undefined,title:"",description:"" })
                        setPolldata({...data})
                      }}>Add More Option</span></div>}
                    </div>


                    <div>
                <h1 className="mt-5">Settings</h1>
                <div className="row g-5 my-2">
                    <div className="col-6" style={{borderRight:`${"1px solid #b9bec6"}`,paddingRight: "35px"}}>
                         <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                         <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Allow Selection For Multiple Option</span>
                            <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                                         value={polldata?.allow_selection_for_multiple_option}
                                         checked={polldata?.allow_selection_for_multiple_option==0?false:true}
                                         onChange={async (e) =>{
                                          if(polldata?.allow_selection_for_multiple_option==0){
                                            setPolldata({...polldata,allow_selection_for_multiple_option:1})
                                           }else{
                                            setPolldata({...polldata,allow_selection_for_multiple_option:0,expiry_date:null})
                                           }
                              }}/>
                            </div>
                             
                         </label>
                         {
                            polldata?.allow_selection_for_multiple_option==1 &&
                         
                         <div className="my-5" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          {/* <Icon className="" style={{fontWeight:"800",transform:"scale(3)"}} icon="streamline:interface-arrows-bend-down-right-2-arrow-bend-curve-change-direction-down-to-right"/> */}
                          <div className="space-y-3" style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <Select
                            options={options}
                            value={selectMultiple}
                            placeholder="Select Any One"
                            className=' custom_input_width py-2 w-50'
                             onChange={(e:any)=>{
                               setSelcetMultiple(e)
                                if(polldata?.selections?.type=="Unlimited"){
                                    setPolldata({...polldata,selections:{...polldata?.selections,type:e?.value,exact_count:0,min_range_count:0,max_range_count:0}})
                                }
                                else if(polldata?.selections?.type=="Exact"){
                                    setPolldata({...polldata,selections:{...polldata?.selections,type:e?.value,exact_count:1,min_range_count:0,max_range_count:0}})
                                }else  if(polldata?.selections?.type=="Range"){
                                    setPolldata({...polldata,selections:{...polldata?.selections,type:e?.value,exact_count:0,min_range_count:1,max_range_count:1}})
                                }
                             }}
                            />
                             {polldata?.selections?.type=="Exact" && <input
                                type="number"
                                className={`form-control py-2 w-25`}
                                required
                                id="pn4"
                                value={polldata?.selections?.exact_count}
                                placeholder={`Exact Number`}
                                onChange={(e:any)=>{
                                    setPolldata({...polldata,selections:{...polldata?.selections,exact_count:e?.target?.value}})
                                 }}
                            />
                            }
                            {
                              polldata?.selections?.type=="Range" &&<>
                            <input
                                type="number"
                                className={`custom_input_width3 form-control py-2 mx-2 w-25`}
                                required
                                id="pn4"
                                value={polldata?.selections?.min_range_count}
                                placeholder={`Min Number`}
                                onChange={(e:any)=>{
                                    setPolldata({...polldata,selections:{...polldata?.selections,min_range_count:e?.target?.value}})
                                }}
                            />
                            <input
                                type="number"
                                className={`custom_input_width3 form-control py-2 mx-2 w-25 `}
                                required
                                id="pn4"
                                value={polldata?.selections?.max_range_count}
                                placeholder={`Max Number`}
                                onChange={(e:any)=>{
                                    setPolldata({...polldata,selections:{...polldata?.selections,max_range_count:e?.target?.value}})
                                }}
                            />
                            </>
                             }
                            
                       </div>
                        
                         </div>
                         }
                         <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                         <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Required Participant Name</span>
                            <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                                value={polldata?.required_participant_name}
                                checked={polldata?.required_participant_name==0?false:true}
                                         onChange={async (e) =>{
                                          if(polldata?.required_participant_name===0){
                                            setPolldata({...polldata,required_participant_name:1})
                                           }else{
                                            setPolldata({...polldata,required_participant_name:0})
                                           }
                              }}/>
                            </div>
                         </label>

                         <label className="my-3" style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                         <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Starting Date</span>
                            {/* <Flatpickr
                               type="date"
                                value={polldata?.starting_date}
                                data-enable-time
                                id="date-time-picker"
                                className="form-control py-2 w-50"
                                onChange={(date:any) =>{
                                    setPolldata({...polldata,starting_date:date[0]})
                                }}
                                placeholder='Select Starting Date'
                            /> */}
                             <input 
                                type="date" 
                                value={
                                  polldata?.starting_date
                                    ? polldata.starting_date.toISOString().split('T')[0]
                                    : new Date().toISOString().split('T')[0]
                                }
                                className="form-control w-50 p-2" 
                              onChange={(e:any) =>{
                                setPolldata({...polldata,starting_date:new Date(e?.target?.value)})
                            }}
                              />
                            <span className="date_time_picker_custom_style">
                              {/* <Icon  icon="uil:calender"/> */}
                              </span>
                         </label>
                        
                    </div>
                    <div className="col-6" style={{paddingLeft:"30px"}}>
                    <label className="my-3 d-flex justify-content-between align-items-center" style={{cursor:"pointer"}}>
                            <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Voting Security</span>
                            <Select
                            options={votingSecurityOption}
                            value={votingSecurity}
                            placeholder="Select Any One"
                            className=' w-50'
                             onChange={(e:any)=>{
                               setVotingSecurity(e)
                                if(e?.target?.value!="One Vote Per IP Address"){
                                    setPolldata({...polldata,voting_security:e?.value,use_recaptcha:0,strict_checking:0})
                                }else{
                                    setPolldata({...polldata,voting_security:e?.value,strict_checking:1})
                                }
                             }}
                            />
                         </label>
                        {/* {polldata?.voting_security=="One Vote Per IP Address" && <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                           Strict Checking
                            <Switch
                                activeClass="bg-primary-500"
                                checked={polldata?.strict_checking==0?false:true}
                                value={polldata?.strict_checking}
                                onChange={async (e) =>{
                                   if(polldata?.strict_checking===0){
                                    setPolldata({...polldata,strict_checking:1})
                                   }else{
                                    setPolldata({...polldata,strict_checking:0})
                                   }
                                }}
                             />
                         </label>
                        } */}
                         {/* {polldata?.voting_security=="One Vote Per IP Address" && <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                           Use Recaptch
                            <Switch
                                activeClass="bg-primary-500"
                                checked={polldata?.use_recaptcha==0?false:true}
                                value={polldata?.use_recaptcha}
                                onChange={async (e) =>{
                                   if(polldata?.use_recaptcha===0){
                                    setPolldata({...polldata,use_recaptcha:1})
                                   }else{
                                    setPolldata({...polldata,use_recaptcha:0})
                                   }
                                }}
                             />
                         </label>
                         } */}

                     {polldata?.close_poll_on_scheduled_date==1  && <label className="my-3" style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                     <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Poll Expiry Date</span>
                            {/* <Flatpickr
                                value={polldata?.expiry_date || new Date()}
                                data-enable-time
                                id="date-time-picker"
                                className="form-control py-2 w-50"
                                onChange={(date:any) =>{
                                    setPolldata({...polldata,expiry_date:date[0]})
                                }}
                                placeholder='Select Expiry Date'
                            /> */}
                            <input type="date" 
                              value={polldata?.expiry_date?polldata?.expiry_date:""}
                              className="form-control w-50 p-2" 
                              onChange={(e:any) => {
                                setPolldata({...polldata,expiry_date:e?.target?.value})
                              }}
                              />
                            
                             <span className="date_time_picker_custom_style">
                              {/* <Icon  icon="uil:calender"/> */}
                              </span>
                         </label>
                      }
                    </div>
                </div>

                <hr/>

                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                    <div style={{fontSize:"18px",margin:"20px 0px",fontWeight:"600",color:"#4669fa",cursor:"pointer"}} onClick={()=>{
                        if(openAdvanceSetting){
                            setOpenAdvanceSetting(false)
                        }else{
                            setOpenAdvanceSetting(true)
                        }
                    }}>
                       {openAdvanceSetting ? "Hide Advance Settings":"Show Advance Settings"}
                    </div>
                </div>


               {openAdvanceSetting && <div className="row gy-5">

                    <div className="col-6" style={{borderRight:`${"1px solid #b9bec6"}`,paddingRight: "30px"}}>
                         <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                               <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Close Poll On Scheduled Date</span>
                                <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                                         value={polldata?.close_poll_on_scheduled_date}
                                         checked={polldata?.close_poll_on_scheduled_date==0?false:true}
                                         onChange={async (e) =>{
                                          if(polldata?.close_poll_on_scheduled_date==0){
                                            setPolldata({...polldata,close_poll_on_scheduled_date:1})
                                           }else{
                                            setPolldata({...polldata,close_poll_on_scheduled_date:0,expiry_date:null})
                                           }
                                  }}/>
                                </div>
                         </label>
                         <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                         <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Allow Comments</span>
                              <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                                     value={polldata?.allow_comment}
                                     checked={polldata?.allow_comment==0?false:true}
                                         onChange={async (e) =>{
                                          if(polldata?.allow_comment===0){
                                            setPolldata({...polldata,allow_comment:1})
                                           }else{
                                            setPolldata({...polldata,allow_comment:0})
                                           }
                                  }}/>
                                </div>
                         </label>
                         <label className="my-3" style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                         <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Hide Share Button</span>
                        
                            <div className="form-check form-switch">
                                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                                value={polldata?.hide_share_button}
                                checked={polldata?.hide_share_button==0?false:true}
                                     onChange={async (e) =>{
                                          if(polldata?.hide_share_button===0){
                                            setPolldata({...polldata,hide_share_button:1})
                                           }else{
                                            setPolldata({...polldata,hide_share_button:0})
                                           }
                                  }}/>
                                </div>
                         </label>
                    </div>
                    <div className="col-6" style={{paddingLeft:"30px"}}>
                    <label className="my-3" style={{cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span className='w-50' style={{fontSize:"14px",fontWeight:"600"}}>Result Visibility</span>
                            <Select
                            options={resultVisibility}
                            value={resultVisibile}
                            placeholder="Select Any One"
                            className='m-2 w-50'
                             onChange={(e:any)=>{
                                setResultVisible(e)
                                setPolldata({...polldata,result_visibility:e?.value})
                             }}
                            />
                         </label>
                        
                         {/* <label className="my-3" style={{cursor:"pointer"}}>
                            Edit Vote Permissions
                            <Select
                            options={editVotePermission}
                            value={polldata?.edit_vote_permission}
                            placeholder="Select Any One"
                            className=' m-2'
                             onChange={(e)=>{
                                setPolldata({...polldata,edit_vote_permission:e?.target?.value})
                             }}
                            />
                         </label> */}
                    </div>
                </div>
               }

               {/* <hr style={{marginTop:"20px"}}/> */}

               <div style={{margin:"30px auto", textAlign:"center"}}>
                 <button className="btn  m-2 btn-dark btn-sm text-center"  onClick={async ()=>{
                       let checkOptions = polldata.options.some((x:any) => x.option.trim()=="")
                       if(polldata?.poll_title?.trim()=="" || !polldata?.poll_title?.trim()){
                         ToastComp({message:`Poll Title can't be empty`,type:"Error"})
                         return
                       }
                       else if(polldata?.close_poll_on_scheduled_date==1 && !polldata?.expiry_date){
                            ToastComp({message:`Please choose Poll Expiry date`,type:"Error"})
                            return
                           
                       }
                       else if (checkOptions) {
                            ToastComp({message:`Please type all option`,type:"Error"})
                                return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Exact" && polldata?.selections?.exact_count<=0) {
                          ToastComp({message:`Exact Count for options selection must be greater than `,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Exact" && polldata?.selections?.exact_count>polldata?.options?.length) {
                          ToastComp({message:`Exact Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.min_range_count<=0) {
                          ToastComp({message:`Minimum Range Count for options selection must be greater than 0`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.min_range_count>polldata?.options?.length) {
                          ToastComp({message:`Min Range Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count<=0) {
                          ToastComp({message:`Maximum Range Count for options selection must be greater than 0`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count<polldata?.selections?.min_range_count) {
                          ToastComp({message:`Maximum Range Count must be greater than or equal to minimum range count`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count>polldata?.options?.length) {
                          ToastComp({message:`Max Range Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else{
                          const {data}=await updatePoll(polldata?.id,{...polldata,thumbnail:pollThumbnail,draft:0})
                            if(data?.success){
                              toast.success('Poll Updated Successfully', {
                                  position: "top-right",
                                  autoClose: 2000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "dark",
                              })
                              navigate(`/conference-quiz/polls/${params?.id}`)
                            } 
                        }  
                 }}>
                    Update Poll
                 </button>
                 <button className="m-2 btn btn-dark btn-sm text-center" onClick={async ()=>{
                       let checkOptions = polldata.options.some((x:any) => x.option.trim()=="")
                       if(polldata?.poll_title?.trim()=="" || !polldata?.poll_title?.trim()){
                         ToastComp({message:`Poll Title can't be empty`,type:"Error"})
                         return
                       }
                       else if(polldata?.close_poll_on_scheduled_date==1 && !polldata?.expiry_date){
                            ToastComp({message:`Please choose Poll Expiry date`,type:"Error"})
                            return
                           
                       }
                       else if (checkOptions) {
                            ToastComp({message:`Please type all option`,type:"Error"})
                                return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Exact" && polldata?.selections?.exact_count<=0) {
                          ToastComp({message:`Exact Count for options selection must be greater than `,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Exact" && polldata?.selections?.exact_count>polldata?.options?.length) {
                          ToastComp({message:`Exact Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.min_range_count<=0) {
                          ToastComp({message:`Minimum Range Count for options selection must be greater than 0`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.min_range_count>polldata?.options?.length) {
                          ToastComp({message:`Min Range Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count<=0) {
                          ToastComp({message:`Maximum Range Count for options selection must be greater than 0`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count<polldata?.selections?.min_range_count) {
                          ToastComp({message:`Maximum Range Count must be greater than or equal to minimum range count`,type:"Error"})
                            return
                        }
                        else if (polldata?.allow_selection_for_multiple_option==1 && polldata?.selections?.type=="Range" && polldata?.selections?.max_range_count>polldata?.options?.length) {
                          ToastComp({message:`Max Range Count can have at max ${polldata?.options?.length} value. As you have only ${polldata?.options?.length} options`,type:"Error"})
                            return
                        }
                        else{
                          const {data}=await updatePoll(polldata?.id,{...polldata,thumbnail:pollThumbnail,draft:1})
                            if(data?.success){
                              toast.success('Poll Saved in Draft Successfully', {
                                  position: "top-right",
                                  autoClose: 2000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "dark",
                              })
                              navigate(`/conference-quiz/polls/${params?.id}`)
                            } 
                        }  
                 }}>
                    Save As Draft
                 </button>
               </div>
            </div>
                </div>
                
            </div>
          </div>
          <Modal open={uploadThumbnail} onClose={onCloseModal} center>
             <div style={{padding:"30px",margin:"auto",width:"500px"}}>
             <div style={{margin:"auto",border:"1px dotted black",borderRadius:"2px" }} className="modal_custom_design_poll text-center bg-light p-5" >
              <label>
                <input type="file" onChange={onChange} accept=".jpg, .png, .jpeg" ref={inputFileRef} style={{display:"none",border:"none",outline:"none",width:"100%",height:"100%",zIndex:"-100"}}/>
                <svg style={{width:"60px"}} className="text-gray-400"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
	                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                  <p className="text-sm text-slate-500 dark:text-slate-300 f">
                    Upload Poll Thumbnail.
                   </p>
                   </label>
                </div>
                <div className="mx-auto text-center">
                <button className="btn btn-sm btn-dark my-5 mx-auto" onClick={()=>{
                    setUploadThumbnail(false)
                }}>Cancel</button>
                </div>
            </div>
            </Modal>
        </div>
      </div>
    </div>
  )
}

export default EditPoll