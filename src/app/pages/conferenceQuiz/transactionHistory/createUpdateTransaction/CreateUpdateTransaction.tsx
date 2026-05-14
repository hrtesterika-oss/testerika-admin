import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { APIURLAUTH, APIURLPAYMENT, APIURLQUIZ } from '../../APIURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import ToastComp from '../../userList/ToastComp';
import { useSelector } from 'react-redux';
let currencySelect=["INR","USD"]
const CreateUpdateTransaction = () => {
    const [editTransaction,setEditTransaction]=useState<any>()
    const [PlanList,setPlanList]=useState<any[]>()
    const [upgradeTransaction,setUpgradeTransaction]=useState<any>({ value: "false", label: "false"})
    const [planType,setPlanType]=useState<any>({ value: "Monthly", label: "Monthly"})
    const [paymentMethod,setPaymentMethod]=useState<any>({value:"RazorPay",label:"RazorPay"})
    const [users,setUsers]=useState<any[]>([])
    const [selectedPlanName,setSelcetdPlanName]=useState<any>({label:"",value:""})
    const [createTransactionData,setCreateTransactionData]=useState<any>( {
    user_email: '',
    plan_name: '',
    plan_type: 'Monthly',
    plan_player_limit: 0,
    amount: 0,
    event_per_month: 'Unlimited',
    razorpay_order_id: '',
    transaction_id: '',
    transaction_from: "",
    currency: 'INR',
    plan_buy_date: new Date(),
    payment_method: 'RazorPay',
    paymentStatus: 'Success',
    is_verified:1})
    const location=useLocation()
    const params=useParams()
    const navigate=useNavigate()
    const [selectedUser,setSelectedUser]=useState<any>({label:"",value:""})
    const [permissionlist,setPermissionList]=useState<any>()
    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
      if(!result[0]?.can_create && !result[0]?.can_edit && !result[0]?.can_delete) navigate("/conference-quiz/podium/transaction-history")
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])
    const options2 = [
      { value: "Monthly", label: "Monthly" },
      { value: "Yearly", label: "Yearly" },
      { value: "Adds-On", label: "Adds-On" },
      { value: "ONE TIME", label: "ONE TIME" },
    ];
    const options3 = [
      { value: "RazorPay", label: "RazorPay" },
      { value: "PayPal", label: "PayPal" },
      { value: "CashFree", label: "CashFree" },
      { value: "PhonePe", label: "PhonePe" },
      // { value: "PayStack", label: "PayStack" },
    ];
    const options = [
      { value: "false", label: "false" },
      { value: "true", label: "true" },
    ];
    
    const findTransactionById=async()=>{
         const {data}=await axios.get(`${APIURLQUIZ}/admin/getTransactionById/${params?.id}`)
         if(data?.success){
            setEditTransaction(data?.data)
         }
    }

    const getAllPlanList=async ()=>{
      const {data}=await axios.get(`${APIURLQUIZ}/payment-gateway/getAllPlanList`)
      if(data?.success){
         let result= data?.data?.map((item:any,index:any)=>{
             return {label:`${item?.name}`,value:`${item?.name}`}
          })
           // Declare a new array
            let newArray:any[] = []
            // Declare an empty object
            let uniqueObject:any = {}
            // Loop for the array elements
            for (let i in result) {
                // Extract the title
                let objTitle = result[i]['value'];
                // Use the title as the index
                uniqueObject[objTitle] = result[i];
            }
            // Loop to push unique object into array
            for (let i in uniqueObject) {
                newArray.push(uniqueObject[i]);
            }
          if(newArray){
            setPlanList(newArray)
          }
      }
  }
    const getAllUsers=async ()=>{
      const {data}=await axios.get(`${APIURLAUTH}/company/get-all-registered-company`)
      if(data?.success){
         let result= data?.data?.map((item:any,index:any)=>{
             return {label:`${item?.email}`,value:`${item?.email}`}
          })
          if(result){
              setUsers(result)
          }
      }
  }

 

  const storeUserEmailANdPLanName=()=>{
    if(params?.id && editTransaction){
      let tempName=PlanList?.find((item)=>item?.value==editTransaction?.plan_name)
      setSelcetdPlanName(tempName)
      let tempName2=users?.find((item)=>item?.value==editTransaction?.user_email)
      setSelectedUser(tempName2)
    }
  }
  useEffect(()=>{
    if(params?.id && users && editTransaction && PlanList){
      storeUserEmailANdPLanName()
    }
  },[editTransaction,users,PlanList])

    useEffect(()=>{
      getAllPlanList()
      getAllUsers()
        if(params?.id){
          findTransactionById()
        }
    },[])


    const createTransaction=async ()=>{
      if (!validator.isEmail(createTransactionData?.user_email)) {
        ToastComp({message:`Invalid Email`,type:"Error"})
        return; 
     }
    else if(createTransactionData?.plan_name?.trim()==="" || createTransactionData?.event_per_month?.trim()==="" || createTransactionData?.paymentStatus?.trim()==="" || createTransactionData?.currency?.trim()==="" || createTransactionData?.transaction_id?.trim()===""){
      ToastComp({message:`All fields are required`,type:"Error"})
      return; 
    }
    else if(createTransactionData?.plan_player_limit<=0){
      ToastComp({message:`Player limit must be greater than 0`,type:"Error"})
      return; 
    }
    else if(createTransactionData?.amount<=0){
      ToastComp({message:`Amount must be greater than 0`,type:"Error"})

      return; 
    }
    else if((createTransactionData?.payment_method==="RazorPay" || createTransactionData?.payment_method==="PhonePe" || createTransactionData?.payment_method==="CashFree") && !createTransactionData?.razorpay_order_id?.trim()){
      ToastComp({message:`Order ID can't be empty`,type:"Error"})
      return; 
    }
    else{
        const {data}=await axios.post(`${APIURLQUIZ}/admin/createNewTransaction`,{createTransaction:createTransactionData})
        if(data?.success){
          ToastComp({message:data?.message,type:"Success"})
          navigate("/conference-quiz/user")
        }else{
          ToastComp({message:data?.message,type:"Warning"})
        }
    }
      
    }

  return (
    <div>
         <form className="my-5">
             <div className="row">
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">User Email</label>
                                  {/* <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.user_email : createTransactionData?.user_email}  onChange={(e:any)=>{
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,user_email:e?.target?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,user_email:e?.target?.value})
                                      }
                                  }} placeholder="Enter User Email" name="first-name"/> */}
                                   <Select options={users} value={selectedUser}
                                  name='Select User Email'
                                   placeholder="Select User Email"
                                    onChange={(e:any)=>{
                                      if(editTransaction?.id){
                                        setSelectedUser(e)
                                        setEditTransaction({...editTransaction,user_email:e?.value})
                                      }else{
                                        setSelectedUser(e)
                                        setCreateTransactionData({...createTransactionData,user_email:e?.value})
                                      }
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Name</label>
                               
                                  {/* <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.plan_name : createTransactionData?.plan_name} onChange={(e:any)=>{
                                     if(editTransaction?.id){
                                      setEditTransaction({...editTransaction,plan_name:e?.target?.value})
                                    }else{
                                      setCreateTransactionData({...createTransactionData,plan_name:e?.target?.value})
                                    }
                                  }} placeholder="Enter Plan Name" name="first-name"/> */}
                                   <Select options={PlanList} value={selectedPlanName}
                                      name='Select Plan Name'
                                      placeholder="Select Plan Name"
                                     onChange={(e:any)=>{
                                      if(editTransaction?.id){
                                        setSelcetdPlanName(e)
                                      setEditTransaction({...editTransaction,plan_name:e?.value})
                                      }else{
                                        setSelcetdPlanName(e)
                                      setCreateTransactionData({...createTransactionData,plan_name:e?.value})
                                     }
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Type</label>
                               
                                  <Select options={options2}  value={planType}  onChange={(e:any)=>{
                                    if(e?.value!=="Yearly"){
                                      setPlanType(e)
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,plan_type:e?.value,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,plan_type:e?.value,is_upgrade_plan:false,upgrade_amount:null,amount_deducted_to_upgrade:null,adjustable_amount:null,upgrade_date:null})
                                      }
                                    }else{
                                      setPlanType(e)
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,plan_type:e?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,plan_type:e?.value})
                                      }
                                    }
                                    
                                  }} />
                        <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                     
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Plan Player Limit</label>
                               
                                  <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.plan_player_limit : createTransactionData?.plan_player_limit}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,plan_player_limit:Number(e?.target?.value)})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,plan_player_limit:Number(e?.target?.value)})
                                        }
                                  }} placeholder="Enter Plan Player Limit" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Amount</label>
                               
                                  <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  value={editTransaction?.id ? editTransaction?.amount : createTransactionData?.amount}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,amount:Number(e?.target?.value)})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,amount:Number(e?.target?.value)})
                                            }
                                  }} placeholder="Enter Amount" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Payment Method</label>
                               
                                  <Select options={options3}  value={paymentMethod}  onChange={(e:any)=>{
                                    setPaymentMethod(e)
                                    if(e?.value!=="RazorPay"){
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,payment_method:e?.value,razorpay_order_id:""})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,payment_method:e?.value,razorpay_order_id:""})
                                      }
                                    }else{
                                      if(editTransaction?.id){
                                        setEditTransaction({...editTransaction,payment_method:e?.value})
                                      }else{
                                        setCreateTransactionData({...createTransactionData,payment_method:e?.value})
                                      }
                                    }
                                  }} />
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Event Per Month</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  value={editTransaction?.id ? editTransaction?.event_per_month:createTransactionData?.event_per_month}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,event_per_month:e?.target?.value})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,event_per_month:e?.target?.value})
                                            }
                                  }} placeholder="Enter Event Per Month" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Payment Status</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.paymentStatus : createTransactionData?.paymentStatus}  onChange={(e:any)=>{
                                                if(editTransaction?.id){
                                                  setEditTransaction({...editTransaction,paymentStatus:e?.target?.value})
                                                }else{
                                                  setCreateTransactionData({...createTransactionData,paymentStatus:e?.target?.value})
                                                }    
                              }} placeholder="Enter Payment Status" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Currency (Use Capital Letter) <span className="ms-2 text-primary">INR/USD</span></label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ? editTransaction?.currency : createTransactionData?.currency}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,currency:e?.target?.value})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,currency:e?.target?.value})
                                        }          
                        }} placeholder="Enter Currency" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Transaction ID</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.transaction_id:createTransactionData?.transaction_id}  onChange={(e:any)=>{
                                        if(editTransaction?.id){
                                          setEditTransaction({...editTransaction,transaction_id:e?.target?.value})
                                        }else{
                                          setCreateTransactionData({...createTransactionData,transaction_id:e?.target?.value})
                                        }         
                                 }} placeholder="Enter Transaction ID" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="fs-6 fw-semibold mb-1">Transaction From (Optional)</label>
                               
                                  <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.transaction_from : createTransactionData?.transaction_from}  onChange={(e:any)=>{
                                            if(editTransaction?.id){
                                              setEditTransaction({...editTransaction,transaction_from:e?.target?.value})
                                            }else{
                                              setCreateTransactionData({...createTransactionData,transaction_from:e?.target?.value})
                                            }
                                  }} placeholder="Enter Transaction From" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       
                           <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                             <label className="fs-6 fw-semibold mb-1">Order ID (Optional)</label>
                             <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={editTransaction?.id ?editTransaction?.razorpay_order_id:createTransactionData?.razorpay_order_id}  onChange={(e:any)=>{
                                if(editTransaction?.id){
                                  setEditTransaction({...editTransaction,razorpay_order_id:e?.target?.value})
                                }else{
                                  setCreateTransactionData({...createTransactionData,razorpay_order_id:e?.target?.value})
                                }
                             }} placeholder="Enter RazorPay Order ID" name="first-name"/>
                 <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       

                        {/* <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                             <label className="fs-6 fw-semibold mb-1">Coupon Code (Optional)</label>
                               
                             <input required type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}}  onChange={(e:any)=>{
                                if(editTransaction?.id){
                                  setEditTransaction({...editTransaction,transactionCoupon:{
                                    ...editTransaction?.transactionCoupon,coupon_code:e?.target?.value
                                  }})
                                }else{
                                  setCreateTransactionData({...createTransactionData,transactionCoupon:{
                                    ...createTransactionData?.transactionCoupon,coupon_code:e?.target?.value
                                  }})                                
                                }
                             }}
                             value={createTransactionData?.transactionCoupon?createTransactionData?.transactionCoupon?.coupon_code:""}
                              placeholder="Enter Coupon Code" name="first-name"/>
                          <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> */}
                        
                        
                          {/* <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                             <label className="fs-6 fw-semibold mb-1">Coupon Discount (Optional)</label>
                          
                             <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} 
                             value={editTransaction?.id ? editTransaction?.transactionCoupon?.id ? editTransaction?.transactionCoupon?.discount_amount:0:createTransactionData?.transactionCoupon?.discount_amount} 
                              onChange={(e:any)=>{
                                if(editTransaction?.id){
                                  setEditTransaction({...editTransaction,transactionCoupon:{
                                    ...editTransaction?.transactionCoupon,discount_amount:e?.target?.value
                                  }})
                                }else{
                                  setCreateTransactionData({...createTransactionData,transactionCoupon:{
                                    ...createTransactionData?.transactionCoupon,discount_amount:e?.target?.value
                                  }})                                
                                }
                             }} placeholder="Enter Coupon Discount" name="first-name"/>
                          <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       
                          <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                             <label className="fs-6 fw-semibold mb-1">Payable Amount (Optional)</label>
                          
                             <input required type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} onChange={(e:any)=>{
                                if(editTransaction?.id){
                                  setEditTransaction({...editTransaction,transactionCoupon:{
                                    ...editTransaction?.transactionCoupon,payable_amount:e?.target?.value
                                  }})
                                }else{
                                  setCreateTransactionData({...createTransactionData,transactionCoupon:{
                                    ...createTransactionData?.transactionCoupon,payable_amount:e?.target?.value
                                  }})                                
                                }
                             }} 
                             value={editTransaction?.id ? editTransaction?.transactionCoupon?.id ? editTransaction?.transactionCoupon?.payable_amount:0:createTransactionData?.transactionCoupon?.payable_amount} 
                             placeholder="Enter Payable Amount" name="first-name"/>
                          <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> */}
                       

        
                      <div className="col-12 d-flex flex-column">
                     
                             <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={(e:any)=>{
                                e?.preventDefault()
                                 permissionlist?.can_create && createTransaction()
                            }}>{params?.id ? "Update" : "Create"} License</button>                         
                            
            
              </div>
              </div>
            
         </form>
    </div>
  )
}

export default CreateUpdateTransaction


