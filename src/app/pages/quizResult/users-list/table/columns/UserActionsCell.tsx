/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect,useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { useSelector } from 'react-redux'
import { successMessage } from '../../../../../modules/auth/components/ToastComp'

type Props = {
  id: ID,
  data:any
}

const UserActionsCell: FC<Props> = ({id,data}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const navigate=useNavigate()
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
    // setItemIdForUpdate(id)
    navigate(`/quiz/update-quiz/${id}`)
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      successMessage("Quiz Details deleted Successfully")
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
        <div className='menu-item'>
        {  <a className='menu-link px-3' onClick={()=>{
          navigate(`/publish-result/${data.id}/${data.key}`,{state:{quiz:data}})
        }}>
            Publish Result
          </a>}
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className='menu-item'>
         {permissionList?.can_delete && <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>}
        </div>

        <div className='menu-item'>
         {
          permissionList?.can_create && permissionList?.can_edit &&
          <Link
            to={`/quiz/add-question/${id}`}
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={}
          >
            Add Question
          </Link>
          }
        </div>
        <div className='menu-item'>
          {
            permissionList?.can_view && new Date(data?.dates?.result_publish_date) < new Date() && 
          <Link
            to={`/quiz/view-question/${id}`}
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={}
          >
            View Question
          </Link>}
        </div> */}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
