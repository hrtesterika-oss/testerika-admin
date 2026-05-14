import {useEffect, useState} from 'react'
import {useQueryClient, useMutation} from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import {QUERIES, stringifyRequestQuery} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {addSelectedQuestion, deleteSelectedUsers, getUsers} from '../../core/_requests'
import { successMessage } from '../../../../../modules/auth/components/ToastComp'
import { useSelector } from 'react-redux'

const UsersListGrouping = () => {
  const params = useParams()
  const {id} = params
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
const navigate=useNavigate()
const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
const [permissionList,setPermissionList]=useState<any>({})
const filterStaffPermission=async (title:string)=>{
  let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
  setPermissionList(result[0])
}
useEffect(()=>{
  filterStaffPermission(navItem?.item)
  },[navItem])
  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected,id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      // queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      // getUsers(params.query)
      clearSelected()
      successMessage("Question Removed successfully")
      // window.location.reload()
      navigate("/quiz/quiz")
    },
  })

  const addelectedItems = useMutation(() => addSelectedQuestion(selected, id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      
      // ✅ update detail view directly
      // queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      // getUsers(query)
      successMessage("Question Added Successfully")
      clearSelected()
      navigate("/quiz/quiz")
      // window.location.reload()

    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      {/* <button
        type='button'
        className='btn btn-primary me-5'
        onClick={async () => await addelectedItems.mutateAsync()}
      >
        Add to Quiz
      </button> */}
     {
      permissionList?.can_delete &&
      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete from Quiz
      </button>}
    </div>
  )
}

export {UsersListGrouping}
