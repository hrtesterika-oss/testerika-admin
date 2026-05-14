import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {UsersListHeader} from '../quizList/components/header/UsersListHeader'
import {KTCard} from '../../../../_metronic/helpers'
import {GameStart} from './GameStart'

const UsersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <GameStart />
      </KTCard>
    </>
  )
}

const GameStartPage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {GameStartPage}
