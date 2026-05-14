import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
// import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import { ExportReactCSV } from '../Export'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  const navigate = useNavigate()


  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}
      {/* <ExportReactCSV csvData={users} fileName={'Users.xls'} /> */}
      {/* <button
        type='button'
        className='btn btn-primary me-5'
        onClick={()=>{
          navigate("/conference-quiz/user/create-new-user")
        }}
      >
        Create New User
      </button> */}

      {/* begin::Export */}
      {/* <ExportReactCSV csvData={users} fileName={'users'} /> */}

      {/* end::Export */}

      {/* begin::Add user */}
      
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
