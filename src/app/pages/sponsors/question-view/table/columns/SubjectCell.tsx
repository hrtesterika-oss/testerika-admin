/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../core/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  subject_id: any
}

const SubjectCell: FC<Props> = ({subject_id}) => {
  const {sponsors} = useCommonData()

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {sponsors?.find((x: any) => x.id == subject_id)?.name}
      </div>
    </div>
  )
}

export {SubjectCell}
