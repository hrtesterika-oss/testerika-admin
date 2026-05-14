/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

type Props = {
  data: any
}

const UserActionsCell: FC<Props> = ({data}) => {
  const {setItemIdForUpdate} = useListView()
  const navigate = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const summary = () => {
    navigate(`/conference-quiz/summary/${data.id}`)
  }

  return (
    <>
      <button className='btn btn-sm btn-primary' onClick={summary}>
        View
      </button>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
