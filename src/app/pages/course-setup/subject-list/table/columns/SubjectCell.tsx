/* eslint-disable jsx-a11y/anchor-is-valid */
import axios, {AxiosResponse} from 'axios'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useCommonData} from '../../../commonData/CommonDataProvider'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  courses: any
}

const SubjectCell: FC<Props> = ({courses}) => {
  const {allCategories} = useCommonData()

  // let item = allCategories?.filter((x: any) =>
  //   courses?.some((y: any) => y.course_category_id == x.id)
  // )
  // item = item?.flatMap((x: any) => [x.course_category])

  return (
    <div className='d-flex align-items-center'>
      {/* <div className='d-flex flex-column'>{item?.join(', ')}</div> */}
      <div className='d-flex flex-column'>{(courses?.course_ids)}</div>

    </div>
  )
}

export {SubjectCell}
