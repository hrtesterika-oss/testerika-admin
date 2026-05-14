import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {UsersListHeader} from '../quizList/components/header/UsersListHeader'
import {UsersTable} from '../quizList/table/UsersTable'
import {KTCard} from '../../../../_metronic/helpers'
import {Edit} from './Edit'

const UsersList = () => {
  return (
    <>
      <KTCard>
        <Edit />
      </KTCard>
    </>
  )
}

const EditPage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {EditPage}
