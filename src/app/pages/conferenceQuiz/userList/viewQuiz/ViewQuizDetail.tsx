import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../quizList/core/_requests";
import NotFound from "./NotFound";

const ViewQuizDetail = () => {
    const [QuizDetail,setQuizDetail]=useState([])
    const [show,setShow]=useState(true)
    const params=useParams()
    const [showColor,setShowColor]=useState("green")
    const [load,setLoad]=useState(true)
    const [activePlanPresent,setActivePlanPresent]=useState([])
    const [freePlan,setFreePlan]=useState()
    const getQuizDetailUsingQuizKey=async (quizKey:any)=>{
      const data=await getUserById(quizKey)
      if(data){
        let {questions}=data
      setQuizDetail(questions)
      if(questions?.length>0){
        setTimeout(()=>{
          setLoad(false)
        },1000)
      }else{
        setTimeout(()=>{
          setLoad(false)
        },1000)
      }
      }else{
        setTimeout(()=>{
          setLoad(false)
        },1000)
      }
      
    }
  useEffect(()=>{
    if(params?.quiz_id){
      getQuizDetailUsingQuizKey(params?.quiz_id)
    }
  },[params])
 
  return (
    <div>
      {load  && (
         <div style={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
         <h2 style={{fontSize:"20px",padding:"10px 10px",cursor:"pointer"}}>Please Wait...</h2>
         </div>
      )}
      
      {!load && (
        <div className="container py-4 my-4">
             <div className="row">
             <div className="col-12">
                        {
                        QuizDetail?.length>0 ? QuizDetail?.map((item:any,index:number)=>{
                            return <div key={index} className="mb-4 p-3" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"5px"}}>
                            <div className="">
                            <div className="d-flex my-2 justify-content-start align-item-center">
                                <div className="me-2 ms-2 fs-3 fw-bolder">
                                {/* <Icon icon="heroicons:building-office-2" /> */}
                                Q.{index+1}
                                </div>
                                <div className="ms-2 fs-3 fw-bolder" dangerouslySetInnerHTML={{__html:`${item?.question}`}}>
                                </div>
                            </div>
                            <div className="row">

                                {
                                item?.options?.map((item2:any,index2:number)=>{
                                    return <div key={index2} className="col-6 my-2 d-flex justify-content-start align-item-center">
                                    <input className="form-check-input" type="radio"
                                        checked={item2?.right_option}
                                        onChange={()=>{}}
                                    />
                                    <div className="preview ms-2 fs-5" dangerouslySetInnerHTML={{__html:`${item2?.options}`}}/>
                                </div>
                                })
                                }
                            </div>
                            {/* <Link
                                href="#"
                                className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
                            >
                                <span>Chnage QuizDetails</span> <Icon icon="heroicons:arrow-right" />
                            </Link> */}
                            </div>
                        </div>  
                        }): !load && <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Details Found</h2>
                            </div>
                        }
       </div>
            </div>
        </div>
         
      )}
     
    </div>
  );
};

export default ViewQuizDetail;
