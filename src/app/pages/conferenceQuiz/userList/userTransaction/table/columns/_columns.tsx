import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {SubjectCell} from './SubjectCell'
import { Type } from './Type'
import { PaymentMethod } from './PaymentMethod'

const usersColumns: ReadonlyArray<Column<User>> = [
  
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Plan Name' className='min-w-125px' />,
  //   accessor: 'id',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Plan Name' className='min-w-125px' />
  //   ),
  //   id: 'plan_name',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Plan Name' className='min-w-125px' />
    ),
    id: 'plan_name',
    Cell: ({...props}) => <SubjectCell name={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Payment Status' className='min-w-125px' />,
    id: 'payment_status',
    Cell: ({...props}) => <Type payment_status={props.data[props.row.index]} />,
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Currency' className='min-w-125px' />
    ),
    id: 'level',
    Cell: ({...props}) => <UserLastLoginCell currency={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Payment Method' className='min-w-125px' />
    ),
    id: 'payment_method',
    Cell: ({...props}) => <PaymentMethod name={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
  //   ),
  //   id: 'status',
  //   Cell: ({...props}) => (
  //     <UserTwoStepsCell
  //       status={props.data[props.row.index]}
  //       id={props.data[props.row.index].id}
  //     />
  //   ),
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserActionsCell
        id={props.data[props.row.index]}
      />
    ),
  },
]

export {usersColumns}
