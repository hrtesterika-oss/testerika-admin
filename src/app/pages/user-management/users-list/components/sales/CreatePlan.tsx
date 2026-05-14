import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { COMMON_API_KEY, PAYMENT_API_KEY, USERS_API_KEY } from "../../core/_requests"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { successMessage } from '../../../../../modules/auth/components/ToastComp';
// import Select from 'react-select'

const CreatePlan = () => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [packages, setPackages] = useState<any[]>([])
    const [passes, setPasses] = useState<any[]>([])
    // const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const params = useParams()
    const [salesData, setSalesData] = useState<any>({
        type: "Package",
        packageid: undefined,
        passid: undefined,
        bundleid: undefined,
        userid: params?.id,
        orderid: "",
        transactionid: "",
        currency: "INR",
        amount: undefined,
        payment_method: "RazorPay",
        buydate: new Date(),
        expirydate: ""
    })
    const getAlltransaction = async () => {
        try {
            const { data } = await axios.get(`${PAYMENT_API_KEY}/admin/getAllTransactionDetails/${params?.id}`)
            const data2 = await axios.get(`${COMMON_API_KEY}/passes/admin/get/passes`)
            if (data2?.data?.success) {
                setPasses(data2?.data?.data)
                setTimeout(()=>{
                    setLoading(false)
                },1000)
            }
            if (data?.success) {
                setTransactions(data?.data)
                setPackages(data?.packages)
                setTimeout(()=>{
                    setLoading(false)
                },1000)
            } else {
                setTransactions([])
                setPackages(data?.packages)
                setTimeout(()=>{
                    setLoading(false)
                },1000)
            }
        } catch (err) {
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
    }

    // const getAllRegisteredUser = async () => {
    //     try {
    //         const { data } = await axios.get(`${USERS_API_KEY}/getAllRegisteredUsers/users`)
    //         if (data?.success) {
    //             setUsers(data?.data)
    //             setTimeout(()=>{
    //                 setLoading(false)
    //             },1000)
    //         }
    //     } catch (err) {
    //         setTimeout(()=>{
    //             setLoading(false)
    //         },1000)
    //     }
    // }
    useEffect(() => {
        if (params?.id)
            getAlltransaction()

        // getAllRegisteredUser()
    }, [params])
    return (
        <div className='container'>
            <div className='row'>
                {loading? <p> Loading...</p>:<div className='rol-12'>
                    <div className='d-flex flex-end justify-content-end align-items-center my-3'>
                        <button className='btn btn-primary' onClick={() => {
                            setOpen(true)
                        }}>Create Transaction</button>
                    </div>
                    <div className='my-3'>
                        <h5>Transactions List</h5>
                    </div>
                    {transactions?.length>0 ? <table className='table table-dark table-striped p-2 my-2'>
                        <thead style={{ textAlign: "center", padding: "5px" }}>
                            <tr className='p-1'>
                                <th scope="col" className='fw-bolder text-primary'>Package ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Pass ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Transaction ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Payment Status</th>
                                <th scope="col" className='fw-bolder text-primary'>Buy Date</th>
                                <th scope="col" className='fw-bolder text-primary'>Expiry Date</th>
                                <th scope="col" className='fw-bolder text-primary'>Amount</th>
                            </tr>
                        </thead>


                        <tbody style={{ textAlign: "center", padding: "5px" }}>
                            {transactions?.length > 0 && transactions?.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td>{item?.packageid ? item?.packageid : "--"}</td>
                                    <td>{item?.passid ? item?.passid : "--"}</td>
                                    <td>{item?.transactionid ? item?.transactionid : "--"}</td>
                                    <td>{item?.payment_status}</td>
                                    <td>{item?.sales ? new Date(item?.sales?.buydate)?.toLocaleDateString() : "--"}</td>
                                    <td>{item?.sales ? new Date(item?.sales?.expirydate)?.toLocaleDateString() : "--"}</td>
                                    <td>INR {item?.total_amount}</td>

                                </tr>
                            })}
                        </tbody>
                    </table>:<p style={{ color: "black",margin:"20px auto",fontWeight:"bolder",textAlign:"center" }}>No Transactions Found</p>}
                </div>}
            </div>

            {
                <Modal open={open} onClose={() => {
                    setOpen(false)
                }} center>
                    <h2 className="my-5 text-center">Create Transaction</h2>
                    <form className="my-5">
                        <div className="row">

                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Select Type</label>

                                <select className='form-control react-select p-2' value={salesData?.type} onChange={(e: any) => {
                                    setSalesData({ ...salesData, type: e?.target?.value })
                                }}>
                                    <option selected value="">Select</option>
                                    <option value="Package">Package</option>
                                    <option value="Pass">Pass</option>
                                </select>
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                            {salesData?.type=="Package" && <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Select Package</label>

                                <select className='form-control react-select p-2' value={salesData?.packageid} onChange={(e: any) => {
                                    setSalesData({ ...salesData, packageid: e?.target?.value })
                                }}>
                                    <option selected value="">Select</option>
                                    {
                                        packages?.map((item: any, index: number) => {
                                            return <option key={index} value={item?.id}>{item?.id} - {item?.name}</option>
                                        })
                                    }
                                </select>
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>}

                           {salesData?.type=="Pass" && <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Select Pass</label>

                                <select className='form-control react-select p-2' value={salesData?.passid} onChange={(e: any) => {
                                    setSalesData({ ...salesData, passid: e?.target?.value })
                                }}>
                                    <option selected value="">Select</option>
                                    {
                                        passes?.map((item: any, index: number) => {
                                            return <option key={index} value={item?.id}>{item?.id} - {item?.pass_name}</option>
                                        })
                                    }
                                </select>
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>}

                            {/* <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Select User</label>

                                <Select options={options}  onChange={(e:any)=>{
                                      setEditPlan({...editPlan,share_result:e?.value})
                                  }} />

                                <select className='form-control react-select p-2' value={salesData?.userid} onChange={(e: any) => {
                                    setSalesData({ ...salesData, userid: e?.target?.value })
                                }}>
                                    <option selected value="">Select</option>
                                    {
                                        users?.map((item: any, index: number) => {
                                            return <option key={index} value={item?.id}>{item?.firstname + " " + item?.lastname} - {item?.phone}</option>
                                        })
                                    }
                                </select>
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> */}

                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Enter Order ID</label>

                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={salesData?.orderid} onChange={(e: any) => {
                                    setSalesData({ ...salesData, orderid: e?.target?.value })
                                }} placeholder="Enter Order ID..." name="first-name" />
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Enter Transaction ID</label>

                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={salesData?.transactionid} onChange={(e: any) => {
                                    setSalesData({ ...salesData, transactionid: e?.target?.value })
                                }} placeholder="Enter Transaction ID..." name="first-name" />
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Enter Amount</label>

                                <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={salesData?.amount} onChange={(e: any) => {
                                    setSalesData({ ...salesData, amount: e?.target?.value })
                                }} placeholder="Enter Amount..." name="first-name" />
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Buy Date</label>

                                <input type="date" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={salesData?.buydate} onChange={(e: any) => {
                                    setSalesData({ ...salesData, buydate: e?.target?.value })
                                }} placeholder="Enter Buy Date..." name="first-name" />
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                            <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                <label className="required fs-6 fw-semibold mb-1">Expiry Date</label>

                                <input type="date" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={salesData?.expirydate} onChange={(e: any) => {
                                    setSalesData({ ...salesData, expirydate: e?.target?.value })
                                }} placeholder="Enter Expiry Date..." name="first-name" />
                                <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>





                            <div className="col-12 d-flex flex-column">
                                <button className="btn btn-success w-25 mt-5 text-center mx-auto" onClick={async (e: any) => {
                                    e?.preventDefault()
                                    let payload={
                                        ...salesData,
                                        passid:salesData?.type=="Pass"?salesData?.passid:null,
                                        packageid:salesData?.type=="Package"?salesData?.packageid:null,
                                        userid: params?.id,
                                    }

                                    const {data}=await axios.post(`${PAYMENT_API_KEY}/admin/create/payment`,payload)
                                    if(data?.success){
                                        successMessage("Payment added successfully")
                                        setOpen(false)
                                    }
                                }}>Create</button>
                            </div>
                        </div>

                    </form>
                </Modal>
            }
        </div>
    )
}

export default CreatePlan
