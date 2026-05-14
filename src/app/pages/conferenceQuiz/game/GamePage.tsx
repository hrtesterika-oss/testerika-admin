import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {KTCard} from '../../../../_metronic/helpers'
import { Game } from './Game'


const UsersList = () => {
  return (
    <>
      <KTCard>
        <Game />
      </KTCard>
    </>
  )
}

const GamePage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {GamePage}
