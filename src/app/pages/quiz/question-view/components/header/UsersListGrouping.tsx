import {useState} from 'react'
import {useQueryClient, useMutation} from 'react-query'
import {useParams} from 'react-router-dom'
import {QUERIES, stringifyRequestQuery} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {addSelectedQuestion, deleteSelectedUsers, getUsers} from '../../core/_requests'

const UsersListGrouping = () => {
  const params = useParams()
  const {id} = params
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      // queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      getUsers(params.id,query)
      clearSelected()
      window.location.reload()
    },
  })

  const addelectedItems = useMutation(() => addSelectedQuestion(selected, id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      
      // ✅ update detail view directly
      // queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      getUsers(params.id,query)
      clearSelected()
      window.location.reload()

    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-primary me-5'
        onClick={async () => await addelectedItems.mutateAsync()}
      >
        Add to Quiz
      </button>
      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete from Quiz
      </button>
    </div>
  )
}

export {UsersListGrouping}
