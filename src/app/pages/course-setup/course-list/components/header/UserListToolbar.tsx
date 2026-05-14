import {useRef,useState,useEffect} from 'react'
import {KTSVG, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse, useQueryResponseData} from '../../core/QueryResponseProvider'
import {ExportReactCSV} from '../Export'
import {UsersListFilter} from './UsersListFilter'
import { useSelector } from 'react-redux'
import axios, { AxiosResponse } from 'axios'
import { API_URL } from '../../../../settings/components/ApiUrl'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { createUser, getUserById } from '../../core/_requests'
import { errrorMessage, successMessage } from '../../../../../modules/auth/components/ToastComp'
import { useQueryClient } from 'react-query'
import { useAuth } from '../../../../../modules/auth'
import { useCommonData } from '../../../commonData/CommonDataProvider'

const UsersListToolbar = () => {
  const {currentUser} = useAuth()
  const users = useQueryResponseData()
  const openAddUserModal = () => {
    // setItemIdForUpdate(null)
    setOpen(true)
    // openDrawerRef.current.setAttribute('id', 'kt_drawer_course_toggle')
  }
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
   const {allCategory}=useCommonData()
   console.log(allCategory)
  const [open,setOpen]=useState<boolean>(false)
  const [roleForEdit, setRoleForEdit] = useState<any>({
    course_name:"",
    category_id:undefined,
    image:"",
    position:undefined
  })

  const cancel = (withRefresh?: boolean) => {
    setRoleForEdit({
      course_name:"",
      category_id:undefined,
      image:"",
      position:undefined
    })
  }

  const submitStep = async () => {
    try {
      if(!roleForEdit?.category_id){
        errrorMessage("Please Select Course Category")
    }
      else if(!roleForEdit?.course_name?.trim() || !roleForEdit?.position){
        errrorMessage("Please Filled Required details")
    }else{
      const data=await createUser(roleForEdit)
      if(data?.data?.message){
        setRoleForEdit({
          course_name:"",
          category_id:undefined,
          image:"",
          position:undefined
        })
        successMessage("Course updated successfully")
        setOpen(false)
        queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])

        cancel(true)
      }
    }
    } catch (ex) {
      console.error(ex)
    }
  }

  const uploadImage = async (e: any) => {
    const file = e.currentTarget.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await axios
      .post(`${API_URL}/staff/upload-image`, fd)
      .then((data: AxiosResponse<any>) => {
        setRoleForEdit({...roleForEdit, image: data?.data?.image})
      })
      .catch((err) => {
        console.log(err, 'err')
      })
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
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <ExportReactCSV csvData={users} fileName={'courses.xls'} />

      {/* end::Export */}

      {/* begin::Add user */}
    {(permissionList?.can_create || currentUser?.admin) &&  <button
        type='button'
        // ref={openDrawerRef}
        className='btn btn-primary'
        onClick={openAddUserModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Course
      </button>}
      {/* end::Add user */}
      <Modal open={open} onClose={()=>setOpen(false)} center>
      <div className='stepper my-5 py-5 stepper-links d-flex flex-column' style={{width:"500px"}}>
        <form>
          <h2 className="text-center">Edit Course</h2>
              <div className='fv-row mb-7'>
                <label className='d-block form-label'>Course Image </label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div className=''>
                    <img
                      src={
                        roleForEdit?.image == null || roleForEdit?.image == ''
                          ? toAbsoluteUrl('/media/svg/avatars/blank.svg')
                          : roleForEdit?.image
                      }
                      alt='avatar'
                      className='image-input-wrapper w-125px h-125px'
                    />
                  </div>
                  <label
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    title='Change avatar'
                  >
                    <i className='bi bi-pencil-fill fs-7'></i>
                    <input
                      type='file'
                      name='profile_image'
                      accept='.png, .jpg, .jpeg'
                      onChange={uploadImage}
                    />
                    <input type='hidden' name='avatar_remove' />
                  </label>
                  {roleForEdit?.image !== null && (
                    <button
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      title='Remove avatar'
                      type='button'
                      onClick={() => setRoleForEdit({...roleForEdit, image: ''})}
                    >
                      <i className='bi bi-x fs-2'></i>
                    </button>
                  )}
                </div>
                <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              </div>

              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Course Name</label>

                <input
                  type="text"
                  name='course_name'
                  className='form-control mb-2'
                  placeholder={'Enter Course Name'}
                  value={roleForEdit?.course_name}
                  onChange={(e: any) =>
                    setRoleForEdit({...roleForEdit, course_name: e.target.value})
                  }
                />
              </div>
              <div className='fv-row w-100 mb-10'>
                <label className='d-flex align-items-center form-label'>
                  <span className='required'>Position</span>
                </label>

                <input
                  name='position'
                  className='form-control mb-2'
                  type='number'
                  value={roleForEdit?.position}
                  onChange={(e: any) => setRoleForEdit({...roleForEdit, position: e.target.value})}
                  placeholder={'Enter Order of course'}
                />
              </div>

              <div className='fv-row w-100 mb-10'>
                <label className='form-label required'>Select Course Category asdasd</label>

                <select
                  name='course_category'
                  className='form-control mb-2'
                  placeholder={'Select Course Category'}
                  value={roleForEdit?.category_id}
                  onChange={(e: any) =>
                    setRoleForEdit({...roleForEdit, category_id: e.target.value})
                  }
                >
                  <option >Select Category</option>
                   {
                    allCategory?.map((item:any,index:number)=>{
                     return <option key={index} label={item?.course_category} value={item?.id}>{item?.course_category}</option>
                    })
                   }
                </select>
              </div>

              <button className='btn btn-lg btn-primary' style={{width: '40%'}} onClick={(e:any)=>{
                    e?.preventDefault()
                    submitStep()
              }}>
                  <span className='indicator-label'>{'Submit'}</span>
                </button>
        </form>
      </div>
      </Modal>
    </div>
  )
}

export {UsersListToolbar}
