/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
type Props = {
  questions: any
}

const CoursesCell: FC<Props> = ({questions}) => {
  function removeHTML (str: string) {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = str
    return tmp.textContent || tmp.innerText || ''
  }
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        
      <span
              style={{cursor: 'pointer'}}
              className='text-gray-800 text-hover-primary mb-1'
            >
              {questions?.language}
              {/* {removeHTML(use r?.passage)} */}
            </span>
      </div>
    </div>
  )
}

export {CoursesCell}
