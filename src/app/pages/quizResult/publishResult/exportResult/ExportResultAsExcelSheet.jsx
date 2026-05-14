"use client"

import React, {Component, useEffect, useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
 
const  ExportResultExcel =({result,quiz})=>{    
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button text-light bg-primary border-0 text-sm p-3 justify-content-center mx-auto text-center d-flex"
                    style={{color:"white",background:"green",border:"none",outline:"none",textAlign:"center"}}
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Quiz Result as XLS"/>
                <table id="table-to-xls" style={{display:"none"}}>
                    <thead>
                        <tr style={{textAlign:"center",margin:"auto"}}>
                            <th colSpan={6} style={{textAlign:"center",margin:"auto",color:"green",padding:"30px auto",fontSize:"35px",fontWeight:"600"}}>Quizophy Quiz ({quiz?.name}) Result</th>
                        </tr>
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
                    <tbody>
                         
                    {
                        result.map((item,index)=>{
                            return  <tr key={index}>
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
 
            </div>
        );
    
}
 
export default ExportResultExcel
