import { useSelector } from 'react-redux'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import React,{useState,useEffect} from "react"
const UsersListToolbar = () => {
  const users = useQueryResponseData()
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const [permissionList,setPermissionList]=useState<any>({})
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission?.filter((item:any)=>item.permission_name===title && item) || []
      setPermissionList(result[0] || {})
    }
    useEffect(()=>{
      if(staffPermission && navItem?.item){
        filterStaffPermission(navItem.item)
      }
    },[navItem, staffPermission])

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      
      <UsersListFilter />

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'users.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
     {permissionList?.can_create && <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add User
      </button>}
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
