import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPollResult } from '../core/_requests'
import thumbnail from "./card-6.png"
import Moment from 'react-moment';
import { Line, Circle } from 'rc-progress';
import Chart from "react-apexcharts"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  // import { Bar } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
let colors=["#4d3f63", "#449f8a", "#aa81a1", "#e1ac6a","#1ba7ca","#f08aa2","#6a75b3","#b95a56"]

const PollResult = () => {
    const params=useParams()
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
    const [reply,setReply]=useState(false)
    const [replyChild,setReplyChild]=useState(false)
    const [polldata,setPolldata]=useState<any>()
   
    const [replyIndex,setReplyIndex]=useState(-1)

    // const [load, setLoad] = useState(false)   
   const [userComment,setUserComment]=useState({
    poll_id:polldata?.id,
    conference_user_id:polldata?.user_id ? polldata?.user_id:null,
    full_name:"",
    like:0,
    comment:"",
    email_mobile:""
  })
  const [userCommentReply,setUserCommentReply]=useState({
    poll_id:polldata?.id,
    comment_id:0,
    conference_user_id:polldata?.user_id ? polldata?.user_id:null,
    full_name:"",
    like:0,
    comment_reply:"",
    email_mobile:""
  })

  const getPollResults=async ()=>{
    const {data}=await getPollResult(params?.key)
    if(data?.success){
        setPolldata(data?.data)
    }
  }
  useEffect(()=>{
    if(params?.key){
       getPollResults()
    }
  },[params?.key])
 

  const options2:any = {
    labels: polldata?.results?.map((item:any)=>""),
    dataLabels: {
      enabled: true,
    },
    colors:  ["#4d3f63", "#449f8a", "#aa81a1", "#e1ac6a","#1ba7ca","#f08aa2","#6a75b3","#b95a56"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: "#475569",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color: "#475569",
            },
            value: {
              show: true,
              fontFamily: "Inter",
              color: "#475569",
             
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              color: "#475569",
              label: "Total Votes",
             
            },
          },
        },
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  let voteDataArr=polldata?.results?.map((item:any)=>item?.vote_count)
  
  return (
    <div>
        <div className="container" style={{marginBottom:"50px"}}>
            <div className="row">
                <div className="col-12">
                    <div className="row" style={{boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",padding:"30px",borderRadius:"10px"}}>
                        <div className="col-12">
                         <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                              <img src={polldata?.thumbnail?polldata?.thumbnail:thumbnail} style={{ height: "38px", width: "38px" ,borderRadius:"100%" ,padding:"3px" }} />
                                <h6 style={{marginLeft:"10px"}}>
                                    {polldata?.poll_title}
                                </h6>
                         </div>
                           <span>
                                <span className="inline-flex items-center space-x-1">
                                    <span>
                                    <svg style={{width:"25px"}} className="h-5 w-5 ml-2 " xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" stroke="">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg></span>
                                    <span style={{fontSize:"12px",fontWeight:"600"}}>
                                    By:- {polldata?.user_name} (<Moment fromNow>{new Date(polldata?.createdAt)}</Moment>)
                                    </span>
                                </span>
                                
                            </span>  
                        </div>
                        <div className="col-12">
                                {polldata?.results?.length>0 && polldata?.results[0]?.total_vote>0 ? <div>
                                <label className="" style={{fontSize:"20px",fontWeight:"600",margin:"20px 0px"}}>
                                Analyze Result                     
                                </label>
                                <div>
                                <div className="row main_container_style_custom">
                                { polldata?.results?.length>0 && (polldata?.poll_type=="Multiple Choice" || polldata?.poll_type=="Yes or No") &&  <div className="col-6 mt-5 result_graph_container">
                                {
                                    polldata?.results?.length>0 && (polldata?.poll_type=="Multiple Choice" || polldata?.poll_type=="Yes or No") && polldata?.results?.map((item:any,index:any)=>{
                                        return <div key={index} className="my-3"  style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",flexDirection:"column",cursor:"pointer"}}  >
                                        <div className="my-0" style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                                            <p>{item?.option}</p>
                                            <p>{item?.vote_percent}% ({item?.vote_count} votes)</p>
                                        </div>
                                        <Line percent={item?.vote_percent} trailWidth={2} trailColor="#d1c8c8" strokeWidth={2} strokeColor={colors[index]} style={{height:"17px",width:"100%"}} />                          

                                        </div>
                                        })
                                    }
                                    {
                                    polldata?.results?.length>0 && (polldata?.poll_type=="Multiple Choice" || polldata?.poll_type=="Yes or No") && <div className="my-3">
                                        Total votes: {polldata?.results[0]?.total_vote} (from {polldata?.results[0]?.participants} participants)
                                        </div>
                                    }
                                </div>}
                                {polldata?.results?.length>0 && (polldata?.poll_type=="Multiple Choice" || polldata?.poll_type=="Yes or No") &&  <div className="col-6 ">
                                    <div className="">
                                        <Chart options={options2} series={voteDataArr} type="donut" height="400" />
                                        </div>
                                    </div>}
                                </div>


                                    <div className="main_container_style_custom">
                                    <div className="row g-2">
                                        {
                                            polldata?.results?.length>0 && (polldata?.poll_type=="Image Poll" || polldata?.poll_type=="Audio Poll" || polldata?.poll_type=="Video Poll") && polldata?.results?.map((item:any,index:number)=>{
                                            return <div key={index} className="col-lg-5 col-12" style={{margin:"10px",position:"relative",border:`${"1px solid black"}`,borderRadius:"5px",padding:"15px"}}>
                                                <label>
                                                <div>
                                                {
                                                    item?.option!="" && <div style={{ width: "100%",margin:"10px auto",cursor:"pointer",border:`${"1px dotted black"}`,display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"10px",borderRadius:"2px" }} className="text-center bg-light p-5" >
                                                    {
                                                    polldata?.poll_type=="Image Poll" && <img src={item?.option} style={{margin:"auto",textAlign:"center",height:"92px",width:"100%",objectFit:"contain"}}/>    
                                                    }   
                                                    {
                                                    polldata?.poll_type=="Audio Poll" &&  <audio style={{margin:"auto",textAlign:"center",width:"90%",objectFit:"contain"}}   controls >
                                                        <source src={item?.option} />
                                                    </audio>    
                                                    }       
                                                    {
                                                    polldata?.poll_type=="Video Poll" && <video className="video_custom_style_given" style={{margin:"auto",height:"150px",textAlign:"center",width:"90%",objectFit:"contain"}}   controls >
                                                    <source src={item?.option} />
                                                    </video>        
                                                    }                                     
                                                </div>                                 
                                            }

                                            </div>
                                                </label>
                                                <input
                                                    type="text"
                                                    disabled={true}
                                                    className={` form-control py-2 mb-3 text-dark`}
                                                    style={{color:"black"}}
                                                    required
                                                    id="pn4"
                                                    value={item?.title?item?.title:"No Title"}
                                                    placeholder={`Enter Title`}
                                                    onChange={(e)=>{
                                                    
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    disabled={true}
                                                    className={` form-control py-2 text-dark`}
                                                    style={{color:"black"}}
                                                    required
                                                    id="pn4"
                                                    value={item?.description?item?.description:"No Description"}
                                                    placeholder={`Enter Description`}
                                                    onChange={(e)=>{
                                                    
                                                    }}
                                                />
                                                <div className="my-1">
                                                    <p>{item?.vote_percent}% ({item?.vote_count} votes)</p>
                                                </div>
                                                <div className="my-1">
                                                        <Line percent={item?.vote_percent} trailWidth={2} trailColor="#d1c8c8" strokeWidth={2} strokeColor={colors[index]} />                          
                                                </div>
                                        
                                        </div>
                                            })
                                        }      
                                    
                                    </div>
                                    
                                    { polldata?.results?.length>0 && (polldata?.poll_type=="Image Poll" || polldata?.poll_type=="Audio Poll" || polldata?.poll_type=="Video Poll") &&<div className="col-lg-6 col-12">
                                        <div style={{width:"300px"}}>
                                        <Chart options={options2} series={voteDataArr} type="donut" height="400" />
                                        </div>
                                    </div>}
                                    </div>
                                    
                                </div>
                                {
                                    polldata?.results?.length>0 && (polldata?.poll_type=="Image Poll" || polldata?.poll_type=="Audio Poll" || polldata?.poll_type=="Video Poll") && <div className="my-3">
                                        Total votes: {polldata?.results[0]?.total_vote} (from {polldata?.results[0]?.participants} participants)
                                        </div>
                                    }                      
                                    </div>:<div style={{margin:"40px auto"}}>
                                        <p style={{margin:"30px auto",textAlign:"center",fontSize:"22px",fontWeight:"600"}}>No Results Available</p>                                      
                                </div>}
                        </div>

                        <div className="mx-auto text-center">
                                            <button className="btn btn-dark" onClick={()=>{
                                                navigate(`/conference-quiz/polls/create/${polldata?.user_id}`)
                                            }}>Create New Poll</button>
                         </div>  
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}

export default PollResult