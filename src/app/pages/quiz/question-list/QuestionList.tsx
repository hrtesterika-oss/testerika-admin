import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {KTCard} from '../../../../_metronic/helpers'
import {CommonDataProvider} from '../commonData/CommonDataProvider'

const QuestionList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
    </>
  )
}

const QuestionListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CommonDataProvider>
          <QuestionList />
        </CommonDataProvider>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {QuestionListWrapper}
