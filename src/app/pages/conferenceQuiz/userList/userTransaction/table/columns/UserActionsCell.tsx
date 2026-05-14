/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useMemo, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { successMessage } from '../../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
import Drawer from 'react-modern-drawer'
import Modal from 'react-responsive-modal'
import PdfGenerater from "./PdfGenerator"
import axios from 'axios'
const API_URL=window?.location?.host=="localhost:3011"?"https://api.testerika.com/api/conferenceQuiz/quiz":"https://api.testerika.com/api/conferenceQuiz/quiz"

type Props = {
  id: any
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const navigate=useNavigate()
  const queryClient = useQueryClient()
  const params=useParams()
  const [planDetail,setPlanDetail]=useState(null)
  const [paymentDetail,setPaymentDetail]=useState(null)
  const [userDetail,setUserDetail]=useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [rowsData,setRowsData]=useState<any>()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const memoizedPdfGenerater = useMemo(() => <PdfGenerater planDetail={planDetail} paymentDetail={paymentDetail} userDetail={userDetail}/>, [planDetail,paymentDetail,userDetail]);

  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
}
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id?.id,id?.user_email), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      successMessage("Transaction Deleted Successfully")
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-three-dots-vertical fs-5'></i>
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
         {<a className='menu-link px-3' onClick={async ()=>{
           setRowsData(id)
            const {data}=await axios.get(`${API_URL}/payment-gateway/getPlanDetailIncludingUserDetail/${id?.id}`)
           if(data?.success){
            setPlanDetail(data?.planDetail)
            setUserDetail(data?.userDetail)
            setPaymentDetail(data?.paymentGateway)
            setIsOpen(true)
           }           
         }}>
            View
          </a>}
        </div>
        {/* <div className='menu-item px-3'>
         { <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>}
        </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
         { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/podium/update-transaction/${id?.id}`,{state:{id}})
            }}
          >
            Edit
          </a>}
        </div> */}

        {/* <div className='menu-item px-3'>
         { <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>}
        </div> */}
       {<Modal
                open={isOpen}
                onClose={toggleDrawer}
                center
            >
                <div className="px-4" style={{width:"600px"}}>
                    <div style={{margin:"10px auto 30px auto", textAlign:"center"}}>
                      <span className="text-dark" style={{fontSize:"23px",fontWeight:"600",color:"black"}}>Your Transaction Details</span>
                    </div>


                    
                    <div className="payment_detail_invoice_container" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"10px",minHeight:"200px",padding:"20px",margin:"0px 20px 20px 20px"}}>
                         
                          <table style={{margin:"10px auto",width:"100%",borderCollapse:"collapse"}}>
                                <thead>
                                  <tr style={{border:"1px solid black",borderRadius:"2px"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Plan Name</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.plan_name}</td>
                                   </tr>
                                   <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Plan Type</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.plan_type==="Adds-On"?"Monthly": rowsData?.plan_type}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Plan Buy Date</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.createdAt}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Plan Expiry Date</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.plan_expiry_date?rowsData?.plan_expiry_date:"null"}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Player Limit</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.plan_player_limit}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Payment Method</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.payment_method}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Currency</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.currency}</td>
                                   </tr><tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Payment Status</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.paymentStatus}</td>
                                   </tr>
                                   {rowsData?.payment_method=="RazorPay" && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Order ID</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.razorpay_order_id}</td>
                                   </tr>}
                                   <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Transaction ID</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.transaction_id? rowsData?.transaction_id :"null"}</td>
                                   </tr>
                                   {
                                    !rowsData?.transactionCoupon && !rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Total Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{Number(rowsData?.amount)?.toFixed(2)} {" "} {rowsData?.currency}</td>
                                   </tr>
                                   }
                                   {
                                    rowsData?.transactionCoupon && !rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Total Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{(Number(rowsData?.transactionCoupon?.discount_amount)+Number(rowsData?.transactionCoupon?.payable_amount)).toFixed(2)} {" "} {rowsData?.currency}</td>
                                   </tr>
                                   }
                                  {
                                    !rowsData?.transactionCoupon && rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Total Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{Number(rowsData?.amount)?.toFixed(2)} {" "} {rowsData?.currency}</td>
                                   </tr>
                                   }
                                   {
                                   rowsData?.transactionCoupon && rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Total Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{Number(rowsData?.amount)?.toFixed(2)} {" "} {rowsData?.currency}</td>
                                   </tr>
                                   }

                                   
                                   {rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Deducted Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.amount_deducted_to_upgrade} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Adjustable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.adjustable_amount} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Payable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{Number(rowsData?.amount)-Number(rowsData?.adjustable_amount)} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {
                                    <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Coupon Discount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.transactionCoupon?.discount_amount ? rowsData?.transactionCoupon?.discount_amount :"0"} {" "} {rowsData?.currency}</td>
                                   </tr>
                                   }
                                   
                                   {rowsData?.transactionCoupon &&  !rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Net Payable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.transactionCoupon?.payable_amount ? rowsData?.transactionCoupon?.payable_amount :"0"} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {!rowsData?.transactionCoupon && rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Net Payable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.upgrade_amount} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {!rowsData?.transactionCoupon && !rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Net Payable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{Number(rowsData?.amount)?.toFixed(2)} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                   {rowsData?.transactionCoupon &&  rowsData?.is_upgrade_plan && <tr style={{border:"1px solid black"}}>
                                    <th scope="col" style={{fontSize:"13px",color:"black",fontWeight:"600",padding:"3px 10px",float:"left"}}>Net Payable Amount</th>
                                    <td style={{fontSize:"10px",color:"black",border:"1px solid black",textAlign:"center",padding:"3px 10px"}}>{rowsData?.transactionCoupon?.payable_amount ? rowsData?.transactionCoupon?.payable_amount :"0"} {" "} {rowsData?.currency}</td>
                                   </tr>}
                                </thead>
                               
                              </table>
                              {/* <PdfGenerater/>  */}
                              {
                                  memoizedPdfGenerater
                              }

                    </div>
                </div>
            </Modal>}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}


