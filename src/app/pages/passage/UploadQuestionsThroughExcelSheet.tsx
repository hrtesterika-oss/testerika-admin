import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as xlsx from "xlsx"
import { errrorMessage, successMessage } from '../../modules/auth/components/ToastComp'
import { uploadQuestionFromExcelSheet } from './users-list/core/_requests'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// let data2:any[]=[]
const UploadQuestionsThroughExcelSheet = ({questionDetail}:any) => {
    const dispatch=useDispatch()
    const [choosenFile,setChoosenFile]=useState(false)
    const {questionBank}=useSelector((state:any)=>state.reducerData)
    const navigate=useNavigate()
    const readUploadFile = (e:any) => {
        e.preventDefault();
        if (e.target.files) {
            setChoosenFile(true)
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e?.target?.result;
                const workbook = xlsx?.read(data, { type: "array" });
                const sheetName = workbook?.SheetNames[0];
                const worksheet = workbook?.Sheets[sheetName];
                let json:any[] = xlsx.utils?.sheet_to_json(worksheet) || [];
                // console.log({...json[0]})
                // console.log(json[0].Column1)
                // setData(json)
                 let obj:any={
                    question:"",
                    options:[{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0}],
                    hint:"",
                    solution:""
                 }
                //  console.log(json)
                json.map((item:any,index:number)=>{
                        if(typeof item.Column1==="number"){
                            obj={
                                question:"",
                                options:[{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0},{option:"",right_option:0}],
                                hint:"",
                                solution:""
                            }
                            obj={
                                ...obj,
                                question:item.Column2,
                            }
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="a"){
                            obj.options[0].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="b"){
                            obj.options[1].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="c"){
                            obj.options[2].option=item.Column2

                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="d"){
                            obj.options[3].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="e"){
                            obj.options[4].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="f"){
                            obj.options[5].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="g"){
                            obj.options[6].option=item.Column2

                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="h"){
                            obj.options[7].option=item.Column2
                        }
                        if(typeof item.Column1==="string" && item.Column1.trim().toLowerCase()==="ans"){
                            if(item.Column2==="A"){
                                obj.options[0].right_option=1
                            }
                            if(item.Column2==="B"){
                                obj.options[1].right_option=1
                            }
                            if(item.Column2==="C"){
                                obj.options[2].right_option=1
                            }
                            if(item.Column2==="D"){
                                obj.options[3].right_option=1
                            }
                            if(item.Column2==="E"){
                                obj.options[4].right_option=1
                            }
                            if(item.Column2==="F"){
                                obj.options[5].right_option=1
                            }
                            if(item.Column2==="G"){
                                obj.options[6].right_option=1
                            }
                            if(item.Column2==="H"){
                                obj.options[7].right_option=1
                            }
                        }
                        if(typeof item?.Column1==="string" && item?.Column1?.trim().toLowerCase()==="hint"){
                            obj={
                                ...obj,
                                hint:item?.Column2?item?.Column2:"",
                            }
                        }
                        if(typeof item?.Column1==="string" && item?.Column1?.trim().toLowerCase()==="solution"){
                            obj={
                                ...obj,
                                solution:item?.Column2?item?.Column2:""
                            }
                            obj.options=obj.options.filter((itemOp:any)=>{
                               if(itemOp.option?.trim()!==""){
                                return itemOp
                               }
                            })
                             dispatch({type:"saveQuestionToQuestionBank",payload:obj})
                        }
                })
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    } 
    
    useEffect(()=>{
        if(questionBank?.length>0){
            setChoosenFile(true)
        }
    },[])

   
  return (
    <div className="my-4">
        {
            !choosenFile  && <label className="my-4 text-primary fw-bolder">
        Import Questions From XLS Sheet
    </label>
}
    {
        !choosenFile ?
    
    <input
        type="file"
        className="form-control w-25"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    /> :<><p className="text-primary fw-bolder fs-3">Total Questions: <span className="text-dark fw-bolder fs-3">{questionBank?.length}</span></p>
           <button className="btn btn-primary" onClick={async (e:any)=>{
               e.preventDefault()
               if(questionDetail){
                if(!questionDetail?.question_type?.value?.trim()) errrorMessage("Please select Question Type")
                else  if(!questionDetail?.level?.value?.trim()) errrorMessage("Please select Question Level")
                else  if(questionDetail?.course?.length<=0) errrorMessage("Please select Course")
                else  if(!questionDetail?.subject?.id) errrorMessage("Please select Subject")
                else  if(questionDetail?.marks?.marks<0 || !questionDetail?.marks?.marks) errrorMessage("Question marks must be greater than  0")
                // else  if(questionDetail?.marks?.negative_marks<0  || !questionDetail?.marks?.negative_marks) errrorMessage("Question negative marks must be greater than  0")
               else{
                 navigate("/questions/reviewAllQuestions",{state:{questionDetail,questionBank}})
               }
            }
           }}>Review All Questions</button>
       </>
    } 
</div>

  )
}

export default UploadQuestionsThroughExcelSheet