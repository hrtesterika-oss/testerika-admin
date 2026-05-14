import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { COMMON_API_KEY, USERS_API_KEY } from "../../core/_requests"
import { errrorMessage, successMessage } from '../../../../../modules/auth/components/ToastComp';
// import Select from 'react-select'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';


const CouponSales = () => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [user, setUser] = useState<any>()

    // const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const getAlltransaction = async () => {
        try {
            const { data } = await axios.get(`${COMMON_API_KEY}/coupon/getAllSalesUsingResellerId/${params?.id}?page=${currentPage}&items_per_page=20`)
            if (data?.data) {
                let totalPagesforPagination = Math.ceil((data?.payload?.pagination?.total) / 20)
                if (totalPagesforPagination) {
                  setTotalPage(totalPagesforPagination)
                }
                const userData = await axios.get(`${USERS_API_KEY}/${params?.id}`)
                // if(user?.data)
                console.log(userData?.data?.data)
                if (userData?.data) {
                    setUser(userData?.data?.data)
                }
                setTransactions(data?.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } else {
                setTotalPage(1)
                setCurrentPage(1)
                setTransactions([])
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        } catch (err) {
            setTotalPage(1)
            setCurrentPage(1)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }
    useEffect(() => {
        if (params?.id)
            getAlltransaction()
    }, [params,currentPage])
    return (
        <div className='container'>
            <div className='row'>
                {loading ? <p> Loading...</p> : <div className='rol-12'>
                    
                    {transactions?.length>0 ? <table className='table table-light table-striped p-2 my-2'>
                        <thead style={{ textAlign: "center", padding: "5px" }}>
                            <tr className='p-1'>
                                <th scope="col" className='fw-bolder text-primary'>Reseller Name</th>
                                <th scope="col" className='fw-bolder text-primary'>Coupon ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Amount</th>
                                <th scope="col" className='fw-bolder text-primary'>Payment Status</th>
                                <th scope="col" className='fw-bolder text-primary'>Action</th>

                            </tr>
                        </thead>


                        <tbody style={{ textAlign: "center", padding: "5px" }}>
                            {transactions?.length > 0 && transactions?.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td>{user?.firstname + " " + user?.lastname}</td>
                                    <td>{item?.coupon_id ? item?.coupon_id : "--"}</td>
                                    <td>{item?.amount ? item?.amount : "--"} INR</td>
                                    <td>
                                        <select className='form-control react-select p-2' value={item?.status} onChange={async (e: any) => {
                                            try {
                                                const { data } = await axios.put(`${COMMON_API_KEY}/coupon/update/reseller/payment/status/${item?.id}`, { status: e?.target?.value })
                                                if (data?.success) {
                                                    successMessage(data?.message)
                                                    setLoading(true)
                                                    getAlltransaction()
                                                } else {
                                                    errrorMessage("Something went wrong")
                                                }
                                            } catch (err) {
                                                errrorMessage("Something went wrong")
                                            }
                                        }}>
                                            <option value="0">Pending</option>
                                            <option value="1">Success</option>
                                        </select>
                                    </td>


                                    <td>
                                        <AiFillDelete style={{ color: "red", transform: "scale(1.3)", cursor: "pointer" }} onClick={async (e: any) => {
                                            try {
                                                const { data } = await axios.delete(`${COMMON_API_KEY}/coupon/delete/reseller/payment/status/${1}`)
                                                if (data?.success) {
                                                    successMessage(data?.message)
                                                    setLoading(true)
                                                    getAlltransaction()
                                                } else {
                                                    errrorMessage("Something went wrong")
                                                }
                                            } catch (err) {
                                                errrorMessage("Something went wrong")
                                            }
                                        }} />
                                    </td>




                                </tr>
                            })}
                        </tbody>
                    </table>: <p style={{ color: "black",margin:"20px auto",fontWeight:"bolder",textAlign:"center" }}>No Sales Found</p>}
                </div>}


                {transactions?.length>0 && <div className='my-4 mx-auto text-center'>
                <nav aria-label="Page navigation example my-2">
                  <ul className="pagination">
                    <li className="page-item">
                      <span className="page-link" style={{ cursor: "pointer" }} aria-label="Previous" onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage((pre: any) => pre - 1)
                        }
                      }}>
                        <span aria-hidden="true">&laquo;</span>
                      </span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">{currentPage}/{totalPage}</a></li>

                    <li className="page-item">
                      <span className="page-link" style={{ cursor: "pointer" }} aria-label="Next" onClick={() => {
                        if (currentPage < totalPage) {
                          setCurrentPage((pre: any) => pre + 1)
                        }
                      }}>
                        <span aria-hidden="true">&raquo;</span>
                      </span>
                    </li>
                  </ul>
                </nav>

              </div>}
            </div>
        </div>
    )
}

export default CouponSales
