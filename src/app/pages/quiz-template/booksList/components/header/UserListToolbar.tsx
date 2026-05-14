import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const navigate = useNavigate()

  const openAddUserModal = () => {
    navigate('/quiz-template/create')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'quiz_templates.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Quiz Template
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
