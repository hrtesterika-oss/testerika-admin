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
import { APIURLTEMPLATE } from '../../APIURL';
import Switch from '@mui/material/Switch';
import { AiFillEdit } from 'react-icons/ai';
import ToastComp from '../../userList/ToastComp';
import { useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const TemplateList = () => {
    const [open, setOpen] = useState(false);
  
    const [template,setTemplate]=useState<Array<any[]>>([])
  
    const navigate=useNavigate()
  
    const onCloseModal = () => {
        findAllTemplate()
      setOpen(false)
    };
    const findAllTemplate=async ()=>{
         const {data}=await axios.get(`${APIURLTEMPLATE}/admin/getAllTemplate`)
         setTemplate(data?.data)
    }

    const updateStatus=async(id:any,status:any)=>{
      const {data}=await axios.put(`${APIURLTEMPLATE}/admin/updateTemplateData/${id}`,{status,updateStatus:true})
      if(data?.success){
        ToastComp({message:"Status Updated Successfully",type:"Success"})
        findAllTemplate()
      }
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
  
    
    const columns = [
      {
        id: 1,
        name: "Template Name",
        selector: (row:any) => row.name,
        sortable: true,
        reorder: true
      },
      {
          id: 2,
          name: "Total Questions",
          selector: (row:any) => row.data?.length,
          sortable: true,
          reorder: true
        },
        {
            id: 3,
            name: "Status",
            selector: (row:any) =>  <Switch {...label} checked={row.status===1 ? true : false} onChange={(e:any)=>{
             permissionList?.can_edit &&  updateStatus(row?.id,row?.status)
            }}/>,
            sortable: true,
            reorder: true
          },
      {
        id: 4,
        name: "Created At",
        selector: (row:any) => row.createdAt,
        sortable: true,
        reorder: true
      },
      {
        id: 5,
        name: "Actions",
        selector: (row:any) => <AiFillEdit style={{color:"#777ea0",fontSize:"25px"}} onClick={()=>{
          (permissionList?.can_edit || permissionList?.can_delete) &&  navigate(`/conference-quiz/podium/edit-template/${row?.id}`)
        }}/>,
        sortable: true,
        reorder: true
      },
    ];

  
    useEffect(()=>{
        findAllTemplate()
    },[])
    return (
      <div className="container">
          <div className="row">
             <div className="col-12 text-center d-flex" style={{justifyContent:"flex-end"}}>
             {permissionList?.can_create &&  <button className="btn btn-primary" onClick={()=>{
                     navigate("/conference-quiz/podium/create-new-template")
               }}>Create New Template</button>}
             </div>
             <div className="col-12 mt-5">
              {
               permissionList?.can_view && template?.length>0 ? <DataTable
                title=""
                columns={columns}
                data={template}
                defaultSortFieldId={0}
                pagination
                selectableRows
              /> : <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Template Found</h2></div>
              }
             
             </div>
  
             {
          open &&  <Modal open={open} onClose={onCloseModal} center>
            <h2 className="my-5 text-center">Update Plan</h2>
             <form className="my-5">
               <div className="row">
                 <p>data</p>
               </div>
            
             </form>
                   </Modal>
          }
          </div>
      </div>
    )
      }


export default TemplateList