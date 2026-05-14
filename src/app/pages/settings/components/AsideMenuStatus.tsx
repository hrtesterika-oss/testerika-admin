import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { API_URL } from './ApiUrl';
import { errrorMessage, successMessage } from '../../../modules/auth/components/ToastComp';
import { useNavigate } from 'react-router-dom';
import { SettingsName } from './SettingsName';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AsideMenuStatus = () => {
   const [asideMenudata,setAsideMenuData]=useState<Array<any[]>>([])
   const getAsideMenu=async ()=>{
      const {data}=await axios.get(`${API_URL}/option/aside_menu`)
        setAsideMenuData(data?.value)
      
   }
   useEffect(()=>{
        getAsideMenu()
   },[])
   const navigate=useNavigate()
   const {staffPermission,navItem}=useSelector((state:any)=>state.reducerData)
   const [permissionList,setPermissionList]=useState<any>({})
   const filterStaffPermission=async (title:string)=>{
     let result=staffPermission.filter((item:any)=>item.permission_name===title && item)
     setPermissionList(result[0])
     if(!result[0]?.can_view){
        navigate("/dashboard")
     }
   }
   useEffect(()=>{
     filterStaffPermission(navItem.item)
     },[])
  return (
   <div className='d-flex flex-column flex-lg-row'>
   <SettingsName active={'aside-menu-status'} />
   <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
            <div className="col-12">
            <div style={{textAlign:"right",marginTop:"40px"}}>
               {permissionList?.can_edit && <button className="btn btn-success text-center my-4" style={{margin:'auto',textAlign:"center"}} onClick={async (e:any)=>{
                      const {data}=await axios.put(`${API_URL}/option`,{name:"aside_menu",value:asideMenudata})
                      if(data?.success){
                        successMessage("Details Updated Successfully")
                      }else{
                        errrorMessage(data?.message)
                      }
                }}>Save Details</button>}
            </div>
            {
            asideMenudata && asideMenudata?.length>0 && asideMenudata?.map((item:any,index:number)=>{
                return typeof item?.name==="string" ? <div key={index} className="d-flex p-2 m-4" style={{marginLeft:"",background:`${index%2===0?"#f2f2f2":"#fff"}`}}>
                         <h2>{item?.name}</h2>
                         <div style={{margin:"auto"}}> <Switch {...label} checked={item?.status===1?true:false} onChange={(e:any)=>{
                            if(e?.target?.checked===false){
                                let temp=asideMenudata
                               let result=temp?.map((x:any)=>{
                                    if(x?.name===item?.name){
                                       return  x={...x,status:0}
                                    }else{
                                        return x
                                    }
                                })
                                setAsideMenuData(result)                                                               
                            }else{
                                let temp=asideMenudata
                                let result=temp?.map((x:any)=>{
                                     if(x?.name===item?.name){
                                        return  x={...x,status:1}
                                     }else{
                                         return x
                                     }
                                 })
                                 setAsideMenuData(result) 
                            }
                         }}/></div>
                    </div> : <div key={index} >
                          <div className="d-flex  p-2 m-4" style={{marginLeft:"",background:"#d2ece9"}}>
                            <h2>{item?.name?.label}</h2>
                            <div style={{margin:"auto"}}><Switch {...label} checked={item?.name?.status===1?true:false} onChange={(e:any)=>{
                            if(e?.target?.checked===false){
                                   let temp=asideMenudata
                                  let result= temp.map((x:any,i:number)=>{
                                     if(typeof x?.name==="object"){
                                        if(x.name.label===item.name.label){
                                            x={name:{label:x.name.label,url:x.name.url,icon:x.name.icon,value:x.name.value,status:0}}
                                        }
                                        return x
                                     }else{
                                        return x
                                     }
                                   })
                                   setAsideMenuData(result)
                            }else{
                                let temp=asideMenudata
                                let result= temp.map((x:any,i:number)=>{
                                   if(typeof x?.name==="object"){
                                    if(x.name.label===item.name.label){
                                        x={name:{label:x.name.label,url:x.name.url,icon:x.name.icon,value:x.name.value,status:1}}
                                    }
                                    return x
                                   }else{
                                      return x
                                   }
                                 })
                                 setAsideMenuData(result)
                            }
                         }}
                        /></div>
                          </div>
                          <div>
                            {item?.name?.value?.map((item2:any,index2:number)=>{
                                  return item2?.name!=="Aside Menu Status" && <div key={index2} className=" p-2" style={{display:"flex",marginLeft:"7%",background:`${index2%2!==0?"#fff":"#f2f2f2"}`}}>
                                    <h2>{item2?.name}</h2>
                                    <div style={{margin:"auto"}}>  <Switch {...label} checked={item2?.status===1?true:false}  onChange={(e:any)=>{
                            if(e?.target?.checked===false){
                                let temp=asideMenudata
                                let result= temp.map((x:any,i:number)=>{
                                   if(typeof x?.name==="object"){
                                     let tempArr=x?.name?.value?.map((y:any,i:number)=>{
                                         if(y?.name===item2.name){
                                            y={...y,status:0}
                                            return y
                                         }else{
                                            return y
                                         }
                                     })
                                     x={name:{...x.name,value:tempArr}}
                                      return x
                                   }else{
                                      return x
                                   }
                                 })
                                 setAsideMenuData(result)
                            }else{
                                       
                                let temp=asideMenudata
                                let result= temp.map((x:any,i:number)=>{
                                   if(typeof x?.name==="object"){
                                     let tempArr=x?.name?.value?.map((y:any,i:number)=>{
                                         if(y?.name===item2.name){
                                            y={...y,status:1}
                                            return y
                                         }else{
                                            return y
                                         }
                                     })
                                     x={name:{...x.name,value:tempArr}}
                                      return x
                                   }else{
                                      return x
                                   }
                                 })
                                 setAsideMenuData(result)
                            }
                         }}/></div>
                                  </div>
                            })}
                          </div>
                    </div>
            })
        }
            </div>

           
        </div>
      
    </div>
  )
}

export default AsideMenuStatus