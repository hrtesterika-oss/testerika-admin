/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import { useNavigate } from 'react-router-dom'



const DisplayQuestions: FC<any> = ({questions}) => {
  const {setItemIdForUpdate} = useListView()
  const navigate=useNavigate()

  const openEditModal = () => {
    setItemIdForUpdate(questions.id)
  }

  function removeHTML (str: string) {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = str
    return tmp.textContent || tmp.innerText || ''
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {questions?.length > 0 &&
          questions?.map((item: any, i: any) => (
            <a
              key={i}
              // onClick={openEditModal}
              style={{cursor: 'pointer'}}
              className='text-gray-800 text-hover-primary mb-1'
              // onClick={()=>{
              //   navigate(`/questions/viewAllQuestions/${questions.id}`)
              // }}
            >
              {removeHTML(item.question)}
            </a>
          ))}
      </div>
    </div>
  )
}

export {DisplayQuestions}
