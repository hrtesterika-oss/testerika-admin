import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {UsersListHeader} from '../quizList/components/header/UsersListHeader'
import {UsersTable} from '../quizList/table/UsersTable'
import {KTCard} from '../../../../_metronic/helpers'
import {Lobby} from './Lobby'
import {CommonDataProvider} from '../commonData/CommonDataProvider'

const UsersList = () => {
  return (
    <>
      <KTCard>
        <Lobby />
      </KTCard>
    </>
  )
}

const LobbyPage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CommonDataProvider>
          <UsersList />
        </CommonDataProvider>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {LobbyPage}
