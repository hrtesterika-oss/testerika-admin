import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
import { getAllRegistereduserList, getTotalAmountAccordingToMonthEveryYear, getTotalTransactionCountForEveryMonthAccordingToYear } from './request';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const MonthlyProfitStatusForEveryYearPodium = () => {
    const [transactionCount,setTransactionCount]=useState<any[]>([0,0,0,0,0,0,0,0,0,0,0,0])
    const [selectYear,setSelectYear]=useState<any>(new Date().getFullYear())
    const [selectCurrency,setSelectCurrency]=useState<any>("INR")
    const [selectedEmail,setSelectedEmail]=useState<string>("")
    const [user,setUser]=useState<string[]>([])
    const data3:any = {
        labels:[`January (${selectCurrency})`,`February (${selectCurrency})`,`March (${selectCurrency})`,`April (${selectCurrency})`,`May (${selectCurrency})`,`June (${selectCurrency})`,`July (${selectCurrency})`,`August (${selectCurrency})`,`September (${selectCurrency})`,`October (${selectCurrency})`,`November (${selectCurrency})`,`December (${selectCurrency})`],
        datasets: [
          {
            label: '',
            data: transactionCount,
            fill: false,
            backgroundColor: ["#4d3f63", "#449f8a", "#aa81a1", "#e1ac6a","#1ba7ca","#f08aa2","#6a75b3","#b95a56","#c81ed5","#e50d2d","#0cf11e","#eccd06"],
            borderRadius: "15",
            borderSkipped: "bottom",
            barThickness: 35,
          }
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#475569",
            },
          },
                labels: {
                  show: true,
                  total: {
                    show: true,
                    fontSize: "1.5rem",
                    color: "#475569",
                    label: "Total INR-",
                   
                  },
                },
        },
    
        scales: {
          y: {
            grid: {
              color: "#e2e8f0",
            },
            ticks: {
              color: "#475569",
            },
          },
          x: {
            grid: {
              color: "#e2e8f0",
            },
    
            ticks: {
              color: "#475569",
            },
          },
        },
    
        maintainAspectRatio: true,
      };



      const getTotalAmountEveryYear=async ()=>{
            const {data}=await getTotalAmountAccordingToMonthEveryYear(new Date().getFullYear()+"-"+"01"+"-"+"01",new Date().getFullYear()+"-"+"12"+"-"+"31","INR","")
            if(data?.success){
                setTransactionCount(data?.data)
            }else{
                setTransactionCount([0,0,0,0,0,0,0,0,0,0,0,0])
            }
      }
      const getAllRegisteredUserDetail=async ()=>{
          const {data}=await getAllRegistereduserList()
          if(data?.success){
            setUser(data?.data)
          }
      }
      useEffect(()=>{
           getAllRegisteredUserDetail()
            getTotalAmountEveryYear()
      },[])
  return (
    <div className={`card`} style={{margin:"30px auto",padding:"10px 15px"}}>
    {/* begin::Header */}
                <div className='card-header border-0'>
                </div>
                <div className="row gy-4 d-flex align-items-center">
                    <div className="col-3">
                        <h4 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bolder fs-4 mb-1'>Net Payable Amount (Every year)</span>
                        </h4>
                    </div>
                    <div className="col-3">
                       <select className="react-select form-control form-select" value={selectYear} onChange={async (e:any)=>{
                                if(e.target.value!="Select Year"){
                                    setSelectYear(e?.target?.value)
                                    const {data}=await getTotalAmountAccordingToMonthEveryYear(e.target.value+"-"+"01"+"-"+"01",e.target.value+"-"+"12"+"-"+"31",selectCurrency,selectedEmail)
                                    if(data?.success){
                                        setTransactionCount(data?.data)
                                    }else{
                                        setTransactionCount([0,0,0,0,0,0,0,0,0,0,0,0])
                                    }
                                }

                        }}>
                            <option className="text-primary" selected>Select Year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select className="react-select form-control form-select" value={selectedEmail} onChange={async (e:any)=>{
                                if(e.target.value!="Select User"){
                                    setSelectedEmail(e?.target?.value)
                                    const {data}=await getTotalAmountAccordingToMonthEveryYear(selectYear+"-"+"01"+"-"+"01",selectYear+"-"+"12"+"-"+"31",selectCurrency,e.target.value)
                                    if(data?.success){
                                        setTransactionCount(data?.data)
                                    }else{
                                        setTransactionCount([0,0,0,0,0,0,0,0,0,0,0,0])
                                    }
                                }
                        }}>
                            <option className="text-primary" selected>Select User</option>
                           {
                            user?.length>0 && user?.map((item:any,index:number)=>{
                                return <option key={index} value={item}>{item}</option>
                            })
                           }
                        </select>
                    </div>
                    <div className="col-3">
                        <select className="react-select form-control form-select" value={selectCurrency} onChange={async (e:any)=>{
                                if(e.target.value!="Select Currency"){
                                    setSelectCurrency(e?.target?.value)
                                    const {data}=await getTotalAmountAccordingToMonthEveryYear(selectYear+"-"+"01"+"-"+"01",selectYear+"-"+"12"+"-"+"31",e.target.value,selectedEmail)
                                    if(data?.success){
                                        setTransactionCount(data?.data)
                                    }else{
                                        setTransactionCount([0,0,0,0,0,0,0,0,0,0,0,0])
                                    }
                                }
                        }}>
                            <option className="text-primary" selected>Select Currency</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>
                
                <div>
                        <Bar options={options} data={data3}  />
                </div>
    </div>
  )
}

export default MonthlyProfitStatusForEveryYearPodium