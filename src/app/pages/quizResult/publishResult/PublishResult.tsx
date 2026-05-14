import React, { useEffect, useState } from 'react'
import { publishResultData } from '../users-list/core/_requests'
import { useLocation, useParams } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ExportResultExcel from './exportResult/ExportResultAsExcelSheet';
import ReactCsvFile from './exportResult/ExportResultAsCSV';
import ExportToPdfButton from './exportResult/ExportResultAsPDF';
const PublishResult = () => {
  const params=useParams()
   const [result,setResult]=useState<any[]>([])
   const location:any=useLocation()
   const [exportResult,setExportResult]=useState(false)
    useEffect(()=>{
       if(params?.id)
          publishResultData(Number(params?.id)).then((data)=>{
               if(data.success){
                setResult(data?.data)
               }
          })
    },[])
  return (
    <div>
       <div className="container-fluid">
          <div className="row">
               <div className="col-12 d-flex justify-content-between align-items-center">
                  <div>
                   {result?.length>0 && <button className="btn btn-primary">Publish Result</button>}
                  </div>
                  <div>
                   {result?.length>0 && <button className="btn btn-primary" onClick={()=>{
                    setExportResult(true)
                   }}>Export Result</button>}
                  </div>
               </div>
               <div className="col-12 my-5">
                  <div>
                      {
                        result?.length>0 &&
                        <table className="table table-light table-striped-rows">
                          <thead >
                              <tr>
                                  <th className="text-primary fw-bolder">
                                    #Rank
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Name
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Mobile Number
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Marks Obtain
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Time Taken
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Total Attempted
                                  </th> 
                                  <th className="text-primary fw-bolder">
                                    Total Correct
                                  </th>
                                  <th className="text-primary fw-bolder">
                                    Total Incorrect
                                  </th> 
                                  <th className="text-primary fw-bolder">
                                    Prize
                                  </th>                                  
                              </tr>
                          </thead>
                           <tbody >
                               {
                                result?.map((item:any,index:number)=>{
                                   return <tr key={index}>
                                          <td>
                                             {item?.rank}
                                          </td>
                                          <td className="text-danger fw-bolder">
                                            {item?.userDetail?.firstname+" "+item?.userDetail?.lastname}  <span className="text-success">({item?.userDetail?.email})</span>
                                          </td>
                                          <td>
                                            {item?.userDetail?.phone}
                                          </td>
                                          <td>
                                            {item?.total_points}
                                          </td>
                                          <td>
                                            {item?.total_time_taken}
                                          </td>
                                          <td>
                                            {item?.total_questions_attempted}
                                          </td>
                                          <td>
                                            {item?.total_correct_answer}
                                          </td>
                                          <td>
                                            {item?.total_incorrect_answer}
                                          </td>
                                        </tr>
                                                                            
                                })
                               }
                           </tbody>
                       </table>
                      }
                      {
                        result?.length<=0 &&   <div style={{width:"100%",height:"60vh",display:"flex",justifyContent:"center",alignItems:"center"}}><h2 style={{border:"2px solid black",fontSize:"20px",padding:"20px 20px",cursor:"pointer",borderRadius:"15px"}}>No Results Found</h2></div>

                      }



                  </div>

                  {
                    exportResult && <>
                        <Modal open={exportResult} onClose={()=>{
                          setExportResult(false)
                        }} center>
                            <div style={{width:"600px",margin:"30px auto"}}>
                               <div>
                                  <h2 className="text-center mx-auto my-4">Export Quiz ({location?.state?.quiz?.name}) Result</h2>
                               </div>
                               <div>
                                 <ExportResultExcel result={result} quiz={location?.state?.quiz}/>
                                 <ReactCsvFile result={result} quiz={location?.state?.quiz}/>
                                 <ExportToPdfButton data={result}/>
                               </div>
                            </div>
                        </Modal>
                    </>
                  }
               </div>
          </div>
       </div>
    </div>
  )
}

export default PublishResult