import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuestionListWrapper} from './payment-support/QuestionList'
import {QuestionViewWrapper} from './withdrawal/QuestionView'
import {UsersListWrapper} from './wallet/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Wallet',
    path: '/sales/wallet',
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
          path='wallet'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Wallet list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='withdrawal'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Withdrawal list</PageTitle>
              <QuestionViewWrapper />
            </>
          }
        />
        <Route
          path='payment-support'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Payment Support list</PageTitle>
              <QuestionListWrapper />
            </>
          }
        />
        <Route index element={<Navigate to='/sales/wallet' />} />
      </Route>
    </Routes>
  )
}

export default SponsorPage
