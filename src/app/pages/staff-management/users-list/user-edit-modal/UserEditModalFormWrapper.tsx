import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import {initialRole, Role} from '../core/_models'


const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {isLoading, data: user, error} = useQuery(
    `${QUERIES.USERS_LIST}-permissions-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return (
      <UserEditModalForm
        isUserLoading={isLoading}
        role={initialRole}
      />
    )
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm/>
  }

  return null
}

export {UserEditModalFormWrapper}
