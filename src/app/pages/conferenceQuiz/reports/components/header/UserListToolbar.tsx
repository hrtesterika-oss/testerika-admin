import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import {useNavigate} from 'react-router-dom'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    // setItemIdForUpdate(null)
    navigate('/conference-quiz/create')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      {/* <ExportReactCSV csvData={users} fileName={'books.xls'} /> */}

      {/* end::Export */}

      {/* begin::Add user */}
      {/* <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Create
      </button> */}
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
