import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { UsersListWrapper } from './users-list/UsersList'
import CreatePlan from './users-list/components/sales/CreatePlan'
import PathMiddleWare from '../middleware/PathMiddleWare'
import AttemptedExam from './users-list/components/attempted-exam/AttemptedExam'
import CouponSales from './users-list/components/sales/CouponSales'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes>


        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
         <Route
          path='transaction/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>User Sales</PageTitle>
              <CreatePlan />
            </>
          }
        />
        <Route
          path='sales/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Reseller Sales</PageTitle>
              <CouponSales />
            </>
          }
        />
         <Route
          path='attempted-exam/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Attempted Exam</PageTitle>
              <AttemptedExam />
            </>
          }
        />
    </Routes>
  )
}

export default UsersPage
