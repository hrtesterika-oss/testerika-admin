import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { UsersListWrapper } from './users-list/UsersList'
import PathMiddleWare from '../middleware/PathMiddleWare'
import CreateUpdatePackages from './users-list/table/CreateUpdateExam'
import { CommonDataProvider } from '../question-bank/users-list/commonData/CommonDataProvider'
import { ExamTypes } from './exam-types/UsersList'
import CreateUpdateExamType from './exam-types/table/CreateUpdateExamType'
import CreateUpdateExam from './users-list/table/CreateUpdateExam'
import { ExamSectionsWrapper } from './examSections/ExamSections'
import CreateUpdateExamSections from './examSections/table/CreateUpdateExamSections'
import { AddQuestions } from './add-questions/UsersList'
import { ViewQuestions } from './view-questions/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Exams',
    path: '/',
    isSeparator: false,
    isActive: false,
  }
]

const ExamsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='exams'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Exams</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <PathMiddleWare><UsersListWrapper /></PathMiddleWare>
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Create Exam</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><CreateUpdateExam /></CommonDataProvider>
            </>
          }
        />
        <Route
          path='edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Exam</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><CreateUpdateExam /></CommonDataProvider>
            </>
          }
        />
        <Route
          path='exam-sections/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Exam Sections</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <ExamSectionsWrapper />
            </>
          }
        />
        <Route
          path='exam-sections/create/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Create Exam Sections</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><CreateUpdateExamSections /></CommonDataProvider>
            </>
          }
        />

        <Route
          path='exam-sections/edit/:id/:section_id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Exam Sections</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><CreateUpdateExamSections /></CommonDataProvider>
            </>
          }
        />


        <Route
          path='exam-sections/add-questions/:id/:section_id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Add Questions</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><AddQuestions /></CommonDataProvider>
            </>
          }
        />


        <Route
          path='exam-sections/view-questions/:id/:section_id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>View Questions</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CommonDataProvider><ViewQuestions /></CommonDataProvider>
            </>
          }
        />





        <Route
          path='exam-types'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Exam Types</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <PathMiddleWare><ExamTypes /></PathMiddleWare>
            </>
          }
        />


        <Route
          path='exam-types/create'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Create Exam Type</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CreateUpdateExamType />
            </>
          }
        />


        <Route
          path='exam-types/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Exam Type</PageTitle>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Coupons List</PageTitle> */}
              <CreateUpdateExamType />
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

export default ExamsPage
