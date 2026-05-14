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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Coupon Name' className='min-w-125px' />
    ),
    id: 'coupon_name',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].coupon_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Coupon Code' className='min-w-125px' />
    ),
    id: 'coupon_code',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].coupon_code} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'percentage',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Starting Date' className='min-w-125px' />
    ),
    id: 'starting_date',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].start_date} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Expiry Date' className='min-w-125px' />
    ),
    id: 'expirt_date',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].expiry_date} />,
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
  //     <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />
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
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
