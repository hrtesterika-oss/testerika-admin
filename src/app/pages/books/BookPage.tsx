import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './booksList/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Books',
    path: '/books',
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
      <PageTitle breadcrumbs={usersBreadcrumbs}>Books list</PageTitle>
      <UsersListWrapper />
    </>
  )
}

export default BookPage
