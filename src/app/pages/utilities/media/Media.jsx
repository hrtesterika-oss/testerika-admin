// import React from 'react'
// import {FileManagerComponent, NavigationPane, Toolbar, DetailsView, Inject} from '@syncfusion/ej2-react-filemanager';
// import "./css/media.css"
// const Media = () => {
//     const host_URL = "https://ej2-aspcore-service.azurewebsites.net/";

//   return (
//     <div>
//          {/* <div className="App">
//       <FileManagerComponent ajaxSettings={{
//         url: host_URL+"api/FileManager/FileOperations",
//         downloadUrl: host_URL+"api/FileManager/Download",
//         uploadUrl: host_URL+"api/FileManager/Upload",
//         getImageUrl: host_URL+"api/FileManager/GetImage"
//       }}>
//         <Inject services={[NavigationPane, Toolbar, DetailsView]}></Inject>
//       </FileManagerComponent>
//     </div> */}
//     </div>
//   )
// }

// export default Media


// import React from 'react';
// import { FileManagerComponent, Inject, FileManager } from '@syncfusion/ej2-react-filemanager';
// import "./css/media.css"
// const Media = () => {
//   const hostUrl = 'https://ej2-aspcore-service.azurewebsites.net'; // Replace with your actual host URL
//   const accessKey = 'AKIA5ERKSOUKDAE5ZOHH'; // Replace with your S3 Access Key
//   const secretKey = 'LDf9JsX5SYruiSW0CVZTkzWDVefTRlakZ/pnP+wm'; // Replace with your S3 Secret Key
//   const bucketName = 'testerika-s3-bucket'; // Replace with your S3 Bucket Name

//   const ajaxSettings = {
//     url: `${hostUrl}/api/AmazonS3/FileOperations`,
//     getImageUrl: `${hostUrl}/api/AmazonS3/GetImage`,
//     uploadUrl: `https://${bucketName}.s3.amazonaws.com/`, // S3 bucket endpoint for upload
//     downloadUrl: `${hostUrl}/api/AmazonS3/Download`, // Endpoint for downloading files from S3
//     searchUrl: `${hostUrl}/api/AmazonS3/Search`, // Endpoint for searching files in S3
//     fileOperationsUrl: `${hostUrl}/api/AmazonS3/FileOperations`, // Endpoint for other file operations
//     // Other S3-specific parameters can be added here based on your requirements
//     customHeaders: [
//       {
//         headerName: 'Authorization',
//         headerValue: `Basic ${btoa(`${accessKey}:${secretKey}`)}`,
//       },
//     ],
//   };

//   return (
//     <div>
//       <FileManagerComponent
//         id="filemanager"
//         ajaxSettings={ajaxSettings}
//       >
//         <Inject services={[FileManager]} />
//       </FileManagerComponent>
//     </div>
//   );
// };

// export default Media;


// import React, { useState } from 'react';

// const Media = () => {
//   const [files, setFiles] = useState([
//     { name: 'file1.txt', type: 'file' },
//     { name: 'file2.jpg', type: 'file' },
//     { name: 'folder1', type: 'folder' },
//     { name: 'file3.png', type: 'file' },
//     { name: 'folder2', type: 'folder' },
//   ]);

//   const handleFileUpload = (event:any) => {
//     const file = event.target.files[0];
//     console.log(file)
//     if (file) {
//       setFiles([...files, { name: file.name, type: 'file' }]);
//     }
//   };

//   const handleFolderClick = (folderName:any) => {
//     const folderFiles = files.filter((file) => file.name.startsWith(folderName + '/'));
//     setFiles([...files, ...folderFiles]);
//   };

//   return (
//     <div>
//       <h1>File Manager</h1>
//       <div id="file-manager">
//         {files.map((file, index) => (
//           <div key={index} className="file-item" onClick={() => file.type === 'folder' && handleFolderClick(file.name)}>
//             <span>{file.type === 'file' ? '📄' : '📁'}</span>
//             <span>{file.name}</span>
//           </div>
//         ))}
//       </div>
//       <input type="file" style={{ display: '' }} onChange={handleFileUpload} />
//       <button onClick={(e:any) => console.log(e)}>Upload File</button>
//     </div>
//   );
// };

// export default Media;


import React,{useEffect,useRef,useState} from 'react';
import axios from "axios"
import { API_URL } from '../../settings/components/ApiUrl';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { useSelector } from 'react-redux';
import { successMessage } from '../../../modules/auth/components/ToastComp';


// const treeState = {
//   name: 'File manager',
//   isOpen: true,   // this folder is opened, we can see it's children
//   children: [
//     {
//       name: 'Quizophy Website',
//       checked: 0.5,
//       isOpen: false,
//       children: [
//         { name: 'Blog', checked: 0 }
//       ],
//     },
//     {
//       name: 'Conference Quiz',
//       checked: 0.5,
//       isOpen: false,
//       children: [
//         { name: 'Blog', checked: 0 }
//       ],
//     },
//     {
//       name: 'Quizophy App',
//       checked: 0.5,
//       isOpen: false,
//       children: [
//         { name: 'Books', checked: 0 }
//       ],
//     },
//   ],
// };
const Overview = () => {
  const [media, setMedia] = useState([]);
  const fileRef=useRef(null)

  const [activePage,setActivePage]=useState(0)
  const [total,setTotal]=useState(100)
 

  

  const getFileManagerDetailByName=async ()=>{
       try{
          const {data}=await axios.get(`${API_URL}/option/media`)
          setMedia(data?.value)
          setTotal(data?.value?.length)

          // console.log( data.value)
          // setFileManagerData(data?.value)
       }catch(err){
        console.log(err)
       }
  }
  useEffect(()=>{
     getFileManagerDetailByName() 
  },[])


   const {staffPermission,navItem}=useSelector((state)=>state.reducerData)
    const [permissionList,setPermissionList]=useState({})
    const filterStaffPermission=async (title)=>{
      let result=staffPermission.filter((item)=>item.permission_name===title && item)
      setPermissionList(result[0])
    }
    useEffect(()=>{
    filterStaffPermission(navItem?.item)
    },[navItem])
  
  return (
    <div>
      <div className="container-fluid">
          <div className="row">
             <div className="col-12">
                <div className="row" style={{height:"100%"}}>
                {permissionList?.can_create && <div className="col-2" style={{border:"1px solid black"}}>
                        <div className='mx-auto text-center d-flex justify-content-center align-items-center flex-column' style={{cursor:"pointer"}} onClick={()=>{
                          if(fileRef?.current){
                            fileRef?.current?.click()
                          }
                        }}>
                            <span style={{width:"90%"}}><img style={{width:"80px",borderRadius:"10px",objectFit:"contain"}} src="https://cdn-icons-png.flaticon.com/512/8191/8191573.png"/></span>
                            <button className='btn btn-primary btn-sm my-2 mx-auto'>Upload Image</button>
                        </div>
                     </div>}
                    {
                     permissionList?.can_view &&  media?.length>0 && media?.slice((activePage*10),(activePage*10)+10)?.map((item,index)=>{
                        return <div className="col-2 mx-2 my-1" key={index} style={{border:"1px solid black",borderRadius:"2px"}}>
                        <div className='mx-auto text-center' style={{position:"relative",height:"100%",width:"100%"}}>
                            <img style={{width:"100%",borderRadius:"10px",height:"100%",ovjectFit:"cover"}} src={item}/>
                            <button className='btn btn-primary btn-sm my-2 mx-auto' style={{position:"absolute",top:"30%",left:"15%"}} onClick={async ()=>{
                              await navigator.clipboard.writeText(item);
                              successMessage("Image Copied")
                            }}>Copy Url</button>
                        </div>
                     </div>
                      })
                    }


                    <div className='my-4'>
                       <button className='btn btn-primary' onClick={()=>{
                           if(activePage>0){
                            setActivePage((pre)=>pre-1)
                           }
                       }}>Previous</button>
                       {' '}
                        <span>{activePage+1+ "/" + Math.ceil(total/10)}</span>
                        {' '}
                       <button className='btn btn-primary' onClick={()=>{
                          if(activePage+1!=Math.ceil(total/10)){
                            setActivePage((pre)=>pre+1)
                           }
                       }}>Next</button>
                    </div>

                    

                     <input type="file" style={{display:"none"}} ref={fileRef} onChange={async (e)=>{
                        if(e?.target?.files[0]){
                          const fd=new FormData()
                          fd.append("image",e?.target?.files[0])
                          const {data}=await axios.post(`${API_URL}/staff/media/upload`,fd)
                          if(data?.success){
                            getFileManagerDetailByName()
                          }
                        }
                       
                     }}/>
                </div>
               
             </div>
          </div>
      </div>
    </div>
  );
};

export default Overview;

