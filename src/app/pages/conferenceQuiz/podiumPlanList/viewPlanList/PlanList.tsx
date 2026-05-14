import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import "./css/index.css"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {  APIURLQUIZ } from '../../APIURL';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Switch from '@mui/material/Switch';
import ToastComp from '../../userList/ToastComp';
import { useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const PlanList = () => {
    const [open, setOpen] = useState(false);
    const [editPlan,setEditPlan]=useState<any>({})
    const [categoryOption,setCategoryOption]=useState<Array<any[]>>([])
    const [planCategoryData,setPlanCategorydata]=useState<Array<any[]>>([])
   const [selectCategory,setSelectCategory]=useState<any>("")
    const [plan,setPlan]=useState<Array<any[]>>([])

    const [logoCustomization,setLogoCustomization]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [exportResult,setExportResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [emailResult,setEmailResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [shareResult,setShareResult]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const [customUrl,setCustomUrl]=useState<any>({
      value: 'YES', label: 'YES'
    })
    const navigate=useNavigate()
    const options=[
      {value: 'YES', label: 'YES'},
      { value: 'NO', label: 'NO'}
    ]
    const [popularPlan,setPopularPlan]=useState<any>({
      value: 'false', label: 'false'
    })
    const [freePlan,setFreePlan]=useState<any>({
      value: 'false', label: 'false'
    })
    const options2 = [
      { value: "true", label: "true" },
      { value: "false", label: "false" },
    ];
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])

 
    const onOpenModal = (row:any) => {
      setEditPlan({...row})
      setLogoCustomization({value:row.logo_customization,label:row.logo_customization})
      setCustomUrl({value:row.custom_url,label:row.custom_url})
      setEmailResult({value:row.email_result,label:row.email_result})
      setExportResult({value:row.export_result,label:row.export_result})
      setShareResult({value:row.share_result,label:row.share_result})
      setOpen(true)
    };
    const onCloseModal = () => {
      getAllPlanCategoryWithPlanList()
      findAllPlan()
      setOpen(false)
      setEditPlan(null)
    };

    const updateStatus=async (id:number,status:number)=>{
           const {data}=await axios.put(`${APIURLQUIZ}/admin/updatePodiumPlan/${id}`,{status,updateStatus:true})
           if(data?.success){
            ToastComp({message:"Status Updated Successfully",type:"Success"})
              findAllPlan()
           }

    }
    const findAllPlan=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/get-all-plan`)
         setPlan(data?.data)
    }


  
    const columns = [
      {
        id: 1,
        name: "Plan Name",
        selector: (row:any) => row.name,
        sortable: true,
        reorder: true
      },
      {
        id: 2,
        name: "Status",
        selector: (row:any) =>  <Switch {...label} checked={row.status===1 ? true : false} onChange={(e:any)=>{
           updateStatus(row?.id,row?.status)
        }}/>,
        sortable: true,
        reorder: true
      },
      {
        id: 3,
        name: "Logo Customization",
        selector: (row:any) => row.logo_customization,
        sortable: true,
        reorder: true
      },
      {
        id: 4,
        name: "Custom URL",
        selector: (row:any) => row.custom_url,
        sortable: true,
        reorder: true
      },
      {
        id: 5,
        name: "Share Result",
        selector: (row:any) => row.share_result,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
        id: 6,
        name: "Email Result",
        selector: (row:any) => row.email_result,
        sortable: true,
        // right: true,
        reorder: true
      },
       {
          id: 7,
          name: "Actions",
          selector: (row:any) =><>
          <AiFillEdit style={{color:"#777ea0",fontSize:"20px"}} onClick={()=>{
             (permissionList?.can_edit) && navigate(`/conference-quiz/podium/update-plan/${row?.id}`)
          }}/>
           <AiFillDelete style={{color:"red",fontSize:"20px",marginLeft:"20px"}} onClick={async ()=>{
             if(permissionList?.can_delete){
              const {data}=await axios.delete(`${APIURLQUIZ}/admin/deletePodiumPlan/${row?.id}`)
              if(data?.success){
                ToastComp({message:"Plan deleted successfully",type:"Success"})
                findAllPlan()
              }
             }else{
              ToastComp({message:"You are not authorized to access",type:"Error"})
             }
          }}/>
          </>,
          sortable: true,
          reorder: true
        },
    ];
  
    const checkValidation=async()=>{
       if(editPlan?.name===""){
        ToastComp({message:"Plan name should not be empty",type:"Error"})
            return false
       }else if(editPlan?.description===""){
        ToastComp({message:"Plan description should not be empty",type:"Error"})
            return false
       }
       else if(editPlan?.name!=="ONE TIME" && !editPlan?.participant_per_event){
        ToastComp({message:"Participants per event must be greater than 0",type:"Error"})
        return false 
       }
       else if(editPlan?.free_plan && !editPlan?.free_trial_count_limit){
        ToastComp({message:"Free trial count must be greater than 0",type:"Error"})
        return false
       }
       else{
            const {data}=await axios.put(`${APIURLQUIZ}/admin/updatePodiumPlan/${editPlan?.id}`,{data:editPlan,updateStatus:false})
            if(data?.success){
              ToastComp({message:"Plan updated successfully",type:"Success"})

                onCloseModal()
            }else{
              ToastComp({message:data?.message,type:"Error"})
            }
       }
    }

    const deletePlan=async ()=>{
      const {data}=await axios.delete(`${APIURLQUIZ}/admin/deletePodiumPlan/${editPlan?.id}`)
      if(data?.success){
        ToastComp({message:"Plan deleted successfully",type:"Success"})
        onCloseModal()
      }
    }

    const filterDataAccordingToCategory=(name:any)=>{
         let planListArray:any[]=planCategoryData.filter((item:any)=>item?.name===name)
         setPlan(planListArray[0]?.plans)
    }

    const editPlanId=(name:any)=>{
      let planListArray:any[]=planCategoryData.filter((item:any)=>item?.name===name)
      setEditPlan({...editPlan,planCategory_id:planListArray[0]?.id})
 }
  
    const getAllPlanCategoryWithPlanList=async()=>{
        const {data}=await axios.get(`${APIURLQUIZ}/admin/getSubscriptionPlanCategory`)
        if(data?.success){
          setPlanCategorydata(data?.data)
          let category=data?.categoryName.map((item:any)=> {
           return {value:item,label:item}
          })

          if(category.length>0){
            setCategoryOption(category)
          }
        }
    }
    useEffect(()=>{
       getAllPlanCategoryWithPlanList()
    },[])
    useEffect(()=>{
       findAllPlan()
    },[])
    return (
      <div className="container">
          <div className="row">
             <div className="col-12 d-flex" style={{justifyContent:"space-between"}}>
             <div className="col-md-3 fv-row fv-plugins-icon-container mt-3">
                                   <Select options={categoryOption} placeholder="Select Plan Category"  onChange={(e:any)=>{
                                       filterDataAccordingToCategory(e?.value)
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
              
              {permissionList?.can_create && <button className="btn btn-primary" onClick={()=>{
                     navigate("/conference-quiz/podium/create-new-plan")
               }}>Create New Plan</button>}
             </div>
             <div className="col-12 mt-5">
              {
               permissionList?.can_view && plan?.length>0 ? <DataTable
                title=""
                columns={columns}
                data={plan}
                defaultSortFieldId={0}
                pagination
                selectableRows
                onRowClicked={(row:any)=>{
                  // onOpenModal(row)
                }}
              /> : <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Plan Found</h2></div>
              }
             
             </div>
  
             {
          open &&  <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">Update Plan</h2>
             <form className="my-5">
             <div className="row">
             <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Update Plan Category</label>

                                  <Select options={categoryOption} placeholder="Select Plan Category"  onChange={(e:any)=>{
                                    setSelectCategory(e?.value)
                                    if(e?.value==="Add-Ons"){
                                      setEditPlan({...editPlan,yearly_price:null,free_plan:false,free_trial_count_limit:null})
                                     }
                                      editPlanId(e?.value)
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.name}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,name:e?.target?.value})
                                  }} placeholder="Enter Plan Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-8 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Description</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.description}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,description:e?.target?.value})
                                  }} placeholder="Enter Description" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Event Per Month</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.event_per_month}  onChange={(e:any)=>{
                                       setEditPlan({...editPlan,event_per_month:e?.target?.value})
                                  }} placeholder="Enter Event Per Month" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                      
                        <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className="required fs-6 fw-semibold mb-1">Participant Per Event</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.participant_per_event?editPlan?.participant_per_event:""}  onChange={(e:any)=>{
                                   setEditPlan({...editPlan,participant_per_event:Number(e?.target?.value)})
                       }} placeholder="Enter Participants Per Event" name="first-name"/> 
                         
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                     
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Logo Customization</label>
                               
                                 
                                   <Select options={options}  defaultValue={logoCustomization}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,logo_customization:e?.value})
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Custom URL</label>
                               
                              
                                   <Select options={options}  defaultValue={customUrl}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,custom_url:e?.value})
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Share Result</label>
                               
                                 
                                   <Select options={options}  defaultValue={shareResult}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,share_result:e?.value})
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Email Result</label>
                               
                                   <Select options={options}  defaultValue={emailResult}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,email_result:e?.value})
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Export Result</label>
                               
                                   <Select options={options}  defaultValue={exportResult}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,export_result:e?.value})
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Support</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.support}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,support:e?.target?.value})
                                  }} placeholder="Enter Support" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        !editPlan?.free_plan &&
                       <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Month Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.monthly_price ?editPlan?.monthly_price:null}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,monthly_price:Number(e?.target?.value)})
                                    }} placeholder="Enter Monthly Price" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                      {
                        (selectCategory!=="Add-Ons" && !editPlan?.free_plan) &&
                    <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Yearly Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.yearly_price?editPlan?.yearly_price:null}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,yearly_price:Number(e?.target?.value)})
                                    }} placeholder="Enter Yarly Price" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }

                      
                     {
                        selectCategory!=="Add-Ons" &&  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Is this your Free Plan</label>
                     
                         <Select options={options2}  defaultValue={freePlan}  onChange={(e:any)=>{
                             setFreePlan(e)
                             if(e?.value==="false"){
                              setEditPlan({...editPlan,free_plan:e?.value==="false"?false:true,free_trial_count_limit:null})
                             }else{
                              setEditPlan({...editPlan,free_plan:e?.value==="false"?false:true,monthly_price:null,yearly_price:null,popular_plan:false})
                             }
                          }} />
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       }
                     

                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Is this your Popular Plan</label>
                               
                                   <Select options={options2}  defaultValue={popularPlan}  onChange={(e:any)=>{
                                       setPopularPlan(e)
                                      setEditPlan({...editPlan,popular_plan:e?.value==="false"?false:true})
                                    }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      {
                        editPlan && editPlan?.free_plan &&   <div className="col-md-6 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Free Trial Count Limit</label>
                     
                        <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editPlan?.free_trial_count_limit}  onChange={(e:any)=>{
                            setEditPlan({...editPlan,free_trial_count_limit:Number(e?.target?.value)})
                          }} placeholder="Enter Free Trial Limit" name="first-name"/>
            <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      }
                     
                    
                     
  
                      <div className="col-12 d-flex flex-column">
             {permissionList?.can_edit && <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   checkValidation()
              }}>Update Plan</button>}
              {permissionList?.can_delete && <button className="btn btn-danger w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   deletePlan()
                  //  checkValidation()
              }}>Delete Plan</button>}
              </div>
              </div>
            
             </form>
                   </Modal>
          }
          </div>
      </div>
    )
      }


export default PlanList