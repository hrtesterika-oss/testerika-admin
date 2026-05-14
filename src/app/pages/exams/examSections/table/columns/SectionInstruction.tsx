/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import "./style.css"
type Props = {
  coupon_title: User
}

const SectionInstruction: FC<any> = ({coupon_title}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column coupon_title section_instruction_image' dangerouslySetInnerHTML={{__html:`${coupon_title}`}}/>
    </div>
  )
}

export {SectionInstruction}
