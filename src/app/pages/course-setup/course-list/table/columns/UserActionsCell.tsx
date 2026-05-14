/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef,useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {createUser, deleteUser, getUserById} from '../../core/_requests'
import { useSelector } from 'react-redux'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { errrorMessage, successMessage } from '../../../../../modules/auth/components/ToastComp'
import { API_URL } from '../../../../settings/components/ApiUrl'
import axios, { AxiosResponse } from 'axios'
import { useAuth } from '../../../../../modules/auth'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {currentUser} = useAuth()
  const {query} = useQueryResponse()
  const {setItemIdForUpdate}=useListView()
  const queryClient = useQueryClient()
  const openDrawerRef: any = useRef(null)
 
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])



  const openEditModal = () => {
    setItemIdForUpdate(id)
    // openDrawerRef.current.setAttribute('id', 'kt_drawer_course_toggle')
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      successMessage("Course Deleted Successfully")
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='bi bi-three-dots-vertical fs-5'></i>
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
         <div className='menu-item'>
        </div>
        {/* begin::Menu item */}
        <div className='menu-item'>
        {(permissionList?.can_edit || currentUser?.admin) &&  <a className='menu-link px-3' onClick={openEditModal} ref={openDrawerRef}>
            Edit
          </a>}
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item'>
        {(permissionList?.can_delete || currentUser?.admin) &&  <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>}
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
