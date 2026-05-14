import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {AssignedTo} from './AssignedTo'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {Role} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Role>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
 
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Assigned To' className='min-w-125px' />
  //   ),
  //   id: 'assigned_to',
  //   Cell: ({...props}) => <AssignedTo assigned_to={props.data[props.row.index].assigned_to} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Core Role' className='min-w-125px' />
  //   ),
  //   id: 'core_permission',
  //   Cell: ({...props}) => <UserTwoStepsCell core_permission={props.data[props.row.index].core_permission} />,
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
