import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import PathMiddleWare from '../middleware/PathMiddleWare'
import CreateUpdatePasses from './users-list/table/CreateUpdatePasses'
import { PassCategoryWrapper } from './pass-category/UsersList'
import CreateUpdatePassesCategory from './pass-category/table/CreateUpdatePasses'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Passes',
    path: '/',
    isSeparator: false,
    isActive: false,
  }
]

const PassesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
      <Route
            path='/passes'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Passes</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <PathMiddleWare><UsersListWrapper /></PathMiddleWare>
              </>
            }
          />
          <Route
            path='category'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Passes Category</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <PassCategoryWrapper />
              </>
            }
          />
          <Route
            path='category/add'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Add Category</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CreateUpdatePassesCategory />
              </>
            }
          />
           <Route
            path='category/edit/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Category</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CreateUpdatePassesCategory />
              </>
            }
          />
           <Route
            path='create'
            element={
              <>
                {/* <PageTitle>Create Coupon</PageTitle> */}
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Passes</PageTitle>
                <CreateUpdatePasses />
              </>
            }
          />
          <Route
            path='edit/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Passes</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Coupon</PageTitle> */}
                <CreateUpdatePasses />
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

export default PassesPage
