import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import PathMiddleWare from '../middleware/PathMiddleWare'
import CreateUpdatePackages from './users-list/table/CreateUpdatePackages'
import { CommonDataProvider } from '../question-bank/users-list/commonData/CommonDataProvider'
import { BundlePackageWrapper } from './bundlePackage/UsersList'
import CreateUpdateBundle from './bundlePackage/table/CreateUpdateBundle'
import { SubPackageCategoryWrapper } from './subPackages/UsersList'
import CreateUpdateSubPackages from './subPackages/table/CreateUpdateSubPackages'
import { AssignExamWrapper } from './assignExams/UsersList'
import { CommonDataProviderAssignExam } from './assignExams/components/CommonDataProviderAssignExam'
import Leaderboard from './users-list/table/Leaderboard'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Package',
    path: '/',
    isSeparator: false,
    isActive: false,
  }
]

const PackagesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
      <Route
            path='/packages'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <PathMiddleWare>
                  <CommonDataProvider><UsersListWrapper /></CommonDataProvider></PathMiddleWare>
              </>
            }
          />
           <Route
            path='packages/edit/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><CreateUpdatePackages /></CommonDataProvider>
              </>
            }
          />
          <Route
            path='sub-packages'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Sub-Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><SubPackageCategoryWrapper /></CommonDataProvider>
              </>
            }
          />
          <Route
            path='sub-packages/get/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Sub-Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <SubPackageCategoryWrapper />
              </>
            }
          />
         
           <Route
            path='create'
            element={
              <>
                {/* <PageTitle>Create Coupon</PageTitle> */}
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Packages</PageTitle>
                <CommonDataProvider><CreateUpdatePackages /></CommonDataProvider>
              </>
            }
          />
          <Route
            path='leaderboard/:packageid'
            element={
              <>
                {/* <PageTitle>Create Coupon</PageTitle> */}
                <PageTitle breadcrumbs={usersBreadcrumbs}>Leaderboard</PageTitle>
                <CommonDataProvider><Leaderboard /></CommonDataProvider>
              </>
            }
          />
           <Route
            path='sub-packages/add'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Add Sub-Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><CreateUpdateSubPackages /></CommonDataProvider>
              </>
            }
          />
          <Route
            path='sub-packages/edit/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Sub-Packages</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><CreateUpdateSubPackages /></CommonDataProvider>
              </>
            }
          />

           <Route
            path='sub-packages/exam/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Asssign Exam</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProviderAssignExam><AssignExamWrapper /></CommonDataProviderAssignExam>
              </>
            }
          />


          <Route
            path='bundle'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Package Bundle</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <BundlePackageWrapper />
              </>
            }
          />
          <Route
            path='bundle/create'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Create Bundle</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><CreateUpdateBundle /></CommonDataProvider> 
              </>
            }
          />

          <Route
            path='bundle/edit/:id'
            element={
              <>
               <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Bundle</PageTitle>
                {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
                <CommonDataProvider><CreateUpdateBundle /></CommonDataProvider> 
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

export default PackagesPage
