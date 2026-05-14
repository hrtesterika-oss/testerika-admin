import {Column} from 'react-table'
import {UserInfoCell} from './CouponCode'
import {UsedSoFar} from './UsedSoFar'
import {UserTwoStepsCell} from './Status'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {Percentage} from './Percentage'
import {MaxUser} from './MaxUser'
import {StartDate} from './StartDate'
import {CouponTitle} from './CouponTitle'
import {ExpDate} from './ExpDate'
import { BundlePackages } from './BundlePackages'
import {SectionInstruction} from "./SectionInstruction"
const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Exam Section Name' className='min-w-125px' />
    ),
    id: 'section_name',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].section_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Exam Section Instruction' className='min-w-125px' />
    ),
    id: 'instruction',
    Cell: ({...props}:any) => <SectionInstruction coupon_title={props.data[props.row.index].instruction} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Section Duration' className='min-w-125px' />
    ),
    id: 'duration',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].duration} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created AT' className='min-w-125px' />
    ),
    id: 'start_date',
    Cell: ({...props}:any) => (
      <StartDate start_date={props.data[props.row.index]?.createdAt} />
    ),
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Exp. Date' className='min-w-125px' />
  //   ),
  //   id: 'exp_date',
  //   Cell: ({...props}) => <ExpDate exp_date={props.data[props.row.index].coupon_dates?.exp_date} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
  //   ),
  //   id: 'active',
  //   Cell: ({...props}:any) => (
  //     <UserTwoStepsCell
  //       status={props.data[props.row.index].status}
  //        id={props.data[props.row.index].id}
  //     />
  //   ),
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}:any) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
