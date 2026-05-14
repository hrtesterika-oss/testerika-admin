import {FC, useEffect, useRef, useState} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {createAccountSchemas, initialUser, User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, getUserById} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import axios, {AxiosResponse} from 'axios'
import {API_URL} from '../../../settings/components/ApiUrl'
import { errrorMessage, successMessage } from '../../../../modules/auth/components/ToastComp'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useCommonData } from '../../commonData/CommonDataProvider'
type Props = {
  isUserLoading: boolean
  role: User
}


const UserEditModalForm: FC<Props> = ({role, isUserLoading}) => {
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()
  const {allCategory}=useCommonData()
  const {refetch} = useQueryResponse()
  const [open,setOpen]=useState<boolean>(false)
  const [selectCategory,setSelectCategory]=useState<any[]>([])
  const [roleForEdit, setRoleForEdit] = useState<any>({
    course_name:"",
    category_id:undefined,
    image:"",
    position:undefined
  })
  const closeDrawerRef: any = useRef(null)

 
  const filterCategory=(id:any)=>{
       let result=allCategory.filter((item:any)=>item?.id==Number(id))[0]
      //  setSelectCategory(result)
       setRoleForEdit({...roleForEdit,category_id:id,course_category:result?.course_category})
  }

  const getCouseById=async (id:any)=>{
     const data=await getUserById(id)
     let result=allCategory?.map((item:any)=> `${item?.course_category}-${item?.id}`)
     setSelectCategory(result)
     setRoleForEdit(data?.data?.data)
  }
  useEffect(() => {
    if(itemIdForUpdate!==undefined){
        getCouseById(itemIdForUpdate)
        setOpen(true)
    }else{
      setOpen(false)
      setRoleForEdit({
        course_name:"",
        image:"",
        position:undefined
      })
      // setOpen(true)
    }
  },[])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setRoleForEdit({
      course_name:"",
      image:"",
      position:undefined
    })
    setItemIdForUpdate(undefined)
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

  return (
    <>
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
                <label className='form-label required'>Select Course Category</label>

                <select
                  name='course_category'
                  className='form-control mb-2'
                  placeholder={'Select Course Category'}
                  // value={roleForEdit?.course_category}
                  onChange={(e: any) =>{
                    // let data=allCategory.filter((item:any)=>item?.id===e?.target?.value)[0]
                    // setSelectCategory(data)
                    setRoleForEdit({...roleForEdit,category_id:e?.target?.value?.split("-")[1]})
                    // filterCategory(e?.target?.value?.split("-")[1])
                  }}
                >
                  <option >Select Category</option>
                   {
                    selectCategory?.map((item:any,index:number)=>{
                     return <option selected={item?.split("-")[1]==roleForEdit?.category_id} key={index}>{item}</option>
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
      {/* <div className='stepper my-5 py-5 stepper-links d-flex flex-column' id='kt_create_account_stepper kt_create_account_form'>
        <form>
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
                  {roleForEdit.image !== null && (
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

              <button className='btn btn-lg btn-primary' style={{width: '40%'}} onClick={(e:any)=>{
                    e?.preventDefault()
                    submitStep()
              }}>
                  <span className='indicator-label'>{'Submit'}</span>
                </button>
        </form>
        
      </div> */}
      {isUserLoading && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
