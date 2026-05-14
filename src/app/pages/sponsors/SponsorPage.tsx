import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuestionListWrapper} from './question-list/QuestionList'
import {QuestionViewWrapper} from './question-view/QuestionView'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Sponsors',
    path: '/sponsor/sponsors',
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

const SponsorPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='sponsors'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Sponsors list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='programs'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Programs list</PageTitle>
              <QuestionListWrapper />
            </>
          }
        />
        <Route
          path='subscriptions'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Subscriptions list</PageTitle>
              <QuestionViewWrapper />
            </>
          }
        />
        <Route index element={<Navigate to='/sponsor/sponsors' />} />
      </Route>
    </Routes>
  )
}

export default SponsorPage
