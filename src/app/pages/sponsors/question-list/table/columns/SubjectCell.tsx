/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  quiz_id: any
}

const SubjectCell: FC<Props> = ({quiz_id}) => {
  const quiz = [
    {name: 'Prime Time', value: 1},
    {name: 'India GK', value: 2},
    {name: 'Milkha Singh Weekly Quiz', value: 3},
    {name: 'Bollywood Quiz', value: 4},
    {name: 'Mega Quiz', value: 5},
  ]

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {quiz.find((item: any) => item.value == quiz_id)?.name}
      </div>
    </div>
  )
}

export {SubjectCell}
