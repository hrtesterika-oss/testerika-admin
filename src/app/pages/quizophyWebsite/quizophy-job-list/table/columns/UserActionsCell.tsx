/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify'

import "../../components/css/index.css"
import { useSelector } from 'react-redux'
type Props = {
  data: any
}

const UserActionsCell: FC<Props> = ({data}) => {
  const {setItemIdForUpdate} = useListView()
  const [type,setType]=useState("view")
  const [open,setOpen]=useState<any>(false)
  const [selectState,setSelectState]=useState<any[]>([])
  const [userData,setUserData]=useState<any>({
   full_name:"",
   email:"",
   phone_number:"",
   current_location:"Rajasthan",
   ready_to_relocate:"Yes",
   current_company:"",
   current_position:"",
   position_applied_for:"",
   total_experience:"",
       current_ctc:"",
   expected_ctc:"",
   notice_period:"",
   resume:""
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
  const [jobAvailable,setJopbAvailable]=useState([])
  const navigate = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])


  const edit = () => {
    navigate(`/conference-quiz/edit/${data.data.id}`)
  }

  const deleteItem = useMutation(() => deleteUser(data.data.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
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
        {/* <div className='menu-item'>
         {
          permissionList?.can_view &&
          <a className='menu-link px-3' onClick={()=>{
            setType("view")
            setUserData(data?.data)
            setOpen(true)
          }}>
            View
          </a>}
        </div> */}
     
        {/* begin::Menu item */}
        <div className='menu-item'>
         {permissionList?.can_edit && <a className='menu-link px-3' onClick={()=>{
            navigate(`/quizophy-website/edit-job/${data?.data?.id}`)
          }}>
            Edit
          </a>}
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item'>
          {permissionList?.can_delete && <a
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
