import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import Media from './media/Media'
import Notifications from './notifications/Notifications'
import { UsersListWrapper } from './users-list/UsersList'
import AdddNotification from './notifications/AdddNotification'

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
      <Route element={<Outlet />}>
        <Route
          path='media'
          element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Media</PageTitle>
                <Media />
              </>
          }
        />
         
         <Route
          path='notifications'
          element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Notifications</PageTitle>
                <UsersListWrapper/>
              </>
          }
        />
        <Route
          path='create-notifications'
          element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Add Announcement</PageTitle>
                <AdddNotification/>
              </>
          }
        />
        <Route
          path='edit-notifications/:id'
          element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Announcement</PageTitle>
                <AdddNotification/>
              </>
          }
        />
      </Route>
       <Route index element={<Navigate to='/dashboard' />} />
     </Routes>
  )
}

export default UsersPage
