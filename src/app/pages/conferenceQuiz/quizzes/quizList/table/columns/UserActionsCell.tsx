/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { successMessage } from '../../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'

type Props = {
  id: any
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const navigate=useNavigate()
  const queryClient = useQueryClient()
  const params=useParams()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
}
useEffect(()=>{
  filterStaffPermission(navItem?.item)
  },[navItem])
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id?.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      successMessage("Quiz Deleted Successfully")
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
        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
         { <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>}
        </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
         { permissionList?.can_delete && <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>}
        </div>

        <div className='menu-item px-3'>
        { permissionList?.can_view && <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={()=>{
              navigate(`/conference-quiz/quiz/report/${id?.id}`)
            }}
          >
            Reports
          </a>}
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
