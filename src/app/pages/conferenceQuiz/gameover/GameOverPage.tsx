import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {UsersListHeader} from '../quizList/components/header/UsersListHeader'
import {KTCard} from '../../../../_metronic/helpers'
import {GameOver} from './GameOver'

const UsersList = () => {
  return (
    <>
      <KTCard>
        <GameOver />
      </KTCard>
    </>
  )
}

const GameOverPage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {GameOverPage}
