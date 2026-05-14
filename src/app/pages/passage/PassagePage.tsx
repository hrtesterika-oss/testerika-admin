import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
// import AddEditQuestion from './questionDetails/AddEditPassages'
import { CommonDataProvider } from './users-list/commonData/CommonDataProvider'
import ReviewExcelSheetQuestions from './questionDetails/ReviewExcelSheetQuestions'
import AddEditPassages from './questionDetails/AddEditPassages'
import { QuestionListWrapper } from './questions-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Passage Bank',
    path: '/passages',
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

const PassagePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Passage list</PageTitle>
              <UsersListWrapper />
              {/* <h2>Hello</h2> */}
            </>
          }
        />
        <Route
          path='view/:passageBankId'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Passage list</PageTitle>
              <QuestionListWrapper />
              {/* <h2>Hello</h2> */}
            </>
          }
        />
         <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Add Passage</PageTitle>
              <CommonDataProvider><AddEditPassages /></CommonDataProvider>
            </>
          }
        />

        <Route
          path='edit-details/:passageBankId'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Update Passage</PageTitle>
              <CommonDataProvider><AddEditPassages /></CommonDataProvider> 
            </>
          }
        />
      </Route>
      {/* <Route index element={<Navigate to='/apps/question-bank/questions' />} /> */}
    </Routes>
  )
}

export default PassagePage
