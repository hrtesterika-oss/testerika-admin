import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {KTCard} from '../../../../_metronic/helpers'
import {GameSummary} from './GameSummary'

const UsersList = () => {
  return (
    <>
      <KTCard>
        <GameSummary />
      </KTCard>
    </>
  )
}

const GameSummaryPage = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {GameSummaryPage}
