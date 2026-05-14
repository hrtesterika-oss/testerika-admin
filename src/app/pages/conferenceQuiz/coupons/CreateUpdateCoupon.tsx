import React, { useEffect, useState } from 'react'
import Editor from '../../quizophyWebsite/editor/Editor'
import Select from 'react-select'
import ToastComp from '../userList/ToastComp'
import { useNavigate, useParams } from 'react-router-dom'
import { createCoupon, findCouponByCode, getCouponById, updateCouponById } from './request'
import axios from 'axios'
import { APIURLAUTH, APIURLQUIZ } from '../APIURL'
import { useSelector } from 'react-redux'

const CreateUpdateCoupon = () => {
    const [value,setValue]=useState("")
    const navigate=useNavigate()
    const params=useParams()
    const [users,setUsers]=useState<any[]>([        
        {label: 'Everyone', value: 'Everyone'},
     ])
     const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
     const filterStaffPermission=async (title:string)=>{
       let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
       if(params.id && !result[0]?.can_edit)
         navigate("/conference-quiz/COUPONS")
         else if(!params.id && !result[0]?.can_create)
         navigate("/conference-quiz/COUPONS")
     }
     useEffect(()=>{
       filterStaffPermission(navItem?.item)
       },[navItem])
    const [couponDetail,setCouponDetail]=useState<any>({
        id:undefined,
        coupon_name:"",
        coupon_code:"",
        description:"",
        discount_percentage_inr:10,
        discount_percentage_usd:10,
        max_user_limit:1,
        max_used_by_one_user:1,
        min_order_amount_inr:1,
        min_order_amount_usd:1,
        apply_for_purchase:[],
        visible_on_podium:1,
        start_date:"",
        expiry_date:"",
        conference_user_id:[],
        discount_type:"Flat"
    })
    const findCouponsUsingId=async()=>{
        const {data}=await  getCouponById(params?.id)
        if(data?.success){
            setValue(data?.data?.description)
            setCouponDetail(data?.data)
        }
    }
    const getAllUsers=async ()=>{
        const {data}=await axios.get(`${APIURLQUIZ}/admin/getAllRegisteredUsers/users`)
        if(data?.success){
            let temp=[...users]
           let result= data?.data?.map((item:any,index:any)=>{
               return {label:`${item?.id}-${item?.email}`,value:`${item?.id}-${item?.email}`}
            })
            if(result){
                temp=[...temp,...result]
                setUsers(temp)
            }
        }
    }
    useEffect(()=>{
        if(params?.id){
            findCouponsUsingId()
        }
        getAllUsers()
    },[])
    const options = [
        {label: 'Everytime', value: 'Everytime'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'},
        {label: '19', value: '19'},
        {label: '20', value: '20'},
        {label: '21', value: '21'},
        {label: '22', value: '22'},
        {label: '23', value: '23'},
        {label: '24', value: '24'},
        {label: '25', value: '25'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '28', value: '28'},
        {label: '29', value: '29'},
        {label: '30', value: '30'},
        {label: '31', value: '31'},
        {label: '32', value: '32'},
        {label: '33', value: '33'},
        {label: '34', value: '34'},
        {label: '35', value: '35'},
        {label: '36', value: '36'},
        {label: '37', value: '37'},
        {label: '38', value: '38'},
        {label: '39', value: '39'},
        {label: '40', value: '40'},
        {label: '41', value: '41'},
        {label: '42', value: '42'},
        {label: '43', value: '43'},
        {label: '44', value: '44'},
        {label: '45', value: '45'},
        {label: '46', value: '46'},
        {label: '47', value: '47'},
        {label: '48', value: '48'},
        {label: '49', value: '49'},
        {label: '50', value: '50'},
      ]

      const createCouponData=async ()=>{
         if(couponDetail?.coupon_name?.trim()=="" || !couponDetail?.coupon_name?.trim()){
            ToastComp({message:"Coupon Name can't be empty",type:"Error"})
         }
         else if(couponDetail?.coupon_code?.trim()=="" || !couponDetail?.coupon_code?.trim()){
            ToastComp({message:"Coupon Code can't be empty",type:"Error"})
         }
         else if(value?.trim()=="" || !value?.trim()){
            ToastComp({message:"Coupon Description can't be empty",type:"Error"})
         }
         else if(couponDetail?.discount_percentage_inr<=0){
            ToastComp({message:"INR Coupon Discount Percentage must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.discount_percentage_usd<=0){
            ToastComp({message:"USD Coupon Discount Percentage must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.max_user_limit<=0){
            ToastComp({message:"Max User Limit must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.max_used_by_one_user<=0){
            ToastComp({message:"Max Used by one user must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.min_order_amount_inr<=0){
            ToastComp({message:"Min order amount for INR must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.min_order_amount_usd<=0){
            ToastComp({message:"Min order amount for USD must be greater than 0",type:"Error"})
         }
         else if(couponDetail?.apply_for_purchase?.length<=0){
            ToastComp({message:"Apply For Purchase can't be empty",type:"Error"})
         }
         else if(couponDetail?.start_date?.trim()=="" || !couponDetail?.start_date?.trim()){
            ToastComp({message:"Start Date can't be empty",type:"Error"})
         }
         else if(couponDetail?.expiry_date?.trim()=="" || !couponDetail?.expiry_date?.trim()){
            ToastComp({message:"Expiry Date can't be empty",type:"Error"})
         }
         else if(couponDetail?.conference_user_id?.length<=0){
            ToastComp({message:"Conference User can't be empty",type:"Error"})
         }
         else{
            setCouponDetail({...couponDetail,description:value})
            if(params?.id && couponDetail?.id){
               const {data}=await updateCouponById(params.id,{...couponDetail,description:value})
               if(data?.success){
                ToastComp({message:"Coupon Updated Successfully",type:"Success"})
                navigate("/conference-quiz/COUPONS")
              }else{
                ToastComp({message:`${data?.message}`,type:"Error"})
              }
            }else{
                const {data}=await createCoupon({...couponDetail,description:value})
                if(data?.success){
                    ToastComp({message:"Coupon Created Successfully",type:"Success"})
                    navigate("/conference-quiz/COUPONS")
                }else{
                    ToastComp({message:`${data?.message}`,type:"Error"})
                }
                
            }
         }
      }
  return (
    <div>
        <div className="container-fluid">
            <div className="row gy-5">
                <div className="col-12 gy-5">
                    <div className="row" style={{margin:"auto",display:"flex",justifyContent:"space-between"}}>
                        <div className="col-5 p-3" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                               <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Name</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} placeholder="Enter Coupon Name" name="first-name" value={couponDetail?.coupon_name} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,coupon_name:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Discount Percentage (INR)</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Enter Coupon Discount Percentage" name="first-name" value={couponDetail?.discount_percentage_inr} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,discount_percentage_inr:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Discount Percentage (USD)</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Enter Coupon Discount Percentage" name="first-name" value={couponDetail?.discount_percentage_usd} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,discount_percentage_usd:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Max User (How many users can use)</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Max User (How many users can use)" name="first-name" value={couponDetail?.max_user_limit} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,max_user_limit:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Max Used By One User</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Max Used By One User" name="first-name" value={couponDetail?.max_used_by_one_user} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,max_used_by_one_user:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Minimum Order Amount(INR)</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Minimum Order Amount" name="first-name" value={couponDetail?.min_order_amount_inr} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,min_order_amount_inr:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Minimum Order Amount(USD)</label>
                             
                                <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Minimum Order Amount" name="first-name" value={couponDetail?.min_order_amount_usd} onChange={(e:any)=>{
                                    setCouponDetail({...couponDetail,min_order_amount_usd:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Discount Type Flat/Upto</label>
                                 <select value={couponDetail?.discount_type} placeholder='Discount Type' className="form_style form-control fw-bolder form-select form-control" onChange={(e:any)=>{
                                        setCouponDetail({...couponDetail,discount_type:e?.target?.value})
                                 }}>
                                    <option disabled={true}>Select</option>
                                     <option value="Flat">Flat</option>
                                     <option value="Upto">Upto</option>
                                 </select>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                        </div>


                        <div className="col-6 p-3" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                               <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Can Apply For Purchase</label>
                                <Select
                                    isMulti
                                    name='Coupon Can Apply For Purchase'
                                    options={options}
                                    className='basic-multi-select'
                                    classNamePrefix='select'
                                    placeholder="Select Coupon Can Apply For Purchase"
                                    value={couponDetail?.apply_for_purchase}
                                    onChange={(e: any, i: any) => {
                                        setCouponDetail({...couponDetail,apply_for_purchase:e})
                                    // setQuizDetail({...quizDetail,language:e})
                                    }}
                              />                             
                           <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Visible On Portal</label>
                             
                                <select value={couponDetail?.visible_on_podium==1?"YES":"NO"} className="form_style form-control fw-bolder form-select form-control"  onChange={(e:any)=>{
                                     if(e?.target?.value=="YES"){
                                        setCouponDetail({...couponDetail,visible_on_podium:1})
                                     }else{
                                        setCouponDetail({...couponDetail,visible_on_podium:0})
                                     }
                                }}>
                                    <option disabled={true}>Select</option>
                                     <option value="YES">YES</option>
                                     <option value="NO">NO</option>
                                 </select>
                              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Start Date</label>
                             
                                <input type="date" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Start Date" name="first-name" value={couponDetail?.start_date} onChange={(e:any)=>{
                                   setCouponDetail({...couponDetail,start_date:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Expiry Date</label>
                             
                                <input type="date" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Expiry Date" name="first-name" value={couponDetail?.expiry_date} onChange={(e:any)=>{
                                   setCouponDetail({...couponDetail,expiry_date:e?.target?.value})
                                }}/>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Code</label>
                             
                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  placeholder="Coupon Code" name="first-name" value={couponDetail?.coupon_code} onChange={(e:any)=>{
                                   setCouponDetail({...couponDetail,coupon_code:e?.target?.value})
                                }}/>
                                <button className="btn btn-primary" onClick={async ()=>{
                                      const characters = 'ABCDEFGHIJKL#MNOPQRSTUVWXY&Zab@cdefgh$ijklmnopqrstuvwxyz0123456789';
                                      let result = '';
                                      let number=Math.floor(Math.random()*100)
                                      if(number<6){
                                        number=6
                                      }
                                      else if(number>6 && number<=10){
                                        number=7
                                      }
                                      else if(number>10){
                                        number=8
                                      }                                    
                                      for (let i = 0; i < number; i++) {
                                             const randomIndex = Math.floor(Math.random() * characters.length);
                                             result += characters.charAt(randomIndex);
                                      }
                                      const {data}=await findCouponByCode(result)
                                      if(!data?.success && !data?.error && result){
                                        setCouponDetail({...couponDetail,coupon_code:result})
                                      }else{
                                        ToastComp({message:"Coupon Code Already Exist.Please try again",type:"Error"})
                                      }
                                }}>Generate Coupon Code</button>
                                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>

                                <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold text-primary">Coupon Assign to Specific User</label>
                                <Select
                                    isMulti
                                    name='Coupon Can Apply For Purchase'
                                    options={users}
                                    className='basic-multi-select'
                                    classNamePrefix='select'
                                    placeholder="Select User To Assign coupon"
                                    value={couponDetail?.conference_user_id}
                                    onChange={(e: any, i: any) => {
                                        // console.log(e)
                                        setCouponDetail({...couponDetail,conference_user_id:e})
                                    // setQuizDetail({...quizDetail,language:e})
                                    }}
                              />   
                              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div>
                                </div>
                        </div>
                    </div>

                    <div className="row" style={{marginTop:"70px"}}>
                        <div className="col-12">
                        <label className="required fs-6 fw-semibold text-primary mb-5">Coupon Description</label>
                            <Editor setValue={setValue} value={value}/>
                        </div>

                        <div className="col-12 my-5 mx-auto text-center">
                            <button className="btn btn-primary text-center mx-auto" onClick={()=>{
                                createCouponData()
                            }}>{params?.id?"Update":"Create"} Coupon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateUpdateCoupon