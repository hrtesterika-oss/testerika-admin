/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import { getQuizTypeById } from '../../core/_requests'

type Props = {
  quizTypeId: any
}

const QuizTypeCell: FC<Props> = ({quizTypeId}) => {
    const [quizType,setQuizType]=useState<any>(null)
    const getQuizType=async ()=>{
       const {data}=await getQuizTypeById(quizTypeId)
       if(data?.success){
        setQuizType(data?.data?.quiz_type)
       }
    }
    useEffect(()=>{
        if(quizTypeId != undefined)
           getQuizType()
    },[quizTypeId])
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column text-primary fw-bolder'>{(quizType)}</div>
    </div>
  )
}

export {QuizTypeCell}
