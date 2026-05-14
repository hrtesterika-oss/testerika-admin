/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect,useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import { useSelector } from 'react-redux'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])


  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
    {permissionList?.can_delete &&  <a
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-users-table-filter='delete_row'
        onClick={async () => await deleteItem.mutateAsync()}
      >
        <i className='fa fa-trash fs-5'></i>
      </a>}
      {/* begin::Menu */}
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
