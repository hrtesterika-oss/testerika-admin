import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EXAM_API_KEY } from "../../core/_requests"
import 'react-responsive-modal/styles.css';
import { successMessage } from '../../../../../modules/auth/components/ToastComp';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2'

const AttemptedExam = () => {
    const [data, setData] = useState<any[]>([])
    const [exam, setExam] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const params = useParams()
    const getAllAttemptedExam = async () => {
        try {
            const { data } = await axios.get(`${EXAM_API_KEY}/admin/attempted/exam/${params?.id}?page=${currentPage}&items_per_page=25`)
            if (data?.data) {
                setTotalPage(data?.payload?.pagination?.total)
                setData(data?.data)
                setExam(data?.exams)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
            // const data2 = await axios.get(`${COMMON_API_KEY}/passes/admin/get/passes`)
            // if (data2?.data?.success) {
            // setTimeout(()=>{
            //     setLoading(false)
            // },1000)
            // }
            // if (data?.success) {
            //     setTransactions(data?.data)
            //     setTimeout(()=>{
            //         setLoading(false)
            //     },1000)
            // } else {
            //     setTransactions([])
            //     setTimeout(()=>{
            //         setLoading(false)
            //     },1000)
            // }
        } catch (err) {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }
    useEffect(() => {
        if (params?.id)
            getAllAttemptedExam()
    }, [params, currentPage])
    return (
        <div className='container'>
            <div className='row'>
                {loading ? <p> Loading...</p> : <div className='rol-12'>
                    <div className='my-3'>
                        <h5>Attempted Exam</h5>
                    </div>
                    <table className='table table-dark table-striped p-2'>
                        <thead style={{ textAlign: "center", padding: "5px" }}>
                            <tr className='p-1'>
                                <th scope="col" className='fw-bolder text-primary'>Package ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Subpackage ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Exam ID</th>
                                <th scope="col" className='fw-bolder text-primary'>Exam Name</th>
                                <th scope="col" className='fw-bolder text-primary'>Exam Status</th>
                                <th scope="col" className='fw-bolder text-primary'>Action</th>
                            </tr>
                        </thead>


                        <tbody style={{ textAlign: "center", padding: "5px" }}>
                            {data?.length > 0 ? data?.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td>{item?.packageid}</td>
                                    <td>{item?.subpackageid}</td>
                                    <td>{item?.examid}</td>
                                    <td>{exam?.find((exItem: any) => exItem?.id == item?.examid)?.name}</td>
                                    <td style={{fontWeight:"bolder"}}>{item?.exam_status?.toUpperCase()}</td>
                                    <td><AiFillDelete style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => {
                                            Swal.fire({
                                                title: 'Are you Sure??',
                                                icon: 'warning',
                                                confirmButtonText: 'Yes',
                                            }).then((async (result) => {
                                                if (result.isConfirmed) {
                                                    const { data } = await axios.delete(`${EXAM_API_KEY}/delete/attempted/exam/${item?.id}`)
                                                    console.log(data)
                                                    if (data?.success) {
                                                        setLoading(true)
                                                        successMessage("Deleted Successfully")
                                                        getAllAttemptedExam()
                                                    }
                                                } else if (result.isDenied) {
                                                } else {
                                                }
                                            }))                                       
                                    }} /></td>


                                </tr>
                            }) : <p>No attempted Found</p>}
                        </tbody>




                    </table>
                </div>}

                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <span className="page-link" style={{ cursor: "pointer" }} aria-label="Previous" onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage((pre: any) => pre - 1)
                                        // getAllDoubtDetails(`page=${currentPage-1}&items_per_page=10`)
                                    }
                                }}>
                                    <span aria-hidden="true">&laquo;</span>
                                </span>
                            </li>
                            <li className="page-item"><span className="page-link" >{currentPage}/{Math.ceil((totalPage) / 25)}</span></li>

                            <li className="page-item">
                                <span className="page-link" style={{ cursor: "pointer" }} aria-label="Next" onClick={() => {
                                    if (currentPage < Math.ceil((totalPage) / 25)) {
                                        setCurrentPage((pre: any) => pre + 1)
                                        // getAllDoubtDetails(`page=${currentPage+1}&items_per_page=10`)
                                    }
                                }}>
                                    <span aria-hidden="true">&raquo;</span>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default AttemptedExam
