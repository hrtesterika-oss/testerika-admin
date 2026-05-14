import {Column} from 'react-table'
import {UserInfoCell} from './CouponCode'
import {UsedSoFar} from './UsedSoFar'
import {UserTwoStepsCell} from './Status'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {MaxUser} from './MaxUser'
import {StartDate} from './StartDate'
import {CouponTitle} from './CouponTitle'
import {ExpDate} from './ExpDate'
import { SubPackageCourses } from './SubPackageCourses'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sub-Package Name' className='min-w-125px' />
    ),
    id: 'passes_name',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sub-Package Description' className='min-w-125px' />
    ),
    id: 'description',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Sub-Package Courses' className='min-w-125px' />
    ),
    id: 'courses',
    Cell: ({...props}:any) => <SubPackageCourses courses={props.data[props.row.index].subpackagecourses} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Used So Far' className='min-w-125px' />
  //   ),
  //   id: 'used_so_far',
  //   Cell: ({...props}) => (
  //     <UsedSoFar used_so_far={props.data[props.row.index].coupon_uses?.used_so_far} />
  //   ),
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Start Date' className='min-w-125px' />
  //   ),
  //   id: 'start_date',
  //   Cell: ({...props}) => (
  //     <StartDate start_date={props.data[props.row.index].coupon_dates?.start_date} />
  //   ),
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Exp. Date' className='min-w-125px' />
  //   ),
  //   id: 'exp_date',
  //   Cell: ({...props}) => <ExpDate exp_date={props.data[props.row.index].coupon_dates?.exp_date} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='SubPackages Course IDs' className='min-w-125px' />
  //   ),
  //   id: 'active',
  //   Cell: ({...props}:any) => (
  //     <UserTwoStepsCell
  //       status={props.data[props.row.index].visible}
  //        id={props.data[props.row.index].id}
  //     />
  //   ),
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
