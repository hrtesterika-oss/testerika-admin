import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'paymentsupport.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
      {/* <button onClick={openAddUserModal} className='btn btn-primary'>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Payment Support
      </button> */}
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
