import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import { CommonDataProvider } from './commonData/CommonDataProvider'
import PublishResult from './publishResult/PublishResult'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quiz Result',
    path: '/quiz-result',
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

const Quiz = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='quiz-result'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Quizzes Result</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='publish-result/:id/:key'
          element={
            <>
              {/* <PageTitle breadcrumbs={usersBreadcrumbs}>Publish Result</PageTitle> */}
              <CommonDataProvider><PublishResult /></CommonDataProvider> 
            </>
          }
        />
        {/* <Route
          path='create-quiz'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>create New Quiz</PageTitle>
              <CommonDataProvider><CreateUpdateQuiz /></CommonDataProvider>
            </>
          }
        />
         <Route
          path='update-quiz/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Update Quiz</PageTitle>
              <CommonDataProvider><CreateUpdateQuiz /></CommonDataProvider>
            </>
          }
        />
        <Route
          path='view-question/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Questions list</PageTitle>
              <CommonDataProvider><QuestionViewWrapper /></CommonDataProvider>
            </>
          }
        /> */}
        <Route index element={<Navigate to='/quiz/quiz-result' />} />
      </Route>
    </Routes>
  )
}

export default Quiz
