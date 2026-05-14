import {ListViewProvider, useListView} from '../quizList/core/ListViewProvider'
import {QueryRequestProvider} from '../quizList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../quizList/core/QueryResponseProvider'
import {KTCard} from '../../../../_metronic/helpers'
import {Create} from './Create'

const UsersList = () => {
  return (
    <>
      <KTCard>
        <Create />
      </KTCard>
    </>
  )
}

const CreateQuiz = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
          <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CreateQuiz}
