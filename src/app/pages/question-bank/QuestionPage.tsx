import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import AddEditQuestion from './questionDetails/AddEditQuestion'
import { CommonDataProvider } from './users-list/commonData/CommonDataProvider'
import ViewAllQuestions from './questionDetails/ViewAllQuestions'
import AddMoreLanguage from './questionDetails/AddMoreLanguage'
import ReviewExcelSheetQuestions from './questionDetails/ReviewExcelSheetQuestions'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Question Bank',
    path: '/questions',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: true,
  },
]

const QuestionPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Questions list</PageTitle>
              <UsersListWrapper />
              {/* <h2>Hello</h2> */}
            </>
          }
        />
         <Route
          path='edit-details'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Add Questions</PageTitle>
              <CommonDataProvider><AddEditQuestion /></CommonDataProvider>
            </>
          }
        />

        <Route
          path='edit-details/:questionBankId'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Update Questions</PageTitle>
              <CommonDataProvider><AddEditQuestion /></CommonDataProvider> 
            </>
          }
        />
         <Route
          path='viewAllQuestions/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>View Questions</PageTitle>
              <CommonDataProvider><ViewAllQuestions /></CommonDataProvider> 
            </>
          }
        />
        <Route
          path='addMoreLanguage/:questionBankId'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Add More Language</PageTitle>
              <CommonDataProvider><AddMoreLanguage /></CommonDataProvider> 
            </>
          }
        />
         <Route
          path='reviewAllQuestions'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Review Questions</PageTitle>
              <CommonDataProvider><ReviewExcelSheetQuestions /></CommonDataProvider>
            </>
          }
        />
      </Route>
      {/* <Route index element={<Navigate to='/apps/question-bank/questions' />} /> */}
    </Routes>
  )
}

export default QuestionPage
