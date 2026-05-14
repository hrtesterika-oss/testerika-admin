/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../commonData/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import { useNavigate } from 'react-router-dom'

type Props = {
  subject_id: any
}

const QuestionBankCell: FC<any> = ({id}:any) => {
  const navigate=useNavigate()
  return (
    <div className='d-flex align-items-center'>
      <a href={`/questions/edit-details/${id}`} className='d-flex flex-column' style={{cursor:"pointer",color:"green"}}>{id}</a>
    </div>
  )
}

export {QuestionBankCell}
