import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {PhoneNumber} from './PhoneNumber'
import {Admin} from './admin'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {Role} from '../../core/_models'
import {Email} from './Email'

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

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}) => <Email email={props.data[props.row.index].email} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Phone Number' className='min-w-125px' />
    ),
    id: 'phone_number',
    Cell: ({...props}) => <PhoneNumber phone_number={props.data[props.row.index].phone_number} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Is Admin' className='min-w-125px' />
    ),
    id: 'admin',
    Cell: ({...props}) => <Admin admin={props.data[props.row.index].admin} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
