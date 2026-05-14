import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCommonData } from '../users-list/commonData/CommonDataProvider'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.css"
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { MdDeleteOutline } from 'react-icons/md';
import {BiArrowBack} from "react-icons/bi"
import { errrorMessage, successMessage, warningMessage } from '../../../modules/auth/components/ToastComp';
import { createUser, deleteSingleOption, getQuestionDetailsusingQuestionbankIdANdQuestionId, getQuestionUsingQuestionBankIdAndLanguage, updateUser } from '../users-list/core/_requests';
import { useAuth } from '../../../modules/auth';
import {useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UploadQuestionsThroughExcelSheet from '../UploadQuestionsThroughExcelSheet';
import JoditEditor from 'jodit-react';
let language:any[]=[]
const optionsTypes = [
  { value: 'Single', label: 'Single' },
  { value: 'MCQ', label: 'MCQ' },
]
const optionsLabel = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Difficult', label: 'Difficult' },
  ]

  const languageCode:any[] = [{label:"Hindi",value:"hi"},{label:"Sanskrit",value:"sa"},{label:"Tamil",value:"ta"},{label:"Telugu",value:"te"},{label:"Urdu",value:"ur"},{label:"Catalan",value:"ca"},{label:"Chinese",value:"zh"},{label:"German",value:"de"},{label:"Russian",value:"ru"}]
  let optionsLanguageAll= [{label:"Hindi",value:"Hindi"},{label:"Sanskrit",value:"Sanskrit"},{label:"Tamil",value:"Tamil"},{label:"Telugu",value:"Telugu"},{label:"Urdu",value:"Urdu"},{label:"Catalan",value:"Catalan"},{label:"Chinese",value:"Chinese"},{label:"German",value:"German"},{label:"Russian",value:"Russian"}]
  let optionsLanguage= [{label:"Hindi",value:"Hindi"},{label:"Sanskrit",value:"Sanskrit"},{label:"Tamil",value:"Tamil"},{label:"Telugu",value:"Telugu"},{label:"Urdu",value:"Urdu"},{label:"Catalan",value:"Catalan"},{label:"Chinese",value:"Chinese"},{label:"German",value:"German"},{label:"Russian",value:"Russian"}]

  const optionsVerify = [
    { value: 'Not Verified', label: 'Not Verified' },
    { value: 'Verified', label: 'Verified' }
  ]

const AddEditQuestion = () => {
    const {allCourses, allSubjects} = useCommonData()
    const {currentUser}=useAuth()
    const {questionBank}=useSelector((state:any)=>state.reducerData)
    const [courses,setCourses]=useState(allCourses)
    const [subjects,setSubjects]=useState(allSubjects)
    const [selectedCourses,setSelectedCourses]=useState<any>()
    const [tab,setTab]=useState("Question Type")
    const [solution,setSolution]=useState(false)
    const [hint,setHint]=useState(false)
    const [solution2,setSolution2]=useState(false)

    const [hint2,setHint2]=useState(false)
    const [isVerify,setIsVerify]=useState({value:"Not Verified",label:"Not Verified"})
    const [isVerify2,setIsVerify2]=useState({value:"Not Verified",label:"Not Verified"})
    const [selectedLanguage,setSelectedLanguage]=useState(false)
    const [latestLanguage,setLatestLanguage]=useState({label:"Hindi",value:"Hindi"})
    const [isRest,setIsReset]=useState(false)
    const [load,setLoad]=useState(false)
    const [disabledButton,setDisabledButton]=useState(false)
  const params=useParams()
    const [questionDetail,setQuestionDetails]=useState<any>({
        id:undefined,
        passage_bank_id:undefined,
        question_type:{ value: 'Single', label: 'Single' },
        level:{ value: 'Easy', label: 'Easy' },
        subject:{},
        course:[],
        marks:{
            id:undefined,
            marks:1,
            negative_marks:0
        },
    })
    const [questionsData,setQuestionsData]=useState({
        language:{value:"English",label:"English"},
         question:{
            id:undefined,
            question_bank_id:undefined,
            question:""
         },
         options:[
            {option:"",right_option:0},
            {option:"",right_option:0},
            {option:"",right_option:0},
            {option:"",right_option:0},
        ],
        solution:{
            id:undefined,
            question_id:undefined,
            solution:""
        },
        hint:{
            id:undefined,
            question_id:undefined,
            hint:""
        },
        verify:{
            id:undefined,
            question_id:undefined,
            is_verified:0,
            verified_by:""
        }
    })
    const [questionsData2,setQuestionsData2]=useState({
       language:{value:"Hindi",label:"Hindi"},
        question:{
            id:undefined,
            question_bank_id:undefined,
            question:""
        },
        options:[
            {option:"",right_option:0},
            {option:"",right_option:0},
            {option:"",right_option:0},
            {option:"",right_option:0},
        ],
        solution:{
            id:undefined,
            question_id:undefined,
            solution:""
        },
        hint:{
            id:undefined,
            question_id:undefined,
            hint:""
        },
        verify:{
            id:undefined,
            question_id:undefined,
            is_verified:0,
            verified_by:""
        }
   })

   const [to, setTo] = useState('hi');
   const navigate=useNavigate()
   const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
   const [permissionList,setPermissionList]=useState<any>({})
   const filterStaffPermission=async (title:string)=>{
     let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
     setPermissionList(result[0])
   }
   useEffect(()=>{
     filterStaffPermission(navItem?.item)
     },[navItem])
 
   const translate = async (text:string,type:string,code:string) => {
     const lang=languageCode.find((item:any)=>item.value===code )
     setQuestionsData2({...questionsData2,language:{value:lang.label,label:lang.label}})
    const sourceLanguage = "en";
    const targetLanguage = code;
  
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
      sourceLanguage +
      "&tl=" +
      targetLanguage +
      "&dt=t&q=" +
      encodeURI(text);
  
    const result = await fetch(url);
    const json = await result.json();
  
    try {
        if(type==="Question")
        setQuestionsData2({...questionsData2,question:{...questionsData2?.question,question:json[0][0][0]}})
      else if(type==="A"){
         let data=[...questionsData2.options]
         data[0]={...data[0],option:json[0][0][0]}
         setQuestionsData2({...questionsData2,options:data})
      }
      else if(type==="B"){
       let data=[...questionsData2.options]
       data[1]={...data[1],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="C"){
       let data=[...questionsData2.options]
       data[2]={...data[2],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="D"){
       let data=[...questionsData2.options]
       data[3]={...data[3],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="E"){
       let data=[...questionsData2.options]
       data[4]={...data[4],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="F"){
       let data=[...questionsData2.options]
       data[5]={...data[5],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="G"){
       let data=[...questionsData2.options]
       data[6]={...data[6],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="H"){
       let data=[...questionsData2.options]
       data[7]={...data[7],option:json[0][0][0]}
       setQuestionsData2({...questionsData2,options:data})
    }
    else if(type==="Solution"){
       setQuestionsData2({...questionsData2,solution:{...questionsData2.solution,solution:json[0][0][0]}})
    }
    else if(type==="Hint"){
       setQuestionsData2({...questionsData2,hint:{...questionsData2.hint,hint:json[0][0][0]}})
    }
    } catch (error) {
      return error;
    }
   };
 
//    useEffect(() => {
//      axios
//        .get('/languages', {
//          headers: { 'mode': 'cors', accept: 'application/json' },
//        })
//        .then((res) => {
//         let data=res?.data
//         console.log(data,"languiage")
//        });
//    }, []);


   const getQuestionDetails=async ()=>{
    const {data}=await getQuestionDetailsusingQuestionbankIdANdQuestionId(Number(params?.questionBankId))
    let result={...data?.data}
    console.log(result)

    let ids=result?.courses?.map((item:any)=>item.course_id)
    const filterCourse=allCourses?.filter((item:any)=>{
        if(ids.includes(item.id)){
            return item
        }
    })
    setSelectedCourses(filterCourse)
    const subjectdata=allSubjects?.filter((item:any)=>{
         return item.id===result.subject_id
    })
    setQuestionDetails({
        ...questionDetail,
         id:result.id,
         passage_bank_id:result.passage_bank_id,
         level:{
            value:result.level,label:result.level
         },
         question_type:{
            value:result.question_type,label:result.question_type
         },
         marks:{
            id:result.marks.id,
            marks:result.marks.marks,
            negative_marks:result.marks.negative_marks
         },
         subject:subjectdata && subjectdata[0],
         course:filterCourse
      }) 
      optionsLanguage=[]
      result?.questions?.map((item:any)=>{
        if(item?.language!=="English"){
            let temp={
                label:item?.language,value:item?.language
             }
             optionsLanguage?.push(temp)
        }        
      })

      result?.questions?.map((item:any,index:any)=>{
             if(item.language==="English"){
                let ques=item
                if(ques?.solution?.id){
                   setSolution(true)
                }
                if(ques?.hint?.id){
                    setHint(true)
                 }
                setQuestionsData({
                    language:{value:"en",label:"English"},
                    question:{
                       id:ques.id,
                       question_bank_id:ques.question_bank_id,
                       question:ques.question
                    },
                    options:[...ques.options],
                   solution:ques?.solution?.id?ques.solution:{
                    id:undefined,
                    question_id:undefined,
                    solution:""
                   },
                   hint:ques?.hint?.id?ques.hint:{
                    id:undefined,
                    question_id:undefined,
                    hint:""
                   },
                   verify:ques?.verified?.id?ques.verified:{
                    id:undefined,
                    question_id:undefined,
                    is_verified:0,
                    verified_by:""
                   }
                  }) 
                if(ques?.verified?.id && ques?.verified?.is_verified===1){
                    setIsVerify({value:"Verified",label:"Verified"})
                }
             }else if(item.language==="Hindi"){
                setSelectedLanguage(true)
                setLatestLanguage({label:"Hindi",value:"Hindi"})
                let ques=item
                if(ques?.solution?.id){
                   setSolution2(true)
                }
                if(ques?.hint?.id){
                    setHint2(true)
                 }
                setQuestionsData2({
                    language:{value:"Hindi",label:"Hindi"},
                    question:{
                       id:ques.id,
                       question_bank_id:ques.question_bank_id,
                       question:ques.question
                    },
                    options:[...ques.options],
                   solution:ques?.solution?ques.solution:{
                    id:undefined,
                    question_id:undefined,
                    solution:""
                   },
                   hint:ques?.hint?ques.hint:{
                    id:undefined,
                    question_id:undefined,
                    hint:""
                   },
                   verify:ques?.verified?ques.verified:{
                    id:undefined,
                    question_id:undefined,
                    is_verified:0,
                    verified_by:""
                   }
                  }) 
                  if(ques?.verified?.id && ques?.verified?.is_verified===1){
                    setIsVerify2({value:"Verified",label:"Verified"})
                }
             }
      })
   }


   const filterDataUsinglanguage=async (e:{label:string,value:string})=>{
         const {data}=await getQuestionUsingQuestionBankIdAndLanguage(params?.questionBankId,e.label)
         let result=data.data
           if(result?.question_bank_id){
            if(result?.solution?.id){
                setSolution2(true)
             }
             if(result?.hint?.id){
                 setHint2(true)
              }
              let temp={
                question:result?.question?result?.question:"",
                id:result.id,
                question_bank_id:result.question_bank_id
              }
              setLatestLanguage(e)
             setQuestionsData2({
                 language:e,
                 question:temp,
                 options:result.options,
                solution:result?.solution?result.solution:{
                 id:undefined,
                 question_id:undefined,
                 solution:""
                },
                hint:result?.hint?result.hint:{
                 id:undefined,
                 question_id:undefined,
                 hint:""
                },
                verify:result?.verified?result.verified:{
                 id:undefined,
                 question_id:undefined,
                 is_verified:0,
                 verified_by:""
                }
               }) 
               if(result?.verified?.id && result?.verified?.is_verified===1){
                 setIsVerify2({value:"Verified",label:"Verified"})
             }

             setTimeout(()=>{
                setLoad(false)
             },1200)
           }else{
              setQuestionsData2({
                language:{value:"",label:""},
                question:{
                   id:undefined,
                   question_bank_id:undefined,
                   question:""
                },
                options:[
                   {option:"",right_option:0},
                   {option:"",right_option:0},
                   {option:"",right_option:0},
                   {option:"",right_option:0},
               ],
               solution:{
                   id:undefined,
                   question_id:undefined,
                   solution:""
               },
               hint:{
                   id:undefined,
                   question_id:undefined,
                   hint:""
               },
               verify:{
                   id:undefined,
                   question_id:undefined,
                   is_verified:0,
                   verified_by:""
               }
              })
              setTimeout(()=>{
                setLoad(false)
             },300)
           }
          
   }

 const updateQuestionDetails=async (questionbankId:any,questionId:any)=>{
    // if(!questionsData.question.question.replace( /(<([^>]+)>)/ig, '')?.trim()){
    //     errrorMessage("Please type question")
    // }else
     if(questionsData?.options?.length>0){
        const option=questionsData.options.some((x)=>x.option.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
        const answer=questionsData.options.some((x)=>x.right_option===1)
        if(option){
            errrorMessage("Please Type all options")
        }
        else if(!answer){
            errrorMessage("Please Type correct answer")
        }
        else{
            const questionBank={
                questionBankDetail:questionDetail,
                questionDetail:questionsData
               }
            const {data}=await updateUser(questionbankId,questionId, {...questionBank})
            const {id,course,subject,passage_bank_id,
                marks,
                }=data.data
            setQuestionDetails({...questionDetail,id,marks,course,subject,passage_bank_id})
             successMessage("Question Updated successfully")
        }
    }
      
   }

   const updateQuestionDetails2=async (questionbankId:any,questionId:any)=>{
    // if(!questionsData2.question.question.replace( /(<([^>]+)>)/ig, '')?.trim()){
    //     errrorMessage("Please type question")
    // }else 
    if(questionsData2?.options?.length>0){
        const option=questionsData2?.options.some((x)=>x.option.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
        const answer=questionsData2?.options.some((x)=>x.right_option===1)
        if(option){
            errrorMessage("Please Type all options")
        }
        else if(!answer){
            errrorMessage("Please Type correct answer")
        }
        else{
            const questionBank={
                questionBankDetail:questionDetail,
                questionDetail:questionsData2
               }
            const {data}=await updateUser(questionbankId,questionId, {...questionBank})
            const {id,course,subject,
                marks,passage_bank_id
                }=data.data
            setQuestionDetails({...questionDetail,id,marks,course,subject,passage_bank_id})
             successMessage("Question Updated successfully")
        }
    }
      
   }


   const saveQuestionBank=async ()=>{
    // if(!questionsData.question.question.replace( /(<([^>]+)>)/ig, '')?.trim()){
    //     errrorMessage("Please type question")
    // }else 
    if(questionsData?.options?.length>0){
        const option=questionsData.options.some((x)=>x.option.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
        const answer=questionsData.options.some((x)=>x.right_option===1)
        if(option){
            errrorMessage("Please Type all options")
        }
        else if(!answer){
            errrorMessage("Please Type correct answer")
        }
        else{
            const questionBank={
                questionBankDetail:questionDetail,
                questionDetail:questionsData
               }
            const {data}=await createUser({...questionBank})
            const {id,course,subject,
                marks,passage_bank_id
                }=data.data
            setQuestionDetails({...questionDetail,id,marks,course,subject,passage_bank_id})
             successMessage("Question added successfully")
            if(!params.questionBankId){
                setDisabledButton(true)
            }
        }
    }
      
   }

   const saveQuestionBank2=async ()=>{
    // if(!questionsData2.question.question.replace( /(<([^>]+)>)/ig, '')?.trim()){
    //     errrorMessage("Please type question")
    // }else 
    if(questionsData2?.options?.length>0){
        const option=questionsData2.options.some((x)=>x.option.replace( /(<([^>]+)>)/ig, '')?.trim()==="")
        const answer=questionsData2.options.some((x)=>x.right_option===1)
        if(option){
            errrorMessage("Please Type all options")
        }
        else if(!answer){
            errrorMessage("Please Type correct answer")
        }
        else{
            if(questionDetail.id==undefined){
               warningMessage("Please save your english questions first")
            }
            else{
                const questionBank={
                    questionBankDetail:questionDetail,
                    questionDetail:{...questionsData2,language:latestLanguage}
                   }
                const {data}=await createUser({...questionBank})
                const {id,course,subject,
                    marks,passage_bank_id
                    }=data.data
                setQuestionDetails({...questionDetail,id,marks,course,subject,passage_bank_id})
                setQuestionsData2({...questionsData2,  language:{value:"Hindi",label:"Hindi"}, question:{
                    id:undefined,
                    question_bank_id:undefined,
                    question:""
                 },
                 options:[
                    {option:"",right_option:0},
                    {option:"",right_option:0},
                    {option:"",right_option:0},
                    {option:"",right_option:0},
                ],
                solution:{
                    id:undefined,
                    question_id:undefined,
                    solution:""
                },
                hint:{
                    id:undefined,
                    question_id:undefined,
                    hint:""
                }})
                successMessage("Question added successfully")
            }

        }
        }
      
   }
const getSubject = async (ids: any) => {
    let items:any[]=[]
   let courseIdsArr=allSubjects?.map((x: any) =>{
      let courseIds=JSON.parse(x.course_ids)
       return ids.map((item2:any)=>{
         if(courseIds.includes(item2)){
            return x.id
         }
       })
   })

   let newArr:any[]=[]
   courseIdsArr.map((item:any)=>{
       newArr=[...newArr,...item]
   })
   
   let set=new Set(newArr.filter((item:any)=>item!==undefined))
    let finalArr=allSubjects.filter((item:any)=>{
        return set.has(item.id)
    })
    setSubjects(finalArr)
  }

//   useEffect(()=>{
//     if(!permissionList?.can_edit && !permissionList?.can_create){
//      navigate("/questions")
//     }
//  },[permissionList])
useEffect(()=>{
    optionsLanguage=optionsLanguageAll
    setCourses(allCourses)
    setSubjects(allSubjects)
    if(params?.questionBankId)
       getQuestionDetails()
},[allCourses,allSubjects])
const modules = {
    toolbar: [
        [{header:[1,2,3,4,5,6,false]     
        }],
        [{ 'color': [] }], 
      [{size: []}],
      ['bold', 'italic'],
    ],
}

  return (
    <div className='container mb-5'>
      <div className="row">
        {
            tab==="Questions" &&
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
               <button className="btn btn-primary" style={{width:"56px",height:"42px"}} onClick={(e:any)=>{
                      e?.preventDefault()
                      setTab("Question Type")
               }}>
                    <BiArrowBack  style={{transform:"scale(2.5)",color:"white"}}/>
                </button>
                 {!params?.questionBankId && <button  className="btn btn-primary" style={{width:"200px",height:"42px"}} onClick={()=>{
                    setIsReset(true)
                    setLatestLanguage({label:"Hindi",value:"Hindi"})
                         setQuestionDetails({
                            id:undefined,
                            passage_bank_id:questionDetail?.passage_bank_id,
                            question_type:{ value: 'Single', label: 'Single' },
                            level:questionDetail?.level,
                            subject:questionDetail?.subject,
                            course:selectedCourses,
                            marks:questionDetail?.marks,
                        })
                        language=[]
                          setDisabledButton(false)
                          setQuestionsData({
                            language:{value:"English",label:"English"},
                             question:{
                                id:undefined,
                                question_bank_id:undefined,
                                question:""
                             },
                             options:[
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                            ],
                            solution:{
                                id:undefined,
                                question_id:undefined,
                                solution:""
                            },
                            hint:{
                                id:undefined,
                                question_id:undefined,
                                hint:""
                            },
                            verify:{
                                id:undefined,
                                question_id:undefined,
                                is_verified:0,
                                verified_by:""
                            }
                        })

                        setQuestionsData2({
                            language:{value:"Hindi",label:"Hindi"},
                             question:{
                                id:undefined,
                                question_bank_id:undefined,
                                question:""
                             },
                             options:[
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                                {option:"",right_option:0},
                            ],
                            solution:{
                                id:undefined,
                                question_id:undefined,
                                solution:""
                            },
                            hint:{
                                id:undefined,
                                question_id:undefined,
                                hint:""
                            },
                            verify:{
                                id:undefined,
                                question_id:undefined,
                                is_verified:0,
                                verified_by:""
                            }
                        })

                        setTimeout(()=>{
                            setIsReset(false)
                        },1000)
                  }}>
                      Add More Question
                  </button>}
            </div>
        }
       
        {/* <button onClick={e=>translate()}>Translate</button> */}
        <div className="col-12 my-4">
            <hr/>
            <div style={{display:"flex",justifyContent:"space-evenly",background:"#f2f2f2"}}>
                <p className={tab==="Question Type"?"text-white fw-bolder my-3 text-underline bg-primary py-3 px-5 fs-3":"text-dark fw-bolder my-3 fs-3"}>Question Type</p>
                <p className={tab==="Questions"?"text-white fw-bolder my-3 text-underline bg-primary py-3 px-5 fs-3":"text-dark fw-bolder my-3 fs-3"}>Questions</p>
            </div>
            <hr/>
            <div className="my-5 row "> 
            {
                tab==="Question Type" &&
            
                <form className="row gy-4">
                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Question Type</label>
                        <Select options={optionsTypes} value={questionDetail?.question_type} onChange={(e:any)=>{
                              setQuestionDetails({...questionDetail,question_type:e})
                        }} />
                    </div>

                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Question Level</label>
                        <Select options={optionsLabel} value={questionDetail.level} onChange={(e:any)=>{
                              setQuestionDetails({...questionDetail,level:e})
                        }} />
                    </div>

                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Course</label>
                        <Select 
                         isMulti
                         name='courses'
                         options={courses}
                         className='basic-multi-select'
                         classNamePrefix='select'
                         onChange={(e, i) => {
                            const ids = e.flatMap((item:any, i:number) =>[item.id])
                            getSubject(ids)
                            setQuestionDetails({...questionDetail,course:e})
                            setSelectedCourses(e)
                          }}
                          value={selectedCourses}
                          getOptionLabel={(option: any) => option.course_name}
                          getOptionValue={(option: any) => option.id} 
                        />
                    </div>

                    {
                        questionDetail?.course?.length>0 &&
                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Subject</label>
                        <Select options={subjects} 
                         onChange={(e, i) => {
                            console.log(e,"subject")
                            setQuestionDetails({...questionDetail,subject:e})
                          }}
                          value={questionDetail?.subject}
                         getOptionLabel={(option: any) => option.subject_name}
                            //  getOptionValue={(option: any) => option.subject_name}
                         />
                    </div>
                   }

                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Marks</label>
                      <input  
                            name='marks'
                            type={'number'}
                            className='form-control mb-2'
                            placeholder={'Enter  marks'}
                            value={questionDetail?.marks?.marks}
                            onChange={(e:any)=>{
                                setQuestionDetails({...questionDetail,marks:{...questionDetail.marks,marks:e?.target?.value}})
                            }}
                            />
                    </div>

                    <div className="col-4">
                        <label className='d-flex align-items-center form-label required'>Negative Marks</label>
                        <input  
                            name='negative-marks'
                            type={'number'}
                            className='form-control mb-2'
                            placeholder={'Enter Negative mark'}
                            value={questionDetail?.marks?.negative_marks}
                            onChange={(e:any)=>{
                                 setQuestionDetails({...questionDetail,marks:{...questionDetail.marks,negative_marks:e?.target?.value}})
                            }}
                            />
                    </div>

                    <div className="col-4">
                        <label className='d-flex align-items-center form-label'>Passage Bank ID</label>
                      <input  
                            name='passage_bank_id'
                            type={'text'}
                            className='form-control mb-2'
                            placeholder={'Enter Passage Bank ID'}
                            value={questionDetail?.passage_bank_id}
                            onChange={(e:any)=>{
                                setQuestionDetails({...questionDetail,passage_bank_id:(e?.target?.value)})
                            }}
                            />
                    </div>

                    <div className="my-3">
                   
                   {
                    tab=="Question Type" && 
                   
                    <button className="btn btn-success mx-4"  onClick={(e:any)=>{
                       e?.preventDefault()
                       if(tab==="Question Type"){
                        if(questionDetail){
                            if(!questionDetail?.question_type?.value?.trim()) errrorMessage("Please select Question Type")
                            else  if(!questionDetail?.level?.value?.trim()) errrorMessage("Please select Question Level")
                            else  if(questionDetail?.course?.length<=0) errrorMessage("Please select Course")
                            else  if(!questionDetail?.subject?.id) errrorMessage("Please select Subject")
                            else  if(questionDetail?.marks?.marks<0 || !questionDetail?.marks?.marks) errrorMessage("Question marks must be greater than  0")
                            else  if(questionDetail?.marks?.negative_marks<0) errrorMessage("Negative marks must be greater than or equal to 0")

                            // else  if(questionDetail?.marks?.negative_marks<0  || !questionDetail?.marks?.negative_marks) errrorMessage("Question negative marks must be greater than  0")
                            else  setTab("Questions")
                        }
                       }
                    }}>
                        Continue
                    </button>
                    }
                   {!params?.questionBankId && <UploadQuestionsThroughExcelSheet questionDetail={questionDetail}/>}
                    </div>
                    
                </form>
            }

            {
               isRest?<div>Loading....</div> :  tab==="Questions" && 
                    <div className="row">
                    <div className="col-6" style={{borderRight:"2px solid black",minHeight:"100vh"}}>
                        <h3 className="py-7">Language : <span className="text-primary">English</span></h3>
                        <hr/>
                        <form>
                        <div className="col-12">
                                <label className='d-flex align-items-center form-label required text-primary'>Type Question</label>

                                 <JoditEditor
                                             value={questionsData.question.question} onChange={(e:any)=>{
                                                setQuestionsData({...questionsData,question:{...questionsData.question,question:e}})
                                                // translate(e.replace( /(<([^>]+)>)/ig, ''),"Question",to)
                                             }}
                                         />
                       </div>
                       <hr/>

                       <div className="col-12">
                             <div className="col-12">
                                <label className='d-flex align-items-center form-label required text-primary mt-4'>Type Options</label>
                             </div>
                             <div className="col-12">
                             {
                                questionsData?.options && questionsData?.options?.length>0 && questionsData?.options?.sort()?.map((item:any,index:number)=>{
                                    return   <div className="row" key={index}>
                                    <div className="col-10 gy-4 d-flex align-items-center">
                                    <p className="fs-1 text-primary me-3">{String.fromCharCode(index+65)}.)</p>
                                    
                                    <JoditEditor
                                            className="option_quill w-100"  value={item.option}  onChange={(e:any)=>{
                                                let data=[...questionsData.options]
                                                data[index].option=e
                                                 let x=index===0 ? "A":index===1?"B":index===2?"C":index===3 ? "D":index===4 ? "E":index===5 ? "F":index===6 ? "G":"H"
                                                // translate(e.replace( /(<([^>]+)>)/ig, ''),x,to)
                                                setQuestionsData({...questionsData,options:data})
                                            }}
                                         />
                                    </div>
                                    <div className="col-2 d-flex justify-content-start align-items-center">
                                        {
                                            questionDetail?.question_type?.value==="Single" ?  <input
                                            name='right_option'
                                            type={'radio'}
                                            className={clsx('form-check-input mb-3 mb-lg-0')}
                                            autoComplete='off'
                                            checked={item?.right_option===1}
                                            onChange={(e:any)=>{
    
                                                const data = [...questionsData.options]
                                                data.map((x: any) => {
                                                  x.right_option = 0
                                                })
                                                data[index] = {...data[index], right_option: 1}
                                                setQuestionsData({...questionsData,options:data})
    
                                                if(questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')!=="" && questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')){
                                                    const data = [...questionsData2.options]
                                                data.map((x: any) => {
                                                  x.right_option = 0
                                                })
                                                data[index] = {...data[index], right_option: 1}
                                                setQuestionsData2({...questionsData2,options:data})
                                                }
    
                                            }}
                                         />: <input
                                         name='right_option'
                                         type={'checkbox'}
                                         className={clsx('form-check-input mb-3 mb-lg-0')}
                                         autoComplete='off'
                                         checked={item?.right_option===1}
                                         onChange={(e:any)=>{
                                            console.log(e)
                                             const data = [...questionsData.options]
                                             data[index] = {...data[index], right_option:data[index]?.right_option===1?0:1}
                                             setQuestionsData({...questionsData,options:data})
                                             if(questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')!=="" && questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')){
                                                 const data = [...questionsData2.options]
                                                 data[index] = {...data[index], right_option:data[index]?.right_option===1?0:1}
                                                 setQuestionsData2({...questionsData2,options:data})
                                             } 
                                         }}
                                      />
                                        }
                                     {/* <input
                                        name='right_option'
                                        type={'radio'}
                                        className={clsx('form-check-input mb-3 mb-lg-0')}
                                        autoComplete='off'
                                        checked={item?.right_option===1}
                                        onChange={(e:any)=>{

                                            const data = [...questionsData.options]
                                            data.map((x: any) => {
                                              x.right_option = 0
                                            })
                                            data[index] = {...data[index], right_option: 1}
                                            setQuestionsData({...questionsData,options:data})

                                            if(questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')!=="" && questionsData2?.question?.question?.replace( /(<([^>]+)>)/ig, '')){
                                                const data = [...questionsData2.options]
                                            data.map((x: any) => {
                                              x.right_option = 0
                                            })
                                            data[index] = {...data[index], right_option: 1}
                                            setQuestionsData2({...questionsData2,options:data})
                                            }

                                        }}
                                     /> */}
                                    </div>
                                </div>
                                })

                                
                             }
                              {questionsData?.options?.length>2 && 
                              <MdDeleteOutline className="cursor-pointer" style={{float:"right", transform:"scale(2)", marginTop:"-110px", color:"red", marginRight:"10px",cursor:"pointer"}}  onClick={ ()=>{
                                let data = [...questionsData.options]
                                if(params?.questionBankId){
                                    let deleteData:any[]=data.slice(data?.length-1,data?.length)
                                    if(deleteData[0]?.id && deleteData[0]?.question_id){
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, delete it!'
                                          }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const data2 =await deleteSingleOption(deleteData[0]?.id)
                                                if(data2?.data?.success){
                                                    successMessage("Options Deleted Successfullly")
                                                     data=data.slice(0,data?.length-1)
                                                    setQuestionsData({...questionsData,options:data})
                                                }
                                            }
                                          })
                                    }
                                     else{
                                            data=data.slice(0,data?.length-1)
                                            setQuestionsData({...questionsData,options:data})
                                        }  
                                }   
                                else{
                                    data=data.slice(0,data?.length-1)
                                    setQuestionsData({...questionsData,options:data})
                                }                            
                            }}/>
                            }
                           
                             </div> 
                                                        
                               
                                <div className="my-5 p-5">
                                  {questionsData?.options?.length<10 && <p className="text-success fw-bolder" style={{float:"right",cursor:"pointer"}} onClick={()=>{
                                        setQuestionsData({
                                            ...questionsData,
                                            options:[...questionsData.options,{option:"",right_option:0}]
                                        })
                                    }}>Add More Options</p>}
                                </div>
                                <hr/> 



                                <div className="col-12 my-5">
                                   
                                  {
                                    solution &&  <div className="col-12">
                                            <label className='d-flex align-items-center form-label required text-primary'>Add Solution</label>
                                            <ReactQuill theme="snow" modules={modules} value={questionsData.solution.solution} onChange={(e:any)=>{
                                                setQuestionsData({...questionsData,solution:{...questionsData.solution,solution:e}})
                                                // translate(e.replace( /(<([^>]+)>)/ig, ''),"Solution",to)
                                                }} />
                                     </div>
                                  }
                                  {
                                    hint &&  <div className="col-12 my-3">
                                            <label className='d-flex align-items-center form-label required text-primary'>Add Hint</label>
                                            <ReactQuill theme="snow" modules={modules} value={questionsData.hint.hint} onChange={(e:any)=>{
                                                setQuestionsData({...questionsData,hint:{...questionsData.hint,hint:e}})
                                                // translate(e.replace( /(<([^>]+)>)/ig, ''),"Hint",to)
                                                }} />
                                     </div>
                                  }

                    
                                </div>
                                <div className="d-flex justify-content-between">
                                
                                    <p className="text-primary fw-bolder cursor-pointer" onClick={(e:any)=>{
                                         e?.preventDefault()
                                         if(solution) setQuestionsData({...questionsData,solution:{...questionsData.solution,solution:""}})
                                         setSolution(!solution)
                                     }}>{solution?"Remove":"Add"} Solution</p>
                                    
                                     <p className="text-primary fw-bolder cursor-pointer" onClick={(e:any)=>{
                                         e?.preventDefault()
                                         if(hint) setQuestionsData({...questionsData,hint:{...questionsData.hint,hint:""}})
                                         setHint(!hint)
                                     }}>{hint?"Remove":"Add"} Hint</p>
                                      
                                </div>
                                <hr/>

                                <div className={params.questionBankId ?"d-flex justify-content-between align-items-center":"d-flex justify-content-end"}>
                                    {
                                        params?.questionBankId  &&
                                    
                                <div className="w-50">
                                <label className='form-label required text-primary'>Verify Question</label>
                                <Select className="" options={optionsVerify} value={isVerify}  onChange={(e:any)=>{
                                    if(e.value==="Verified"){
                                        setIsVerify(e)
                                        setQuestionsData({...questionsData,verify:{...questionsData.verify,is_verified:1,verified_by:currentUser?.first_name+" "+currentUser?.last_name}})
                                    }else{
                                        setIsVerify(e)
                                        setQuestionsData({...questionsData,verify:{...questionsData.verify,is_verified:0,verified_by:""}})
                                    }
                                }} />
                               </div>
                                    }
                                <button disabled={disabledButton?true : false} className="btn btn-success w-25 h-75" onClick={(e:any)=>{
                                    e?.preventDefault()
                                    if(params?.questionBankId){
                                        updateQuestionDetails(params.questionBankId,questionsData?.question.id)
                                    }else{
                                       saveQuestionBank()
                                    }                                    
                                    }}>
                                        Save
                                    </button>
                                </div>

                       </div>

                       </form>
                    </div>
                      <div className="col-6">
                        <div className="col-12 d-flex justify-content-end">
                            <div className="w-50">
                                <label className='form-label required text-primary'>Select Language</label>
                                <Select className="" options={optionsLanguage} value={latestLanguage}     onChange={(e:any)=>{
                                 setSelectedLanguage(true)
                                 setLatestLanguage(e)
                                   setQuestionsData2({...questionsData2,language:e})
                                   let lang=languageCode.find((item:any)=>item.label===e.label )
                                    setTo(lang.value)
                                    // if(!params?.questionBankId){
                                    // if(questionsData?.question?.question?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.question?.question?.replace( /(<([^>]+)>)/ig, ''),"Question",lang.value)
                                    //  if(questionsData?.options?.length>=1 && questionsData?.options[0]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[0]?.option?.replace( /(<([^>]+)>)/ig, ''),"A",lang.value)
                                    //   if(questionsData?.options?.length>=2 && questionsData?.options[1]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[1]?.option?.replace( /(<([^>]+)>)/ig, ''),"B",lang.value)
                                    //   if(questionsData?.options?.length>=3 && questionsData?.options[2]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[2]?.option?.replace( /(<([^>]+)>)/ig, ''),"C",lang.value)
                                    //   if(questionsData?.options?.length>=4 && questionsData?.options[3]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[3]?.option?.replace( /(<([^>]+)>)/ig, ''),"D",lang.value)
                                    //   if(questionsData?.options?.length>=5 && questionsData?.options[4]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[4]?.option?.replace( /(<([^>]+)>)/ig, ''),"E",lang.value)
                                    //   if(questionsData?.options?.length>=6 && questionsData?.options[5]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[5]?.option?.replace( /(<([^>]+)>)/ig, ''),"F",lang.value)
                                    //   if(questionsData?.options?.length>=7 && questionsData?.options[6]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[6]?.option?.replace( /(<([^>]+)>)/ig, ''),"G",lang.value)
                                    //   if(questionsData?.options?.length>=8 && questionsData?.options[7]?.option?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.options[7]?.option?.replace( /(<([^>]+)>)/ig, ''),"H",lang.value)
 
                                    //  if(questionsData?.solution?.solution?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.solution?.solution?.replace( /(<([^>]+)>)/ig, ''),"Solution",lang.value)
                                    //   if(questionsData?.hint?.hint?.replace( /(<([^>]+)>)/ig, '')!=="")
                                    //     translate(questionsData?.hint?.hint?.replace( /(<([^>]+)>)/ig, ''),"Hint",lang.value)
 
                                    // }
                                  
                                   if(params?.questionBankId){
                                    setLoad(true)
                                     filterDataUsinglanguage(e)
                                   }
                                }} />
                            </div>
                        </div>
                        <hr/>
                          {
                            selectedLanguage && 
                            <>
                            {
                                load ? <p><Skeleton count={7} style={{height:"80px"}} className="bg-secondary" /></p>:  <form>
                                <div className="col-12">
                                        <label className='d-flex align-items-center form-label required text-primary'>Type Question</label>
                                       
                                             <JoditEditor
                                           value={questionsData2?.question?.question} onChange={(e:any)=>{
                                            setQuestionsData2({...questionsData2,question:{...questionsData2.question,question:e}})
                                         }} 
                                         />
                               </div>
                               <hr/>
        
                               <div className="col-12">
                                     <div className="col-12">
                                        <label className='d-flex align-items-center form-label required text-primary mt-4'>Type Options</label>
                                     </div>
                                     <div className="col-12">
                                     {
                                        questionsData2?.options && questionsData2?.options?.length>0 && questionsData2?.options?.map((item2:any,index2:number)=>{
                                            return   <div className="row" key={index2}>
                                            <div className="col-10 gy-4 d-flex align-items-center">
                                            <p className="fs-1 text-primary me-3">{String.fromCharCode(index2+65)}.)</p>
                                            <JoditEditor className="option_quill w-100"  value={item2.option}  onChange={(e:any)=>{
                                                let data=[...questionsData2.options]
                                                data[index2].option=e
                                                setQuestionsData2({...questionsData2,options:data})
                                            }} 
                                         />
                                            
                                            </div>
                                            <div className="col-2 d-flex justify-content-start align-items-center">
                                                {
                                                    questionDetail?.question_type?.value==="Single" ?   <input
                                                    name='right_option'
                                                    type={'radio'}
                                                    className={clsx('form-check-input mb-3 mb-lg-0')}
                                                    autoComplete='off'
                                                    // style={{marginRight:"10px"}}
                                                    checked={item2?.right_option===1}
                                                    onChange={(e:any)=>{
                                                        const data = [...questionsData2.options]
                                                        data.map((x: any) => {
                                                          x.right_option = 0
                                                        })
                                                        data[index2] = {...data[index2], right_option: 1}
                                                        setQuestionsData2({...questionsData2,options:data})
                                                    }}
                                                 />:  <input
                                                 name='right_option'
                                                 type={'checkbox'}
                                                 className={clsx('form-check-input mb-3 mb-lg-0')}
                                                 autoComplete='off'
                                                 // style={{marginRight:"10px"}}
                                                 checked={item2?.right_option===1}
                                                 onChange={(e:any)=>{
                                                     const data = [...questionsData2.options]
                                                     data[index2] = {...data[index2], right_option:data[index2]?.right_option===1?0:1}
                                                     setQuestionsData2({...questionsData2,options:data})
                                                 }}
                                              />
                                                }
                                           
                                             
                                            </div>
                                        </div>
                                        })
                                     }
                                     {questionsData2?.options?.length>2 && 
                                      <MdDeleteOutline className="cursor-pointer" style={{float:"right", marginTop:"-110px", transform:"scale(2)", color:"red", marginRight:"20px",cursor:"pointer"}}  onClick={ ()=>{
                                        let data = [...questionsData2.options]
                                        if(params?.questionBankId){
                                            let deleteData:any[]=data.slice(data?.length-1,data?.length)
                                            if(deleteData[0]?.id && deleteData[0]?.question_id){
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                  }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        const data2 =await deleteSingleOption(deleteData[0]?.id)
                                                        if(data2?.data?.success){
                                                            successMessage("Options Deleted Successfullly")
                                                              data=data.slice(0,data?.length-1)
                                                              setQuestionsData2({...questionsData2,options:data})
                                                        }
                                                    }
                                                  })
                                            }else{
                                                data=data.slice(0,data?.length-1)
                                                setQuestionsData2({...questionsData2,options:data})
                                            }
                                           
                                        } else{
                                            data=data.slice(0,data?.length-1)
                                            setQuestionsData2({...questionsData2,options:data})
                                        } 
                                    }}/>
                                    }
                                     </div>                             
                                       
                                        <div className="my-5 p-5">
                                           {
                                            questionsData2.options?.length<10 &&
                                         <p className="text-success fw-bolder" style={{float:"right",cursor:"pointer"}} onClick={()=>{
                                                setQuestionsData2({
                                                    ...questionsData2,
                                                    options:[...questionsData2.options,{option:"",right_option:0}]
                                                })
                                            }}>Add More Options</p>
                                        }
                                        </div>
        
                                    <hr/>
                                        <div className="col-12 my-5">
                                           
                                          {
                                            solution2 &&  <div className="col-12">
                                                    <label className='d-flex align-items-center form-label required text-primary'>Add Solution</label>
                                                    <ReactQuill theme="snow" modules={modules} value={questionsData2.solution.solution} onChange={(e:any)=>{
                                                        setQuestionsData2({...questionsData2,solution:{...questionsData2.solution,solution:e}})
                                                        }} />
                                             </div>
                                          }
                                          {
                                            hint2 &&  <div className="col-12 my-3">
                                                    <label className='d-flex align-items-center form-label required text-primary'>Add Hint</label>
                                                    <ReactQuill theme="snow" modules={modules} value={questionsData2.hint.hint} onChange={(e:any)=>{
                                                        setQuestionsData2({...questionsData2,hint:{...questionsData2.hint,hint:e}})
                                                        }} />
                                             </div>
                                          }
        
                            
                                        </div>
                                        <div className="d-flex justify-content-between">
                                        
                                            <p className="text-primary fw-bolder cursor-pointer" onClick={(e:any)=>{
                                                 e?.preventDefault()
                                                 if(solution2) setQuestionsData2({...questionsData2,solution:{...questionsData2.solution,solution:""}})
                                                 setSolution2(!solution2)
                                             }}>{solution2?"Remove":"Add"} Solution</p>
                                            
                                             <p className="text-primary fw-bolder cursor-pointer" onClick={(e:any)=>{
                                                 e?.preventDefault()
                                                 if(hint2) setQuestionsData2({...questionsData2,hint:{...questionsData2.hint,hint:""}})
                                                 setHint2(!hint2)
                                             }}>{hint2?"Remove":"Add"} Hint</p>
                                            
                                        
                                           
                                        </div>
                                        <hr/>
                                        <div className={params.questionBankId ?"d-flex justify-content-between align-items-center":"d-flex justify-content-end"}>
                                            {
                                                params?.questionBankId &&
                                            
                                        <div className="w-50">
                                        <label className='form-label required text-primary'>Verify Question</label>
                                        <Select className="" options={optionsVerify} value={isVerify2}  onChange={(e:any)=>{
                                            if(e.value==="Verified"){
                                                setIsVerify2(e)
                                                setQuestionsData2({...questionsData2,verify:{...questionsData2.verify,is_verified:1,verified_by:currentUser?.first_name+" "+currentUser?.last_name}})
                                            }else{
                                                setIsVerify2(e)
                                                setQuestionsData2({...questionsData2,verify:{...questionsData2.verify,is_verified:0,verified_by:""}})
                                            }
                                        }} />
                                       </div>
                                           }
                                        <button className="btn w-25 h-75 btn-success"  onClick={(e:any)=>{
                                            e?.preventDefault()
                                            if(params?.questionBankId){
                                               updateQuestionDetails2(params.questionBankId,questionsData2?.question?.id)
                                            }else{
                                                saveQuestionBank2() 
                                               language.push(latestLanguage?.value)                                   
                                            }
                                            }}>
                                                Save
                                            </button>
                                        </div>                                
        
                               </div>
        
                               </form>
                            }
                            </>
                       
                           }
                    </div>
                    </div>
            }
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditQuestion