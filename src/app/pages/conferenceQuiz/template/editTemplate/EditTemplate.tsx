import axios, { AxiosResponse } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { APIURLTEMPLATE } from '../../APIURL'
import "./css/index.css"
import clsx from 'clsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import { AiFillDelete } from 'react-icons/ai';
import Dropzone from 'react-dropzone'
import ToastComp from '../../userList/ToastComp'
import { useSelector } from 'react-redux'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}




    interface PostProps {
      loading: boolean
    }
const EditTemplate: FC = () => {
  const navigate = useNavigate()
  const location:any = useLocation()
  const [template,setTemplate]=useState<any>()
  
  const [submit,setSubmit]=useState<boolean>(false)

  const params=useParams()
  const question = {
    question_type: 'Multiple Choice',
    time_limit: '20 seconds',
    points: '1',
    option_type: 'Single',
    question: '',
    options: [
      { options: '', right_option: false },
      { options: '', right_option: false },
      { options: '', right_option: false },
      { options: '', right_option: false },
    ],
    image: '',
  }
  const [questions, setQuestions] = useState<Array<any>>([])
  const [selected, setSelected] = useState<any>(0)
  const [permissionlist,setPermissionList]=useState<any>()
  const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
  const filterStaffPermission=async (title:string)=>{
    let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
    setPermissionList(result[0])
    if(!result[0]?.can_edit && !result[0]?.can_delete) navigate("/conference-quiz/podium/template")
  }
  useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
const findTemplateById=async ()=>{
    const {data}=await axios.get(`${APIURLTEMPLATE}/admin/findTemplate/${params?.id}`)
    if(data?.success){
        setTemplate(data?.data)
        setQuestions((data?.data?.data))
    }
 }
 useEffect(()=>{
    findTemplateById()
 },[])


 const validateTemplate= async ()=>{
      if(template?.name.trim()===""){
        ToastComp({message:"Template name cannot be empty",type:"Error"})

        return 
      }
        for (let [index, item] of questions.entries()) {
            if(item?.question?.trim()===""){
              ToastComp({message:`Please type question ${index+1}`,type:"Error"})
                return 
             }
             let checkRightOption = item.options.some((x: any) => x.right_option == true)
             let checkOptions = item.options.some((x: any) => x.options.trim() == '')              
                if(!checkRightOption){
                  ToastComp({message:`Please select right option of question ${index+1}`,type:"Error"})

                    return 
                }
                if(checkOptions){
                  ToastComp({message:`Please type all options of question ${index+1}`,type:"Error"})
                    return 
                } 
            }
        const {data}=await axios.put(`${APIURLTEMPLATE}/admin/updateTemplateData/${params?.id}`,{name:template?.name,image:template?.image,data:questions,updateStatus:false})
        if(data?.success){
          ToastComp({message:`Template Updated Successfully`,type:"Success"})

            navigate("/conference-quiz/podium/template")
        }

 }


 const deleteTemplate=async()=>{
        const {data}=await axios.delete(`${APIURLTEMPLATE}/${params?.id}`)
        if(data?.success){
          ToastComp({message:`Template Deleted Successfully`,type:"Success"})
            navigate("/conference-quiz/podium/template")
        }
 }


  const addQuestion = () => {
    let data = [...questions]
    data.push(question)
    setQuestions(data)
    setSelected(data.length-1)
  }

  const uploadImage = async (file: any) => {
    const fd = new FormData()
    if(Math.ceil( ( (file[0].size * 8) / 8) / 1000 )>1024){
      ToastComp({message:`Image is of un-expected size (size must be less than 1MB)`,type:"Warning"})
       return 
      }
      let newArr=file[0]?.type?.split("/")
     if(newArr[0]==="audio" || newArr[0]==="video" || newArr[1]==="mpeg" || newArr[1]==="mkv" || newArr[1]==="x-matroska" || newArr[1]==="mp4" || newArr[1]==="mp3"){
      ToastComp({message:`Only image supported`,type:"Error"})
        return
     }
      else{
        if(file[0]){
            fd.append('image', file[0])
        }
        await axios
        .post(`${APIURLTEMPLATE}/admin/upload-template-image`, fd)
          .then((data: AxiosResponse<any>) => {
              if(data?.data?.success){
                setTemplate({...template,image:data?.data?.image})
              }
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      }
  }
  

  return (
    <div className='d-flex flex-column flex-lg-row container'>
    <div className='flex-lg-row-fluid px-0 py-0 '>
      
      
     
          <form>
            <div className='row d-flex'>
              <div className='col-md-8 bg-light'>
                <div className='row p-5'>
                  
                  <div className="col-12">
                       <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                            <label className="required fs-6 fw-semibold mb-1">Template Name</label>
                                    
                            <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{background:"#deecf4"}} value={template?.name}  onChange={(e:any)=>{
                                setTemplate({...template,name:e?.target?.value})
                            }} placeholder="Enter Template Name" name="first-name"/>
                        <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                  </div>

                  <div className="col-12">
                       <div
                            className='mt-5 bg-white mx-auto shadow text-center'
                            style={{
                              height: 150,
                              width: 350,
                            }}
                          >
                            {template?.image ? <>
                            <img src={template?.image} style={{ height: 150, width: 250 }} />
                    
                                <button
                                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                  data-kt-image-input-action='remove'
                                  data-bs-toggle='tooltip'
                                  title='Remove avatar'
                                  type='button'
                                  onClick={() => {
                                    setTemplate({...template,image:""})
                                  }}
                                >
                                  <i className='bi bi-x fs-2'></i>
                                </button>
                                </>
                            : (
                              <Dropzone onDrop={(acceptedFiles) => {
                                uploadImage(acceptedFiles)
                              }}>
                                {({ getRootProps, getInputProps }) => (
                                  <section className='row'>
                                    <div className='col-sm-12' {...getRootProps()}>
                                      <i className='fas fa-plus-square fa-3x mt-11 text-primary'></i>
                                      <div className='' style={{ fontSize: 13 }}>
                                        Upload Template Image
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
                {questions?.map((item: any, i: any) => (
                  <div onClick={() => setSelected(i)} key={i} className={`mt-5 ques_index p-5  ${selected == i ? 'shadowss' : ''}  rounded`}>
                    <div className='d-flex align-items-center'>
                      <div className='inputsss'>
                        <div className='row'>
                          <div className='col-12 d-flex justify-content-between w-100'>
                            <h4>Question {i + 1}</h4>
                            <p style={{marginLeft:"500px"}}><AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}} onClick={()=>{
                                setSelected(i)
                                 let ques=[...questions]
                                 ques.splice(i,1)
                                 setQuestions([...ques])
                            }}/></p>
                          </div>
                          <div className="col-12">
                             <textarea className="form-control" style={{width:"100%"}} value={item?.question} onChange={(e:any)=>{
                                // setQuestions([...questions,questions[i].question=e?.target?.value])     
                                let ques = [...questions]
                                ques[i] = { ...ques[i], question: e?.target?.value }
                                setQuestions(ques)                           
                             }}/>
                            </div>
                        </div>
                      </div>
                 </div>
                    {item?.question_type == 'True or false' && (
                      <div className='row mt-5 mx-auto'>
                        {item?.options?.map((option: any, j: any) => (
                          <div
                            key={j}
                            className='row align-items-center mb-2'>
                            <div className='col-1'>
                              <h3>{String.fromCharCode(65 + j)}</h3>
                            </div>
                            <div className='col-10 bg-light p-3 mt-2 '>
                              <h2>
                                {option?.options}
                              </h2>
                            </div>
                            <div className='col-1'>
                              <input
                                name={`right_option${i}`}
                                type={'radio'}
                                // value={0}
                                value=""
                                checked={option?.right_option == true}
                                onChange={async (e: any) => {
                                  const data = [...questions]
                                  data[i].options.map((x: any, j: any) => {
                                    data[i].options[j].right_option = false
                                  })
                                  data[i].options[j].right_option = e.currentTarget.checked
                                  setQuestions(data)
                                }}
                                id={`right_option${i}`}
                                className={clsx('form-check-input')}
                                autoComplete='off'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}


                    
                    {item?.question_type == 'Multiple Choice' && (
                      <>
                        <div className='row mt-5 mx-auto'>
                          {item?.options?.map((option: any, j: any) => (
                            <div
                              key={j}
                              className=' align-items-center mt-1  d-flex align-items-center'
                            >
                              <div className=' p-2 mt-2'>
                                <h3>{String.fromCharCode(65 + j)}</h3>
                              </div>
                              <div className=' p-2 mt-2 w-100'>
                                <input
                                  type="text"
                                  style={{background:"#fff"}}
                                  value={option?.options}
                                  className='form-control'
                                  onChange={(e) => {
                                    let ques = [...questions]
                                    ques[i].options[j].options = e.target.value
                                    setQuestions(ques)
                                  }}
                                />
                              </div>
                              <div className='p-2 mt-2'>
                                  <input
                                    name={`right_option${i}`}
                                    type={'radio'}
                                    // value={0}
                                    value=""
                                    checked={option?.right_option == true}
                                    onChange={async (e: any) => {
                                      const data = [...questions]
                                      data[i].options.map((x: any, l: any) => {
                                        data[i].options[l].right_option = false
                                      })
                                      data[i].options[j].right_option = e.currentTarget.checked
                                      setQuestions(data)
                                    }}
                                    id={`right_option${i}`}
                                    className={clsx('form-check-input')}
                                    autoComplete='off'
                                  />
                                
                              </div>
                              {j == item?.options.length - 1 && item?.options?.length>3 &&
                                <div className='col-md-1' style={{ cursor: 'pointer' }} onClick={() => {
                                  let data = [...questions]
                                  data[i].options.splice(j, 1)
                                  setQuestions(data)
                                }}>
                                  <AiFillDelete style={{color:"red",fontSize:"20px",cursor:"pointer"}}/>
                                </div>}
                            </div>
                          ))}
                        </div>
                        {
                          item?.options?.length<8 && <div className='d-flex flex-row-reverse mt-2' style={{ width: '93%', cursor: 'pointer' }} onClick={() => {
                            let data = [...questions]
                            data[i].options.push({ options: '', right_option: false })
                            setQuestions(data)
                          }}>
                            <p style={{ color: '#369ff7' }}>Add More Options</p>
                          </div>
                        }
                        
                      </>
                    )}
                  </div>
                ))}















                <div className='text-center mt-11'>
                  <button
                    type='button'
                    onClick={addQuestion}
                    className='btn btn-primary me-3'
                  >
                    Add more questions
                  </button>
                </div>
              </div>
              <div className='col-md-3 ' style={{position:"fixed",top:"100px",right:"0px",height:"80vh"}}>
                <h5>Question Type</h5>
                <select
                  name={`questions[${selected}].question_type`}
                  onChange={(e: any) => {
                    let ques = [...questions]
                    if (e.target.value == 'True or false') {
                      ques[selected].options.splice(2, ques[selected].options.length)
                      ques[selected].options = ques[selected].options.flatMap(
                        (x: any, i: any) => [
                          {
                            options: i == 0 ? 'True' : 'False',
                            right_option: false,
                          },
                        ]
                      )
                    } else {
                      if (ques[selected].options.length == 2) {
                        ques[selected].options = ques[selected].options.flatMap(
                          (x: any, i: any) => [
                            {
                              options: '',
                              right_option: false,
                            },
                          ]
                        )
                        ques[selected].options.push({ options: '', right_option: false }, { options: '', right_option: false })
                      }
                    }
                    ques[selected] = { ...ques[selected], question_type: e.target.value }
                    setQuestions(ques)
                  }}
                  className='form-select mb-2'
                  value={questions[selected]?.question_type}
                >
                 <option>Multiple Choice</option>
                  <option>True or false</option>
                </select>
                <h5 className='mt-5'>Time Limit</h5>
                <select
                  name={`questions[${selected}].time_limit`}
                  className='form-select mb-2'
                  onChange={(e: any) => {
                    let ques = [...questions]
                    ques[selected] = { ...ques[selected], time_limit: e.target.value }
                    setQuestions(ques)
                  }}
                  value={questions[selected]?.time_limit}
                >
                  <option>10 seconds</option>
                  <option>20 seconds</option>
                  <option>30 seconds</option>
                  <option>60 seconds</option>
                    <option>90 seconds</option>
                    <option>120 seconds</option>
                </select>
                <h5 className='mt-5'>Points</h5>
                <select
                  name={`questions[${selected}].points`}
                  className='form-select mb-2'
                  onChange={(e: any) => {
                    let ques = [...questions]
                    ques[selected] = { ...ques[selected], points: e.target.value }
                    setQuestions(ques)
                  }}
                  value={questions[selected]?.points}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>5</option>
                </select>
                
                <div className="d-flex flex-column">
               {permissionlist?.can_edit && <button className="btn btn-success mt-5" onClick={(e:any)=>{
                  e.preventDefault()
                  validateTemplate()
                }}>Update Template</button>}
                {permissionlist?.can_delete &&  <button className="btn btn-danger mt-5" onClick={(e:any)=>{
                  e.preventDefault()
                  deleteTemplate()
                }}>Delete Template</button>}
                </div>
               
              </div>
            </div>
          </form>
        




         
    </div>
  </div>
  )
}

export default EditTemplate
