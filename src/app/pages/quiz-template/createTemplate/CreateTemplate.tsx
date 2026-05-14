import {KTCard} from '../../../../_metronic/helpers'
import {ListViewProvider} from '../booksList/core/ListViewProvider'
import {QueryRequestProvider} from '../booksList/core/QueryRequestProvider'
import {QueryResponseProvider} from '../booksList/core/QueryResponseProvider'
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

const CreateTemplate = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CreateTemplate}
