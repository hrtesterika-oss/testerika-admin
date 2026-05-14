import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener('popstate', addPopState)
    return () => {
      window.removeEventListener('popstate', addPopState)
    }
  }, [])

  const addPopState = () => {
    navigate('/quiz')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      {/* begin::Export */}
      {/* <ExportReactCSV csvData={users} fileName={'quiz'} /> */}

      {/* end::Export */}

      {/* begin::Add user */}
      <Link to={'/quiz'} className='btn btn-primary'>
        <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2' />
        Back To Quiz
      </Link>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
