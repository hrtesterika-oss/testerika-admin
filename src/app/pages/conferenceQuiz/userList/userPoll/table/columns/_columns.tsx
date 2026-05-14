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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Poll ID' className='min-w-125px' />,
    accessor: 'id',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Quiz PIN' className='min-w-125px' />
  //   ),
  //   id: 'pin',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Poll Title' className='min-w-125px' />
    ),
    id: 'poll_Title',
    Cell: ({...props}) => <SubjectCell name={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Poll Key' className='min-w-125px' />
    ),
    id: 'Poll_Key',
    Cell: ({...props}) => <PlayerCell name={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title="Created At" className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => <UserPlayedAt name={props.data[props.row.index]} />,
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index]}
        id={props.data[props.row.index].id}
      />
    ),
  },
  
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
