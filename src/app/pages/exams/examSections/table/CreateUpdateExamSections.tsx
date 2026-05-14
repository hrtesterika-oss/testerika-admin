import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToastComp from '../../../conferenceQuiz/userList/ToastComp';
import { PASSESURL, createUpdateSubPackages, getALlExamCourses, getSubPackageById } from '../core/_requests';
import { ErrorMessage } from 'formik';
import { useCommonData } from '../../../question-bank/users-list/commonData/CommonDataProvider';
import ToatComp from '../../../conferenceQuiz/blog/ToatComp';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const CreateUpdateExamSections = () => {
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [passType, setPassType] = useState<any[]>([])
  const params = useParams()
  const { allCourses, allSubjects } = useCommonData()
  const [subject_ids, setSubject_ids] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>(allSubjects)
  let [createPackage, setCreatePackage] = useState<any>({
    id: undefined,
    section_name: "",
    instruction: "",
    instruction_duration: 0,
    duration: 0,
    examid: undefined,
    subjects_id: { label: "", value: "" },
    memoryTest:"Yes",
    memory_duration:1,
    memoryQuestion:""
  })

  const navigate = useNavigate()


  useEffect(() => {
    if (allCourses && allSubjects) {
      setSubjects(allSubjects)
    }
  }, [allCourses, allSubjects])

  const { staffPermission, navItem } = useSelector((state: any) => state.reducerData)
  const filterStaffPermission = async (title: string) => {
    let result = staffPermission.filter((item: any) => item.permission_name === title && item)
    if (!result[0]?.can_create && !result[0]?.can_edit) navigate("/packages/packages")
  }
  useEffect(() => {
    filterStaffPermission(navItem?.item)
  }, [navItem])

  const getAllExamCourses = async () => {
    const { data } = await getALlExamCourses(params?.id)
    if (data?.success) {
      let allCoursesIds = data?.data?.map((item: any) => item?.courseid)
      let temp: any[] = []
      allSubjects?.map((item: any) => {
        let parseIds = JSON.parse(item?.course_ids)
        if (parseIds?.length > 0) {
          let dataItem = (parseIds?.some((item: any) => allCoursesIds?.includes(item)))
          if (dataItem) {
            temp.push(item?.id)
            let temp2 = [...temp, item?.id]
            setSubject_ids([...temp2])
          }
        }
      })
    } else {
      ToastComp({ message: "Something went wrong", type: "Error" })
      navigate("/exams/exams")
    }
  }

  const findExamsSectionById = async (id: any) => {
    try {
      const { data } = await getSubPackageById(id)
      if (data?.success) {
        let payload = {
          id: params?.section_id,
          examid: params?.id,
          section_name: data?.data?.section_name,
          instruction_duration: data?.data?.instruction_duration,
          duration: data?.data?.duration,
          instruction: data?.data?.instruction,
          subjects_id: allSubjects?.find((item: any) => item?.id == data?.data?.subjectid),
          memoryTest:data?.data?.memoryTest==1?"Yes":"No",
          memoryQuestion:data?.data?.memoryTest==1?data?.data?.memoryQuestion:"",
          memory_duration:data?.data?.memory_duration
        }
        setCreatePackage(payload)
        setTimeout(()=>{
           setLoading(false)
        },1000)
      } else {
        navigate(`/exams/exam-sections/${params?.id}`)
      }
    } catch (err) {
      navigate(`/exams/exam-sections/${params?.id}`)
    }
  }

useEffect(()=>{
  setTimeout(()=>{
      setLoading(false)
  },2000)
},[])

  const submitNewPass = async (type: string) => {
    if (createPackage?.section_name?.trim() == "") {
      ToastComp({ message: "Exam Section Name should not be empty", type: "Error" })
      return false
    }
    if (createPackage?.instruction?.trim() == "") {
      ToastComp({ message: "Exam Section Instruction should not be empty", type: "Error" })
      return false
    }
    else if (createPackage?.duration <= 0) {
      ToastComp({ message: "Exam Section Duration must be greater than 0", type: "Error" })
      return false
    }
    else if (createPackage?.instruction_duration <= 0) {
      ToastComp({ message: "Exam Section Instruction Duration must be greater than 0", type: "Error" })
      return false
    }

    else if (!createPackage?.subjects_id?.id) {
      ToastComp({ message: "Select Exam Section Subject", type: "Error" })
      return false
    }
    else if (createPackage?.memoryTest==1 && (!createPackage?.memoryQuestion || createPackage?.memoryQuestion=="")) {
      ToastComp({ message: "Enter Memory test Question", type: "Error" })
      return false
    }
    else {
      if (type == "update") {
        let payload = {
          id: params?.section_id,
          section_name: createPackage?.section_name,
          duration: createPackage?.duration,
          subjectid: createPackage?.subjects_id?.id,
          instruction_duration: createPackage?.instruction_duration,
          instruction: createPackage?.instruction,
          examid: params?.id,
          memoryTest:createPackage?.memoryTest=="Yes"?1:0,
          memoryQuestion:createPackage?.memoryTest=="Yes"?createPackage?.memoryQuestion:null,
          memory_duration:createPackage?.memoryTest=="Yes"?createPackage?.memory_duration:null
        }
        const { data } = await createUpdateSubPackages(payload)
        if (data?.success) {
          ToastComp({ message: "Exam Section Updated Successfully", type: "Success" })
          navigate(`/exams/exam-sections/${params?.id}`)
        } else {
          ToastComp({ message: "Something went wrong.Please try again", type: "Error" })
        }
      } else {
        let payload = {
          id: undefined,
          section_name: createPackage?.section_name,
          duration: createPackage?.duration,
          subjectid: createPackage?.subjects_id?.id,
          instruction_duration: createPackage?.instruction_duration,
          instruction: createPackage?.instruction,
          examid: params?.id,
          memoryTest:createPackage?.memoryTest=="Yes"?1:0,
          memoryQuestion:createPackage?.memoryTest=="Yes"?createPackage?.memoryQuestion:null,
          memory_duration:createPackage?.memoryTest=="Yes"?createPackage?.memory_duration:null

        }
        const { data } = await createUpdateSubPackages(payload)
        if (data?.success) {
          ToastComp({ message: "Exam Section Created Successfully", type: "Success" })
          navigate(`/exams/exam-sections/${params?.id}`)
        } else {
          ToastComp({ message: "Something went wrong.Please try again", type: "Error" })
        }
      }
    }



  }
  useEffect(() => {
    if (params?.id && allCourses && allSubjects && params?.section_id) {
      findExamsSectionById(params?.section_id)
    }
  }, [params, allCourses, allSubjects])

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setLoading(false)
  //   }, 200)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  useEffect(() => {
    if (params?.id && allCourses && allSubjects) {
      getAllExamCourses()
    }
  }, [params, allCourses, allSubjects])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ]
      },
    }),
    []
  )

  return (
    <div className="container">
      <div className="row">

        {
          loading ? <div className="row">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
              <h2>Loading...</h2>
            </div>
          </div> :
            <div className="col-12">
              <form className="my-1">
                <div className="row">


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Exam Section Name</label>

                    <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.section_name} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, section_name: e?.target?.value })
                    }} placeholder="Enter Exam Section Name" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Subject</label>

                    <Select
                      options={subjects?.filter((item: any) => subject_ids?.includes(item?.id))}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      // isSearchable={true}
                      // onChange={(e, i) => {
                      //    const ids = e.flatMap((item:any, i:number) =>[item.id])
                      //    getSubject(ids)
                      //    setQuestionDetails({...questionDetail,course:e})
                      //    setSelectedCourses(e)
                      //  }}
                      value={createPackage?.subjects_id}
                      getOptionLabel={(option: any) => option.subject_name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, subjects_id: e })
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>




                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Exam Section Duration (in Minutes)</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.duration} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, duration: e?.target?.value })
                    }} placeholder="Exam Section Duration" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Section Instruction Duration (in Minutes)</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.instruction_duration} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, instruction_duration: e?.target?.value })
                    }} placeholder="Exam Section Instruction Duration" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                    <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Memory Test</label>

                    <select className='form-control form-select p-2' value={createPackage?.memoryTest} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, memoryTest: e?.target?.value })
                    }} >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                    {createPackage?.memoryTest=="Yes" && <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Memory Test Duration (in Minutes)</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.memory_duration} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, memory_duration: e?.target?.value })
                    }} placeholder="Exam Section Instruction Duration" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>}

                    {createPackage?.memoryTest=="Yes" && <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Memory Test Question</label>

                    <ReactQuill
                      value={createPackage?.memoryQuestion} onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, memoryQuestion: e })
                      }}
                      id='description'
                      modules={modules}
                    />

                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>}

                  <div className="col-md-12 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Exam Section Instruction</label>

                    <ReactQuill
                      value={createPackage?.instruction} onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, instruction: e })
                      }}
                      id='description'
                      modules={modules}
                    />

                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-12 d-flex flex-column">
                    {!params?.section_id && <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e: any) => {
                      e?.preventDefault()
                      submitNewPass("create")
                    }}>Create Exam Sections</button>}
                    {params?.section_id && <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e: any) => {
                      e?.preventDefault()
                      submitNewPass("update")
                    }}>Update Exam Sections</button>}

                  </div>
                </div>

              </form>

            </div>
        }

      </div>
    </div>
  )
}


export default CreateUpdateExamSections