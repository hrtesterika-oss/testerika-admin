import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserPlayedAt} from './UserPlayedAt'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {SubjectCell} from './SubjectCell'
import { Type } from './Type'
import { PlayerCell } from './PlayerCell'
import { CreatedBy } from './CreatedBy'
import { UserName } from './UserName'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Poll ID' className='min-w-125px' />,
  //   accessor: 'id',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Quiz PIN' className='min-w-125px' />
  //   ),
  //   id: 'pin',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    id: 'Email',
    Cell: ({...props}:any) => <PlayerCell name={props.data[props.row.index].tblconference_user} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Last Password changed At' className='min-w-125px' />
    ),
    id: 'last_password',
    Cell: ({...props}:any) => <UserPlayedAt name={props.data[props.row.index].last_password_changed} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='New Password Changed At' className='min-w-125px' />
    ),
    id: 'new_password',
    Cell: ({...props}:any) => <UserPlayedAt name={props.data[props.row.index].new_password_changed} />,
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
    ),
    id: 'action',
    Cell: ({...props}:any) => <SubjectCell name={props.data[props.row.index].action} />,
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
  
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Action' className='min-w-125px' />
  //   ),
  //   id: 'active',
  //   Cell: ({...props}) => (
  //     <UserActionsCell
  //       id={props.data[props.row.index]}
  //     />
  //   ),
  // },
]

export {usersColumns}
