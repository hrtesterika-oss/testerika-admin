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
import axios from 'axios';
import { faqType } from '../userList/interface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import ToastComp from '../userList/ToastComp';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import Editor from './Editor';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function FAQs() {
    const [open,setOpen]=React.useState<boolean>(false)
    const [editFaq,setEditFaq]=useState<any>()
    const [createFaq,setCreateFaq]=useState<any>({
        question:"",
        answer:"",
    })

  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [faq,setfaq]=useState<any[]>([])
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
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    const onOpenModal = (row:any) => {
        setEditFaq(row)
        setOpen(true)
      };
      const onCloseModal = () => {
        getAllFAQS()
        setEditFaq(null)
        setCreateFaq(null)
        setOpen(false)
      };

      const getAllFAQS=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getAllFaqs`)
         if(data?.success){
            setfaq(data?.data)
         }
      }
      useEffect(()=>{
         getAllFAQS()
      },[])

  return (
    <div className="container mt-0">
         
              <div className="row d-flex justify-content-end my-5">
             {permissionList?.can_create && <button className="btn btn-primary" style={{width:"200px"}} onClick={()=>{
                setEditFaq(null)
                setOpen(true)
               }}>Add More FAQs</button>}
              </div>
              
        {

            permissionList?.can_view && faq?.length>0 ?
            faq.map((item,index)=>{
                return    <Accordion key={index} expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index+1}`)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{background:`${index%2===0 ? "#cbe5e0":"#f2f2f2"}`}}>
                <Typography  style={{color:"black",fontSize:"18px",fontWeight:"600"}}>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div  style={{color:"black",fontSize:"16px",fontWeight:"500"}}>
                   <div className="w-100" style={{display:"flex",justifyContent:"space-between"}}>
                   {item?.answer}
                    <span>
                      {permissionList?.can_edit && <AiFillEdit style={{color:"black",fontSize:"18px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{
                        onOpenModal(item)
                  }}/>}
                 {permissionList?.can_delete && <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={async ()=>{
                      const {data}=await axios.delete(`${APIURLQUIZ}/admin/deleteFaqsById/${item?.id}`)
                      if(data?.success){
                        getAllFAQS()
                        ToastComp({message:data?.message,type:"Success"})

                      }
                  }}/>}
                  </span>
                </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            }) : <>
              <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No FAQs Found</h2></div>
            </>
        }

      {
         <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">{editFaq?.id?"Update":"Create"} FAQs</h2>
             <form className="my-5">
             <div className="row">
                     
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Type FAQ Question</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFaq?.id ?editFaq?.question:createFaq?.question} onChange={(e:any)=>{
                                    if(editFaq?.id){
                                        setEditFaq({...editFaq,question:e?.target?.value})
                                    }else{
                                        setCreateFaq({...createFaq,question:e?.target?.value})
                                    }
                                  }} placeholder="Type Question..." name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Type FAQ Answer</label>
                               
                                  {/* <textarea rows={4} className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editFaq?.id?editFaq?.answer:createFaq?.answer}  onChange={(e:any)=>{
                                     if(editFaq?.id){
                                        setEditFaq({...editFaq,answer:e?.target?.value})
                                    }else{
                                        setCreateFaq({...createFaq,answer:e?.target?.value})
                                    }
                                  }} placeholder="Type Answer..." name="first-name"/> */}
                                  <Editor setEditFaq={setEditFaq} editFaq={editFaq} setCreateFaq={setCreateFaq} createFaq={createFaq}/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        editFaq && editFaq?.id &&   <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Update Active Status</label>
                        <Switch {...label} checked={editFaq?.active===1 ? true : false} onChange={(e:any)=>{
                            setEditFaq({...editFaq,active:editFaq?.active===1?0:1})
                          }}/>
                       
                         <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                    

                      
                     
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={async (e:any)=>{
                   e?.preventDefault()
                   if(editFaq?.id){
                     if(editFaq?.question?.trim()==="" || editFaq?.answer?.trim()===""){
                      ToastComp({message:"All fields are required",type:"Error"})
                     }else{
                        const {data}=await axios.put(`${APIURLQUIZ}/admin/updateFaqsById/${editFaq?.id}`,editFaq)
                        if(data?.success){
                           onCloseModal()
                           ToastComp({message:data?.message,type:"Success"})

                        }
                     }
                    
                   }else{
                    if(createFaq?.question?.trim()==="" || createFaq?.answer?.trim()===""){
                      ToastComp({message:"All fields are required",type:"Error"})

                     }else{
                        const {data}=await axios.post(`${APIURLQUIZ}/admin/createFaqs`,createFaq)
                        if(data?.success){
                           onCloseModal()
                           ToastComp({message:data?.message,type:"Success"})

                        }
                     }
                  
                   }
              }}>{editFaq?.id?"Update":"Create"} FAQs</button>
              </div>
              </div>
            
             </form>
                   </Modal>
          }

      
    </div>
   
  );
}