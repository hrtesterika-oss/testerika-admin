import React,{useState} from 'react'
import JoditEditor from "jodit-react"
import { useRef } from "react"

const Editor = ({setEditFaq,editFaq,setCreateFaq,createFaq}) => {
    const editor = useRef(null)
    let config = 
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder:'Start typings...'
		}
  return (
    <div>
         <JoditEditor
              value={editFaq?.id?editFaq?.answer:createFaq?.answer}
              onChange={(newContent) => {
                if(editFaq?.id){
                  setEditFaq({...editFaq,answer:newContent})
                 }else{
                  setCreateFaq({...createFaq,answer:newContent})
                }
              }}
         />
    </div>
  )
}

export default Editor