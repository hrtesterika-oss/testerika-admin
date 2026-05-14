import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { generateLeaderBoard,getAllUserDetailUsingUserIds } from '../core/_requests';

const Leaderboard = () => {
    const [leaderboard, setLeaderBoard] = useState<any[]>([]);
    const [userDetails,setUserDetails]=useState<any[]>([])
    const params=useParams()
    const getLeaderBoard = async () => {
        try {
          let payload = {
            packageid: params?.packageid,
          };
          const { data } = await generateLeaderBoard(payload);
          console.log(data,">>>>>>>>>>>>>>>>>>>>>>>>>>>")
          if (data?.success) {
            setLeaderBoard(data?.data);
            const userIds=data?.data?.map((item:any)=>item?.user_id)
            if (userIds?.length > 0) {
              let userDetail = await getAllUserDetailUsingUserIds(userIds);
              console.log(userDetail,">>>>>>>>>>")
              setUserDetails(userDetail?.data?.data)
            }
    
            // // const loopedArray = Array.from({ length: data?.allAttempt }, (_, index) => index);
            // // setAllAttempt(loopedArray)
            // setResult(data?.data)
            // setLoading(false)
            // setLoading2(false)
          } else {
            // router.push("/access-denied")
          }
        } catch (err) {}
      };
      useEffect(() => {
        getLeaderBoard();
      }, [params]);
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                 <div>
                     <h5>Leaderboard</h5>


                     {leaderboard?.length>0 ? <table className='table table-white table-striped p-2 my-2'>
                        <thead style={{ textAlign: "center", padding: "5px" }}>
                            <tr className='p-1'>
                                <th scope="col" className='fw-bolder text-primary'>Rank</th>
                                <th scope="col" className='fw-bolder text-primary'>Name</th>
                                <th scope="col" className='fw-bolder text-primary'>Phone</th>

                                <th scope="col" className='fw-bolder text-primary'>Total Marks</th>
                                <th scope="col" className='fw-bolder text-primary'>Marks Obtained</th>
                            </tr>
                        </thead>


                        <tbody style={{ textAlign: "center", padding: "5px" }}>
                            {leaderboard?.length > 0 && leaderboard?.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td>{item?.rank}</td>
                                    <td>
                                    {userDetails?.find((user: any) => user?.id == item?.user_id)?.firstname + " " + userDetails?.find((user: any) => user?.id == item?.user_id)?.lastname}
                                    </td>
                                    <td>
                                    {userDetails?.find((user: any) => user?.id == item?.user_id)?.phone}
                                    </td>
                                    <td>{item?.total_marks}</td>
                                    <td>{item?.total_points}</td>

                                </tr>
                            })}
                        </tbody>
                    </table>:<p style={{ color: "black",margin:"20px auto",fontWeight:"bolder",textAlign:"center" }}>No Leaderboard Found</p>}
                

                 </div>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard
