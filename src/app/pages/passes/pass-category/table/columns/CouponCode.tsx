/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'

type Props = {
  features: any
}

const UserInfoCell: FC<Props> = ({features}) => {
  console.log(features)
  const {setItemIdForUpdate} = useListView()

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <a
          style={{cursor: 'pointer'}}
          className='text-gray-800 text-hover-primary mb-1'
        >
          {
           features?.length>0 ?  <span>
            {
              features?.map((item:any)=>item?.feature).join(` , `)
            }
           </span>:"No Features Available"
          }
        </a>
      </div>
    </div>
  )
}

export {UserInfoCell}
