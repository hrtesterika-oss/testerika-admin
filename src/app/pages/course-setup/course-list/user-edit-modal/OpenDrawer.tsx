/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {ChatInner} from '../../../../../_metronic/partials/chat/ChatInner'
import {useListView} from '../core/ListViewProvider'
import {UserEditModalFormWrapper} from './UserEditModalFormWrapper'
import { getUserById } from '../core/_requests'

const OpenDrawer: FC = () => {
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()
  const [roleForEdit, setRoleForEdit] = useState<any>({
    course_name:"",
    image:"",
    position:undefined
  })
  const closeDrawerRef: any = useRef(null)

  const getCouseById=async (id:any)=>{
     const data=await getUserById(id)
     setRoleForEdit({...data?.data?.data})
  }
  useEffect(() => {
    if(itemIdForUpdate!==undefined){
        getCouseById(itemIdForUpdate)
    }
  },[])
  return (
    <>
      <div
        id='kt_drawer_course'
        className='bg-white'
        data-kt-drawer='true'
        data-kt-drawer-name='course'
        data-kt-drawer-activate='true'
        data-kt-drawer-overlay='true'
        data-kt-drawer-width="{default:'300px', 'md': '500px'}"
        data-kt-drawer-direction='end'
        data-kt-drawer-toggle='#kt_drawer_course_toggle'
        data-kt-drawer-close='#kt_drawer_course_close'
      >
        <div className='card w-100 rounded-0' id='kt_drawer_chat_messenger'>
          <img
            src={toAbsoluteUrl('/media/bg.jpeg')}
            style={{width: '100%', height: '10%', position: 'absolute'}}
          />
          <div className='card-header pe-5' id='kt_drawer_chat_messenger_header'>
            <div className='card-title'>
              <div className='d-flex justify-content-center flex-column me-3'>
                <p
                  className='fs-4 fw-bolder text-hover-primary me-1 mb-2 lh-1'
                  style={{zIndex: 1, color: '#fff'}}
                >
                  Add Course
                </p>
              </div>
            </div>

            <div className='card-toolbar'>
              <div className='me-2'></div>

              <div
                className='btn btn-sm btn-icon btn-active-light-primary'
                id='kt_drawer_course_close'
                onClick={() => setItemIdForUpdate(undefined)}
                style={{zIndex: 1}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
              </div>
            </div>
          </div>
          <div className='modal-body scroll-y mx-5 mx-xl-15'>
            <UserEditModalFormWrapper  data={roleForEdit}/>
          </div>
        </div>
      </div>
    </>
  )
}

export {OpenDrawer}
