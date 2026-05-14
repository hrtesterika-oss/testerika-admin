/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { getPlanStatusActiveInactiveNotBuyYet, getAllRegistereduserList, todayLoginUserView } from './request';

type Props = {
  className: string
}
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const TablesWidget5 = ({ className, setTotalAmount, todayLoginView, setTodayLoginView, todayLogin }: any) => {
  const [userData, setUserData] = useState<any[]>([])
  const [user, setUser] = useState<any[]>([])
  const [status, setStatus] = useState<string>("active")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [paymentDetail, setPaymentDetail] = useState<any[]>([])

  const getTodayLoaginUserPaymentDetail = async () => {
    let ids = todayLogin?.map((item: any) => item?.id)
    const { data } = await todayLoginUserView(ids)
    if (data?.success) {
      setPaymentDetail(data?.data)
    }
  }
  useEffect(() => {
    if (todayLoginView) {
      getTodayLoaginUserPaymentDetail()
    }
  }, [todayLoginView])

  const findPaymentStatus = async () => {
    const { data } = await getPlanStatusActiveInactiveNotBuyYet("active", `page=${currentPage}&items_per_page=20`)
    if (data?.data) {
      setTotalAmount(data?.total_amount)
      getAllRegisteredUserDetail(data?.data)
      setUserData(data?.data)
      let totalPagesforPagination = Math.ceil((data?.payload?.pagination?.total) / 20)
      if (totalPagesforPagination) {
        setTotalPage(totalPagesforPagination)
      }
    }
    else {
      setUserData([])
      setTotalPage(1)
    }
  }

  const getAllRegisteredUserDetail = async (userData: any) => {
    let userIds = userData?.map((item: any) => item?.userid)
    const { data } = await getAllRegistereduserList(userIds)
    if (data?.success) {
      setUser(data?.data)
    }
  }

  useEffect(() => {
    findPaymentStatus()
  }, [currentPage])
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>User Plan Status</span>
        </h3>
        <div className='card-toolbar col-4'>

          <select className="react-select form-control form-select" value={status} onChange={async (e: any) => {
            setTodayLoginView(false)
            setStatus(e?.target?.value)
            setCurrentPage(1)
            const { data } = await getPlanStatusActiveInactiveNotBuyYet(e?.target?.value, `page=1&items_per_page=20`)
            if (data?.data) {
              getAllRegisteredUserDetail(data?.data)
              setUserData(data?.data)
              let totalPagesforPagination = Math.ceil((data?.payload?.pagination?.total) / 20)
              if (totalPagesforPagination) {
                setTotalPage(totalPagesforPagination)
              }
            }
            else {
              setUserData([])
              setTotalPage(1)
            }
          }}>
            <option className="text-primary" selected>Select Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>
      <hr />
      {/* end::Header */}
      {/* begin::Body */}
      {!todayLoginView && <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              <table className='table table-bordered table-striped table-hover align-middle text-nowrap'>
                <thead className='table-primary'>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Payment Method</th>
                    <th>Transaction ID</th>
                    <th>Coupon ID</th>
                    <th>Total Amount</th>
                    <th>Payable Amount</th>
                    <th>Coupon Discount</th>
                    <th>Plan Starting Date</th>
                    <th>Plan Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.length > 0 ? userData.map((item: any, index: number) => {
                    const userItem = user?.find((us: any) => us?.id == item?.userid);
                    const formatDateTime = (dateStr: string) => {
                      const d = new Date(dateStr);
                      const h = d.getHours();
                      const ampm = h >= 12 ? 'PM' : 'AM';
                      const hr = (h % 12 || 12).toString().padStart(2, '0');
                      const min = d.getMinutes().toString().padStart(2, '0');
                      const sec = d.getSeconds().toString().padStart(2, '0');
                      return `${d.getDate()}-${d.toLocaleString('default', { month: 'long' })}-${d.getFullYear()} ${hr}:${min}:${sec} ${ampm}`;
                    };
                    return (
                      <tr key={index}>
                        <td>{userItem?.firstname} {userItem?.lastname}</td>
                        <td><Button className="btn btn-link text-decoration-none text-dark" style={{ textTransform: "lowercase" }}>{userItem?.email || "--"}</Button></td>
                        <td>{userItem?.phone}</td>
                        <td>{item?.payment_method}</td>
                        <td>{item?.transactionid}</td>
                        <td>{item?.tbl_transaction?.couponid || "--"}</td>
                        <td>{item?.tbl_transaction?.total_amount || "0"} INR</td>
                        <td>{item?.tbl_transaction?.payable_amount || "0"} INR</td>
                        <td>{item?.tbl_transaction?.coupon_discount || "0"} INR</td>
                        <td><span className='badge bg-success'>{formatDateTime(item?.buydate)}</span></td>
                        <td><span className='badge bg-danger'>{formatDateTime(item?.expirydate)}</span></td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={11} className="text-center text-danger py-4">No Records Available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* end::Table */}



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
          </div>
          {/* end::Tap pane */}


        </div>
      </div>}
      {todayLoginView && <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_5_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              <table className='table table-bordered table-striped table-hover align-middle text-nowrap'>
                <thead className='table-primary'>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>User Status</th>
                    <th>Payment Method</th>
                    <th>Transaction ID</th>
                    <th>Coupon ID</th>
                    <th>Total Amount</th>
                    <th>Payable Amount</th>
                    <th>Coupon Discount</th>
                    <th>Plan Starting Date</th>
                    <th>Plan Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {todayLogin?.length > 0 ? todayLogin.map((item: any, index: number) => {
                    const formatDateTime = (dateStr: string) => {
                      if (dateStr) {
                        const d = new Date(dateStr);
                        const h = d.getHours();
                        const ampm = h >= 12 ? 'PM' : 'AM';
                        const hr = (h % 12 || 12).toString().padStart(2, '0');
                        const min = d.getMinutes().toString().padStart(2, '0');
                        const sec = d.getSeconds().toString().padStart(2, '0');
                        return `${d.getDate()}-${d.toLocaleString('default', { month: 'long' })}-${d.getFullYear()} ${hr}:${min}:${sec} ${ampm}`;

                      }
                      else {
                        return '--'
                      }
                    };
                    return (
                      <tr key={index}>
                        <td>{item?.firstname} {item?.lastname}</td>
                        <td><Button className="btn btn-link text-decoration-none text-dark" style={{ textTransform: "lowercase" }}>{item?.email || "--"}</Button></td>
                        <td>{item?.phone}</td>
                        <td><span className={paymentDetail?.find((it: any) => item?.id == it?.userid) ? 'badge bg-success' : 'badge bg-danger'}>{paymentDetail?.find((it: any) => item?.id == it?.userid) ? "PREMIUM" : "NOT PREMIUM"}</span></td>

                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.payment_method || "--"}</td>
                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.transactionid || "--"}</td>
                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.tbl_transaction?.couponid || "--"}</td>
                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.tbl_transaction?.total_amount || "0"} INR</td>
                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.tbl_transaction?.payable_amount || "0"} INR</td>
                        <td>{paymentDetail?.find((it: any) => item?.id == it?.userid)?.tbl_transaction?.coupon_discount || "0"} INR</td>
                        <td><span className='badge bg-success'>{formatDateTime(paymentDetail?.find((it: any) => item?.id == it?.userid)?.buydate)}</span></td>
                        <td><span className='badge bg-danger'>{formatDateTime(paymentDetail?.find((it: any) => item?.id == it?.userid)?.expirydate)}</span></td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={11} className="text-center text-danger py-4">No Records Available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* end::Table */}



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
          </div>
          {/* end::Tap pane */}


        </div>
      </div>}
      {/* end::Body */}
    </div>
  )
}

export { TablesWidget5 }
