import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Projects} from './components/Projects'
import {Campaigns} from './components/Campaigns'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader'
import {useEffect, useState} from 'react'
import {useAuth} from '../auth'
import {isNotEmpty, QUERIES} from '../../../_metronic/helpers'
import {useQuery} from 'react-query'
import {getUserById} from '../../pages/staff-management/users-list/core/_requests'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
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

const ProfilePage = () => {
  const {currentUser, logout} = useAuth()
  const enabledQuery: boolean = isNotEmpty(currentUser?.id)
  const [staff, setStaff] = useState<any>(currentUser)

  const {isLoading, data: staffs, error} = useQuery(
    `${QUERIES.USERS_LIST}-permissions-${currentUser?.id}`,
    () => {
      return getUserById(currentUser?.id)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        console.error(err)
      },
    }
  )
  // useEffect(() => {
  //   if (staffs?.id) setStaff(staffs)
  // }, [staffs])

  return (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader staff={staffs} />
            <Outlet />
          </>
        }
      >
        {staff && (
          <Route
            path='overview'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Update Profile</PageTitle>
                <Overview />
              </>
            }
          />
        )}
        {/* <Route
          path='projects'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
              <Projects />
            </>
          }
        />
        <Route
          path='campaigns'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
              <Campaigns />
            </>
          }
        />
        <Route
          path='documents'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
              <Documents />
            </>
          }
        />
        <Route
          path='connections'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
              <Connections />
            </>
          }
        /> */}
        <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
      </Route>
    </Routes>
  )
}

export default ProfilePage
