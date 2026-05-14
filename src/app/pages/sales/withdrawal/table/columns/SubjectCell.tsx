/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  subject_id: any
}

const SubjectCell: FC<Props> = ({subject_id}) => {
  const {quiz} = useCommonData()

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>{subject_id}</div>
    </div>
  )
}

export {SubjectCell}
