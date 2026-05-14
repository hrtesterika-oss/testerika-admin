import React from 'react';

const DataTable = ({ data }) => {
  return (
    <h2>Hello</h2>
//     <table>
//     <thead>
//         <tr>
//         <th className="text-primary fw-bolder">
//                             Rank
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Name
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Mobile Number
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Marks Obtain
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Time Taken
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Total Attempted
//                           </th> 
//                           <th className="text-primary fw-bolder">
//                             Total Correct
//                           </th>
//                           <th className="text-primary fw-bolder">
//                             Total Incorrect
//                           </th> 
//                           <th className="text-primary fw-bolder">
//                             Prize
//                           </th>   
//         </tr>
//     </thead>
//     <tbody>
//         {data.map((item, index) => {
//                return <tr key={index}>
//                <td>
//                   {item?.rank}
//                </td>
//                <td className="text-danger fw-bolder">
//                  {item?.userDetail?.firstname+" "+item?.userDetail?.lastname}  <span className="text-success">({item?.userDetail?.email})</span>
//                </td>
//                <td>
//                  {item?.userDetail?.phone}
//                </td>
//                <td>
//                  {item?.total_points}
//                </td>
//                <td>
//                  {item?.total_time_taken}
//                </td>
//                <td>
//                  {item?.total_questions_attempted}
//                </td>
//                <td>
//                  {item?.total_correct_answer}
//                </td>
//                <td>
//                  {item?.total_incorrect_answer}
//                </td>
//              </tr>
//         }
        
//         )}
//     </tbody>
// </table>
  );
};

export default DataTable;
