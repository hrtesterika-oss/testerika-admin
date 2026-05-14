import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {Permission} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Permission>> = [
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
      <UserCustomHeader tableProps={props} title='Short Name' className='min-w-125px' />
    ),
    id: 'short_name',
    Cell: ({...props}) => <UserLastLoginCell short_name={props.data[props.row.index].short_name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Core Permission' className='min-w-125px' />
    ),
    id: 'core_permission',
    Cell: ({...props}) => <UserTwoStepsCell core_permission={props.data[props.row.index].core_permission} />,
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
