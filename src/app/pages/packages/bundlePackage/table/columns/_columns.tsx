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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Bundle Package Name' className='min-w-125px' />
    ),
    id: 'passes_name',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Slug' className='min-w-125px' />
    ),
    id: 'slug',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].slug} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Packages' className='min-w-125px' />
    ),
    id: 'packages',
    Cell: ({...props}:any) => <BundlePackages courses={props.data[props.row.index].bundlepackages} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Price INR' className='min-w-125px' />
    ),
    id: 'Price INR',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].price_inr} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Price USD' className='min-w-125px' />
    ),
    id: 'Price USD',
    Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].price_usd} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Expiry Date' className='min-w-125px' />
  //   ),
  //   id: 'expirt_date',
  //   Cell: ({...props}:any) => <CouponTitle coupon_title={props.data[props.row.index].expiry_date} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Used So Far' className='min-w-125px' />
  //   ),
  //   id: 'used_so_far',
  //   Cell: ({...props}) => (
  //     <UsedSoFar used_so_far={props.data[props.row.index].coupon_uses?.used_so_far} />
  //   ),
  // },
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
