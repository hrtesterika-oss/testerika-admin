import React,{useState} from 'react'
import JoditEditor from "jodit-react"
import { useRef } from "react"

const Editor = ({setValue,value}) => {
    const editor = useRef(null)
    let config = 
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder:'Start typings...'
		}
  return (
    <div>
         <JoditEditor
              value={value}
              onChange={(newContent) => setValue(newContent)}
         />
    </div>
  )
}

export default Editor