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
import DateTimePickerComponent from './common/DateTimePicker';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const resultPublishInstantly: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]

const negativeMarking: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]

const questionSuffling: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]
const optionSuffling: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]
const sectionWiseTime: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]
const saveInDraft: any[] = [{
  value: 'YES', label: 'YES'
}, {
  value: 'NO', label: 'NO'
}
]

const attemptLimit: any[] = [{
  value: '1', label: '1'
},{
  value: '2', label: '2'
},{
  value: '3', label: '3'
},{
  value: '4', label: '4'
}, {
  value: '5', label: '5'
},
{
  value: '10', label: '10'
},
{
  value: '15', label: '15'
},
{
  value: '20', label: '20'
},{
  value: '25', label: '25'
},{
  value: '30', label: '30'
},{
  value: '35', label: '35'
},{
  value: '40', label: '40'
},{
  value: '45', label: '45'
},{
  value: '50', label: '50'
},{
  value: '55', label: '55'
},{
  value: '60', label: '60'
},{
  value: '70', label: '70'
},{
  value: '80', label: '80'
},{
  value: '90', label: '90'
},{
  value: '100', label: '100'
},{
  value: '125', label: '125'
},{
  value: '150', label: '150'
},{
  value: '200', label: '200'
},{
  value: '300', label: '300'
}
]
const skipButton: any[] = [{
  value: 'Yes', label: 'Yes'
}, {
  value: 'No', label: 'No'
}
]

const registration_open: any[] = [{
  value: 'Yes', label: 'Yes'
}, {
  value: 'No', label: 'No'
}
]

const CreateUpdateExam = () => {
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [passType, setPassType] = useState<any[]>([])
  const params = useParams()
  const { allCourses, allSubjects } = useCommonData()
  const [courses, setCourses] = useState<any[]>(allCourses)
  const [examTypes, setAllExamTypes] = useState<any[]>([])
  let [createPackage, setCreatePackage] = useState<any>({
    id: undefined,
    name: "",
    courses: [],
    draft: { label: "NO", value: "NO" },
    exam_type: undefined,
    exam_duration: 60,
    total_questions: 10,
    skip_button: {label:"No",value:"No"},
    registration_exam: {label:"No",value:"No"},
    reg_start_date:undefined,
    reg_end_date:undefined,
    total_marks: 10,
    negative_marking: { label: "NO", value: "NO" },
    result_publish_instantly: { label: "NO", value: "NO" },
    result_publish_date: undefined,
    question_suffling: { label: "YES", value: "YES" },
    option_suffling: { label: "YES", value: "YES" },
    key: "",
    section_wise_time: { label: "YES", value: "YES" },
    attempt_limit: { label: 1, value: 1 },
    instructions: ""
  })
  const modules = {
    toolbar: [
      [{
        header: [1, 2, 3, 4, 5, 6, false]
      }],
      [{ 'color': [] }, { 'background': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'align': [] }],
      ['clean'],
      [{ 'font': [] }], // Add font-family option
      [{ 'table': [] }], // Add table option
    ],
  }
  const navigate = useNavigate()


  useEffect(() => {
    if (allCourses && allSubjects) {
      setCourses(allCourses)
    }
  }, [allCourses, allSubjects])

  const { staffPermission, navItem } = useSelector((state: any) => state.reducerData)
  const filterStaffPermission = async (title: string) => {
    let result = staffPermission.filter((item: any) => item.permission_name === title && item)
    // if (!result[0]?.can_create && !result[0]?.can_edit) navigate("/packages/packages")
  }
  useEffect(() => {
    filterStaffPermission(navItem?.item)
  }, [navItem])

  const getAllExamTypes = async () => {
    const { data } = await getAllSubPackagesData()
    if (data?.success) {
      setAllExamTypes(data?.data)
    } else {
      ToastComp({ message: "Something went wrong", type: "Error" })
    }
  }

  const findExamsById = async (id: any) => {
    try {
      const { data } = await getSubPackageById(id)
      if (data?.success) {
        let courseId = data?.data?.examcourses?.map((item: any) => item?.courseid)
        if (courseId && allCourses) {
          setCreatePackage({
            id: params?.id ? params?.id : undefined,
            exam_type: examTypes?.find((item: any) => data?.data?.examtypesid == item?.id),
            exam_duration: data?.data?.exam_duration,
            total_questions: data?.data?.total_questions,
            total_marks: data?.data?.total_marks,
            skip_button: {label:data?.data?.skip_button,value:data?.data?.skip_button},
            registration_exam: {label:data?.data?.registration_exam,value:data?.data?.registration_exam},
            reg_start_date:data?.data?.reg_start_date,
            reg_end_date:data?.data?.reg_end_date,
            negative_marking: data?.data?.negative_marking == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            draft: data?.data?.draft == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            result_publish_instantly: data?.data?.result_publish_instantly == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            result_publish_date: data?.data?.result_publish_date,
            question_suffling: data?.data?.question_suffling == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            option_suffling: data?.data?.option_suffling == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            section_wise_time: data?.data?.section_wise_time == 1 ? { label: "YES", value: "YES" } : { label: "NO", value: "NO" },
            attempt_limit: data?.data?.attempt_limit ? { label: data?.data?.attempt_limit, value: data?.data?.attempt_limit } : { label: 1, value: 1 },
            name: data?.data?.name,
            instructions: data?.data?.instructions,
            courses: allCourses?.filter((item: any) => courseId?.includes(item?.id)),
          })
        }

      } else {
        navigate("/exams/exams")
      }
    } catch (err) {
      navigate("/exams/exams")
    }
  }



  const submitNewPass = async () => {
    if (createPackage?.name?.trim() == "") {
      ToastComp({ message: "Exam Name should not be empty", type: "Error" })
      return false
    }
    else if (!createPackage?.exam_type) {
      ToastComp({ message: "Exam Type should not be empty", type: "Error" })
      return false
    }

    else if (createPackage?.courses?.length <= 0) {
      ToastComp({ message: "Exam Courses should not be empty", type: "Error" })
      return false
    }
    else if (createPackage?.exam_duration <= 0) {
      ToastComp({ message: "Exam Duration must be greater than 0", type: "Error" })
      return false
    }
    else if (createPackage?.total_questions <= 0) {
      ToastComp({ message: "Total QUestions must be greater than 0", type: "Error" })
      return false
    }
    else if (createPackage?.total_marks <= 0) {
      ToastComp({ message: "Total Marks must be greater than 0", type: "Error" })
      return false
    }
    else if (createPackage?.result_publish_instantly?.value == "NO" && !createPackage?.result_publish_date) {
      ToastComp({ message: "Result Publish Date can't be empty", type: "Error" })
      return false
    }
    else if (createPackage?.instructions?.trim() == "") {
      ToastComp({ message: "Exam Instructions can't be empty", type: "Error" })
      return false
    } else {
      if (params?.id) {
        let payload = {
          id: params?.id ? params?.id : undefined,
          name: createPackage?.name,
          examtypesid: createPackage?.exam_type?.id,
          exam_duration: createPackage?.exam_duration,
          total_questions: createPackage?.total_questions,
          total_marks: createPackage?.total_marks,
          skip_button: createPackage?.skip_button?.value,
          registration_exam: createPackage?.registration_exam?.value,
          reg_start_date:createPackage?.reg_start_date,
          reg_end_date:createPackage?.reg_end_date,
          negative_marking: createPackage?.negative_marking?.value == "YES" ? 1 : 0,
          draft: createPackage?.draft?.value == "YES" ? 1 : 0,
          result_publish_instantly: createPackage?.result_publish_instantly?.value == "YES" ? 1 : 0,
          result_publish_date: createPackage?.result_publish_date,
          question_suffling: createPackage?.question_suffling?.value == "YES" ? 1 : 0,
          option_suffling: createPackage?.option_suffling?.value == "YES" ? 1 : 0,
          section_wise_time: createPackage?.section_wise_time?.value == "YES" ? 1 : 0,
          attempt_limit: createPackage?.attempt_limit?.value,
          instructions: createPackage?.instructions,
          courses_ids: createPackage?.courses?.map((item: any) => item?.id)
        }
        const { data } = await createUpdateSubPackages(payload)
        if (data?.success) {
          ToastComp({ message: "Exams Updated Successfully", type: "Success" })
          navigate("/exams/exams")
        } else {
          ToastComp({ message: "Something went wrong.Please try again", type: "Error" })
        }

      } else {
        let payload = {
          id: params?.id ? params?.id : undefined,
          name: createPackage?.name,
          examtypesid: createPackage?.exam_type?.id,
          exam_duration: createPackage?.exam_duration,
          total_questions: createPackage?.total_questions,
          total_marks: createPackage?.total_marks,
          skip_button: createPackage?.skip_button?.value,
          registration_exam: createPackage?.registration_exam?.value,
          reg_start_date:createPackage?.reg_start_date,
          reg_end_date:createPackage?.reg_end_date,
          negative_marking: createPackage?.negative_marking?.value == "YES" ? 1 : 0,
          draft: createPackage?.draft?.value == "YES" ? 1 : 0,
          result_publish_instantly: createPackage?.result_publish_instantly?.value == "YES" ? 1 : 0,
          result_publish_date: createPackage?.result_publish_date,
          question_suffling: createPackage?.question_suffling?.value == "YES" ? 1 : 0,
          option_suffling: createPackage?.option_suffling?.value == "YES" ? 1 : 0,
          section_wise_time: createPackage?.section_wise_time?.value == "YES" ? 1 : 0,
          attempt_limit: createPackage?.attempt_limit?.value,
          instructions: createPackage?.instructions,
          courses_ids: createPackage?.courses?.map((item: any) => item?.id)
        }
        const { data } = await createUpdateSubPackages(payload)
        if (data?.success) {
          ToastComp({ message: "Exam Created Successfully", type: "Success" })
          navigate("/exams/exams")
        } else {
          ToastComp({ message: "Something went wrong.Please try again", type: "Error" })
        }
      }
    }

  }
  useEffect(() => {
    if (params?.id && allCourses && examTypes) {
      findExamsById(params?.id)
    }
  }, [params, allCourses, examTypes])

  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false)
    }, 200)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    getAllExamTypes()
  }, [params])


  const getDateAndTyme = (data: any) => {
    setCreatePackage({ ...createPackage, result_publish_date: data })
  }
  const getDateAndTimeRegStartDate = (data: any) => {
    setCreatePackage({ ...createPackage, reg_start_date: data })
  }
  const getDateAndTimeRegEndDate = (data: any) => {
    setCreatePackage({ ...createPackage, reg_end_date: data })
  }



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
                    <label className="required fs-6 fw-semibold mb-1">Exam Name</label>

                    <input type="text" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.name} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, name: e?.target?.value })
                    }} placeholder="Enter Exam Name" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Exam Type</label>

                    <Select
                      options={examTypes}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={createPackage?.exam_type}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, exam_type: e })
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Courses</label>

                    <Select
                      options={courses}
                      isMulti
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
                      value={createPackage?.courses}
                      getOptionLabel={(option: any) => option.course_name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, courses: e })
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Exam Duration (in Minutes)</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.exam_duration} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, exam_duration: e?.target?.value })
                    }} placeholder="Exam Duration" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Total Questions</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.total_questions} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, total_questions: e?.target?.value })
                    }} placeholder="Total Questions" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Total Marks</label>

                    <input type="number" className="form_style form-control form-control-solid fw-bolder" style={{ background: "#f2f2f2" }} value={createPackage?.total_marks} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, total_marks: e?.target?.value })
                    }} placeholder="Total Marks" name="first-name" />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Negative Marking</label>

                    <Select
                      options={negativeMarking}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={createPackage?.negative_marking}
                      onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, negative_marking: e })
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Result Publish Instantly</label>

                    <Select
                      options={resultPublishInstantly}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={createPackage?.result_publish_instantly}
                      onChange={(e: any) => {
                        if (e?.value == "YES") {
                          setCreatePackage({ ...createPackage, result_publish_instantly: e, result_publish_date: null })
                        } else {
                          setCreatePackage({ ...createPackage, result_publish_instantly: e })
                        }
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  {createPackage?.result_publish_instantly?.value == "NO" ? <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Result Publish Date</label>

                    <DateTimePickerComponent getDateAndTyme={getDateAndTyme} dateValue={createPackage?.result_publish_date} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> : ""}

                    <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Registration Exam</label>

                    <Select
                      options={registration_open}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={createPackage?.registration_exam}
                      onChange={(e: any) => {
                        if (e?.value == "YES") {
                          setCreatePackage({ ...createPackage, registration_exam: e, reg_start_date: null,reg_end_date: null })
                        } else {
                          setCreatePackage({ ...createPackage,  registration_exam: e, reg_start_date: null,reg_end_date: null })
                        }
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  {createPackage?.registration_exam?.value == "Yes" ? <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Registration Start Date</label>

                    <DateTimePickerComponent getDateAndTyme={getDateAndTimeRegStartDate} dateValue={createPackage?.reg_start_date} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> : ""}


                    {createPackage?.registration_exam?.value == "Yes" ? <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Registration End Date</label>

                    <DateTimePickerComponent getDateAndTyme={getDateAndTimeRegEndDate} dateValue={createPackage?.reg_end_date} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div> : ""}

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Question Suffling</label>

                    <Select options={questionSuffling} value={createPackage?.question_suffling} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, question_suffling: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Option Suffling</label>

                    <Select options={optionSuffling} value={createPackage?.option_suffling} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, option_suffling: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Section Wise Time</label>

                    <Select options={sectionWiseTime} value={createPackage?.section_wise_time} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, section_wise_time: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>


                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Attempt Limit</label>

                    <Select options={attemptLimit} value={createPackage?.attempt_limit} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, attempt_limit: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>
                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Save in Draft</label>

                    <Select
                      options={saveInDraft}
                      name='courses'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={createPackage?.draft}
                      onChange={(e: any) => {
                        setCreatePackage({ ...createPackage, draft: e })
                      }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-md-4 fv-row fv-plugins-icon-container mt-3">
                    <label className="required fs-6 fw-semibold mb-1">Skip Button Visible or Not</label>

                    <Select options={skipButton} value={createPackage?.skip_button} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, skip_button: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>

                  <div className="col-12 my-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-1">Exam Instructions</label>

                    <ReactQuill theme="snow" modules={modules} value={createPackage?.instructions} onChange={(e: any) => {
                      setCreatePackage({ ...createPackage, instructions: e })
                    }} />
                    <div className="fv-plugins-message-container mb-1 invalid-feedback"></div></div>



                  <div className="col-12 d-flex flex-column">
                    <button className="btn btn-success mt-5 text-center mx-auto" onClick={(e: any) => {
                      e?.preventDefault()
                      submitNewPass()
                    }}>{params?.id ? "Update" : "Create"} Exam</button>

                  </div>
                </div>

              </form>

            </div>
        }

      </div>
    </div>
  )
}


export default CreateUpdateExam