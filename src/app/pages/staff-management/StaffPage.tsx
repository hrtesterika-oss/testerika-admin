import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {PermissionsListWrapper} from './users-list/PermissionList'
import PathMiddleWare from '../middleware/PathMiddleWare'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Staff management',
    path: '/staff',
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

const StaffPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Staff list</PageTitle>
              <PathMiddleWare><PermissionsListWrapper /></PathMiddleWare>
            </>
          }
        />
      </Route>
      
      <Route index element={<Navigate to='/apps/staff-management/staff' />} />
    </Routes>
  )
}

export default StaffPage
