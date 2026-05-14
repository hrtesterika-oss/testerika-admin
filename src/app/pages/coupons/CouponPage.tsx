import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import PathMiddleWare from '../middleware/PathMiddleWare'
import CreateUpdateCouponUserPanel from './users-list/table/CreateUpdateCoupon'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Coupons',
    path: '/',
    isSeparator: false,
    isActive: false,
  }
]

const CouponPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
      <Route
            path='/'
            element={
              <>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <PathMiddleWare><UsersListWrapper /></PathMiddleWare>
              </>
            }
          />
           <Route
            path='create'
            element={
              <>
                {/* <PageTitle>Create Coupon</PageTitle> */}
                <CreateUpdateCouponUserPanel />
              </>
            }
          />
          <Route
            path='edit/:id'
            element={
              <>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Coupon</PageTitle> */}
                <CreateUpdateCouponUserPanel />
              </>
            }
          />
          <Route path="*" element={<Navigate to='/' />} />

        {/* <Route
          path='coupon'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons list</PageTitle>
              <UsersListWrapper />
            </>
          }
        /> */}
      </Route>
    </Routes>
  )
}

export default CouponPage
