import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'



const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Support ID' className='min-w-125px' />
    ),
    accessor: 'id',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='User' className='min-w-125px' />,
    id: 'user_id',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Transaction id' className='min-w-125px' />
    ),
    accessor: 'transaction_id',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Screenshot' className='min-w-125px' />
    ),
    accessor: 'screenshot',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Comments' className='min-w-125px' />
    ),
    accessor: 'comments',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    accessor: 'payment_support_status',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='created date' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => (
      <UserLastLoginCell level={props.data[props.row.index].createdAt.split('T')[0]} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Active' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => (
      <UserTwoStepsCell
        status={props.data[props.row.index].status}
        id={props.data[props.row.index].id}
      />
    ),
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
