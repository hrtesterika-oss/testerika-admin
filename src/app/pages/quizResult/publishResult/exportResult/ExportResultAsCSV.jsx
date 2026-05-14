"use client"

import React, { useEffect, useState } from 'react'
import { CSVLink, CSVDownload } from "react-csv";

let finalArr=[]
let headers = [
    { label: "#Rank", key: "rank" },
    { label: "Name", key: "name" },
    {label:"Mobile Number",key:"phone"},
    {label:"Marks Obtain",key:"total_points"},
    {label:"Time Taken",key:"total_time_taken"},
    {label:"Total Attempted",key:"total_questions_attempted"},
    { label: "Total Correct", key: "total_correct_answer" },
    { label: "Total Incorrect", key: "total_incorrect_answer" },
    {label:"Prize",key:"prize"},

  ];
const ReactCsvFile = ({result,quiz}) => {
    useEffect(()=>{
        if(result?.length>0){
            result.map((item,index)=>{
               let temp={
                ...item,
                name:item.userDetail?.firstname+" "+item?.userDetail?.lastname+" "+(item?.userDetail?.email),
                phone:item?.userDetail?.phone
               }
               finalArr.push(temp)
            })
        }
        },[result])
   
  return (
    <div>
        <CSVLink style={{width:"200px"}} className="text-light bg-danger border-0 p-3 justify-content-center mx-auto mt-5 text-center d-flex text-sm fs-6" data={finalArr} headers={headers}>
            Export Quiz Result as CSV
            </CSVLink>
    </div>
  )
}

export default ReactCsvFile