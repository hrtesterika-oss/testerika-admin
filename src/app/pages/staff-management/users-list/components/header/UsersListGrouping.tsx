import {useQueryClient, useMutation} from 'react-query'
import Swal from 'sweetalert2'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedUsers} from '../../core/_requests'
import { useAuth } from '../../../../../modules/auth'
import { errrorMessage, warningMessage } from '../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'
import {useEffect,useState} from "react"
const UsersListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const {currentUser}=useAuth()

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    },
  })

  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const [permissionList,setPermissionList]=useState<any>({})
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

     {permissionList?.can_delete &&  <button
        type='button'
        className='btn btn-danger'
        onClick={async () =>
          {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  await deleteSelectedItems.mutateAsync()
                }
              })           
          }}
      >
        Delete Selected
      </button>}
    </div>
  )
}

export {UsersListGrouping}
