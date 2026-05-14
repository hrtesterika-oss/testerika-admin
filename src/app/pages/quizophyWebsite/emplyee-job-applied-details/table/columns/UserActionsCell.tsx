/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser, updateEmployeeJobStatus} from '../../core/_requests'
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
        <div className='menu-item'>
         {
          permissionList?.can_view &&
          <a className='menu-link px-3' onClick={()=>{
            setType("view")
            setUserData(data?.data)
            setOpen(true)
          }}>
            View
          </a>}
        </div>
     
        {/* begin::Menu item */}
        <div className='menu-item'>
         {permissionList?.can_edit && <a className='menu-link px-3' onClick={()=>{
            setType("edit")
            setUserData(data?.data)
            setOpen(true)
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
                    <Modal open={open} onClose={()=>{
                      setOpen(false)
                    }} center>
                                  <div className="container" style={{width:"80vw",height:"80vh",padding:"50px 10px"}}>
                                        <div className="row" style={{paddingTop:"20px",paddingBottom:"100px"}}>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Full Name
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                placeholder="Enter Full Name"
                                                                value={userData?.full_name}
                                                                  onChange={(e)=>{
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                   
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Email
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="email"
                                                                disabled
                                                                placeholder="Enter Eamil"
                                                                value={userData?.email}
                                                                  onChange={(e)=>{
                                                                   }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Phone Number
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="number"
                                                                disabled
                                                                
                                                                placeholder="Enter Phone Number"
                                                                value={userData?.phone_number}
                                                                  onChange={(e)=>{
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Current Location
                                                              
                                                          <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Current Location"
                                                                value={userData?.current_location}
                                                                  onChange={(e)=>{
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Ready to Relocate 
                                                          <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                    
                                                                placeholder="Ready to Relocate"
                                                                value={userData?.ready_to_relocate}
                                                                  onChange={(e)=>{
                                                                  }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Current Company
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Current Company"
                                                                value={userData?.current_company}
                                                                  onChange={(e)=>{

                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Current Position 
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Current Position"
                                                                value={userData?.current_position}
                                                                  onChange={(e)=>{

                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Position Applied For 
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Position Applied For"
                                                                value={userData?.position_applied_for}
                                                                  onChange={(e)=>{

                                                                }}
                                                              />
                                                          </label>
                                                        </div>

                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Total Experience (In Year)
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Enter Total Experience"
                                                                value={userData?.total_experience}
                                                                  onChange={(e)=>{
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                    
                                                    
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Current CTC (Per Year)
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Current CTC"
                                                                value={userData?.current_ctc}
                                                                  onChange={(e)=>{
                                                                                                                                      }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Expected CTC (Per Year) 
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Expected CTC"
                                                                value={userData?.expected_ctc}
                                                                  onChange={(e)=>{
                                                                      
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Notice Period (In Days)
                                                              <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                                type="text"
                                                                disabled
                                                                
                                                                placeholder="Notice Period"
                                                                value={userData?.notice_period}
                                                                  onChange={(e)=>{
                                                                      
                                                                }}
                                                              />
                                                          </label>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>Profile Status
                                                             {
                                                              type=="view" ? <input className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2",marginTop:"10px"}}
                                                              type="text"
                                                              disabled
                                                              placeholder="Job Status"
                                                              value={userData?.job_status}
                                                                onChange={(e)=>{
                                                              }}
                                                            />:
                                                             
                                                             <select value={userData?.job_status}  placeholder='Discount Type' className="form_style form-control fw-bolder form-select form-control" onChange={(e:any)=>{
                                                                setUserData({...userData,job_status:e?.target?.value})
                                                            }}>
                                                                    <option disabled={true}>Select</option>
                                                                   <option value="Shortlisted">Shortlisted</option>
                                                                    <option value="Not Shortlisted">Not Shortlisted</option>
                                                                    <option value="Applied">Applied</option>
                                                                    <option value="Work in Progress">Work in Progress</option>
                                                              </select>}
                                                              
                                                          </label>
                                                        </div>
                                                          <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                          <label  className=" fs-6 fw-semibold text-primary" style={{width:"90%",marginTop:"10px"}}>(Resume/CV)
                                                             
                                                              {
                                                                userData?.resume?.length>0 &&<iframe src={userData?.resume} style={{marginTop:"20px"}} width="400" height="350"></iframe>
                                                              }
                                                              
                                                          </label>
                                                        </div>

                                                          {type=="edit" && <div className="col-lg-4 col-md-6 col-sm-12  col-12 fv-row fv-plugins-icon-container mt-3">
                                                            <button className="btn btn-primary" style={{cursor:"pointer",marginTop:"25px", marginLeft:"auto",textAlign:"center"}} onClick={async (e)=>{
                                                              e?.preventDefault()
                                                              const {data}=await updateEmployeeJobStatus(userData?.id,userData)
                                                              if(data?.success){
                                                                toast.success('Employee Job Status Updated Successfully', {
                                                                  position: "top-right",
                                                                  autoClose: 2000,
                                                                  hideProgressBar: false,
                                                                  closeOnClick: true,
                                                                  pauseOnHover: true,
                                                                  draggable: true,
                                                                  progress: undefined,
                                                                  theme: "dark",
                                                              })
                                                              setType("view")
                                                              setOpen(false)
                                                              queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
                                                              setUserData({
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
                                                              }else{
                                                                toast.error('Something went wrong. Please try again.', {
                                                                  position: "top-right",
                                                                  autoClose: 2000,
                                                                  hideProgressBar: false,
                                                                  closeOnClick: true,
                                                                  pauseOnHover: true,
                                                                  draggable: true,
                                                                  progress: undefined,
                                                                  theme: "dark",
                                                              })
                                                              }
                                                            //   const {data}=await axios.post(`${APIURL}/apply-for-job`,userData)
                                                              
                                                            //   if(data?.success){
                                                            //     setOpen(false)
                                                            //  setUserData({
                                                            //       full_name:"",
                                                            //       email:"",
                                                            //       phone_number:"",
                                                            //       current_location:"Rajasthan",
                                                            //       ready_to_relocate:"Yes",
                                                            //       current_company:"",
                                                            //       current_position:"",
                                                            //       position_applied_for:"",
                                                            //       total_experience:"",
                                                            //       current_ctc:"",
                                                            //       expected_ctc:"",
                                                            //       notice_period:"",
                                                            //       resume:""
                                                            //     })
                                                            //     ToastComp({message:"Job Applied Successfully",type:"Success"})
                                                            //   }
                                                            // }
                                                          }}>
                                                              Submit Data</button>
                                                        </div>}
                            </div>
                                  </div>
                    </Modal>
    </>
  )
}

export {UserActionsCell}
