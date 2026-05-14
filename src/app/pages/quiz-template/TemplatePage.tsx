import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {TemplateListWrapper} from './booksList/UsersList'
import {CreateTemplate} from './createTemplate/CreateTemplate'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Templates',
    path: '/templates',
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

const TemplatePage = () => {
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Templates list</PageTitle>
                <TemplateListWrapper />
              </>
            }
          />
          <Route
            path='create'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Template</PageTitle>
                <CreateTemplate />
              </>
            }
          />
          <Route
            path='edit/:id'
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit Template</PageTitle>
                <CreateTemplate />
              </>
            }
          />

          <Route index element={<Navigate to='/quiz-template/list' />} />
        </Route>
      </Routes>
    </>
  )
}

export default TemplatePage
