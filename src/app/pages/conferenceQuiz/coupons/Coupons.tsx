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
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { deleteCouponById, getAllCoupon } from './request';
import ToastComp from '../userList/ToastComp';

const Coupons = () => {
    const [coupons,setCoupons]=useState<any[]>([])
    const navigate=useNavigate()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
        let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
        setPermissionList(result[0])
    }
    const getAllCoupons=async ()=>{
       const {data}=await getAllCoupon()
       if(data?.success){
         setCoupons(data?.data)
       }
    }
    useEffect(()=>{
        filterStaffPermission(navItem?.item)
        },[navItem])
    useEffect(()=>{
      getAllCoupons()
    },[])
    const columns = [
        {
          id: 1,
          name: "Coupon Name",
          selector: (row:any) => row.coupon_name,
          sortable: true,
          reorder: true
        },
        {
          id: 2,
          name: "Coupon Code",
          selector: (row:any) => row.coupon_code,
          sortable: true,
          reorder: true
        },
        {
          id: 3,
          name: "Description",
          selector: (row:any) =><>
          <p  className="preview" dangerouslySetInnerHTML={{__html:`${row.description}`}}/>
          </>,
          sortable: true,
          reorder: true
        },
        {
          id: 4,
          name: "Starting Date",
          selector: (row:any) => row.start_date,
          sortable: true,
          // right: true,
          reorder: true
        },
        {
          id: 5,
          name: "Expiry Date",
          selector: (row:any) => row.expiry_date,
          sortable: true,
          // right: true,
          reorder: true
        },
        {
            id: 6,
            name: "Actions",
            selector: (row:any) => 
            <div>
              {
                permissionList?.can_edit && <Tooltip title="Edit Coupon Detail" placement="top">
                <Button onClick={()=>{
                  navigate(`/conference-quiz/COUPONS/edit/${row?.id}`)
                }}><AiFillEdit style={{color:"#777ea0",fontSize:"25px"}} /></Button>
              </Tooltip>
              }  
              {
                permissionList?.can_delete &&   <Tooltip title="Delete Coupon" placement="top">
                <Button onClick={async ()=>{
                    const {data}=await deleteCouponById(row?.id)
                    if(data?.success){
                        ToastComp({message:"Coupon Deleted Successfully",type:"Success"})
                        getAllCoupons()
                    }
                }}><AiFillDelete style={{color:"red",fontSize:"25px"}} /></Button>
              </Tooltip>
              }
        
            </div>  ,
            sortable: true,
            reorder: true
          },
      ];
    
  return (
    <div className="container-fluid my-4">
        <div className="row">
            <div className="col-12">
                <div className="row gy-5">
               {
                permissionList?.can_create && <div className="my-2">
                <button className="btn btn-primary" onClick={()=>{
                  navigate("/conference-quiz/COUPONS/create")
                }}>
                  Create New Coupon
                </button>
                </div>
               } 
                    {
                        coupons?.length>0 && permissionList?.can_view ?   <div  className="col-12">
                              <DataTable
                                    title=""
                                    columns={columns}
                                    data={coupons}
                                    defaultSortFieldId={0}
                                    pagination
                                    selectableRows
                                    onRowClicked={(row:any)=>{
                                    // onOpenModal(row)
                                    }}
                            />  
                            </div>                      
                    :<div className="col-12">
                       <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Coupons Found</h2></div>
                     </div>
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default Coupons