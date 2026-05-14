import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './booksList/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Feedback',
    path: '/feedback',
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

const BookPage = () => {
  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>Feedbacks list</PageTitle>
      <UsersListWrapper />
    </>
  )
}

export default BookPage
