import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PathMiddleWare = ({children}:any) => {
    const {asideMenuUrl}=useSelector((state:any)=>state?.reducerData)
    const navigate=useNavigate()
    useEffect(()=>{
         const pathName=window.location.pathname
         if(asideMenuUrl && asideMenuUrl.length > 1 && !asideMenuUrl.includes(pathName)){
            // Fallback check for settings sub-paths
            if(pathName?.split("/")[1]==="settings"){
                const subPath = pathName?.split("/")[2];
                const isSubPathAllowed = asideMenuUrl.some((url: string) => url.endsWith("/" + subPath));
                if(!isSubPathAllowed){
                    navigate("/dashboard")
                }
            } else {
                navigate("/dashboard")
            }
         }
    })
  return (
    <div>{children}</div>
  )
}

export default PathMiddleWare