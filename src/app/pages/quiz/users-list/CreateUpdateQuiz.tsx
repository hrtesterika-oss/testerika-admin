import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useCommonData } from '../commonData/CommonDataProvider'
import Select from 'react-select'
import * as Yup from 'yup'
import { createUser, getAllCourses, getAllSubjects, getQuizTypes, getUserById } from './core/_requests'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errrorMessage, successMessage, warningMessage } from '../../../modules/auth/components/ToastComp'
import { useNavigate, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
type quizTypeInterface={
    id:number | undefined,
    quiz_type_id:number | undefined,
    subject_id:number | undefined,
    subject:any,
    course_id:any[],
    name:string | undefined,
    courses:any,
    quiz_type:string | undefined,
    duration:number | undefined,
    marks:number ,
    questionSelectionType:any[],
    total_questions:number ,
    quizQuestionAddedChoice:any,
    language:{label:string,value:string}[],
    question_visibility:number,
    prize:{
      total_spots:number ,
      entry_fee:number ,
      first_prize:number ,
      prize_pool:number ,
      total_winner_percentage:number ,
      prize_distribution_percentage:number ,
      entry_fee_algo:number ,
      prize_algo_id:number ,
      id?:number | undefined,
      quiz_id?:number | undefined,
    },
    dates:{
      id:number | undefined,
      quiz_id?:number | undefined,
      question_time:number ,
      reg_open_date:Date,
      start_date:Date,
      result_publish_date:Date
    }
}

let initialvalue={
  id:undefined,
  quiz_type_id:undefined,
  subject_id:undefined,
  course_id:[],
  courses:[],
  name:"",
  quiz_type:"",
  subject:{},
  duration:0,
  marks:0,
  total_questions:0,
  question_visibility:1,
  language:[],
   quizQuestionAddedChoice:{label:"Choices",value:"Choices"},
   questionSelectionType:[{label:"Any",value:"Any"}],
  prize:{
    total_spots:0,
    entry_fee:0,
    first_prize:0,
    prize_pool:0,
    total_winner_percentage:0,
    prize_distribution_percentage:0,
    entry_fee_algo:0,
    prize_algo_id:0,
    id:undefined,
    quiz_id:undefined,
  },
  dates:{
    id:undefined,
    quiz_id:undefined,
    question_time:0,
    reg_open_date:new Date(),
    start_date:new Date(),
    result_publish_date:new Date()
  }
}

const CreateUpdateQuiz = () => {
  const {allCourses, allSubjects} = useCommonData()
  const [selectedCourses, setSelectedCourses] = useState<any>([])
  const [quizType, setQuizType] = useState<any>([])
  const [selectedLang, setSelectedLang] = useState<any>([])
  const [courses,setCourses]=useState<Array<any[]>>(allCourses)
  const [subjects, setSubjects] = useState<Array<any[]>>(allSubjects)
  const [startDate,setStartDate]=useState<any>(new Date())
  const [quizDetail,setQuizDetail]=useState<quizTypeInterface>(initialvalue)
  const [load,setLoad]=useState<any>(false)
  const [load2,setLoad2]=useState<any>(false)
  const [language,setLanguage]=useState("English")
  const params=useParams()
  const [questionVisible,setQuestionVisible]=useState<any>({
    label:"All At Once",
    value:"All At Once"
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
    useEffect(()=>{
      if(!permissionList?.can_edit && !permissionList?.can_create){
       navigate("/quiz/quiz")
      }
   },[permissionList])
  const navigate=useNavigate()
  
    const options = [
    {label: 'Hindi', value: 'Hindi'},
    {label: 'English', value: 'English'},
  ]

  const QuizQuestionAddedoption = [
    {label: 'Random', value: 'Random'},
    {label: 'Choices', value: 'Choices'},
  ]

  const questionSelectionForQuiz = [
    {label: 'Not Used Yet (Fresh)', value: 'Not Used Yet (Fresh)'},
    {label: 'Used less than 5 times', value: 'Used less than 5 times'},
    {label: 'Used less than 10 times', value: 'Used less than 10 times'}, 
    {label: 'Used less than 15 times', value: 'Used less than 15 times'},
    {label: 'Used less than 20 times', value: 'Used less than 20 times'},
    {label: 'Any', value: 'Any'},
  ]

  const visibility = [
    {label: 'All At Once', value: 'All At Once'},
    {label: 'One By One', value: 'One By One'}
  ]

  let updateAllSubjectdata:any[]=[]
  let updateAllCoursesdata:any[]=[]

 

  const getData = async () => {
    await getAllSubjects()
      .then((data) => {
        updateAllSubjectdata=(data)
        setSubjects(data)
      })
      .catch((err) => {
        console.log(err)
      })
    await getAllCourses()
      .then((data) => {
        updateAllCoursesdata=(data)
        setCourses(data)
        getQuizInfo()
       })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    quizTypes()
    if(params?.id){
        setLoad2(true)
        getData()    
    }
  }, [])

  const getQuizInfo=async ()=>{
     const data=await getUserById(Number(params?.id))
     let ids=(data?.courses?.map((item:any)=>item?.course_id))
     let result=updateAllCoursesdata?.filter((item:any)=>{
      if(ids?.includes(item?.id)){
        return item
      }
     })
     setSelectedCourses(result)
     if(data?.question_visibility==1){
      setQuestionVisible({value:"All At Once",label:"All At Once"})
     }else{
      setQuestionVisible({value:"One By One",label:"One By One"})

     }
     setQuizDetail(
      {
        id:data?.id?data?.id:undefined,
        quiz_type_id:data?.quiz_type_id,
        subject_id:data?.subject_id,
        course_id:data?.courses?.map((item:any)=>item?.course_id),
        courses:result,
        name:data?.name,
        quiz_type:quizType?.filter((item:any)=>item?.id==data?.quiz_type_id)[0]?.quiz_type,
        subject:updateAllSubjectdata?.filter((item:any)=>item?.id===data?.subject_id)[0],
        duration:data?.duration,
        marks:data?.marks || 0,
        total_questions:data?.total_questions || 0,
        question_visibility:data?.question_visibility || 1,
        language:data?.language?.split(",")?.map((item:any)=>{
             return {label:item,value:item}
        }) || [],
         quizQuestionAddedChoice:{label:data?.question_choices || "Choices",value:data?.question_choices || "Choices"},
         questionSelectionType:JSON.parse(data?.question_added_to_quiz_type),
        prize:{
          total_spots:data?.prize?.total_spots,
          entry_fee:data?.prize?.entry_fee,
          first_prize:data?.prize?.first_prize,
          prize_pool:data?.prize?.prize_pool,
          total_winner_percentage:data?.prize?.total_winner_percentage,
          prize_distribution_percentage:data?.prize?.prize_distribution_percentage,
          entry_fee_algo:data?.prize?.entry_fee_algo,
          prize_algo_id:data?.prize?.prize_algo_id,
          id:data?.prize?.id,
          quiz_id:data?.prize?.quiz_id,
        },
        dates:{
          id:data?.dates?.id || undefined,
          quiz_id:data?.dates?.quiz_id,
          question_time:data?.dates?.question_time,
          reg_open_date:new Date(data?.dates?.reg_open_date),
          start_date:new Date(data?.dates?.start_date),
          result_publish_date:new Date(data?.dates?.result_publish_date)
        }
      })
      getSubject(ids)
      setTimeout(()=>{
        setLoad2(false)
      },2000)
  }

  const getSubject = async (ids: any) => {
    setLoad(true)
   let courseIdsArr= allSubjects?.map((x: any) =>{
      let courseIds=JSON.parse(x.course_ids)
      return ids?.map((item2:any)=>{
          if(courseIds?.includes(item2)){
              return x.id
          }
      })
   })

   let newArr:any[]=[]
   courseIdsArr?.map((item:any)=>{
       newArr=[...newArr,...item]
   })
   
   let set=new Set(newArr?.filter((item:any)=>item!==undefined))
    let finalArr=allSubjects?.filter((item:any)=>{
        return set?.has(item?.id)
    })
    setSubjects(finalArr)
    setTimeout(()=>{
      setLoad(false)
    },800) 
  }



  const quizTypes = async () => {
    await getQuizTypes()
      .then((data) => {
        setQuizType(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }





  const submitQuizData=async ()=>{
    if(!quizDetail?.name?.trim()){
         errrorMessage("Quiz name can't be empty")
    }else if(!quizDetail?.quiz_type_id){
      errrorMessage("Select Quiz Type")
    }else if(!quizDetail?.duration || quizDetail?.duration<1){
      errrorMessage("Quiz duration must be greater than 0")
    }else if(quizDetail?.language?.length<1){
      errrorMessage("Select Quiz Language")
    }else if(!quizDetail?.total_questions || quizDetail?.total_questions<1){
      errrorMessage("Number of questions must be greater than 0")
    }else if(quizDetail?.marks<1){
      errrorMessage("Quiz marks must be greater than 0")
    }
    // else if(quizDetail?.prize?.total_spots<1){
    //   errrorMessage("Quiz spot must be greater than 0")
    // }else if(quizDetail?.prize?.entry_fee<0){
    //   errrorMessage("Entry Fee can't be negative")
    // }
    else if(quizDetail?.courses?.length<1){
      errrorMessage("Please select quiz courses")
    }else if(!quizDetail?.subject){
      errrorMessage("Please select quiz subject")
    }
    // else if(quizDetail?.dates?.question_time<1){
    //   errrorMessage("Question time must be greater than 0")
    // }
    else if(!quizDetail?.dates?.start_date){
      errrorMessage("Select Quiz start date")
    }
    else if(quizDetail?.duration % 1 != 0){
        errrorMessage("Quiz Duration Must be an Integer")
    }
    // else if(!quizDetail?.dates?.reg_open_date){
    //   errrorMessage("Select Quiz Registration Open date")
    // }else if(!quizDetail?.dates?.result_publish_date){
    //   errrorMessage("Select Quiz Result Publish date")
    // }else if(quizDetail?.prize?.total_winner_percentage<0){
    //   errrorMessage("Total winner percentage can't be negative")
    // }else if(quizDetail?.prize?.prize_distribution_percentage<0){
    //   errrorMessage("Prize distribution percentage can't be negative")
    // }else if(quizDetail?.prize?.prize_pool<0){
    //   errrorMessage("Prize pool can't be negative")
    // }else if(quizDetail?.prize?.first_prize<0){
    //   errrorMessage("First prize can't be negative")
    // }
    else{
       console.log(quizDetail)
      setQuizDetail({...quizDetail,quiz_type:quizDetail?.quiz_type?.split("-")[0]})
      const data=await createUser(quizDetail)
      if(data.id){
        successMessage("Quiz Created Successfully")
        navigate("/quiz/quiz")
      }else{
        warningMessage(data)
      }
    }
  }







  return (
    <div className="container">
    <div className="row my-5">
        <div className="col-lg-12">
                    <div>
                        
                        <form>
                          {
                            load2 ?  <div ><Skeleton count={7} style={{height:"50px",margin:"10px"}} className="bg-secondary" /></div> :<>
                          
                          <div className="row gy-4">
                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Quiz Name</span>
                            </label>
                            <input name='name' className='form-control mb-2' value={quizDetail?.name} onChange={(e:any)=>{
                              setQuizDetail({...quizDetail,name:e?.target?.value})
                            }} placeholder='Enter quiz name' />
                          </div>

                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Quiz Type</span>
                            </label>
                            <select
                              name='quiz_type_id'
                              className='form-select mb-2'
                              data-control='select2'
                              data-hide-search='true'
                              placeholder='Select an option' 
                              value={quizDetail?.quiz_type}  
                               onChange={(e:any)=>{
                                // let id=Number(e?.target?.value?.split("-")[1])
                                // console.log(e?.target?.value)
                                let findQuizType=quizType?.find((item:any)=>item?.quiz_type==e?.target?.value)
                                if(findQuizType){
                                  setQuizDetail({...quizDetail,quiz_type_id:findQuizType?.id,quiz_type:e?.target?.value})
                                }
                              }}                          
                            >
                              <option selected={true}>Select Quiz Type</option>
                              {quizType?.map((item: any) => (
                                <option key={item.id} >
                                  {item.quiz_type}
                                </option>
                              ))}
                            </select>                          
                          </div>




                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Quiz Duration (Should be in minutes)</span>
                            </label>
                            <input
                                name='duration'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Quiz Duration'}
                                value={quizDetail?.duration}  
                                onChange={(e:any)=>{
                                 setQuizDetail({...quizDetail,duration:e?.target?.value})
                               }}   
                              />                  
                          </div>



                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Quiz Language</span>
                            </label>
                             <Select
                                isMulti
                                name='language'
                                options={options}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                value={quizDetail?.language}
                                onChange={(e: any, i: any) => {
                                  setQuizDetail({...quizDetail,language:e})
                                }}
                              />
                          </div>



                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>No. of Questions</span>
                            </label>
                            <input
                                name='total_questions'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Total Questions'}
                                value={quizDetail?.total_questions}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,total_questions:e?.target?.value})
                                }}
                              />
                          </div>


                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Total Marks</span>
                            </label>
                            <input
                              name='marks'
                              type='number'
                              className='form-control mb-2'
                              placeholder={'Enter Quiz Marks'}
                              value={quizDetail?.marks}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,marks:e?.target?.value})
                                }}
                            />
                          </div>


                          

                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Total Spots</span>
                            </label>
                            <input
                                name='total_spots'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter total Spot'}
                                value={quizDetail?.prize?.total_spots}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,total_spots:e?.target?.value}})
                                }}
                              />
                          </div> */}






                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Entry Fee</span>
                            </label>
                            <input
                              name='entry_fee'
                              type={'number'}
                              className='form-control mb-2'
                              placeholder={'Enter Entry Fee'}
                              value={quizDetail?.prize?.entry_fee}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,entry_fee:e?.target?.value}})
                                }}
                            />
                          </div> */}



                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Course</span>
                            </label>
                            <Select
                                isMulti
                                name='courses'
                                options={allCourses}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                onChange={(e, i) => {
                                  const ids = e.flatMap((item:any, i:number) => [item.id])
                                  getSubject(ids)
                                  setQuizDetail({...quizDetail,courses:e,course_id:ids})
                                  setSelectedCourses(e)
                                }}
                                value={selectedCourses}
                                getOptionLabel={(option: any) => option.course_name}
                                getOptionValue={(option: any) => option.id} 
                                // getOptionValue={(option: any) => option.id}
                              />
                          </div>



                          {
                            quizDetail?.courses?.length>0 && !load &&
                          

                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Subject</span>
                            </label>
                               <Select 
                                    options={subjects} 
                                    onChange={(e, i) => {
                                      console.log(e)
                                        setQuizDetail({...quizDetail,subject_id:e?.id,subject:e})
                                      }}
                                      value={quizDetail?.subject}
                                      getOptionLabel={(option: any) => option.subject_name}
                                        //  getOptionValue={(option: any) => option.subject_name}
                                    />
                          </div>
                           }



                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Question Time (Should be in seconds)</span>
                            </label>
                             <input
                                name='question_time'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Question Time'}
                                value={quizDetail?.dates?.question_time}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,dates:{...quizDetail?.dates,question_time:e?.target?.value}})
                                }}
                              />
                          </div> */}



                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Question Added For Quiz (Choices)</span>
                            </label>
                             <Select
                                name='created'
                                options={QuizQuestionAddedoption}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                value={quizDetail?.quizQuestionAddedChoice}
                                onChange={(e: any, i: any) => {
                                  setQuizDetail({...quizDetail,quizQuestionAddedChoice:e})
                                }}
                              />
                          </div>



                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Select Question for Quiz</span>
                            </label>
                             <Select
                               isMulti
                                name='selected'
                                options={questionSelectionForQuiz}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                value={quizDetail?.questionSelectionType}
                                onChange={(e: any, i: any) => {
                                  setQuizDetail({...quizDetail,questionSelectionType:e})
                                }}
                              />
                          </div>
                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Question Visisbility</span>
                            </label>
                            <Select
                                name='selected'
                                options={visibility}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                value={questionVisible}
                                onChange={(e: any, i: any) => {
                                  setQuestionVisible(e)
                                  if(e?.value=="All At Once"){
                                    setQuizDetail({...quizDetail,question_visibility:1})
                                  }else{
                                    setQuizDetail({...quizDetail,question_visibility:0})
                                  }
                                }}
                              />
                          </div>




                          
                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Quiz Start Date Time</span>
                            </label>
                            <DatePicker 
                               className='form-control mb-2'
                               selected={new Date(quizDetail?.dates?.start_date)} 
                               onChange={(date) => setQuizDetail({...quizDetail,dates:{...quizDetail?.dates,start_date:date?date:new Date()}})} 
                               showTimeSelect
                              //  value={new Date(quizDetail?.dates?.start_date)}
                              // selected={
                              //   values?.dates?.reg_open_date ? new Date(values?.dates?.reg_open_date) : new Date()
                              // }
                              // onChange={(date: Date) => {
                              //   setFieldValue('dates.reg_open_date', date)
                              // }}
                              />
                          </div>





                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Registration Date Time</span>
                            </label>
                            <DatePicker 
                               className='form-control mb-2'
                               selected={new Date(quizDetail?.dates?.reg_open_date)} onChange={(date) => setQuizDetail({...quizDetail,dates:{...quizDetail?.dates,reg_open_date:date ? date : new Date()}})}  showTimeSelect
                              // selected={
                              //   values?.dates?.reg_open_date ? new Date(values?.dates?.reg_open_date) : new Date()
                              // }
                              // onChange={(date: Date) => {
                              //   setFieldValue('dates.reg_open_date', date)
                              // }}
                              />
                          </div> */}





                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Result Publish Date Time</span>
                            </label>
                            <DatePicker             
                               className='form-control mb-2'
                               selected={new Date(quizDetail?.dates?.result_publish_date)} onChange={(date) => setQuizDetail({...quizDetail,dates:{...quizDetail?.dates,result_publish_date:date ? date : new Date()}})}  showTimeSelect
                              // selected={
                              //   values?.dates?.reg_open_date ? new Date(values?.dates?.reg_open_date) : new Date()
                              // }
                              // onChange={(date: Date) => {
                              //   setFieldValue('dates.reg_open_date', date)
                              // }}
                              />
                          </div> */}



                          

                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Total Winner Percentage</span>
                            </label>
                             <input
                                name='total_winner_percentage'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Total Winnner Percentage'}
                                value={quizDetail?.prize?.total_winner_percentage}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,total_winner_percentage:e?.target?.value}})
                                }}
                              />
                          </div> */}






{/*                           
                          <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Prize Distribution Percentage</span>
                            </label>
                             <input
                                name='prize_distribution_percentage'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Prize Distribution Percentage'}
                                value={quizDetail?.prize?.prize_distribution_percentage}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,prize_distribution_percentage:e?.target?.value}})
                                }}
                              />
                          </div> */}




                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>Prize Pool</span>
                            </label>
                             <input
                                name='prize_pool'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter Prize Pool'}
                                value={quizDetail?.prize?.prize_pool}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,prize_pool:e?.target?.value}})
                                }}
                              />
                          </div> */}






                          
                          {/* <div className='col-4'>
                            <label className='d-flex align-items-center form-label'>
                              <span className='required'>First Prize</span>
                            </label>
                             <input
                                name='first_prize'
                                type='number'
                                className='form-control mb-2'
                                placeholder={'Enter First Prize'}
                                value={quizDetail?.prize?.first_prize}
                                onChange={(e: any) => {
                                  setQuizDetail({...quizDetail,prize:{...quizDetail?.prize,first_prize:e?.target?.value}})
                                }}
                              />
                          </div> */}





                          </div>
                          {
                            (permissionList?.can_create || permissionList?.can_edit) &&
                          
                            <button
                                className="btn btn-primary btn-block mt-4"
                                onClick={(e:any)=>{
                                    e?.preventDefault()
                                     submitQuizData()
                                }}
                            >
                                Submit
                            </button>
                           }
                            </>
                           }
                        </form>
                    </div>
        </div>
    </div>
</div>
  )
}

export default CreateUpdateQuiz