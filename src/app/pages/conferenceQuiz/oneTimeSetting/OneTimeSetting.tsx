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

import { FiMoreVertical } from 'react-icons/fi';
import { APIURLQUIZ } from '../APIURL';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
const OneTimeSetting = () => {  
    const [oneTimePlan,setOneTimePlan]=useState<Array<any[]>>([])
    const navigate=useNavigate()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])
    
   
    const getAllOneTimeRequest=async ()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getAllOneTimeRequest`)
         if(data?.success){
            setOneTimePlan(data?.data)
         }
    }
  
    const columns = [
      {
        id: 1,
        name: "Email",
        selector: (row:any) => row.user_email,
        sortable: true,
        reorder: true
      },
      {
        id: 2,
        name: "Plan Name",
        selector: (row:any) => row.plan_name,
        sortable: true,
        reorder: true
      },
      {
        id: 3,
        name: "Player Limit",
        selector: (row:any) => row.player_limit,
        sortable: true,
        reorder: true
      },
      {
        id: 4,
        name: "Buy Date",
        selector: (row:any) => row.plan_buy_date,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
        id: 5,
        name: "Status",
        selector: (row:any) => row.status,
        sortable: true,
        // right: true,
        reorder: true
      },
      {
          id: 6,
          name: "Actions",
          selector: (row:any) =>  <Tooltip title="View More Info" placement="top">
          <Button onClick={()=>{
            navigate(`/conference-quiz/podium/one-time/moreInfo/${row?.id}`)
          }}><FiMoreVertical style={{color:"#777ea0",fontSize:"25px"}} /></Button>
        </Tooltip> ,
          sortable: true,
          reorder: true
        },
    ];
  
  
    useEffect(()=>{
        getAllOneTimeRequest()
    },[])
    return (
      <div className="container">
          <div className="row">
             <div className="col-12 mt-5">
              {
               permissionList?.can_view && oneTimePlan?.length>0 ? <DataTable
                title=""
                columns={columns}
                data={oneTimePlan}
                defaultSortFieldId={0}
                pagination
                selectableRows
                onRowClicked={(row:any)=>{
                  // onOpenModal(row)
                }}
              /> : <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Request Found</h2></div>
              }
             
             </div>
          </div>
      </div>
    )
      }


export default OneTimeSetting