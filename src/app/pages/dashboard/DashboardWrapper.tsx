/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import axios from "axios"
import {
  TablesWidget5
} from '../../../_metronic/partials/widgets'
import { USERS_API_KEY } from '../user-management/users-list/core/_requests'

const DashboardPage: FC<any> = ({ userDetails, todaysUser, todayLogin, setTotalAmount, total_amount, setTodayLoginView, todayLoginView }) => (

  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>

      <div className='col-12 text-center d-flex align-items-center'>
        {/* <MixedWidget2
          className='card-xl-stretch mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
          strokeColor='#cb1e46'
        /> */}
        <div className='card col-3' style={{ width: "160px", height: "auto", border: "1px solid black", padding: "20px" }}>
          <h3>Total Users</h3>
          <h3 className='text-primary'>{userDetails?.user}</h3>
        </div>

        <div className='card col-3 ms-2' style={{ width: "180px", height: "auto", border: "1px solid black", padding: "20px" }}>
          <h3>Total Resellers</h3>
          <h3 className='text-primary'>{userDetails?.reseller}</h3>
        </div>

        <div className='card col-4 ms-2' style={{ width: "300px", height: "auto", border: "1px solid black", padding: "20px" }}>
          <h3>Today's Registered Users</h3>
          <h3 className='text-primary'>{todaysUser?.length}</h3>
        </div>

        <div className='card col-4 ms-2' style={{ cursor: "pointer", width: "250px", height: "auto", border: "1px solid black", padding: "20px" }} onClick={() => {
          if (!todayLoginView) {
            setTodayLoginView(true)
          }
        }}>
          <h3>Today's Login Users</h3>
          <h3 className='text-primary'>{todayLogin?.length}</h3>
        </div>
        <div className='card col-4 ms-2' style={{ width: "250px", height: "auto", border: "1px solid black", padding: "20px" }}>
          <h3>Total Earning</h3>
          <h3 className='text-primary'>{total_amount?.toFixed(2)} INR</h3>
        </div>


      </div>
      <div className='col-12 text-center'>
        {/* <MixedWidget2
          className='card-xl-stretch mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
          strokeColor='#cb1e46'
        /> */}
        <h2 className="text-primary" style={{ textAlign: "center" }}> User Plan Status</h2>

        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' setTotalAmount={setTotalAmount} todayLoginView={todayLoginView} setTodayLoginView={setTodayLoginView} todayLogin={todayLogin} />

      </div>
      <div className='col-xxl-4'>
        {/* <ListsWidget5 className='card-xxl-stretch' /> */}
      </div>
      <div className='col-12'>
        {/* <h2 className="text-primary" style={{ textAlign: "center" }}> Client Transaction Status</h2> */}
        {/* <MonthlyStatusForEveryYearPodiumTransaction /> */}
        {/* <MixedWidget11
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='175px'
        /> */}
      </div>
      <div className="col-12">
        {/* <h2 className="text-primary" style={{ textAlign: "center" }}> Net Payable Amount Status</h2> */}

        {/* <MonthlyProfitStatusForEveryYearPodium /> */}
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        {/* <ListsWidget3 className='card-xxl-stretch mb-xl-3' /> */}
      </div>
      <div className='col-xl-8'>
        {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> */}
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        {/* <ListsWidget2 className='card-xl-stretch mb-xl-8' /> */}
      </div>
      <div className='col-xl-4'>
        {/* <ListsWidget6 className='card-xl-stretch mb-xl-8' /> */}
      </div>
      <div className='col-xl-4'>
        {/* <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} /> */}
        {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
      </div>
    </div>
    {/* end::Row */}

    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        {/* <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        /> */}
      </div>
      <div className='col-xxl-8'>
        {/* <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' /> */}
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const [userDetails, setUserDetails] = useState<any>({})
  const [todaysUser, setTodayUser] = useState<any[]>([])
  const [todayLogin, setTodayLogin] = useState<any[]>([])
  const [total_amount, setTotalAmount] = useState(0)
  const [todayLoginView, setTodayLoginView] = useState(false)

  const findAllUserAndReseller = async () => {
    try {
      const { data } = await axios.get(`${USERS_API_KEY}/getUserAndReseller`)
      setUserDetails(data)

      const data2 = await axios.get(`${USERS_API_KEY}/today/registered/user`)

      if (data2?.data?.success) {
        setTodayUser(data2?.data?.data)
      }
      const data3 = await axios.get(`${USERS_API_KEY}/login/today/user`)
      if (data3?.data?.success) {
        setTodayLogin(data3?.data?.data)
      }

    } catch (err) {

    }
  }
  useEffect(() => {
    findAllUserAndReseller()
  }, [])
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage userDetails={userDetails} todaysUser={todaysUser} todayLogin={todayLogin} setTotalAmount={setTotalAmount} total_amount={total_amount} setTodayLoginView={setTodayLoginView} todayLoginView={todayLoginView} />
    </>
  )
}

export { DashboardWrapper }
