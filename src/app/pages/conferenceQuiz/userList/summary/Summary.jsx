import React,{useEffect,useMemo,useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Donut from "./Chart"
import  ReactStars from 'react-rating-stars-component'

import "./index.css"
import { useParams } from 'react-router-dom';
import { getSummary } from '../quizReport/core/_requests';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Summary() {
  const params=useParams()
  const [value, setValue] = React.useState(0);
  const [quizInfo,setQuizInfo]=useState()
  const [summarydata,setSummaryData]=useState()
  const [feedBack,setFeedBack]=useState([])

  const memoizedDonut=useMemo(()=>{
    if( quizInfo ){
       return <Donut completed={quizInfo?.totalCorrectPercentage>0 ?quizInfo?.totalCorrectPercentage:0} />
    }
},[quizInfo])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(()=>{
    if(params?.id){
      getSummary(params?.id).then((data)=>{
        if(data?.success){
          setQuizInfo(data?.quizDetail)
          setFeedBack(data?.feedBackArr)
          setSummaryData(data?.summary)
        }
      }).catch((err)=>{
         console.log(err)
      })
    }
  },[params])
  const columns = [
    {
      label: "Nickname",
      field: "nickname",
    },
    {
      label: "Rank",
      field: "rank",
    },
  
    {
      label: "Correct %",
      field: "correct_answers",
    },
    {
      label: "Total Time Taken",
      field: "total_time_taken",
    },
  
    {
      label: "Final Score",
      field: "final_scopre",
    },
  ];

  const columnsQuestion=[
    {
      label: "Questions",
      field: "nickname",
    },
    {
      label: "Type",
      field: "rank",
    },
  
    {
      label: "Correct %",
      field: "correct_answers",
    },
  ]
  const columnsFeedback=[
    {
      label: "S No.",
      field: "pin",
    },
    {
      label: "Game Pin",
      field: "pin",
    },
    {
      label: "Nickname",
      field: "nickname",
    },
  
    {
      label: "Rating",
      field: "rate",
    },
    {
      label: "Feedback",
      field: "message",
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="tab_heading" label="Summary" {...a11yProps(0)} />
          <Tab className="tab_heading" label="Players" {...a11yProps(1)} />
          <Tab className="tab_heading" label="Questions" {...a11yProps(2)} />
          <Tab className="tab_heading" label="Feedbacks" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="container-fluid my-3 p-4">
           <div className="row gy-5">
            <div className="col-5" style={{borderRight:"2px solid black"}}>
                {
                  memoizedDonut
                }
            </div>

            <div className="col-5 my-3" style={{padding:"10px 30px"}}>
            <div style={{padding:"10px 30px",marginLeft:"30px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",lineHeight:"70px"}}>
                      <p style={{fontSize:"20px"}}> Players:</p>
                      <p style={{marginLeft:"100px",fontSize:"20px"}}>{quizInfo?.total_users}</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",lineHeight:"70px"}}>
                      <p style={{fontSize:"20px"}}> Questions:</p>
                      <p  style={{marginLeft:"100px",fontSize:"20px"}}>{quizInfo?.total_questions}</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",lineHeight:"70px"}}>
                      <p style={{fontSize:"20px"}}>Time:</p>
                      <p  style={{marginLeft:"100px",fontSize:"20px"}}>{quizInfo?.total_time} (Seconds)</p>
                    </div>                          
                 </div>
            </div>
           </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <div className="container-fluid my-5">
            <div className="row">
              <div className="col-12">
              <table className="table table-striped table-hovered">
                  <thead>
                    <tr>
                    {summarydata?.length>0 && columns.map((column, i) => (
                              <th key={i} scope="col" style={{fontWeight:"bolder",fontSize:"17px"}} className="col text-primary">
                                {column.label}
                              </th>
                    ))}
                    </tr>
                  </thead>
                  <tbody>
                  {
                            summarydata && summarydata?.length>0 && summarydata?.map((itemData,index)=>{
                               return   <tr key={index}
                               className=""
                             >
                               <td className="fw-bolder fs-5">{itemData?.nickname}</td>
                               <td className="fs-4" style={{fontWeight:"500"}}>{index+1}</td>
                               <td className="fs-4" style={{fontWeight:"500"}}> {itemData?.correct_percentage} {' '}%</td>
                               <td className="fs-4" style={{fontWeight:"500"}}>{(Number(itemData?.miliseconds)/1000).toFixed(3)} {" "}Seconds</td>
                               <td className="fs-4" style={{fontWeight:"500"}}>{itemData?.totalPoints}</td>
                             </tr>
                            })
                          }
                          {
                            summarydata?.length<=0 && <div>
                              <h5 className="text-center py-3">No players available.</h5>
                            </div>
                          }
                  </tbody>
              </table>
              </div>
            </div>
          </div>
    
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="container-fluid my-5">
            <div className="row">
              <div className="col-12">
              <table className="table table-striped table-hovered">
                  <thead>
                    <tr>
                    {columnsQuestion?.length>0 && columnsQuestion.map((column, i) => (
                              <th key={i} scope="col" style={{fontWeight:"bolder",fontSize:"17px"}} className="col text-primary">
                                {column.label}
                              </th>
                    ))}
                    </tr>
                  </thead>
                  <tbody>
                  {
                            quizInfo && quizInfo?.questions?.map((itemData,index)=>{
                               return   <tr key={index}
                               className=""
                             >
                               <td className="table-td fw-bolder fs-5 preview" dangerouslySetInnerHTML={{__html:itemData?.question}}/>
                               <td className="fs-4" style={{fontWeight:"500"}}>{itemData?.question_type}</td>
                               <td className="fs-4" style={{fontWeight:"500"}}> {Number(itemData?.correct_percentage).toFixed(2)} %</td>
                             </tr>
                            })
                          }
                         
                  </tbody>
              </table>
              </div>
            </div>
          </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
      <div className="container-fluid my-5">
            <div className="row">
              <div className="col-12">
              <table className="table table-striped table-hovered">
                  <thead>
                    <tr>
                    {feedBack?.length>0 && feedBack[0] && columnsFeedback.map((column, i) => (
                              <th key={i} scope="col" style={{fontWeight:"bolder",fontSize:"17px"}} className="col text-primary">
                                {column.label}
                              </th>
                    ))}
                    </tr>
                  </thead>
                  <tbody>
                  {
                             feedBack && feedBack[0] && feedBack?.length>0 && feedBack?.map((itemData,index)=>{
                               return itemData &&  <tr key={index}
                               className=""
                             >
                               <td className="table-td fw-bolder fs-5">{index+1}</td>
                               <td className="fs-4" style={{fontWeight:"500"}}>{itemData?.pin}</td>
                               <td className="fs-4" style={{fontWeight:"500"}}> {itemData?.nickname}</td>
                               <td className="table-td">
                                   <ReactStars
                                      count={5}
                                      value={Number(itemData?.rate)}
                                      isHalf={true}
                                      emptyIcon={<i className="far fa-star"></i>}
                                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                                      fullIcon={<i className="fa fa-star"></i>}
                                      disabled={true}
                                      size={25}
                                      activeColor="#ffd700"
                                      edit={false}
                                    />
 
                               </td>
                               <td className="table-td "> {itemData?.message?itemData?.message:"No Feedback"}</td>
                             </tr>
                            })
                          }
                           {
                            (feedBack?.length<=0 || !feedBack[0]) && <div>
                              <h5 className="text-center py-3">No feeedback available.</h5>
                            </div>
                          }
                         
                  </tbody>
              </table>
              </div>
            </div>
          </div>
      </CustomTabPanel>
    </Box>
  );
}