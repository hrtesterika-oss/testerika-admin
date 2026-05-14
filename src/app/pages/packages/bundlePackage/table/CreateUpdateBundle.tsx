import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToastComp from '../../../conferenceQuiz/userList/ToastComp';
import { PASSESURL, createUpdateSubPackages, getAllSubPackagesData, getSubPackageById } from '../core/_requests';
import { ErrorMessage } from 'formik';
import { useCommonData } from '../../../question-bank/users-list/commonData/CommonDataProvider';
import Dropzone from 'react-dropzone';
import ToatComp from '../../../conferenceQuiz/blog/ToatComp';
import { APIURLQUIZ } from '../../../conferenceQuiz/APIURL';
import { API_URL } from '../../../settings/components/ApiUrl';

const CreateUpdateBundle = () => {
    const [selectCategory, setSelectCategory] = useState<string>("");
    const [loading,setLoading]=useState<boolean>(true)
    const [passType,setPassType]=useState<any[]>([])
    const params=useParams()
    const {allCourses,allSubjects}=useCommonData()  
    const [courses,setCourses]=useState<any[]>(allCourses)
    const [packages,setPackages]=useState<any[]>([])
    let [createPackage,setCreatePackage]=useState<any>({
        id:undefined,
        name:"",
        description:"",
        price_inr:0,
        price_usd:0,
        thumbnail:"",
        premiumType:{label:"NO",value:"NO"},
        slug:"",
        hash:"",
        featured:{label:"NO",value:"NO"},
        packages_id:[]
    })
    const navigate=useNavigate()
  

    useEffect(()=>{
        if(allCourses && allSubjects){
          setCourses(allCourses)
        }
    },[allCourses,allSubjects])
    const premiumType:any[]=[{
      value: 'YES', label: 'YES'
      },{
      value: 'NO', label: 'NO'
      }
    ]
    const featuredType:any[]=[{
      value: 'YES', label: 'YES'
      },{
      value: 'NO', label: 'NO'
      }
    ]

    const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
    const filterStaffPermission=async (title:string)=>{
      let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
      if(!result[0]?.can_create && !result[0]?.can_edit ) navigate("/packages/packages")
    }
    useEffect(()=>{
      filterStaffPermission(navItem?.item)
      },[navItem])

      const getAllSubPackages=async ()=>{
         const {data}=await getAllSubPackagesData()
         if(data?.success){
          setPackages(data?.data)
         }else{
            ToastComp({message:"Something went wrong",type:"Error"})
         }
      }

      const findPackagesById=async (id:any)=>{
        try{
         const {data}=await getSubPackageById(id)
         if(data?.success){
           let packageIds=data?.data?.bundlepackages?.map((item:any)=>item?.packageid)
           if(packageIds && packages){
           
             setCreatePackage({
              thumbnail:data?.data?.thumbnail,
              premiumType:data?.data?.premiumType==1?{label:"YES",value:"YES"}:{label:"NO",value:"NO"},
              name:data?.data?.name,
              price_inr:data?.data?.price_inr,
              price_usd:data?.data?.price_usd,
              slug:data?.data?.slug,
              hash:data?.data?.hash,
              description:data?.data?.description,
              id:params?.id?params?.id:undefined,
              featured:data?.data?.featured==1?{label:"YES",value:"YES"}:{label:"NO",value:"NO"},
              packages_id:packages?.filter((item:any)=>packageIds?.includes(item?.id))
            })             
           }
            
         }else{
           navigate("/packages/bundle")
         }
        }catch(err){
           navigate("/packages/bundle")
        }
     }
    


    const submitNewPass=async ()=>{  
        if(createPackage?.name?.trim()==""){
          ToastComp({message:"Bundle Name should not be empty",type:"Error"})
              return false
         }
         else if(createPackage?.description?.trim()==""){
            ToastComp({message:"Bundle Description should not be empty",type:"Error"})
                return false
           }

           else if(createPackage?.price_inr<=0){
            ToastComp({message:"Bundle price (INR) must be greater than 0",type:"Error"})
                return false
           }
           else if(createPackage?.price_usd<=0){
            ToastComp({message:"Bundle price (USD) must be greater than 0",type:"Error"})
                return false
           }
           else if(createPackage?.packages_id?.length<=0){
            ToastComp({message:"Assign Packages to Bundle",type:"Error"})
                return false
           }
           if(createPackage?.thumbnail?.trim()==""){
            ToastComp({message:"Upload Bundle Thumbnail",type:"Error"})
                return false
           }
          
          else{
            if(params?.id){
              let payload={
                thumbnail:createPackage?.thumbnail,
                premiumType:createPackage?.premiumType?.value=="YES"?1:0,
                name:createPackage?.name,
                price_inr:createPackage?.price_inr,
                price_usd:createPackage?.price_usd,
                slug:createPackage?.slug,
                description:createPackage?.description,
                id:params?.id?params?.id:undefined,
                featured:createPackage?.featured?.value=="YES"?1:0,
                packages_ids:createPackage?.packages_id?.map((item:any)=>item?.id)
            }
            const {data}=await createUpdateSubPackages(payload)
            if(data?.success){
                ToastComp({message:"Bundle Updated Successfully",type:"Success"})
                navigate("/packages/bundle")
            }else{
              ToastComp({message:"Something went wrong.Please try again",type:"Error"})
            }

            }else{

              let payload={
                thumbnail:createPackage?.thumbnail,
                premiumType:createPackage?.premiumType?.value=="YES"?1:0,
                name:createPackage?.name,
                price_inr:createPackage?.price_inr,
                price_usd:createPackage?.price_usd,
                slug:createPackage?.slug,
                description:createPackage?.description,
                id:params?.id?params?.id:undefined,
                featured:createPackage?.featured?.value=="YES"?1:0,
                packages_ids:createPackage?.packages_id?.map((item:any)=>item?.id)
            }
            const {data}=await createUpdateSubPackages(payload)
            if(data?.success){
                ToastComp({message:"Bundle Created Successfully",type:"Success"})
                navigate("/packages/bundle")
            }else{
              ToastComp({message:"Something went wrong.Please try again",type:"Error"})
            }

              // const {data}=await 
              // if(data?.success){
              //   ToastComp({message:"New Pass created successfully",type:"Success"})
              //      navigate("/passes/passes")
              // }else{
              //   ToastComp({message:data?.message,type:"Error"})
              // }
            }
           
         }
        // console.log(createPackage)
      
         
    }
    useEffect(()=>{
      if(params?.id && packages){
       findPackagesById(params?.id)
      }
   },[params,packages])

    useEffect(()=>{
         let timer= setTimeout(()=>{
          setLoading(false)
         },200)
         return ()=>{
          clearTimeout(timer)
         }
    },[])

    useEffect(()=>{
      getAllSubPackages()
    },[params])


    const uploadImage = async (file: any,typeSave:any) => {
        const fd = new FormData()
        if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
          ToatComp({message:"Image is of un-expected size (size must be less than 1MB)",type:"Warning"})
          return 
        }
        let newArr=file[0]?.type?.split("/")
        if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
            ToatComp({message:"Only image supported",type:"Error"})
            return
        }
        else{
          if(file[0]){
              fd.append('image', file[0])
          }
          await axios
            .post(`${API_URL}/staff/upload-image`, fd)
            .then((data: AxiosResponse<any>) => {
                if(data?.data?.success){
                   if(typeSave=="Image"){
                      setCreatePackage({...createPackage,image:data?.data?.image})
                   }else{
                    setCreatePackage({...createPackage,thumbnail:data?.data?.image})
                   }
                  // setblogImage(data?.data?.image)
                }
            })
            .catch((err) => {
              console.log(err, 'err')
            })
        }
    }
  

    return (
      <div className="container">
          <div className="row">

            {
              loading ? <div className="row">
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"60vh"}}>
                       <h2>Loading...</h2>
                    </div>
              </div>:
             <div className="col-12">
             <form className="my-1">
             <div className="row">
                
                      
                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Bundle Name</label>
                               
                                  <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.name}  onChange={(e:any)=>{
                                        // setCreatePackage({...createPackage,name:e?.target?.value})
                                        const noSpecialChars = e?.target?.value?.replace(/[^a-zA-Z ]/g, '');
                                        var newStr = noSpecialChars.replace(/  +/g, ' ');
                                        newStr=newStr?.trim()
                                        let splitArr=newStr?.split(" ")
                                        setCreatePackage({...createPackage,name:e?.target?.value,slug:splitArr?.join("-")?.toLowerCase()})
                                    }} placeholder="Enter Bundle Name" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Bundle Slug</label>
                               
                                  <input type="text" disabled={true} className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.slug}  onChange={(e:any)=>{
                                    }} placeholder="Bundle Slug" name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                       

                     
                       <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Price (INR)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.price_inr}  onChange={(e:any)=>{
                             setCreatePackage({...createPackage,price_inr:e?.target?.value})
                                    }} placeholder="Enter Price in INR" name="first-name"/>
              <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                    
                    
                       <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                          <label className=" fs-6 fw-semibold mb-1">Price (USD)</label>
                       
                          <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.price_usd}  onChange={(e:any)=>{
                                  setCreatePackage({...createPackage,price_usd:e?.target?.value})
                                    }} placeholder="Enter Price in USD" name="first-name"/>
                  <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> 

                      <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                        <label className="required fs-6 fw-semibold mb-1">Assign Packages</label>
                     
                           <Select 
                            options={packages} 
                            isMulti
                            name='packages_id'
                            className='basic-multi-select'
                            classNamePrefix='select'
                            // isSearchable={true}
                            // onChange={(e, i) => {
                            //    const ids = e.flatMap((item:any, i:number) =>[item.id])
                            //    getSubject(ids)
                            //    setQuestionDetails({...questionDetail,course:e})
                            //    setSelectedCourses(e)
                            //  }}
                             value={createPackage?.packages_id}
                             getOptionLabel={(option: any) => option.name}
                             getOptionValue={(option: any) => option.id}   
                             onChange={(e:any)=>{
                              setCreatePackage({...createPackage,packages_id:e})
                          }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                    <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                            <label className="required fs-6 fw-semibold mb-1">Featured</label>
                                        
                                            <Select options={featuredType}  value={createPackage?.featured}  onChange={(e:any)=>{
                                               setCreatePackage({...createPackage,featured:e})
                                            }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> 

                     <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                                            <label className="required fs-6 fw-semibold mb-1">Premium</label>
                                        
                                            <Select options={premiumType}  value={createPackage?.premiumType}  onChange={(e:any)=>{
                                               setCreatePackage({...createPackage,premiumType:e})
                                            }} />
                     <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> 


                     <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                                  <label className="required fs-6 fw-semibold mb-1">Bundle Description</label>
                               
                                  <textarea  className="form_style form-control form-control-solid fw-bolder" style={{background:"#f2f2f2"}} value={createPackage?.description}  onChange={(e:any)=>{
                                      setCreatePackage({...createPackage,description:e?.target?.value})
                                    }} placeholder="Enter Bundle Description" rows={3} name="first-name"/>
                      <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>   


                       <div className="col-6 my-4">
                                 <div className="py-5" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",}}>
                                 <h2 className="text-center">Upload Bundle Thumbnail</h2>

                                 <div className="p-5 mt-5 bg-white mx-auto shadow text-center" style={{width: 350}}>
                                 {createPackage?.thumbnail ? <>
                                      <img src={createPackage?.thumbnail} style={{ width: "100%",objectFit:"contain" }} />
                                      <button
                                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                        data-kt-image-input-action='remove'
                                        data-bs-toggle='tooltip'
                                        title='Remove avatar'
                                        type='button'
                                        onClick={() => {
                                          // setblogThumbnail("")
                                          setCreatePackage({...createPackage,thumbnail:""})
                                        }}
                                      >
                                        <i className='bi bi-x fs-2'></i>
                                      </button>
                                 </>
                                  : (
                                        <Dropzone onDrop={(acceptedFiles) => {
                                          uploadImage(acceptedFiles,"Thumbnail")
                                        }}>
                                          {({ getRootProps, getInputProps }) => (
                                            <section className='row'>
                                              <div className='col-sm-12' {...getRootProps()}>
                                                <i className='fas fa-plus-square fa-3x mt-11 text-primary'></i>
                                                <div className='' style={{ fontSize: 13 }}>
                                                  Upload Thumbnail
                                                </div>
                                                <input accept=".jpg, .png, .jpeg" {...getInputProps()} />
                                              </div>
                                            </section>
                                          )}
                                        </Dropzone>
                                  )}
                                    </div>
                              
                                 </div>
                            </div>
                            {/* //upload Blog Image  */}
                    
                    
                     
  
                      <div className="col-12 d-flex flex-column">
              <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e:any)=>{
                   e?.preventDefault()
                   submitNewPass()
              }}>{params?.id?"Update":"Create"} Bundle Package</button>
              
              </div>
              </div>
            
             </form>
                   
             </div>
            }

          </div>
      </div>
    )
      }


export default CreateUpdateBundle